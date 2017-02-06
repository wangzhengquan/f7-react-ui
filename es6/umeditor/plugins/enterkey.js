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

///import core
///import plugins/undo.js
///commands 设置回车标签p或br
///commandsName  EnterKey
///commandsTitle  设置回车标签p或br
/**
 * @description 处理回车
 * @author zhanyi
 */
/* eslint quotes : "off"*/
_plugins2.default.plugins['enterkey'] = function () {
    var hTag,
        me = this,
        tag = 'p';
    me.addListener('keyup', function (type, evt) {

        var keyCode = evt.keyCode || evt.which;
        if (keyCode == 13) {
            var range = me.selection.getRange(),
                start = range.startContainer,
                doSave;

            //修正在h1-h6里边回车后不能嵌套p的问题
            if (!_browser2.default.ie) {

                if (/h\d/i.test(hTag)) {
                    if (_browser2.default.gecko) {
                        var h = _domUtils2.default.findParentByTagName(start, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'caption', 'table'], true);
                        if (!h) {
                            me.document.execCommand('formatBlock', false, '<p>');
                            doSave = 1;
                        }
                    } else {
                        //chrome remove div
                        if (start.nodeType == 1) {
                            var tmp = me.document.createTextNode(''),
                                div;
                            range.insertNode(tmp);
                            div = _domUtils2.default.findParentByTagName(tmp, 'div', true);
                            if (div) {
                                var p = me.document.createElement('p');
                                while (div.firstChild) {
                                    p.appendChild(div.firstChild);
                                }
                                div.parentNode.insertBefore(p, div);
                                _domUtils2.default.remove(div);
                                range.setStartBefore(tmp).setCursor();
                                doSave = 1;
                            }
                            _domUtils2.default.remove(tmp);
                        }
                    }

                    if (me.undoManger && doSave) {
                        me.undoManger.save();
                    }
                }
                //没有站位符，会出现多行的问题
                _browser2.default.opera && range.select();
            } else {
                me.fireEvent('saveScene', true, true);
            }
        }
    });

    me.addListener('keydown', function (type, evt) {
        var keyCode = evt.keyCode || evt.which;
        if (keyCode == 13) {
            //回车
            if (me.fireEvent('beforeenterkeydown')) {
                _domUtils2.default.preventDefault(evt);
                return;
            }
            me.fireEvent('saveScene', true, true);
            hTag = '';

            var range = me.selection.getRange();

            if (!range.collapsed) {
                //跨td不能删
                var start = range.startContainer,
                    end = range.endContainer,
                    startTd = _domUtils2.default.findParentByTagName(start, 'td', true),
                    endTd = _domUtils2.default.findParentByTagName(end, 'td', true);
                if (startTd && endTd && startTd !== endTd || !startTd && endTd || startTd && !endTd) {
                    evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
                    return;
                }
            }
            if (tag == 'p') {

                if (!_browser2.default.ie) {

                    start = _domUtils2.default.findParentByTagName(range.startContainer, ['ol', 'ul', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'caption'], true);

                    //opera下执行formatblock会在table的场景下有问题，回车在opera原生支持很好，所以暂时在opera去掉调用这个原生的command
                    //trace:2431
                    if (!start && !_browser2.default.opera) {

                        me.document.execCommand('formatBlock', false, '<p>');

                        if (_browser2.default.gecko) {
                            range = me.selection.getRange();
                            start = _domUtils2.default.findParentByTagName(range.startContainer, 'p', true);
                            start && _domUtils2.default.removeDirtyAttr(start);
                        }
                    } else {
                        hTag = start.tagName;
                        start.tagName.toLowerCase() == 'p' && _browser2.default.gecko && _domUtils2.default.removeDirtyAttr(start);
                    }
                }
            }
        }
    });

    _browser2.default.ie && me.addListener('setDisabled', function () {
        (0, _dom2.default)(me.body).find('p').each(function (i, p) {
            if (_domUtils2.default.isEmptyBlock(p)) {
                p.innerHTML = '&nbsp;';
            }
        });
    });
};