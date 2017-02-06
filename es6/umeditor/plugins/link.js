'use strict';

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _dom = require('../../dom');

var _dom2 = _interopRequireDefault(_dom);

var _browser = require('../core/browser');

var _browser2 = _interopRequireDefault(_browser);

var _utils = require('../core/utils');

var _utils2 = _interopRequireDefault(_utils);

var _domUtils = require('../core/domUtils');

var _domUtils2 = _interopRequireDefault(_domUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_plugins2.default.plugins['link'] = function () {
    var me = this;

    // me.setOpt('autourldetectinie',false);
    //在ie下禁用autolink
    if (_browser2.default.ie && this.autourldetectinie === false) {
        this.addListener('keyup', function (cmd, evt) {
            var me = this,
                keyCode = evt.keyCode;
            if (keyCode == 13 || keyCode == 32) {
                var rng = me.selection.getRange();
                var start = rng.startContainer;
                if (keyCode == 13) {
                    if (start.nodeName == 'P') {
                        var pre = start.previousSibling;
                        if (pre && pre.nodeType == 1) {
                            var pre = pre.lastChild;
                            if (pre && pre.nodeName == 'A' && !pre.getAttribute('_href')) {
                                _domUtils2.default.remove(pre, true);
                            }
                        }
                    }
                } else if (keyCode == 32) {
                    if (start.nodeType == 3 && /^\s$/.test(start.nodeValue)) {
                        start = start.previousSibling;
                        if (start && start.nodeName == 'A' && !start.getAttribute('_href')) {
                            _domUtils2.default.remove(start, true);
                        }
                    }
                }
            }
        });
    }

    this.addOutputRule(function (root) {
        _utils2.default.each(root.getNodesByTagName('a'), function (a) {
            var _href = _utils2.default.html(a.getAttr('_href'));
            if (!/^(ftp|https?|\/|file)/.test(_href)) {
                _href = 'http://' + _href;
            }
            a.setAttr('href', _href);
            a.setAttr('_href');
            if (a.getAttr('title') == '') {
                a.setAttr('title');
            }
        });
    });
    this.addInputRule(function (root) {
        _utils2.default.each(root.getNodesByTagName('a'), function (a) {
            a.setAttr('_href', _utils2.default.html(a.getAttr('href')));
        });
    });
    me.commands['link'] = {
        execCommand: function execCommand(cmdName, opt) {
            if (typeof opt === 'string') {
                opt = {
                    href: opt
                };
            }
            var me = this;
            var rng = me.selection.getRange();
            if (rng.collapsed) {
                var start = rng.startContainer;
                if (start = _domUtils2.default.findParentByTagName(start, 'a', true)) {
                    (0, _dom2.default)(start).attr(opt);
                    rng.selectNode(start).select();
                } else {
                    rng.insertNode((0, _dom2.default)('<a>' + opt.href + '</a>').attr(opt)[0]).select();
                }
            } else {
                me.document.execCommand('createlink', false, '_umeditor_link');
                _utils2.default.each(_domUtils2.default.getElementsByTagName(me.body, 'a', function (n) {

                    return n.getAttribute('href') == '_umeditor_link';
                }), function (l) {
                    if ((0, _dom2.default)(l).text() == '_umeditor_link') {
                        (0, _dom2.default)(l).text(opt.href);
                    }
                    _domUtils2.default.setAttributes(l, opt);
                    rng.selectNode(l).select();
                });
            }
        },
        queryCommandState: function queryCommandState() {
            return this.queryCommandValue('link') ? 1 : 0;
        },
        queryCommandValue: function queryCommandValue() {
            var path = this.selection.getStartElementPath();
            var result;
            _utils2.default.each(path, function (n) {
                if (n.nodeName == "A") {
                    result = n;
                    return false;
                }
            });
            return result;
        }
    };
    me.commands['unlink'] = {
        execCommand: function execCommand() {
            this.document.execCommand('unlink');
        }
    };
}; ///import core
///commands 超链接,取消链接
///commandsName  Link,Unlink
///commandsTitle  超链接,取消链接
///commandsDialog  dialogs\link
/**
 * 超链接
 * @function
 * @name Plugins.execCommand
 * @param   {String}   cmdName     link插入超链接
 * @param   {Object}  options         url地址，title标题，target是否打开新页
 * @author zhanyi
 */
/**
 * 取消链接
 * @function
 * @name Plugins.execCommand
 * @param   {String}   cmdName     unlink取消链接
 * @author zhanyi
 */
/* eslint quotes : "off"*/