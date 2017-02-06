'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fontSizeStyleMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../../resources/less/scroll.less');
var prefix = 'fontSize';
var fontsizeList = [12, 16, 18, 24, 32, 48];
var fontSizeStyleMap = function () {
  return fontsizeList.reduce(function (res, item) {

    res[prefix + item] = {
      'fontSize': item + 'px'
    };
    return res;
  }, {});
}();

var FontSize = function (_React$Component) {
  _inherits(FontSize, _React$Component);

  function FontSize(props) {
    _classCallCheck(this, FontSize);

    var _this = _possibleConstructorReturn(this, (FontSize.__proto__ || Object.getPrototypeOf(FontSize)).call(this, props));

    _this.edit = props.edit;
    _this.state = {};
    return _this;
  }

  _createClass(FontSize, [{
    key: 'handleChangeFontSize',
    value: function handleChangeFontSize(value) {

      this.setState({
        value: value
      });
      this.edit.toggleFontSize(prefix + value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'tool-block' },
        _react2.default.createElement(
          'div',
          { className: 'tool-name' },
          '\u5B57\u4F53\u5927\u5C0F'
        ),
        _react2.default.createElement(
          'div',
          { className: 'tool-buttons xscroll' },
          _react2.default.createElement(
            'div',
            { className: 'tool-buttons-inner scroll-inner' },
            fontsizeList.map(function (value) {
              return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('btn common-btn', { 'active': _this2.edit.state.editorState.getCurrentInlineStyle().has(prefix + value) }), key: value, style: { padding: '0 10px' } },
                _react2.default.createElement('input', { type: 'radio', value: value, name: 'fontsize', onChange: _this2.handleChangeFontSize.bind(_this2, value) }),
                value,
                'px'
              );
            })
          )
        )
      );
    }
  }]);

  return FontSize;
}(_react2.default.Component);

exports.fontSizeStyleMap = fontSizeStyleMap;
exports.default = FontSize;