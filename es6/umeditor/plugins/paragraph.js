'use strict';

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import $ from '../../dom'
// import browser from '../core/browser'
// import utils from '../core/utils'
_plugins2.default.plugins['paragraph'] = function () {
    var me = this;
    // me.setOpt('paragraph',{'p':'', 'h1':'', 'h2':'', 'h3':'', 'h4':'', 'h5':'', 'h6':''});
    me.commands['paragraph'] = {
        execCommand: function execCommand(cmdName, style) {
            return this.document.execCommand('formatBlock', false, '<' + style + '>');
        },
        queryCommandValue: function queryCommandValue() {
            try {
                var val = this.document.queryCommandValue('formatBlock');
            } catch (e) {}
            return val;
        }
    };
}; ///import core
///commands 格式
///commandsName  Paragraph
///commandsTitle  段落格式
/**
 * 段落样式
 * @function
 * @name Plugins.execCommand
 * @param   {String}   cmdName     paragraph插入段落执行命令
 * @param   {String}   style               标签值为：'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
 * @param   {String}   attrs               标签的属性
 * @author zhanyi
 */
/* eslint quotes : "off"*/