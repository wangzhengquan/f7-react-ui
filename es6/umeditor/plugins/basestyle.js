'use strict';

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _dom = require('../../dom');

var _dom2 = _interopRequireDefault(_dom);

var _browser = require('../core/browser');

var _browser2 = _interopRequireDefault(_browser);

var _utils = require('../core/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///import core
///commands 加粗,斜体,上标,下标
///commandsName  Bold,Italic,Subscript,Superscript
///commandsTitle  加粗,加斜,下标,上标
/**
 * b u i等基础功能实现
 * @function
 * @name Plugins.execCommands
 * @param    {String}    cmdName    bold加粗。italic斜体。subscript上标。superscript下标。
*/
/* eslint quotes : "off"*/
_plugins2.default.plugins['basestyle'] = function () {
    var basestyles = ['bold', 'underline', 'superscript', 'subscript', 'italic', 'strikethrough'],
        me = this;
    //添加快捷键
    me.addshortcutkey({
        "Bold": "ctrl+66", //^B
        "Italic": "ctrl+73", //^I
        "Underline": "ctrl+shift+85", //^U
        "strikeThrough": 'ctrl+shift+83' //^s
    });
    //过滤最后的产出数据
    me.addOutputRule(function (root) {
        _utils2.default.each(root.getNodesByTagName('b i u strike s'), function (node) {
            switch (node.tagName) {
                case 'b':
                    node.tagName = 'strong';
                    break;
                case 'i':
                    node.tagName = 'em';
                    break;
                case 'u':
                    node.tagName = 'span';
                    node.setStyle('text-decoration', 'underline');
                    break;
                case 's':
                case 'strike':
                    node.tagName = 'span';
                    node.setStyle('text-decoration', 'line-through');
            }
        });
    });
    basestyles.forEach(function (cmd) {
        me.commands[cmd] = {
            execCommand: function execCommand(cmdName) {
                var rng = this.selection.getRange();
                if (rng.collapsed && this.queryCommandState(cmdName) != 1) {
                    var node = this.document.createElement({
                        'bold': 'strong',
                        'underline': 'u',
                        'superscript': 'sup',
                        'subscript': 'sub',
                        'italic': 'em',
                        'strikethrough': 'strike'
                    }[cmdName]);
                    rng.insertNode(node).setStart(node, 0).setCursor(false);
                    return true;
                } else {
                    return this.document.execCommand(cmdName);
                }
            },
            queryCommandState: function queryCommandState(cmdName) {
                if (_browser2.default.gecko) {
                    return this.document.queryCommandState(cmdName);
                }
                var path = this.selection.getStartElementPath(),
                    result = false;
                _utils2.default.each(path, function (n) {
                    switch (cmdName) {
                        case 'bold':
                            if (n.nodeName == 'STRONG' || n.nodeName == 'B') {
                                result = 1;
                                return false;
                            }
                            break;
                        case 'underline':
                            if (n.nodeName == 'U' || n.nodeName == 'SPAN' && (0, _dom2.default)(n).css('text-decoration') == 'underline') {
                                result = 1;
                                return false;
                            }
                            break;
                        case 'superscript':
                            if (n.nodeName == 'SUP') {
                                result = 1;
                                return false;
                            }
                            break;
                        case 'subscript':
                            if (n.nodeName == 'SUB') {
                                result = 1;
                                return false;
                            }
                            break;
                        case 'italic':
                            if (n.nodeName == 'EM' || n.nodeName == 'I') {
                                result = 1;
                                return false;
                            }
                            break;
                        case 'strikethrough':
                            if (n.nodeName == 'S' || n.nodeName == 'STRIKE' || n.nodeName == 'SPAN' && (0, _dom2.default)(n).css('text-decoration') == 'line-through') {
                                result = 1;
                                return false;
                            }
                            break;
                    }
                });
                return result;
            }
        };
    });
};