'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _views = require('react-ui/views');

var _views2 = _interopRequireDefault(_views);

var _dom = require('react-ui/dom');

var _dom2 = _interopRequireDefault(_dom);

var _template = require('react-ui/template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../resources/less/forms.less');
require('../resources/less/widget/textarea-editor.less');

var hideNavbar = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';

var EditorArea = function (_React$Component) {
	_inherits(EditorArea, _React$Component);

	function EditorArea(props) {
		_classCallCheck(this, EditorArea);

		var _this = _possibleConstructorReturn(this, (EditorArea.__proto__ || Object.getPrototypeOf(EditorArea)).call(this, props));

		_this.state = {
			value: _this.props.value
		};
		return _this;
	}

	_createClass(EditorArea, [{
		key: 'handleChange',
		value: function handleChange(event) {
			var value = event.target.value;
			this.setState({ value: value });
			this.props.onChange && this.props.onChange(value);
			// setTimeout(() => console.log("area state value====", this.state.value), 1000 )
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('textarea', { className: 'editor-area', maxLength: this.props.maxLength, value: this.state.value, onChange: this.handleChange.bind(this) });
		}
	}]);

	return EditorArea;
}(_react2.default.Component);

var TextAreaEditorView = {
	open: function open(option) {
		var defaultOption = {
			maxLength: 2000
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
		window.mainView = window.mainView || _views2.default.addView('.view-main', {
			// Enable Dynamic Navbar for this view
			dynamicNavbar: true
		});

		var res = window.mainView.router.loadContent(_template2.default.compile('<div class="view">' + '<!-- Top Navbar-->' + '{{#unless hideNavbar}}' + '<div class="navbar">' + '  <div class="navbar-inner">' + '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a></div>' + '    <div class="center sliding">' + (option && option.title || '文字编辑') + '</div>' + '    <div class="right sliding">' + '      <a class="ok link" disabled><span>确定</span></a>' + '    </div>' + '  </div>' + '</div>' + '{{/unless}}' + '<div class="pages">' + '  <!-- Page, data-page contains page name-->' + '  <div class="page textarea-editor-page {{#if hideNavbar}}no-navbar toolbar-through {{else}} navbar-through{{/if}}">' + '    <!-- Scrollable page content-->' + '    <div class="page-content"></div>' + '	{{#if hideNavbar}}' + '    <div class="toolbar">' + '	 	<div class="full-button-toolbar-inner toolbar-inner" >' + '   		<a class="cancel" style="width: 40%">取消</a>' + '   		<a  class="button ok button-fill"  disabled style="width: 60%">确定</a>' + '   	</div>' + '    </div>' + '	{{/if}}' + '  </div>' + '</div>' + '</div>')({
			hideNavbar: hideNavbar
		}));

		var page = res[1];
		var navbar = res[0];
		var bar = navbar ? (0, _dom2.default)(navbar) : (0, _dom2.default)(page).find('.toolbar');

		var onChange = function onChange(value) {
			if (value && value.trim() !== '') {
				bar.find('.ok').removeAttr('disabled');
			} else {
				bar.find('.ok').attr('disabled', 'disabled');
			}
		};
		var editorArea = _reactDom2.default.render(_react2.default.createElement(EditorArea, { onChange: onChange, maxLength: option.maxLength, value: option && option.value ? option.value : '' }), page.querySelector('.page-content'));
		var onOk = function onOk(event) {
			var isLink = event.target.nodeName.toLowerCase() === 'a';
			if (isLink) event.preventDefault();

			var value = editorArea.state.value;
			if (value.length > option.maxLength) {
				alert('输入字符长度不能大于' + option.maxLength);
				return;
			}
			if (option.onOk) option.onOk(editorArea.state.value);
			(0, _dom2.default)(page).trigger('ok', { value: editorArea.state.value });
			window.mainView.back();
		};

		var onCancel = function onCancel(event) {
			event.preventDefault();
			window.mainView.back();
		};
		bar.on('click', '.cancel', onCancel);
		bar.on('click', '.ok:not([disabled])', onOk);

		return res;
	}
};
exports.default = TextAreaEditorView;