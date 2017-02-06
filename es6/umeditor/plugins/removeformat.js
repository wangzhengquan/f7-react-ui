'use strict';

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _browser = require('../core/browser');

var _browser2 = _interopRequireDefault(_browser);

var _Range = require('../core/Range');

var _Range2 = _interopRequireDefault(_Range);

var _domUtils = require('../core/domUtils');

var _domUtils2 = _interopRequireDefault(_domUtils);

var _dtd = require('../core/dtd');

var _dtd2 = _interopRequireDefault(_dtd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import $ from '../../dom'
_plugins2.default.plugins['removeformat'] = function () {
    var me = this;
    me.setOpt({
        'removeFormatTags': 'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var',
        'removeFormatAttributes': 'class,style,lang,width,height,align,hspace,valign'
    });
    me.commands['removeformat'] = {
        execCommand: function execCommand(cmdName, tags, style, attrs, notIncludeA) {

            var tagReg = new RegExp('^(?:' + (tags || this.options.removeFormatTags).replace(/,/g, '|') + ')$', 'i'),
                removeFormatAttributes = style ? [] : (attrs || this.options.removeFormatAttributes).split(','),
                range = new _Range2.default(this.document),
                bookmark,
                parent,
                filter = function filter(node) {
                return node.nodeType == 1;
            };

            function isRedundantSpan(node) {
                if (node.nodeType == 3 || node.tagName.toLowerCase() != 'span') {
                    return 0;
                }
                if (_browser2.default.ie) {
                    //ie 下判断实效，所以只能简单用style来判断
                    //return node.style.cssText == '' ? 1 : 0;
                    var attrs = node.attributes;
                    if (attrs.length) {
                        for (var i = 0, l = attrs.length; i < l; i++) {
                            if (attrs[i].specified) {
                                return 0;
                            }
                        }
                        return 1;
                    }
                }
                return !node.attributes.length;
            }
            function doRemove(range) {

                var bookmark1 = range.createBookmark();
                if (range.collapsed) {
                    range.enlarge(true);
                }

                //不能把a标签切了
                if (!notIncludeA) {
                    var aNode = _domUtils2.default.findParentByTagName(range.startContainer, 'a', true);
                    if (aNode) {
                        range.setStartBefore(aNode);
                    }

                    aNode = _domUtils2.default.findParentByTagName(range.endContainer, 'a', true);
                    if (aNode) {
                        range.setEndAfter(aNode);
                    }
                }

                bookmark = range.createBookmark();

                node = bookmark.start;

                //切开始
                while ((parent = node.parentNode) && !_domUtils2.default.isBlockElm(parent)) {
                    _domUtils2.default.breakParent(node, parent);
                    _domUtils2.default.clearEmptySibling(node);
                }
                if (bookmark.end) {
                    //切结束
                    node = bookmark.end;
                    while ((parent = node.parentNode) && !_domUtils2.default.isBlockElm(parent)) {
                        _domUtils2.default.breakParent(node, parent);
                        _domUtils2.default.clearEmptySibling(node);
                    }

                    //开始去除样式
                    var current = _domUtils2.default.getNextDomNode(bookmark.start, false, filter),
                        next;
                    while (current) {
                        if (current == bookmark.end) {
                            break;
                        }

                        next = _domUtils2.default.getNextDomNode(current, true, filter);

                        if (!_dtd2.default.$empty[current.tagName.toLowerCase()] && !_domUtils2.default.isBookmarkNode(current)) {
                            if (tagReg.test(current.tagName)) {
                                if (style) {
                                    _domUtils2.default.removeStyle(current, style);
                                    if (isRedundantSpan(current) && style != 'text-decoration') {
                                        _domUtils2.default.remove(current, true);
                                    }
                                } else {
                                    _domUtils2.default.remove(current, true);
                                }
                            } else {
                                //trace:939  不能把list上的样式去掉
                                if (!_dtd2.default.$tableContent[current.tagName] && !_dtd2.default.$list[current.tagName]) {
                                    _domUtils2.default.removeAttributes(current, removeFormatAttributes);
                                    if (isRedundantSpan(current)) {
                                        _domUtils2.default.remove(current, true);
                                    }
                                }
                            }
                        }
                        current = next;
                    }
                }
                //trace:1035
                //trace:1096 不能把td上的样式去掉，比如边框
                var pN = bookmark.start.parentNode;
                if (_domUtils2.default.isBlockElm(pN) && !_dtd2.default.$tableContent[pN.tagName] && !_dtd2.default.$list[pN.tagName]) {
                    _domUtils2.default.removeAttributes(pN, removeFormatAttributes);
                }
                pN = bookmark.end.parentNode;
                if (bookmark.end && _domUtils2.default.isBlockElm(pN) && !_dtd2.default.$tableContent[pN.tagName] && !_dtd2.default.$list[pN.tagName]) {
                    _domUtils2.default.removeAttributes(pN, removeFormatAttributes);
                }
                range.moveToBookmark(bookmark).moveToBookmark(bookmark1);
                //清除冗余的代码 <b><bookmark></b>
                var node = range.startContainer,
                    tmp,
                    collapsed = range.collapsed;
                while (node.nodeType == 1 && _domUtils2.default.isEmptyNode(node) && _dtd2.default.$removeEmpty[node.tagName]) {
                    tmp = node.parentNode;
                    range.setStartBefore(node);
                    //trace:937
                    //更新结束边界
                    if (range.startContainer === range.endContainer) {
                        range.endOffset--;
                    }
                    _domUtils2.default.remove(node);
                    node = tmp;
                }

                if (!collapsed) {
                    node = range.endContainer;
                    while (node.nodeType == 1 && _domUtils2.default.isEmptyNode(node) && _dtd2.default.$removeEmpty[node.tagName]) {
                        tmp = node.parentNode;
                        range.setEndBefore(node);
                        _domUtils2.default.remove(node);

                        node = tmp;
                    }
                }
            }

            range = this.selection.getRange();
            if (!range.collapsed) {
                doRemove(range);
                range.select();
            }
        }

    };
}; //Plugins.plugins['removeformat'] = function () {
//    var me = this;
//    me.commands['removeformat'] = {
//        execCommand: function () {
//            me.document.execCommand('removeformat');
//
//            /* 处理ie8和firefox选区有链接时,清除格式的bug */
//            if (browser.gecko || browser.ie8 || browser.webkit) {
//                var nativeRange = this.selection.getNative().getRangeAt(0),
//                    common = nativeRange.commonAncestorContainer,
//                    rng = me.selection.getRange(),
//                    bk = rng.createBookmark();
//
//                function isEleInBookmark(node, bk){
//                    if ( (domUtils.getPosition(node, bk.start) & domUtils.POSITION_FOLLOWING) &&
//                        (domUtils.getPosition(bk.end, node) & domUtils.POSITION_FOLLOWING) ) {
//                        return true;
//                    } else if ( (domUtils.getPosition(node, bk.start) & domUtils.POSITION_CONTAINS) ||
//                        (domUtils.getPosition(node, bk.end) & domUtils.POSITION_CONTAINS) ) {
//                        return true;
//                    }
//                    return false;
//                }
//
//                $(common).find('a').each(function (k, a) {
//                    if ( isEleInBookmark(a, bk) ) {
//                        a.removeAttribute('style');
//                    }
//                });
//
//            }
//        }
//    };
//
//};
//
/* eslint quotes : "off"*/