'use strict';

var _um = require('../um');

var _um2 = _interopRequireDefault(_um);

var _utils = require('../core/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///import core
///import plugins\inserthtml.js
///commands 插入图片，操作图片的对齐方式
///commandsName  InsertImage,ImageNone,ImageLeft,ImageRight,ImageCenter
///commandsTitle  图片,默认,居左,居右,居中
///commandsDialog  dialogs\image
/**
 * Created by .
 * User: zhanyi
 * for image
 */
/* eslint quotes : "off"*/
_um2.default.commands['insertimage'] = {
    execCommand: function execCommand(cmd, opt) {
        opt = _utils2.default.isArray(opt) ? opt : [opt];
        if (!opt.length) {
            return;
        }
        var me = this;
        var html = [],
            str = '',
            ci;
        ci = opt[0];
        if (opt.length == 1) {
            str = '<div class="img-wrapper"><img src="' + ci.src + '" class="lazy"' + (ci.width ? 'width="' + ci.width + '" ' : '') + (ci.height ? ' height="' + ci.height + '" ' : '') + (ci['floatStyle'] == 'left' || ci['floatStyle'] == 'right' ? ' style="float:' + ci['floatStyle'] + ';"' : '') + (ci.title && ci.title != "" ? ' title="' + ci.title + '"' : '') + (ci.border && ci.border != "0" ? ' border="' + ci.border + '"' : '') + (ci.alt && ci.alt != "" ? ' alt="' + ci.alt + '"' : '') + (ci.hspace && ci.hspace != "0" ? ' hspace = "' + ci.hspace + '"' : '') + (ci.vspace && ci.vspace != "0" ? ' vspace = "' + ci.vspace + '"' : '') + '/></div>';

            html.push(str);
        } else {
            for (var i = 0; ci = opt[i++];) {
                str = '<p ' + (ci['floatStyle'] == 'center' ? 'style="text-align: center" ' : '') + '><img src="' + ci.src + '" class="lazy"' + (ci.width ? 'width="' + ci.width + '" ' : '') + (ci._src ? ' _src="' + ci._src + '" ' : '') + (ci.height ? ' height="' + ci.height + '" ' : '') + ' style="' + (ci['floatStyle'] && ci['floatStyle'] != 'center' ? 'float:' + ci['floatStyle'] + ';' : '') + (ci.border || '') + '" ' + (ci.title ? ' title="' + ci.title + '"' : '') + ' /></p>';
                html.push(str);
            }
        }

        me.execCommand('insertHtml', html.join(''), true);
    }
};
// import $ from '../../dom'
// import browser from '../core/browser'