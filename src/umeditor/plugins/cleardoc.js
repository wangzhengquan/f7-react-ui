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
import UM from '../um'
import browser from '../core/browser'

UM.commands['cleardoc'] = {
    execCommand : function() {
        var me = this,
            range = me.selection.getRange();
        me.body.innerHTML = "<p>"+(browser.ie ? "" : "<br/>")+"</p>";
        range.setStart(me.body.firstChild,0).setCursor(false,true);
        setTimeout(function(){
            me.fireEvent("clearDoc");
        },0);

    }
};

