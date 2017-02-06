'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _modals = require('../../modals');

var _modals2 = _interopRequireDefault(_modals);

var _lists = require('../../lists');

var _lists2 = _interopRequireDefault(_lists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../plugins/font.js');
require('../../resources/less/forms.less');
require('../../resources/less/scroll.less');
var fontsizeList = [{
  value: '12px',
  label: '12px'
}, {
  value: '16px',
  label: '16px'
}, {
  value: '18px',
  label: '18px'
}, {
  value: '24px',
  label: '24px'
}, {
  value: '32px',
  label: '32px'
}, {
  value: '48px',
  label: '48px'
}];

var FontSizeList = function (_React$Component) {
  _inherits(FontSizeList, _React$Component);

  function FontSizeList(props) {
    _classCallCheck(this, FontSizeList);

    var _this = _possibleConstructorReturn(this, (FontSizeList.__proto__ || Object.getPrototypeOf(FontSizeList)).call(this, props));

    _this.edit = props.edit;
    _this.state = {
      value: props.value
    };
    return _this;
  }

  _createClass(FontSizeList, [{
    key: 'handleChange',
    value: function handleChange(val) {
      this.setState({
        value: val
      });
      this.props.onChange(val);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'div',
          { className: 'toolbar' },
          _react2.default.createElement(
            'div',
            { className: 'toolbar-inner' },
            _react2.default.createElement('div', { className: 'left' }),
            _react2.default.createElement(
              'div',
              { className: 'right' },
              _react2.default.createElement(
                'a',
                { href: '#', onClick: this.props.onClose, className: 'link close-picker' },
                'Done'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'picker-modal-inner  y-scroll' },
          _react2.default.createElement(
            _lists2.default,
            { className: 'font-size-list', style: { width: '100%', margin: '0' } },
            fontsizeList.map(function (item) {
              return _react2.default.createElement(
                'label',
                { className: 'label-radio item-content', style: { fontFamily: item.value + 'px' }, key: item.value },
                _react2.default.createElement('input', { type: 'radio', name: 'font-size-radio', value: item.value, checked: _this2.state.value === item.value, onChange: _this2.handleChange.bind(_this2, item.value) }),
                _react2.default.createElement(
                  'div',
                  { className: 'item-inner' },
                  _react2.default.createElement(
                    'div',
                    { className: 'item-title' },
                    item.label
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);

  return FontSizeList;
}(_react2.default.Component);

var FontSize = function (_React$Component2) {
  _inherits(FontSize, _React$Component2);

  function FontSize(props) {
    _classCallCheck(this, FontSize);

    var _this3 = _possibleConstructorReturn(this, (FontSize.__proto__ || Object.getPrototypeOf(FontSize)).call(this, props));

    _this3.edit = props.edit;
    _this3.state = {
      value: _this3.edit.queryCommandState('fontsize')
    };
    _this3.edit.addListener('selectionchange', function () {
      _this3.setState({
        value: _this3.edit.queryCommandState('fontsize')
      });
      // $btn.edui().disabled(state == -1).active(state == 1)
    });

    return _this3;
  }

  _createClass(FontSize, [{
    key: 'handleChangeFontSize',
    value: function handleChangeFontSize(value) {

      this.setState({
        value: value
      });
      this.edit.execCommand('fontsize', value);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      var _this4 = this;

      e.preventDefault();

      var modal = _modals2.default.pickerModal();
      var closeModal = function closeModal(e) {
        e.preventDefault();
        _modals2.default.closeModal(modal);
      };

      var onChange = function onChange(val) {
        _this4.handleChangeFontSize(val);
        _modals2.default.closeModal(modal);
      };
      _reactDom2.default.render(_react2.default.createElement(FontSizeList, { value: this.state.value, onChange: onChange, onClose: closeModal }), modal);
    }
  }, {
    key: 'render_',
    value: function render_() {
      var _this5 = this;

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
                'a',
                { onClick: _this5.handleChangeFontSize.bind(_this5, value), className: (0, _classnames2.default)('btn common-btn', { 'active': false }), key: value, style: { padding: '0 10px' } },
                value,
                'px'
              );
            })
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        { className: 'tab-link', onClick: this.handleClick.bind(this) },
        '\u5B57\u53F7'
      );
    }
  }]);

  return FontSize;
}(_react2.default.Component);

exports.default = FontSize;