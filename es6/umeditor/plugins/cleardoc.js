'use strict';

var _um = require('../um');

var _um2 = _interopRequireDefault(_um);

var _browser = require('../core/browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///import core
///commands 清空文档
///commandsName  ClearDoc
///commandsTitle  清空文档
/**
 *
 * 清空文档
 * @function
 * @name Plugins.execCommand
 * @param   {String}   cmdName     cleardoc清空文档
 */
/* eslint quotes : "off"*/
_um2.default.commands['cleardoc'] = {
    execCommand: function execCommand() {
        var me = this,
            range = me.selection.getRange();
        me.body.innerHTML = "<p>" + (_browser2.default.ie ? "" : "<br/>") + "</p>";
        range.setStart(me.body.firstChild, 0).setCursor(false, true);
        setTimeout(function () {
            me.fireEvent("clearDoc");
        }, 0);
    }
};