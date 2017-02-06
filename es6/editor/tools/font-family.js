'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lists = require('../../lists');

var _lists2 = _interopRequireDefault(_lists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../../resources/less/forms.less');

var fontFamilyList = [{ name: '宋体', value: '宋体,SimSun' }, { name: '微软雅黑', value: '微软雅黑,Microsoft YaHei' }, { name: '楷体', value: '楷体,楷体_GB2312, SimKai' }, { name: '黑体', value: '黑体, SimHei' }, { name: '隶书', value: '隶书, SimLi' }, { name: 'andale mono', value: 'andale mono' }, { name: 'arial', value: 'arial, helvetica,sans-serif' }, { name: 'arial black', value: 'arial black,avant garde' }, { name: 'comic sans ms', value: 'comic sans ms' }, { name: 'impact', value: 'impact,chicago' }, { name: 'timesNewRoman', value: 'times new roman' }, { name: 'sans-serif', value: 'sans-serif' }];

var FontFamily = function (_React$Component) {
  _inherits(FontFamily, _React$Component);

  function FontFamily(props) {
    _classCallCheck(this, FontFamily);

    var _this = _possibleConstructorReturn(this, (FontFamily.__proto__ || Object.getPrototypeOf(FontFamily)).call(this, props));

    _this.doc = document;
    _this.state = {};
    return _this;
  }

  _createClass(FontFamily, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'handleChangeFontFamily',
    value: function handleChangeFontFamily(val) {
      this.setState({
        value: val
      });
      this.doc.execCommand('fontName', false, val);
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
          '\u5B57\u4F53'
        ),
        _react2.default.createElement(
          'div',
          { className: 'tool-buttons scroll' },
          _react2.default.createElement(
            'div',
            { className: 'tool-buttons-inner scroll-inner' },
            _react2.default.createElement(
              _lists2.default,
              { className: 'font-family-list', style: { width: '100%', margin: '0', borderRadius: '5px' } },
              fontFamilyList.map(function (item) {
                return _react2.default.createElement(
                  'label',
                  { className: 'label-radio item-content', style: { fontFamily: item.value }, key: item.value },
                  _react2.default.createElement('input', { type: 'radio', name: 'ks-radio', value: item.value, checked: _this2.state.value === item.value, onChange: _this2.handleChangeFontFamily.bind(_this2, item.value) }),
                  _react2.default.createElement(
                    'div',
                    { className: 'item-inner' },
                    _react2.default.createElement(
                      'div',
                      { className: 'item-title' },
                      item.name
                    )
                  )
                );
              })
            )
          )
        )
      );
    }
  }]);

  return FontFamily;
}(_react2.default.Component);

module.exports = FontFamily;