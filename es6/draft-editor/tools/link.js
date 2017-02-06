'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveLink = exports.CreateLink = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _textfieldEditor = require('../../widget/textfield-editor');

var _textfieldEditor2 = _interopRequireDefault(_textfieldEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateLink = function (_React$Component) {
  _inherits(CreateLink, _React$Component);

  function CreateLink(props) {
    _classCallCheck(this, CreateLink);

    var _this = _possibleConstructorReturn(this, (CreateLink.__proto__ || Object.getPrototypeOf(CreateLink)).call(this, props));

    _this.edit = props.edit;
    _this.state = {};
    return _this;
  }

  _createClass(CreateLink, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'handleCreateLink',
    value: function handleCreateLink(event) {
      var _this2 = this;

      event.preventDefault();
      var editorState = this.edit.state.editorState;

      var selection = editorState.getSelection();
      if (selection.isCollapsed()) {
        alert('请选择加超链接的文本');
        return;
      }
      _textfieldEditor2.default.open({
        title: '填写链接地址',
        showType: 'popup',
        onOk: function onOk(val) {
          _this2.edit.createLink(val);
        }
      });
      // this.doc.execCommand('insertHTML', false, '<div style="width: 100%;"><img width="100%" src="'+url+'""></div>');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        { className: 'tab-link', onClick: this.handleCreateLink.bind(this) },
        _react2.default.createElement('i', { className: 'icon icon-link' })
      );
    }
  }]);

  return CreateLink;
}(_react2.default.Component);

var RemoveLink = function (_React$Component2) {
  _inherits(RemoveLink, _React$Component2);

  function RemoveLink(props) {
    _classCallCheck(this, RemoveLink);

    var _this3 = _possibleConstructorReturn(this, (RemoveLink.__proto__ || Object.getPrototypeOf(RemoveLink)).call(this, props));

    _this3.edit = props.edit;
    _this3.state = {};
    return _this3;
  }

  _createClass(RemoveLink, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'handleRemoveLink',
    value: function handleRemoveLink(event) {
      event.preventDefault();
      this.edit.removeLink();
      // this.doc.execCommand('insertHTML', false, '<div style="width: 100%;"><img width="100%" src="'+url+'""></div>');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        { className: 'tab-link', onClick: this.handleRemoveLink.bind(this) },
        _react2.default.createElement('i', { className: 'icon icon-unlink', style: { width: '25px', height: '25px' } })
      );
    }
  }]);

  return RemoveLink;
}(_react2.default.Component);

exports.CreateLink = CreateLink;
exports.RemoveLink = RemoveLink;
exports.default = CreateLink;