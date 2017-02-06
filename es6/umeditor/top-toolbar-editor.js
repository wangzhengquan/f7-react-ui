'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _editor = require('./editor');

var _editor2 = _interopRequireDefault(_editor);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactContenteditable = require('react-contenteditable');

var _reactContenteditable2 = _interopRequireDefault(_reactContenteditable);

var _insertImage = require('./tools/insert-image');

var _insertImage2 = _interopRequireDefault(_insertImage);

var _link = require('./tools/link');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import FontSize from './tools/font-size'
// import FontColor from './tools/font-color'
// import BackColor from './tools/back-color'
// import FontShape from './tools/font-shape'
// import FontFamily from './tools/font-family'
// import Justify from './tools/justify'

// import ListItem from './tools/list-item'
// import HeadLine from './tools/headline'


require('../resources/less/editor/top-toolbar.less');
require('../resources/less/editor/rich-editor.less');

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

    _this.handlers = _this.props.handlers || {};

    return _this;
  }

  _createClass(Toolbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'toolbar editor-toolbar tabbar' },
        _react2.default.createElement(
          'div',
          { className: 'toolbar-inner' },
          _react2.default.createElement(_insertImage2.default, { handler: this.handlers['image'], edit: this.props.edit }),
          _react2.default.createElement(_link.CreateLink, { edit: this.props.edit })
        )
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

var DefaultEditor = function (_Editor) {
  _inherits(DefaultEditor, _Editor);

  function DefaultEditor(props) {
    _classCallCheck(this, DefaultEditor);

    var _this2 = _possibleConstructorReturn(this, (DefaultEditor.__proto__ || Object.getPrototypeOf(DefaultEditor)).call(this, props));

    _this2.state = {
      value: _this2.props.value || ''
    };
    return _this2;
  }

  _createClass(DefaultEditor, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: Object.assign({}, styles.editorWrapper) },
        _react2.default.createElement(Toolbar, { edit: this, handlers: this.props.handlers }),
        _react2.default.createElement(
          'div',
          { className: 'rich-editor', ref: 'editor' },
          _react2.default.createElement(_reactContenteditable2.default, { className: 'rich-editor-area',
            html: this.state.value // innerHTML of the editable div 
            , disabled: false // use true to disable edition 
            , onChange: this.handleChange.bind(this) // handle innerHTML change 
          })
        )
      );
    }
  }]);

  return DefaultEditor;
}(_editor2.default);

var styles = {
  editorWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden'

  }
};

exports.default = DefaultEditor;