'use strict';

var _um = require('../um');

var _um2 = _interopRequireDefault(_um);

var _dom = require('../../dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import browser from '../core/browser'
// import utils from '../core/utils'
///import core
///commands 打印
///commandsName  Print
///commandsTitle  打印
/**
 * @description 打印
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     print打印编辑器内容
 * @author zhanyi
 */
/* eslint quotes : "off"*/
_um2.default.commands['print'] = {
    execCommand: function execCommand() {
        var me = this,
            id = 'editor_print_' + +new Date();

        (0, _dom2.default)('<iframe src="" id="' + id + '" name="' + id + '" frameborder="0"></iframe>').attr('id', id).css({
            width: '0px',
            height: '0px',
            'overflow': 'hidden',
            'float': 'left',
            'position': 'absolute',
            top: '-10000px',
            left: '-10000px'
        }).appendTo(me.$container.find('.edui-dialog-container'));

        var w = window.open('', id, ''),
            d = w.document;
        d.open();
        d.write('<html><head></head><body><div>' + this.getContent(null, null, true) + '</div><script>' + "setTimeout(function(){" + "window.print();" + "setTimeout(function(){" + "window.parent.$('#" + id + "').remove();" + "},100);" + "},200);" + '</script></body></html>');
        d.close();
    },
    notNeedUndo: 1
};