'use strict';

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _dom = require('../../dom');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../core/utils');

var _utils2 = _interopRequireDefault(_utils);

var _dtd = require('../core/dtd');

var _dtd2 = _interopRequireDefault(_dtd);

var _domUtils = require('../core/domUtils');

var _domUtils2 = _interopRequireDefault(_domUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_plugins2.default.plugins['list'] = function () {
    var me = this;

    // me.setOpt( {
    //     'insertorderedlist':{
    //         'decimal':'',
    //         'lower-alpha':'',
    //         'lower-roman':'',
    //         'upper-alpha':'',
    //         'upper-roman':''
    //     },
    //     'insertunorderedlist':{
    //         'circle':'',
    //         'disc':'',
    //         'square':''
    //     }
    // } );

    this.addInputRule(function (root) {
        _utils2.default.each(root.getNodesByTagName('li'), function (node) {
            if (node.children.length == 0) {
                node.parentNode.removeChild(node);
            }
        });
    });
    me.commands['insertorderedlist'] = me.commands['insertunorderedlist'] = {
        execCommand: function execCommand(cmdName) {
            this.document.execCommand(cmdName);
            var rng = this.selection.getRange(),
                bk = rng.createBookmark(true);

            this.$body.find('ol,ul').each(function (i, n) {
                var parent = n.parentNode;
                if (parent.tagName == 'P' && parent.lastChild === parent.firstChild) {
                    (0, _dom2.default)(n).children().each(function (j, li) {
                        var p = parent.cloneNode(false);
                        (0, _dom2.default)(p).append(li.innerHTML);
                        (0, _dom2.default)(li).html('').append(p);
                    });
                    (0, _dom2.default)(n).insertBefore(parent);
                    (0, _dom2.default)(parent).remove();
                }

                if (_dtd2.default.$inline[parent.tagName]) {
                    if (parent.tagName == 'SPAN') {

                        (0, _dom2.default)(n).children().each(function (k, li) {
                            var span = parent.cloneNode(false);
                            if (li.firstChild.nodeName != 'P') {

                                while (li.firstChild) {
                                    span.appendChild(li.firstChild);
                                }
                                (0, _dom2.default)('<p></p>').appendTo(li).append(span);
                            } else {
                                while (li.firstChild) {
                                    span.appendChild(li.firstChild);
                                }
                                (0, _dom2.default)(li.firstChild).append(span);
                            }
                        });
                    }
                    _domUtils2.default.remove(parent, true);
                }
            });

            rng.moveToBookmark(bk).select();
            return true;
        },
        queryCommandState: function queryCommandState(cmdName) {
            return this.document.queryCommandState(cmdName);
        }
    };
};
// import browser from '../core/browser'
///import core
///commands 有序列表,无序列表
///commandsName  InsertOrderedList,InsertUnorderedList
///commandsTitle  有序列表,无序列表
/**
 * 有序列表
 * @function
 * @name Plugins.execCommand
 * @param   {String}   cmdName     insertorderlist插入有序列表
 * @param   {String}   style               值为：decimal,lower-alpha,lower-roman,upper-alpha,upper-roman
 * @author zhanyi
 */
/**
 * 无序链接
 * @function
 * @name Plugins.execCommand
 * @param   {String}   cmdName     insertunorderlist插入无序列表
 * * @param   {String}   style            值为：circle,disc,square
 * @author zhanyi
 */
/* eslint quotes : "off"*/