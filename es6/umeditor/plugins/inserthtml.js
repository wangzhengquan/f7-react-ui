'use strict';

var _um = require('../um');

var _um2 = _interopRequireDefault(_um);

var _browser = require('../core/browser');

var _browser2 = _interopRequireDefault(_browser);

var _utils = require('../core/utils');

var _utils2 = _interopRequireDefault(_utils);

var _domUtils = require('../core/domUtils');

var _domUtils2 = _interopRequireDefault(_domUtils);

var _dtd = require('../core/dtd');

var _dtd2 = _interopRequireDefault(_dtd);

var _htmlparser = require('../core/htmlparser');

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _filterNode = require('../core/filterNode');

var _filterNode2 = _interopRequireDefault(_filterNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import $ from '../../dom'
_um2.default.commands['inserthtml'] = {
    execCommand: function execCommand(command, html, notNeedFilter) {
        var me = this,
            range,
            div;
        if (!html) {
            return;
        }
        if (me.fireEvent('beforeinserthtml', html) === true) {
            return;
        }
        range = me.selection.getRange();
        div = range.document.createElement('div');
        div.style.display = 'inline';

        if (!notNeedFilter) {
            var root = (0, _htmlparser2.default)(html);
            //如果给了过滤规则就先进行过滤
            if (me.options.filterRules) {
                (0, _filterNode2.default)(root, me.options.filterRules);
            }
            //执行默认的处理
            me.filterInputRule(root);
            html = root.toHtml();
        }
        div.innerHTML = _utils2.default.trim(html);

        if (!range.collapsed) {
            var tmpNode = range.startContainer;
            if (_domUtils2.default.isFillChar(tmpNode)) {
                range.setStartBefore(tmpNode);
            }
            tmpNode = range.endContainer;
            if (_domUtils2.default.isFillChar(tmpNode)) {
                range.setEndAfter(tmpNode);
            }
            range.txtToElmBoundary();
            //结束边界可能放到了br的前边，要把br包含进来
            // x[xxx]<br/>
            if (range.endContainer && range.endContainer.nodeType == 1) {
                tmpNode = range.endContainer.childNodes[range.endOffset];
                if (tmpNode && _domUtils2.default.isBr(tmpNode)) {
                    range.setEndAfter(tmpNode);
                }
            }
            if (range.startOffset == 0) {
                tmpNode = range.startContainer;
                if (_domUtils2.default.isBoundaryNode(tmpNode, 'firstChild')) {
                    tmpNode = range.endContainer;
                    if (range.endOffset == (tmpNode.nodeType == 3 ? tmpNode.nodeValue.length : tmpNode.childNodes.length) && _domUtils2.default.isBoundaryNode(tmpNode, 'lastChild')) {
                        me.body.innerHTML = '<p>' + (_browser2.default.ie ? '' : '<br/>') + '</p>';
                        range.setStart(me.body.firstChild, 0).collapse(true);
                    }
                }
            }
            !range.collapsed && range.deleteContents();
            if (range.startContainer.nodeType == 1) {
                var child = range.startContainer.childNodes[range.startOffset],
                    pre;
                if (child && _domUtils2.default.isBlockElm(child) && (pre = child.previousSibling) && _domUtils2.default.isBlockElm(pre)) {
                    range.setEnd(pre, pre.childNodes.length).collapse();
                    while (child.firstChild) {
                        pre.appendChild(child.firstChild);
                    }
                    _domUtils2.default.remove(child);
                }
            }
        }

        var child,
            parent,
            pre,
            tmp,
            hadBreak = 0,
            nextNode;
        //如果当前位置选中了fillchar要干掉，要不会产生空行
        if (range.inFillChar()) {
            child = range.startContainer;
            if (_domUtils2.default.isFillChar(child)) {
                range.setStartBefore(child).collapse(true);
                _domUtils2.default.remove(child);
            } else if (_domUtils2.default.isFillChar(child, true)) {
                child.nodeValue = child.nodeValue.replace(_domUtils2.default.fillCharReg, '');
                range.startOffset--;
                range.collapsed && range.collapse(true);
            }
        }
        while (child = div.firstChild) {
            if (hadBreak) {
                var p = me.document.createElement('p');
                while (child && (child.nodeType == 3 || !_dtd2.default.$block[child.tagName])) {
                    nextNode = child.nextSibling;
                    p.appendChild(child);
                    child = nextNode;
                }
                if (p.firstChild) {

                    child = p;
                }
            }
            range.insertNode(child);
            nextNode = child.nextSibling;
            if (!hadBreak && child.nodeType == _domUtils2.default.NODE_ELEMENT && _domUtils2.default.isBlockElm(child)) {

                parent = _domUtils2.default.findParent(child, function (node) {
                    return _domUtils2.default.isBlockElm(node);
                });
                if (parent && parent.tagName.toLowerCase() != 'body' && !(_dtd2.default[parent.tagName][child.nodeName] && child.parentNode === parent)) {
                    if (!_dtd2.default[parent.tagName][child.nodeName]) {
                        pre = parent;
                    } else {
                        tmp = child.parentNode;
                        while (tmp !== parent) {
                            pre = tmp;
                            tmp = tmp.parentNode;
                        }
                    }

                    _domUtils2.default.breakParent(child, pre || tmp);
                    //去掉break后前一个多余的节点  <p>|<[p> ==> <p></p><div></div><p>|</p>
                    var pre = child.previousSibling;
                    _domUtils2.default.trimWhiteTextNode(pre);
                    if (!pre.childNodes.length) {
                        _domUtils2.default.remove(pre);
                    }
                    //trace:2012,在非ie的情况，切开后剩下的节点有可能不能点入光标添加br占位

                    if (!_browser2.default.ie && (next = child.nextSibling) && _domUtils2.default.isBlockElm(next) && next.lastChild && !_domUtils2.default.isBr(next.lastChild)) {
                        next.appendChild(me.document.createElement('br'));
                    }
                    hadBreak = 1;
                }
            }
            var next = child.nextSibling;
            if (!div.firstChild && next && _domUtils2.default.isBlockElm(next)) {

                range.setStart(next, 0).collapse(true);
                break;
            }
            range.setEndAfter(child).collapse();
        }

        child = range.startContainer;

        if (nextNode && _domUtils2.default.isBr(nextNode)) {
            _domUtils2.default.remove(nextNode);
        }
        //用chrome可能有空白展位符
        if (_domUtils2.default.isBlockElm(child) && _domUtils2.default.isEmptyNode(child)) {
            if (nextNode = child.nextSibling) {
                _domUtils2.default.remove(child);
                if (nextNode.nodeType == 1 && _dtd2.default.$block[nextNode.tagName]) {

                    range.setStart(nextNode, 0).collapse(true).shrinkBoundary();
                }
            } else {

                try {
                    child.innerHTML = _browser2.default.ie ? _domUtils2.default.fillChar : '<br/>';
                } catch (e) {
                    range.setStartBefore(child);
                    _domUtils2.default.remove(child);
                }
            }
        }
        //加上true因为在删除表情等时会删两次，第一次是删的fillData
        try {
            if (_browser2.default.ie9below && range.startContainer.nodeType == 1 && !range.startContainer.childNodes[range.startOffset]) {
                var start = range.startContainer,
                    pre = start.childNodes[range.startOffset - 1];
                if (pre && pre.nodeType == 1 && _dtd2.default.$empty[pre.tagName]) {
                    var txt = this.document.createTextNode(_domUtils2.default.fillChar);
                    range.insertNode(txt).setStart(txt, 0).collapse(true);
                }
            }
            setTimeout(function () {
                range.select(true);
            });
        } catch (e) {}

        setTimeout(function () {
            range = me.selection.getRange();
            range.scrollIntoView();
            me.fireEvent('afterinserthtml');
        }, 200);
    }
}; ///import core
/**
 * @description 插入内容
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     inserthtml插入内容的命令
 * @param   {String}   html                要插入的内容
 * @author zhanyi
 */
/* eslint quotes : "off"*/