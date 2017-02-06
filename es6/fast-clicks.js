'use strict';

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _supportEvents = require('./support-events');

var _supportEvents2 = _interopRequireDefault(_supportEvents);

var _params = require('./params');

var _params2 = _interopRequireDefault(_params);

var _device = require('./device');

var _device2 = _interopRequireDefault(_device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*===============================================================================
************   Fast Clicks   ************
************   Inspired by https://github.com/ftlabs/fastclick   ************
===============================================================================*/
if (_params2.default.activeState) {
    (0, _dom2.default)('html').addClass('watch-active-state');
}
if (_device2.default.ios && _device2.default.webView) {
    // Strange hack required for iOS 8 webview to work on inputs
    window.addEventListener('touchstart', function () {});
}

var touchStartX, touchStartY, touchStartTime, targetElement, trackClick, activeSelection, scrollParent, lastClickTime, isMoved, tapHoldFired, tapHoldTimeout;
var activableElement, activeTimeout, needsFastClick, needsFastClickTimeOut;
var rippleWave, rippleTarget, rippleTransform, rippleTimeout;
function findActivableElement(el) {
    var target = (0, _dom2.default)(el);
    var parents = target.parents(_params2.default.activeStateElements);
    var activable;
    if (target.is(_params2.default.activeStateElements)) {
        activable = target;
    }
    if (parents.length > 0) {
        activable = activable ? activable.add(parents) : parents;
    }
    return activable ? activable : target;
}
function isInsideScrollableView(el) {
    var pageContent = el.parents('.page-content, .panel');

    if (pageContent.length === 0) {
        return false;
    }

    // This event handler covers the "tap to stop scrolling".
    if (pageContent.prop('scrollHandlerSet') !== 'yes') {
        pageContent.on('scroll', function () {
            clearTimeout(activeTimeout);
            clearTimeout(rippleTimeout);
        });
        pageContent.prop('scrollHandlerSet', 'yes');
    }

    return true;
}
function addActive() {
    if (!activableElement) return;
    activableElement.addClass('active-state');
}
function removeActive(el) {
    if (!activableElement) return;
    activableElement.removeClass('active-state');
    activableElement = null;
}
function isFormElement(el) {
    var nodes = 'input select textarea label'.split(' ');
    if (el.nodeName && nodes.indexOf(el.nodeName.toLowerCase()) >= 0) return true;
    return false;
}
function androidNeedsBlur(el) {
    var noBlur = 'button input textarea select'.split(' ');
    if (document.activeElement && el !== document.activeElement && document.activeElement !== document.body) {
        if (noBlur.indexOf(el.nodeName.toLowerCase()) >= 0) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
function targetNeedsFastClick(el) {
    var $el = (0, _dom2.default)(el);
    // console.log('targetNeedsFastClick==', el)
    if (el.nodeName.toLowerCase() === 'input' && el.type === 'file') return false;
    if ($el.hasClass('no-fastclick') || $el.parents('.no-fastclick').length > 0) return false;
    if ($el.closest('[contenteditable=true]').length > 0) return false;
    return true;
}
function targetNeedsFocus(el) {
    if (document.activeElement === el) {
        return false;
    }
    var tag = el.nodeName.toLowerCase();
    var skipInputs = 'button checkbox file image radio submit'.split(' ');
    if (el.disabled || el.readOnly) return false;
    if (tag === 'textarea') return true;
    if (tag === 'select') {
        if (_device2.default.android) return false;else return true;
    }
    if (tag === 'input' && skipInputs.indexOf(el.type) < 0) return true;
    if ((0, _dom2.default)(el).closest('[contenteditable=true]').length > 0) return true;
}
function targetNeedsPrevent(el) {
    el = (0, _dom2.default)(el);
    var prevent = true;
    if (el.is('label') || el.parents('label').length > 0) {
        if (_device2.default.android) {
            prevent = false;
        } else if (_device2.default.ios && el.is('input')) {
            prevent = true;
        } else prevent = false;
    }
    return prevent;
}

// Mouse Handlers
function handleMouseDown(e) {
    findActivableElement(e.target).addClass('active-state');
    if ('which' in e && e.which === 3) {
        setTimeout(function () {
            (0, _dom2.default)('.active-state').removeClass('active-state');
        }, 0);
    }
    if (_params2.default.material && _params2.default.materialRipple) {
        touchStartX = e.pageX;
        touchStartY = e.pageY;
        rippleTouchStart(e.target, e.pageX, e.pageY);
    }
}
function handleMouseMove(e) {
    (0, _dom2.default)('.active-state').removeClass('active-state');
    if (_params2.default.material && _params2.default.materialRipple) {
        rippleTouchMove();
    }
}
function handleMouseUp(e) {
    (0, _dom2.default)('.active-state').removeClass('active-state');
    if (_params2.default.material && _params2.default.materialRipple) {
        rippleTouchEnd();
    }
}

// Material Touch Ripple Effect
function findRippleElement(el) {
    var needsRipple = _params2.default.materialRippleElements;
    var $el = (0, _dom2.default)(el);
    if ($el.is(needsRipple)) {
        if ($el.hasClass('no-ripple')) {
            return false;
        }
        return $el;
    } else if ($el.parents(needsRipple).length > 0) {
        var rippleParent = $el.parents(needsRipple).eq(0);
        if (rippleParent.hasClass('no-ripple')) {
            return false;
        }
        return rippleParent;
    } else return false;
}
function createRipple(x, y, el) {
    var box = el[0].getBoundingClientRect();
    var center = {
        x: x - box.left,
        y: y - box.top
    },
        height = box.height,
        width = box.width;
    var diameter = Math.max(Math.pow(Math.pow(height, 2) + Math.pow(width, 2), 0.5), 48);

    rippleWave = (0, _dom2.default)('<div class="ripple-wave" style="width: ' + diameter + 'px; height: ' + diameter + 'px; margin-top:-' + diameter / 2 + 'px; margin-left:-' + diameter / 2 + 'px; left:' + center.x + 'px; top:' + center.y + 'px;"></div>');
    el.prepend(rippleWave);
    var clientLeft = rippleWave[0].clientLeft;
    rippleTransform = 'translate3d(' + (-center.x + width / 2) + 'px, ' + (-center.y + height / 2) + 'px, 0) scale(1)';
    rippleWave.transform(rippleTransform);
}

function removeRipple() {
    if (!rippleWave) return;
    var toRemove = rippleWave;

    var removeTimeout = setTimeout(function () {
        toRemove.remove();
    }, 400);

    rippleWave.addClass('ripple-wave-fill').transform(rippleTransform.replace('scale(1)', 'scale(1.01)')).transitionEnd(function () {
        clearTimeout(removeTimeout);

        var rippleWave = (0, _dom2.default)(this).addClass('ripple-wave-out').transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));

        removeTimeout = setTimeout(function () {
            rippleWave.remove();
        }, 700);

        setTimeout(function () {
            rippleWave.transitionEnd(function () {
                clearTimeout(removeTimeout);
                (0, _dom2.default)(this).remove();
            });
        }, 0);
    });

    rippleWave = rippleTarget = undefined;
}

function rippleTouchStart(el, x, y) {
    rippleTarget = findRippleElement(el);
    if (!rippleTarget || rippleTarget.length === 0) {
        rippleTarget = undefined;
        return;
    }
    if (!isInsideScrollableView(rippleTarget)) {
        createRipple(touchStartX, touchStartY, rippleTarget);
    } else {
        rippleTimeout = setTimeout(function () {
            createRipple(touchStartX, touchStartY, rippleTarget);
        }, 80);
    }
}
function rippleTouchMove() {
    clearTimeout(rippleTimeout);
    removeRipple();
}
function rippleTouchEnd() {
    if (rippleWave) {
        removeRipple();
    } else if (rippleTarget && !isMoved) {
        clearTimeout(rippleTimeout);
        createRipple(touchStartX, touchStartY, rippleTarget);
        setTimeout(removeRipple, 0);
    } else {
        removeRipple();
    }
}

// Send Click
function sendClick(e) {
    var touch = e.changedTouches[0];
    var evt = document.createEvent('MouseEvents');
    var eventType = 'click';
    if (_device2.default.android && targetElement.nodeName.toLowerCase() === 'select') {
        eventType = 'mousedown';
    }
    evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    evt.forwardedTouchEvent = true;
    targetElement.dispatchEvent(evt);
}

// Touch Handlers
function handleTouchStart(e) {

    isMoved = false;
    tapHoldFired = false;
    if (e.targetTouches.length > 1) {
        if (activableElement) removeActive();
        return true;
    }
    if (e.touches.length > 1 && activableElement) {
        removeActive();
    }
    if (_params2.default.tapHold) {
        if (tapHoldTimeout) clearTimeout(tapHoldTimeout);
        tapHoldTimeout = setTimeout(function () {
            if (e && e.touches && e.touches.length > 1) return;
            tapHoldFired = true;
            e.preventDefault();
            (0, _dom2.default)(e.target).trigger('taphold');
        }, _params2.default.tapHoldDelay);
    }
    if (needsFastClickTimeOut) clearTimeout(needsFastClickTimeOut);
    needsFastClick = targetNeedsFastClick(e.target);

    if (!needsFastClick) {
        trackClick = false;
        return true;
    }
    if (_device2.default.ios) {
        var selection = window.getSelection();
        if (selection.rangeCount && selection.focusNode !== document.body && (!selection.isCollapsed || document.activeElement === selection.focusNode)) {
            activeSelection = true;
            return true;
        } else {
            activeSelection = false;
        }
    }
    if (_device2.default.android) {
        if (androidNeedsBlur(e.target)) {
            document.activeElement.blur();
        }
    }

    trackClick = true;
    targetElement = e.target;
    touchStartTime = new Date().getTime();
    touchStartX = e.targetTouches[0].pageX;
    touchStartY = e.targetTouches[0].pageY;

    // Detect scroll parent
    if (_device2.default.ios) {
        scrollParent = undefined;
        (0, _dom2.default)(targetElement).parents().each(function () {
            var parent = this;
            if (parent.scrollHeight > parent.offsetHeight && !scrollParent) {
                scrollParent = parent;
                scrollParent.f7ScrollTop = scrollParent.scrollTop;
            }
        });
    }
    if (e.timeStamp - lastClickTime < _params2.default.fastClicksDelayBetweenClicks) {
        e.preventDefault();
    }

    if (_params2.default.activeState) {
        activableElement = findActivableElement(targetElement);
        // If it's inside a scrollable view, we don't trigger active-state yet,
        // because it can be a scroll instead. Based on the link:
        // http://labnote.beedesk.com/click-scroll-and-pseudo-active-on-mobile-webk
        if (!isInsideScrollableView(activableElement)) {
            addActive();
        } else {
            activeTimeout = setTimeout(addActive, 80);
        }
    }
    if (_params2.default.material && _params2.default.materialRipple) {
        rippleTouchStart(targetElement, touchStartX, touchStartY);
    }
}
function handleTouchMove(e) {
    if (!trackClick) return;
    var _isMoved = false;
    var distance = _params2.default.fastClicksDistanceThreshold;
    if (distance) {
        var pageX = e.targetTouches[0].pageX;
        var pageY = e.targetTouches[0].pageY;
        if (Math.abs(pageX - touchStartX) > distance || Math.abs(pageY - touchStartY) > distance) {
            _isMoved = true;
        }
    } else {
        _isMoved = true;
    }
    if (_isMoved) {
        trackClick = false;
        targetElement = null;
        isMoved = true;
        if (_params2.default.tapHold) {
            clearTimeout(tapHoldTimeout);
        }
        if (_params2.default.activeState) {
            clearTimeout(activeTimeout);
            removeActive();
        }
        if (_params2.default.material && _params2.default.materialRipple) {
            rippleTouchMove();
        }
    }
}
function handleTouchEnd(e) {
    clearTimeout(activeTimeout);
    clearTimeout(tapHoldTimeout);

    if (!trackClick) {
        if (!activeSelection && needsFastClick) {
            if (!(_device2.default.android && !e.cancelable)) {
                e.preventDefault();
            }
        }
        return true;
    }

    if (document.activeElement === e.target) {
        if (_params2.default.activeState) removeActive();
        if (_params2.default.material && _params2.default.materialRipple) {
            rippleTouchEnd();
        }
        return true;
    }

    if (!activeSelection) {
        e.preventDefault();
    }

    if (e.timeStamp - lastClickTime < _params2.default.fastClicksDelayBetweenClicks) {
        setTimeout(removeActive, 0);
        return true;
    }

    lastClickTime = e.timeStamp;

    trackClick = false;

    if (_device2.default.ios && scrollParent) {
        if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
            return false;
        }
    }

    // Add active-state here because, in a very fast tap, the timeout didn't
    // have the chance to execute. Removing active-state in a timeout gives
    // the chance to the animation execute.
    if (_params2.default.activeState) {
        addActive();
        setTimeout(removeActive, 0);
    }
    // Remove Ripple
    if (_params2.default.material && _params2.default.materialRipple) {
        rippleTouchEnd();
    }

    // Trigger focus when required
    if (targetNeedsFocus(targetElement)) {
        if (_device2.default.ios && _device2.default.webView) {
            if (event.timeStamp - touchStartTime > 159) {
                targetElement = null;
                return false;
            }
            targetElement.focus();
            return false;
        } else {
            targetElement.focus();
        }
    }

    // Blur active elements
    if (document.activeElement && targetElement !== document.activeElement && document.activeElement !== document.body && targetElement.nodeName.toLowerCase() !== 'label') {
        document.activeElement.blur();
    }

    // Send click
    e.preventDefault();
    sendClick(e);
    return false;
}
function handleTouchCancel(e) {
    trackClick = false;
    targetElement = null;

    // Remove Active State
    clearTimeout(activeTimeout);
    clearTimeout(tapHoldTimeout);
    if (_params2.default.activeState) {
        removeActive();
    }

    // Remove Ripple
    if (_params2.default.material && _params2.default.materialRipple) {
        rippleTouchEnd();
    }
}

function handleClick(e) {
    var allowClick = false;
    if (trackClick) {
        targetElement = null;
        trackClick = false;
        return true;
    }
    if ((e.target.type === 'submit' || e.target.type === 'radio' || e.target.type === 'file') && e.detail === 0) {
        return true;
    }

    if (!targetElement) {
        if (!isFormElement(e.target)) {
            allowClick = true;
        }
    }
    if (!needsFastClick) {
        allowClick = true;
    }
    if (document.activeElement === targetElement) {
        allowClick = true;
    }
    if (e.forwardedTouchEvent) {
        allowClick = true;
    }
    if (!e.cancelable) {
        allowClick = true;
    }
    if (_params2.default.tapHold && _params2.default.tapHoldPreventClicks && tapHoldFired) {
        allowClick = false;
    }
    if (!allowClick) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        if (targetElement) {
            if (targetNeedsPrevent(targetElement) || isMoved) {
                e.preventDefault();
            }
        } else {
            e.preventDefault();
        }
        targetElement = null;
    }
    needsFastClickTimeOut = setTimeout(function () {
        needsFastClick = false;
    }, _device2.default.ios || _device2.default.androidChrome ? 100 : 400);

    if (_params2.default.tapHold) {
        tapHoldTimeout = setTimeout(function () {
            tapHoldFired = false;
        }, _device2.default.ios || _device2.default.androidChrome ? 100 : 400);
    }

    return allowClick;
}
if (_supportEvents2.default.touch) {
    document.addEventListener('click', handleClick, true);

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchCancel);
} else {
    if (_params2.default.activeState) {
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
}
if (_params2.default.material && _params2.default.materialRipple) {
    document.addEventListener('contextmenu', function (e) {
        if (activableElement) removeActive();
        rippleTouchEnd();
    });
}