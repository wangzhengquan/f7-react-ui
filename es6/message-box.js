'use strict';

var _modals = require('./modals');

var _modals2 = _interopRequireDefault(_modals);

var _dom = require('react-ui/dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageBox = {
	params: {
		buttonsText: {
			ok: '确定',
			yes: '是',
			no: '否',
			cancel: '取消'
		}
	},
	alert: function alert(text, title, callbackOk) {
		if (typeof title === 'function') {
			callbackOk = arguments[1];
			title = undefined;
		}
		return _modals2.default.modal({
			text: text || '',
			title: typeof title === 'undefined' ? '' : title,
			buttons: [{ text: this.params.buttonsText.ok, bold: true, onClick: callbackOk }]
		});
	},
	confirm: function confirm(text, title, callbackOk, callbackCancel) {
		if (typeof title === 'function') {
			callbackCancel = arguments[2];
			callbackOk = arguments[1];
			title = undefined;
		}
		return _modals2.default.modal({
			text: text || '',
			title: typeof title === 'undefined' ? '' : title,
			buttons: [{ text: this.params.buttonsText.cancel, onClick: callbackCancel }, { text: this.params.buttonsText.ok, bold: true, onClick: callbackOk }]
		});
	},
	prompt: function prompt(text, title, callbackOk, callbackCancel) {
		if (typeof title === 'function') {
			callbackCancel = arguments[2];
			callbackOk = arguments[1];
			title = undefined;
		}
		return _modals2.default.modal({
			text: text || '',
			title: typeof title === 'undefined' ? '' : title,
			afterText: '<div class="input-field"><input type="text" class="modal-text-input"></div>',
			buttons: [{
				text: this.params.buttonsText.cancel
			}, {
				text: this.params.buttonsText.ok,
				bold: true
			}],
			onClick: function onClick(modal, index) {
				if (index === 0 && callbackCancel) callbackCancel((0, _dom2.default)(modal).find('.modal-text-input').val());
				if (index === 1 && callbackOk) callbackOk((0, _dom2.default)(modal).find('.modal-text-input').val());
			}
		});
	}
};

Object.assign(_modals2.default, {
	alert: MessageBox.alert.bind(MessageBox),
	confirm: MessageBox.confirm.bind(MessageBox),
	prompt: MessageBox.prompt.bind(MessageBox)
});
console.log('modals modals==', _modals2.default);
module.exports = MessageBox;