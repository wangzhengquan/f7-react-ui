import Modals from './modals'
import $ from 'react-ui/dom'
var MessageBox = {
	params: {
		buttonsText: {
			ok: '确定',
		    yes: '是',
		    no: '否',
		    cancel: '取消'
		}
	},
	alert (text, title, callbackOk) {
	    if (typeof title === 'function') {
	        callbackOk = arguments[1];
	        title = undefined;
	    }
	    return Modals.modal({
	        text: text || '',
	        title: typeof title === 'undefined' ? '' : title,
	        buttons: [ {text: this.params.buttonsText.ok, bold: true, onClick: callbackOk} ]
	    });
	},

	confirm (text, title, callbackOk, callbackCancel) {
	    if (typeof title === 'function') {
	        callbackCancel = arguments[2];
	        callbackOk = arguments[1];
	        title = undefined;
	    }
	    return Modals.modal({
	        text: text || '',
	        title: typeof title === 'undefined' ? '' : title,
	        buttons: [
	            {text: this.params.buttonsText.cancel, onClick: callbackCancel},
	            {text: this.params.buttonsText.ok, bold: true, onClick: callbackOk}
	        ]
	    });
	},

	prompt (text, title, callbackOk, callbackCancel) {
	    if (typeof title === 'function') {
	        callbackCancel = arguments[2];
	        callbackOk = arguments[1];
	        title = undefined;
	    }
	    return Modals.modal({
	        text: text || '',
	        title: typeof title === 'undefined' ? '' : title,
	        afterText: '<div class="input-field"><input type="text" class="modal-text-input"></div>',
	        buttons: [
	            {
	                text: this.params.buttonsText.cancel
	            },
	            {
	                text: this.params.buttonsText.ok,
	                bold: true
	            }
	        ],
	        onClick: function (modal, index) {
	            if (index === 0 && callbackCancel) callbackCancel($(modal).find('.modal-text-input').val());
	            if (index === 1 && callbackOk) callbackOk($(modal).find('.modal-text-input').val());
	        }
	    });
	}
}
Object.assign(Modals, {
	alert: MessageBox.alert.bind(MessageBox),
	confirm: MessageBox.confirm.bind(MessageBox),
	prompt: MessageBox.prompt.bind(MessageBox),
})
export default MessageBox;