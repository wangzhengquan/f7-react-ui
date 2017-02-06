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
///commands 全选
///commandsName  SelectAll
///commandsTitle  全选
/**
 * 选中所有
 * @function
 * @name Plugins.execCommand
 * @param   {String}   cmdName    selectall选中编辑器里的所有内容
 * @author zhanyi
*/
/* eslint quotes : "off"*/
_plugins2.default.plugins['selectall'] = function () {
    var me = this;
    me.commands['selectall'] = {
        execCommand: function execCommand() {
            //去掉了原生的selectAll,因为会出现报错和当内容为空时，不能出现闭合状态的光标
            var me = this,
                body = me.body,
                range = me.selection.getRange();
            range.selectNodeContents(body);
            if (_domUtils2.default.isEmptyBlock(body)) {
                //opera不能自动合并到元素的里边，要手动处理一下
                if (_browser2.default.opera && body.firstChild && body.firstChild.nodeType == 1) {
                    range.setStartAtFirst(body.firstChild);
                }
                range.collapse(true);
            }
            range.select(true);
        },
        notNeedUndo: 1
    };

    //快捷键
    me.addshortcutkey({
        "selectAll": "ctrl+65"
    });
};
// import utils from '../core/utils'