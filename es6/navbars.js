'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _params = require('./params');

var _params2 = _interopRequireDefault(_params);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*======================================================
************   Navbars && Toolbars   ************
======================================================*/
var navbars = {};

// On Navbar Init Callback
navbars.navbarInitCallback = function (view, pageContainer, navbarContainer, navbarInnerContainer) {
    if (!navbarContainer && navbarInnerContainer) navbarContainer = (0, _dom2.default)(navbarInnerContainer).parent('.navbar')[0];
    if (navbarInnerContainer.f7NavbarInitialized && view && !view.params.domCache) return;
    var navbarData = {
        container: navbarContainer,
        innerContainer: navbarInnerContainer
    };
    var pageData = pageContainer && pageContainer.f7PageData;

    var eventData = {
        page: pageData,
        navbar: navbarData
    };

    if (navbarInnerContainer.f7NavbarInitialized && (view && view.params.domCache || !view && (0, _dom2.default)(navbarContainer).parents('.popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal').length > 0)) {
        // Reinit Navbar
        navbars.reinitNavbar(navbarContainer, navbarInnerContainer);

        // Event
        (0, _dom2.default)(navbarInnerContainer).trigger('navbarReinit', eventData);
        return;
    }
    navbarInnerContainer.f7NavbarInitialized = true;
    // Before Init
    (0, _dom2.default)(navbarInnerContainer).trigger('navbarBeforeInit', eventData);

    // Initialize Navbar
    navbars.initNavbar(navbarContainer, navbarInnerContainer);

    // On init
    (0, _dom2.default)(navbarInnerContainer).trigger('navbarInit', eventData);
};
// Navbar Remove Callback
navbars.navbarRemoveCallback = function (view, pageContainer, navbarContainer, navbarInnerContainer) {
    if (!navbarContainer && navbarInnerContainer) navbarContainer = (0, _dom2.default)(navbarInnerContainer).parent('.navbar')[0];
    var navbarData = {
        container: navbarContainer,
        innerContainer: navbarInnerContainer
    };
    var pageData = pageContainer.f7PageData;

    var eventData = {
        page: pageData,
        navbar: navbarData
    };
    (0, _dom2.default)(navbarInnerContainer).trigger('navbarBeforeRemove', eventData);
};
navbars.initNavbar = function (navbarContainer, navbarInnerContainer) {
    // Init Subnavbar Searchbar
};
navbars.reinitNavbar = function (navbarContainer, navbarInnerContainer) {
    // Re init navbar methods
};
navbars.initNavbarWithCallback = function (navbarContainer) {
    navbarContainer = (0, _dom2.default)(navbarContainer);
    var viewContainer = navbarContainer.parents('.view');
    var view;
    if (viewContainer.length === 0) return;
    if (navbarContainer.parents('.navbar-through').length === 0 && viewContainer.find('.navbar-through').length === 0) return;
    view = viewContainer[0].f7View || undefined;

    navbarContainer.find('.navbar-inner').each(function () {
        var navbarInnerContainer = this;
        var pageContainer;
        if ((0, _dom2.default)(navbarInnerContainer).attr('data-page')) {
            // For dom cache
            pageContainer = viewContainer.find('.page[data-page="' + (0, _dom2.default)(navbarInnerContainer).attr('data-page') + '"]')[0];
        }
        if (!pageContainer) {
            var pages = viewContainer.find('.page');
            if (pages.length === 1) {
                pageContainer = pages[0];
            } else {
                viewContainer.find('.page').each(function () {
                    if (this.f7PageData && this.f7PageData.navbarInnerContainer === navbarInnerContainer) {
                        pageContainer = this;
                    }
                });
            }
        }
        navbars.navbarInitCallback(view, pageContainer, navbarContainer[0], navbarInnerContainer);
    });
};

navbars.sizeNavbar = function (navbarinner) {
    var n = (0, _dom2.default)(navbarinner);

    if (n.hasClass('cached')) return;
    var left = _params2.default.rtl ? n.find('.right') : n.find('.left'),
        right = _params2.default.rtl ? n.find('.left') : n.find('.right'),
        center = n.find('.center'),
        subnavbar = n.find('.subnavbar'),
        noLeft = left.length === 0,
        noRight = right.length === 0,
        leftWidth = noLeft ? 0 : left.outerWidth(true),
        rightWidth = noRight ? 0 : right.outerWidth(true),
        centerWidth = center.outerWidth(true),
        navbarStyles = n.styles(),
        navbarWidth = n[0].offsetWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10),
        onLeft = n.hasClass('navbar-on-left'),
        currLeft,
        diff;

    if (noRight) {
        currLeft = navbarWidth - centerWidth;
    }
    if (noLeft) {
        currLeft = 0;
    }
    if (!noLeft && !noRight) {
        currLeft = (navbarWidth - rightWidth - centerWidth + leftWidth) / 2;
    }
    var requiredLeft = (navbarWidth - centerWidth) / 2;
    if (navbarWidth - leftWidth - rightWidth > centerWidth) {
        if (requiredLeft < leftWidth) {
            requiredLeft = leftWidth;
        }
        if (requiredLeft + centerWidth > navbarWidth - rightWidth) {
            requiredLeft = navbarWidth - rightWidth - centerWidth;
        }
        diff = requiredLeft - currLeft;
    } else {
        diff = 0;
    }
    // PARAMS.RTL inverter
    var inverter = _params2.default.rtl ? -1 : 1;

    if (center.hasClass('sliding')) {
        center[0].f7NavbarLeftOffset = -(currLeft + diff) * inverter;
        center[0].f7NavbarRightOffset = (navbarWidth - currLeft - diff - centerWidth) * inverter;
        if (onLeft) {
            if (_params2.default.animateNavBackIcon) {
                var activeNavbarBackLink = n.parent().find('.navbar-on-center').find('.left.sliding .back .icon ~ span');
                if (activeNavbarBackLink.length > 0) {
                    center[0].f7NavbarLeftOffset += activeNavbarBackLink[0].offsetLeft;
                }
            }
            center.transform('translate3d(' + center[0].f7NavbarLeftOffset + 'px, 0, 0)');
        }
    }
    if (!noLeft && left.hasClass('sliding')) {
        if (_params2.default.rtl) {
            left[0].f7NavbarLeftOffset = -(navbarWidth - left[0].offsetWidth) / 2 * inverter;
            left[0].f7NavbarRightOffset = leftWidth * inverter;
        } else {
            left[0].f7NavbarLeftOffset = -leftWidth;
            left[0].f7NavbarRightOffset = (navbarWidth - left[0].offsetWidth) / 2;
            if (_params2.default.animateNavBackIcon && left.find('.back .icon').length > 0) {
                left[0].f7NavbarRightOffset -= left.find('.back .icon')[0].offsetWidth;
            }
        }
        if (onLeft) left.transform('translate3d(' + left[0].f7NavbarLeftOffset + 'px, 0, 0)');
    }
    if (!noRight && right.hasClass('sliding')) {
        if (_params2.default.rtl) {
            right[0].f7NavbarLeftOffset = -rightWidth * inverter;
            right[0].f7NavbarRightOffset = (navbarWidth - right[0].offsetWidth) / 2 * inverter;
        } else {
            right[0].f7NavbarLeftOffset = -(navbarWidth - right[0].offsetWidth) / 2;
            right[0].f7NavbarRightOffset = rightWidth;
        }
        if (onLeft) right.transform('translate3d(' + right[0].f7NavbarLeftOffset + 'px, 0, 0)');
    }
    if (subnavbar.length && subnavbar.hasClass('sliding')) {
        subnavbar[0].f7NavbarLeftOffset = _params2.default.rtl ? subnavbar[0].offsetWidth : -subnavbar[0].offsetWidth;
        subnavbar[0].f7NavbarRightOffset = -subnavbar[0].f7NavbarLeftOffset;
    }

    // Center left
    var centerLeft = diff;
    if (_params2.default.rtl && noLeft && noRight && center.length > 0) centerLeft = -centerLeft;
    center.css({ left: centerLeft + 'px' });
};
// Size Navbars
navbars.sizeNavbars = function (viewContainer) {
    if (_params2.default.material) return;
    var navbarInner = viewContainer ? (0, _dom2.default)(viewContainer).find('.navbar .navbar-inner:not(.cached)') : (0, _dom2.default)('.navbar .navbar-inner:not(.cached)');
    navbarInner.each(function () {
        navbars.sizeNavbar(this);
    });
};

// Hide/Show Navbars/Toolbars
navbars.hideNavbar = function (navbarContainer) {
    (0, _dom2.default)(navbarContainer).addClass('navbar-hidden');
    return true;
};
navbars.showNavbar = function (navbarContainer) {
    var navbar = (0, _dom2.default)(navbarContainer);
    navbar.addClass('navbar-hiding').removeClass('navbar-hidden').transitionEnd(function () {
        navbar.removeClass('navbar-hiding');
    });
    return true;
};
navbars.hideToolbar = function (toolbarContainer) {
    (0, _dom2.default)(toolbarContainer).addClass('toolbar-hidden');
    return true;
};
navbars.showToolbar = function (toolbarContainer) {
    var toolbar = (0, _dom2.default)(toolbarContainer);
    toolbar.addClass('toolbar-hiding').removeClass('toolbar-hidden').transitionEnd(function () {
        toolbar.removeClass('toolbar-hiding');
    });
};

exports.default = navbars;