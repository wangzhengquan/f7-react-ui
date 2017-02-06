'use strict';

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _dom = require('../../dom');

var _dom2 = _interopRequireDefault(_dom);

var _browser = require('../core/browser');

var _browser2 = _interopRequireDefault(_browser);

var _domUtils = require('../core/domUtils');

var _domUtils2 = _interopRequireDefault(_domUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *   处理特殊键的兼容性问题
 */
/* eslint quotes : "off"*/
_plugins2.default.plugins['keystrokes'] = function () {
    var me = this;
    var collapsed = true;
    me.addListener('keydown', function (type, evt) {
        var keyCode = evt.keyCode || evt.which,
            rng = me.selection.getRange();

        //处理全选的情况
        if (!rng.collapsed && !(evt.ctrlKey || evt.shiftKey || evt.altKey || evt.metaKey) && (keyCode >= 65 && keyCode <= 90 || keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 111 || {
            13: 1,
            8: 1,
            46: 1
        }[keyCode])) {

            var tmpNode = rng.startContainer;
            if (_domUtils2.default.isFillChar(tmpNode)) {
                rng.setStartBefore(tmpNode);
            }
            tmpNode = rng.endContainer;
            if (_domUtils2.default.isFillChar(tmpNode)) {
                rng.setEndAfter(tmpNode);
            }
            rng.txtToElmBoundary();
            //结束边界可能放到了br的前边，要把br包含进来
            // x[xxx]<br/>
            if (rng.endContainer && rng.endContainer.nodeType == 1) {
                tmpNode = rng.endContainer.childNodes[rng.endOffset];
                if (tmpNode && _domUtils2.default.isBr(tmpNode)) {
                    rng.setEndAfter(tmpNode);
                }
            }
            if (rng.startOffset == 0) {
                tmpNode = rng.startContainer;
                if (_domUtils2.default.isBoundaryNode(tmpNode, 'firstChild')) {
                    tmpNode = rng.endContainer;
                    if (rng.endOffset == (tmpNode.nodeType == 3 ? tmpNode.nodeValue.length : tmpNode.childNodes.length) && _domUtils2.default.isBoundaryNode(tmpNode, 'lastChild')) {
                        me.fireEvent('saveScene');
                        me.body.innerHTML = '<p>' + (_browser2.default.ie ? '' : '<br/>') + '</p>';
                        rng.setStart(me.body.firstChild, 0).setCursor(false, true);
                        me._selectionChange();
                        return;
                    }
                }
            }
        }

        //处理backspace
        if (keyCode == 8) {
            rng = me.selection.getRange();
            collapsed = rng.collapsed;
            if (me.fireEvent('delkeydown', evt)) {
                return;
            }
            var start, end;
            //避免按两次删除才能生效的问题
            if (rng.collapsed && rng.inFillChar()) {
                start = rng.startContainer;

                if (_domUtils2.default.isFillChar(start)) {
                    rng.setStartBefore(start).shrinkBoundary(true).collapse(true);
                    _domUtils2.default.remove(start);
                } else {
                    start.nodeValue = start.nodeValue.replace(new RegExp('^' + _domUtils2.default.fillChar), '');
                    rng.startOffset--;
                    rng.collapse(true).select(true);
                }
            }
            //解决选中control元素不能删除的问题
            if (start = rng.getClosedNode()) {
                me.fireEvent('saveScene');
                rng.setStartBefore(start);
                _domUtils2.default.remove(start);
                rng.setCursor();
                me.fireEvent('saveScene');
                _domUtils2.default.preventDefault(evt);
                return;
            }
            //阻止在table上的删除
            if (!_browser2.default.ie) {
                start = _domUtils2.default.findParentByTagName(rng.startContainer, 'table', true);
                end = _domUtils2.default.findParentByTagName(rng.endContainer, 'table', true);
                if (start && !end || !start && end || start !== end) {
                    evt.preventDefault();
                    return;
                }
            }
            start = rng.startContainer;
            if (rng.collapsed && start.nodeType == 1) {
                var currentNode = start.childNodes[rng.startOffset - 1];
                if (currentNode && currentNode.nodeType == 1 && currentNode.tagName == 'BR') {
                    me.fireEvent('saveScene');
                    rng.setStartBefore(currentNode).collapse(true);
                    _domUtils2.default.remove(currentNode);
                    rng.select();
                    me.fireEvent('saveScene');
                }
            }

            //trace:3613
            if (_browser2.default.chrome) {
                if (rng.collapsed) {

                    while (rng.startOffset == 0 && !_domUtils2.default.isEmptyBlock(rng.startContainer)) {
                        rng.setStartBefore(rng.startContainer);
                    }
                    var pre = rng.startContainer.childNodes[rng.startOffset - 1];
                    if (pre && pre.nodeName == 'BR') {
                        rng.setStartBefore(pre);
                        me.fireEvent('saveScene');
                        (0, _dom2.default)(pre).remove();
                        rng.setCursor();
                        me.fireEvent('saveScene');
                    }
                }
            }
        }
        //trace:1634
        //ff的del键在容器空的时候，也会删除
        if (_browser2.default.gecko && keyCode == 46) {
            var range = me.selection.getRange();
            if (range.collapsed) {
                start = range.startContainer;
                if (_domUtils2.default.isEmptyBlock(start)) {
                    var parent = start.parentNode;
                    while (_domUtils2.default.getChildCount(parent) == 1 && !_domUtils2.default.isBody(parent)) {
                        start = parent;
                        parent = parent.parentNode;
                    }
                    if (start === parent.lastChild) evt.preventDefault();
                    return;
                }
            }
        }
    });
    me.addListener('keyup', function (type, evt) {
        var keyCode = evt.keyCode || evt.which,
            rng,
            me = this;
        if (keyCode == 8) {
            if (me.fireEvent('delkeyup')) {
                return;
            }
            rng = me.selection.getRange();
            if (rng.collapsed) {
                var tmpNode,
                    autoClearTagName = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
                if (tmpNode = _domUtils2.default.findParentByTagName(rng.startContainer, autoClearTagName, true)) {
                    if (_domUtils2.default.isEmptyBlock(tmpNode)) {
                        var pre = tmpNode.previousSibling;
                        if (pre && pre.nodeName != 'TABLE') {
                            _domUtils2.default.remove(tmpNode);
                            rng.setStartAtLast(pre).setCursor(false, true);
                            return;
                        } else {
                            var next = tmpNode.nextSibling;
                            if (next && next.nodeName != 'TABLE') {
                                _domUtils2.default.remove(tmpNode);
                                rng.setStartAtFirst(next).setCursor(false, true);
                                return;
                            }
                        }
                    }
                }
                //处理当删除到body时，要重新给p标签展位
                if (_domUtils2.default.isBody(rng.startContainer)) {
                    var tmpNode = _domUtils2.default.createElement(me.document, 'p', {
                        'innerHTML': _browser2.default.ie ? _domUtils2.default.fillChar : '<br/>'
                    });
                    rng.insertNode(tmpNode).setStart(tmpNode, 0).setCursor(false, true);
                }
            }

            //chrome下如果删除了inline标签，浏览器会有记忆，在输入文字还是会套上刚才删除的标签，所以这里再选一次就不会了
            if (!collapsed && (rng.startContainer.nodeType == 3 || rng.startContainer.nodeType == 1 && _domUtils2.default.isEmptyBlock(rng.startContainer))) {
                if (_browser2.default.ie) {
                    var span = rng.document.createElement('span');
                    rng.insertNode(span).setStartBefore(span).collapse(true);
                    rng.select();
                    _domUtils2.default.remove(span);
                } else {
                    rng.select();
                }
            }
        }
    });
};
// import utils from '../core/utils'