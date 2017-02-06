'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _views = require('../views');

var _views2 = _interopRequireDefault(_views);

var _dom = require('../dom');

var _dom2 = _interopRequireDefault(_dom);

var _template = require('../template');

var _template2 = _interopRequireDefault(_template);

var _textfield = require('./textfield');

var _textfield2 = _interopRequireDefault(_textfield);

var _modals = require('../modals');

var _modals2 = _interopRequireDefault(_modals);

var _navbars = require('../navbars');

var _navbars2 = _interopRequireDefault(_navbars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hideNavbar = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';

var TextfieldEditor = {
	open: function open(option) {
		var defaultOption = {
			maxLength: 17
		};
		if (!option) {
			option = defaultOption;
		} else {
			for (var p in defaultOption) {
				if (option[p] === undefined) {
					option[p] = defaultOption[p];
				}
			}
		}

		var content = _template2.default.compile('<div class="popup">' + '<div class="view">' + '<!-- Top Navbar-->' + '{{#unless hideNavbar}}' + '<div class="navbar">' + '  <div class="navbar-inner">' + '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>取消</span></a></div>' + '    <div class="center sliding">' + (option && option.title || '文字编辑') + '</div>' + '    <div class="right sliding"><a class="ok link" disabled><span>保存</span></a></div>' + '  </div>' + '</div>' + '{{/unless}}' + '<div class="pages">' + '  <!-- Page, data-page contains page name-->' + '  <div class="page text-editor-page {{#if hideNavbar}}no-navbar toolbar-through {{else}} navbar-through{{/if}}">' + '    <!-- Scrollable page content-->' + '    <div class="page-content">' + '    </div>' + '	{{#if hideNavbar}}' + '    <div class="toolbar">' + '	 	<div class="full-button-toolbar-inner toolbar-inner" >' + '   		<a class="cancel" style="width: 40%">取消</a>' + '   		<a  class="button ok button-fill"  disabled style="width: 60%">确定</a>' + '   	</div>' + '    </div>' + '	{{/if}}' + '  </div>' + '</div>' + '</div>' + '</div>')({
			hideNavbar: hideNavbar
		});

		var page, navbar, closeFn;

		if (option.showType === 'page') {
			var mainView = window.mainView = window.mainView || _views2.default.addView('.view-main', {
				// Enable Dynamic Navbar for this view
				dynamicNavbar: true
			});

			var res = window.mainView.router.loadContent(content);
			page = res[1];
			navbar = res[0];
			closeFn = function closeFn() {
				// event.preventDefault()
				mainView.back();
			};
		} else {

			var modal = _modals2.default.popup(content),
			    $modal = (0, _dom2.default)(modal);
			$modal.on('opened', function () {
				_navbars2.default.sizeNavbar(modal.querySelector('.navbar-inner'));
			});
			page = $modal.find('.page')[0];
			navbar = $modal.find('.navbar')[0];

			closeFn = function closeFn() {
				// e.preventDefault()
				_modals2.default.closeModal(modal);
			};
		}

		var bar = navbar ? (0, _dom2.default)(navbar) : (0, _dom2.default)(page).find('.toolbar');

		var onChange = function onChange(value) {
			if (value && value.trim() !== '') {
				bar.find('.ok').removeAttr('disabled');
			} else {
				bar.find('.ok').attr('disabled', 'disabled');
			}
		};
		var textfield = _reactDom2.default.render(_react2.default.createElement(_textfield2.default, { onChange: onChange, maxLength: option.maxLength, placeholder: option && option.placeholder ? option.placeholder : '', value: option && option.value ? option.value : '' }), page.querySelector('.page-content'));

		bar.on('click', '.ok:not([disabled])', function (e) {
			e.preventDefault();
			if (option.onOk) option.onOk(textfield.state.value);
			closeFn();
		});

		bar.on('click', '.cancel, .back', function (event) {
			event.preventDefault();
			closeFn();
		});
	}
};
exports.default = TextfieldEditor;