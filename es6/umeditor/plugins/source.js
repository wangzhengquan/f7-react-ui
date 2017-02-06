'use strict';

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _dom = require('../../dom');

var _dom2 = _interopRequireDefault(_dom);

var _browser = require('../core/browser');

var _browser2 = _interopRequireDefault(_browser);

var _dtd = require('../core/dtd');

var _dtd2 = _interopRequireDefault(_dtd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///import core
///import plugins/serialize.js
///import plugins/undo.js
///commands 查看源码
///commandsName  Source
///commandsTitle  查看源码
/* eslint quotes : "off"*/
(function () {
    var sourceEditors = {
        textarea: function textarea(editor, holder) {
            var textarea = holder.ownerDocument.createElement('textarea');
            textarea.style.cssText = 'resize:none;border:0;padding:0;margin:0;overflow-y:auto;outline:0';
            // todo: IE下只有onresize属性可用... 很纠结
            if (_browser2.default.ie && _browser2.default.version < 8) {

                textarea.style.width = holder.offsetWidth + 'px';
                textarea.style.height = holder.offsetHeight + 'px';
                holder.onresize = function () {
                    textarea.style.width = holder.offsetWidth + 'px';
                    textarea.style.height = holder.offsetHeight + 'px';
                };
            }
            holder.appendChild(textarea);
            return {
                container: textarea,
                setContent: function setContent(content) {
                    textarea.value = content;
                },
                getContent: function getContent() {
                    return textarea.value;
                },
                select: function select() {
                    var range;
                    if (_browser2.default.ie) {
                        range = textarea.createTextRange();
                        range.collapse(true);
                        range.select();
                    } else {
                        //todo: chrome下无法设置焦点
                        textarea.setSelectionRange(0, 0);
                        textarea.focus();
                    }
                },
                dispose: function dispose() {
                    holder.removeChild(textarea);
                    // todo
                    holder.onresize = null;
                    textarea = null;
                    holder = null;
                }
            };
        }
    };

    _plugins2.default.plugins['source'] = function () {
        var me = this;
        var opt = this.options;
        var sourceMode = false;
        var sourceEditor;

        opt.sourceEditor = 'textarea';

        me.setOpt({
            sourceEditorFirst: false
        });
        function createSourceEditor(holder) {
            return sourceEditors.textarea(me, holder);
        }

        // var bakCssText;
        //解决在源码模式下getContent不能得到最新的内容问题
        var oldGetContent = me.getContent,
            bakAddress;

        me.commands['source'] = {
            execCommand: function execCommand() {

                sourceMode = !sourceMode;
                if (sourceMode) {
                    bakAddress = me.selection.getRange().createAddress(false, true);
                    me.undoManger && me.undoManger.save(true);
                    if (_browser2.default.gecko) {
                        me.body.contentEditable = false;
                    }

                    //                    bakCssText = me.body.style.cssText;
                    me.body.style.cssText += ';position:absolute;left:-32768px;top:-32768px;';

                    me.fireEvent('beforegetcontent');
                    var root = _plugins2.default.htmlparser(me.body.innerHTML);
                    me.filterOutputRule(root);
                    root.traversal(function (node) {
                        if (node.type == 'element') {
                            switch (node.tagName) {
                                case 'td':
                                case 'th':
                                case 'caption':
                                    if (node.children && node.children.length == 1) {
                                        if (node.firstChild().tagName == 'br') {
                                            node.removeChild(node.firstChild());
                                        }
                                    };
                                    break;
                                case 'pre':
                                    node.innerText(node.innerText().replace(/&nbsp;/g, ' '));

                            }
                        }
                    });

                    me.fireEvent('aftergetcontent');

                    var content = root.toHtml(true);

                    sourceEditor = createSourceEditor(me.body.parentNode);

                    sourceEditor.setContent(content);

                    var getStyleValue = function getStyleValue(attr) {
                        return parseInt((0, _dom2.default)(me.body).css(attr));
                    };
                    (0, _dom2.default)(sourceEditor.container).width((0, _dom2.default)(me.body).width() + getStyleValue("padding-left") + getStyleValue("padding-right")).height((0, _dom2.default)(me.body).height());
                    setTimeout(function () {
                        sourceEditor.select();
                    });
                    //重置getContent，源码模式下取值也能是最新的数据
                    me.getContent = function () {
                        return sourceEditor.getContent() || '<p>' + (_browser2.default.ie ? '' : '<br/>') + '</p>';
                    };
                } else {
                    me.$body.css({
                        'position': '',
                        'left': '',
                        'top': ''
                    });
                    //                    me.body.style.cssText = bakCssText;
                    var cont = sourceEditor.getContent() || '<p>' + (_browser2.default.ie ? '' : '<br/>') + '</p>';
                    //处理掉block节点前后的空格,有可能会误命中，暂时不考虑
                    cont = cont.replace(new RegExp('[\\r\\t\\n ]*<\/?(\\w+)\\s*(?:[^>]*)>', 'g'), function (a, b) {
                        if (b && !_dtd2.default.$inlineWithA[b.toLowerCase()]) {
                            return a.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g, '');
                        }
                        return a.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g, '');
                    });
                    me.setContent(cont);
                    sourceEditor.dispose();
                    sourceEditor = null;
                    //还原getContent方法
                    me.getContent = oldGetContent;
                    var first = me.body.firstChild;
                    //trace:1106 都删除空了，下边会报错，所以补充一个p占位
                    if (!first) {
                        me.body.innerHTML = '<p>' + (_browser2.default.ie ? '' : '<br/>') + '</p>';
                    }
                    //要在ifm为显示时ff才能取到selection,否则报错
                    //这里不能比较位置了
                    me.undoManger && me.undoManger.save(true);
                    if (_browser2.default.gecko) {
                        me.body.contentEditable = true;
                    }
                    try {
                        me.selection.getRange().moveToAddress(bakAddress).select();
                    } catch (e) {}
                }
                this.fireEvent('sourcemodechanged', sourceMode);
            },
            queryCommandState: function queryCommandState() {
                return sourceMode | 0;
            },
            notNeedUndo: 1
        };
        var oldQueryCommandState = me.queryCommandState;

        me.queryCommandState = function (cmdName) {
            cmdName = cmdName.toLowerCase();
            if (sourceMode) {
                //源码模式下可以开启的命令
                return cmdName in {
                    'source': 1,
                    'fullscreen': 1
                } ? oldQueryCommandState.apply(this, arguments) : -1;
            }
            return oldQueryCommandState.apply(this, arguments);
        };
    };
})();
// import utils from '../core/utils'