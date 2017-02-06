'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dom = require('../dom');

var _dom2 = _interopRequireDefault(_dom);

var _tabs = require('react-ui/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _fontSize = require('./tools/font-size');

var _fontSize2 = _interopRequireDefault(_fontSize);

var _fontColor = require('./tools/font-color');

var _fontColor2 = _interopRequireDefault(_fontColor);

var _fontShape = require('./tools/font-shape');

var _fontShape2 = _interopRequireDefault(_fontShape);

var _fontFamily = require('./tools/font-family');

var _fontFamily2 = _interopRequireDefault(_fontFamily);

var _justify = require('./tools/justify');

var _justify2 = _interopRequireDefault(_justify);

var _insertImage = require('./tools/insert-image');

var _insertImage2 = _interopRequireDefault(_insertImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

    _this.doc = document;
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      new _tabs2.default({ tabbar: this.refs.tabbar });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'div',
          { className: 'toolbar' },
          _react2.default.createElement(
            'div',
            { className: 'toolbar-inner' },
            _react2.default.createElement(
              'div',
              { className: 'center' },
              _react2.default.createElement(_insertImage2.default, { edit: this.props.edit })
            ),
            _react2.default.createElement(
              'div',
              { className: 'right' },
              _react2.default.createElement(
                'a',
                { href: '#', onClick: this.props.onClickSwitch, className: 'link' },
                _react2.default.createElement('i', { className: 'icon icon-picker-switch' })
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'picker-modal-inner' },
          _react2.default.createElement(
            'div',
            { className: 'tabbar tool-tabbar left', ref: 'tabbar' },
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
              _react2.default.createElement(_fontColor2.default, { edit: this.props.edit })
            ),
            _react2.default.createElement(
              'div',
              { id: 'tab-font-family', className: 'content-block scroll tab' },
              _react2.default.createElement(_fontFamily2.default, { edit: this.props.edit })
            ),
            _react2.default.createElement(
              'div',
              { id: 'tab-paragraph', className: 'content-block scroll tab' },
              _react2.default.createElement(_justify2.default, { edit: this.props.edit })
            )
          )
        )
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

Toolbar.init = function (edit) {
  var modal = (0, _dom2.default)('<div class="picker-modal editor-toolbar-modal"></div>');
  (0, _dom2.default)('body').append(modal[0]);
  var onClickSwitch = function onClickSwitch() {
    if (modal.hasClass('modal-in')) {
      modal.removeClass('modal-in').addClass('modal-out');
    } else {
      modal.removeClass('modal-out').addClass('modal-in');
    }
  };
  _reactDom2.default.render(_react2.default.createElement(Toolbar, { onClickSwitch: onClickSwitch, edit: edit }), modal[0]);
};

module.exports = Toolbar;