'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// var fontShapList = ['bold', 'italic', 'underline']

var fontShapList = [{ label: 'bold', style: 'BOLD' }, { label: 'italic', style: 'ITALIC' }, { label: 'underline', style: 'UNDERLINE' }];

var FontShape = function (_React$Component) {
  _inherits(FontShape, _React$Component);

  function FontShape(props) {
    _classCallCheck(this, FontShape);

    var _this = _possibleConstructorReturn(this, (FontShape.__proto__ || Object.getPrototypeOf(FontShape)).call(this, props));

    _this.edit = props.edit;

    return _this;
  }

  _createClass(FontShape, [{
    key: 'handleClickFontBtn',
    value: function handleClickFontBtn(cmd, e) {
      e.preventDefault();
      this.props.edit.toggleInlineStyle(cmd);
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
          '\u5B57\u5F62'
        ),
        _react2.default.createElement(
          'div',
          { className: 'tool-buttons' },
          fontShapList.map(function (item) {
            return _react2.default.createElement(
              'a',
              { key: item.style, className: (0, _classnames2.default)('btn font-shape-btn common-btn', { 'active': _this2.edit.state.editorState.getCurrentInlineStyle().has(item.style) }), onClick: _this2.handleClickFontBtn.bind(_this2, item.style) },
              _react2.default.createElement('i', { className: 'icon ' + 'icon-' + item.label })
            );
          })
        )
      );
    }
  }]);

  return FontShape;
}(_react2.default.Component);

module.exports = FontShape;