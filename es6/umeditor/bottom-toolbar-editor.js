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

var _tabs = require('react-ui/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _fontSize = require('./tools/font-size');

var _fontSize2 = _interopRequireDefault(_fontSize);

var _fontColor = require('./tools/font-color');

var _fontColor2 = _interopRequireDefault(_fontColor);

var _backColor = require('./tools/back-color');

var _backColor2 = _interopRequireDefault(_backColor);

var _fontShape = require('./tools/font-shape');

var _fontShape2 = _interopRequireDefault(_fontShape);

var _fontFamily = require('./tools/font-family');

var _fontFamily2 = _interopRequireDefault(_fontFamily);

var _insertImage = require('./tools/insert-image');

var _insertImage2 = _interopRequireDefault(_insertImage);

var _listItem = require('./tools/list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _headline = require('./tools/headline');

var _headline2 = _interopRequireDefault(_headline);

var _link = require('./tools/link');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Justify from './tools/justify'


require('../resources/less/editor/bottom-toolbar.less');
require('../resources/less/editor/umeditor.less');

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    // this.doc = document
    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

    _this.state = {
      collapse: true
    };
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      new _tabs2.default({ tabbar: this.refs.tabbar });
    }
  }, {
    key: 'handleClickSwitch',
    value: function handleClickSwitch(e) {
      var _this2 = this;

      e.preventDefault();
      this.setState({
        collapse: !this.state.collapse
      }, function () {
        _this2.props.onCollapse && _this2.props.onCollapse(_this2.state.collapse);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'picker-modal editor-toolbar-modal ' + (this.state.collapse ? 'modal-out' : 'modal-in') },
        _react2.default.createElement(
          'div',
          { className: 'toolbar editor-toolbar tabbar' },
          _react2.default.createElement(
            'div',
            { className: 'toolbar-inner' },
            _react2.default.createElement(_insertImage2.default, { uploadFileFn: this.props.uploadFileFn, edit: this.props.edit }),
            _react2.default.createElement(_link.CreateLink, { edit: this.props.edit }),
            _react2.default.createElement(_link.RemoveLink, { edit: this.props.edit })
          ),
          _react2.default.createElement(
            'a',
            { href: '#', className: 'switch', onClick: this.handleClickSwitch.bind(this) },
            _react2.default.createElement('i', { className: 'icon icon-picker-switch' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'picker-modal-inner' },
          _react2.default.createElement(
            'div',
            { className: 'tools-tabbar left', ref: 'tabbar' },
            _react2.default.createElement(
              'a',
              { href: '#tab-font', className: 'tab-link active' },
              _react2.default.createElement('i', { className: 'icon icon-font' })
            ),
            _react2.default.createElement(
              'a',
              { href: '#tab-font-family', className: 'tab-link' },
              _react2.default.createElement('i', { className: 'icon icon-font-family' })
            ),
            _react2.default.createElement(
              'a',
              { href: '#tab-paragraph', className: 'tab-link' },
              _react2.default.createElement('i', { className: 'icon icon-paragraph' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'center tabs' },
            _react2.default.createElement(
              'div',
              { id: 'tab-font', className: 'content-block scroll tab active' },
              _react2.default.createElement(_fontSize2.default, { edit: this.props.edit }),
              _react2.default.createElement(_fontShape2.default, { edit: this.props.edit }),
              _react2.default.createElement(_fontColor2.default, { edit: this.props.edit }),
              _react2.default.createElement(_backColor2.default, { edit: this.props.edit })
            ),
            _react2.default.createElement(
              'div',
              { id: 'tab-font-family', className: 'content-block scroll tab' },
              _react2.default.createElement(_fontFamily2.default, { edit: this.props.edit })
            ),
            _react2.default.createElement(
              'div',
              { id: 'tab-paragraph', className: 'content-block scroll tab' },
              _react2.default.createElement(_listItem2.default, { edit: this.props.edit }),
              _react2.default.createElement(_headline2.default, { edit: this.props.edit })
            )
          )
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

    var _this3 = _possibleConstructorReturn(this, (DefaultEditor.__proto__ || Object.getPrototypeOf(DefaultEditor)).call(this, props));

    _this3.state = {
      html: '<p>Hello <i>World</i></p>',
      collapsed: true
    };
    return _this3;
  }

  _createClass(DefaultEditor, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: Object.assign({}, styles.editorWrapper, { paddingBottom: this.state.collapsed ? '44px' : '260px' }) },
        _react2.default.createElement(
          'div',
          { className: 'umeditor', ref: 'editor' },
          _react2.default.createElement(_reactContenteditable2.default, { className: 'umeditor-area',
            html: this.state.html // innerHTML of the editable div 
            , disabled: false // use true to disable edition 
            , onChange: this.handleChange.bind(this) // handle innerHTML change 
          })
        ),
        _react2.default.createElement(Toolbar, { edit: this, uploadFileFn: this.props.uploadFileFn, onCollapse: this.handleCollapse.bind(this) })
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