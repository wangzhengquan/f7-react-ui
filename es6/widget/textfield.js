'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../resources/less/forms.less');
require('../resources/less/widget/textfield.less');

var TextField = function (_React$Component) {
  _inherits(TextField, _React$Component);

  function TextField(props) {
    _classCallCheck(this, TextField);

    var _this = _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this, props));

    _this.state = {
      value: _this.props.value
    };
    return _this;
  }

  _createClass(TextField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.refs.input.focus();
      }, 500);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      var value = event.target.value;
      this.setState({ value: value });
      this.props.onChange && this.props.onChange(value);
      // setTimeout(() => console.log("area state value====", this.state.value), 1000 )
    }
  }, {
    key: 'handleClear',
    value: function handleClear(event) {
      event.preventDefault();
      this.setState({
        value: ''
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { marginTop: '10px' } },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('textfield', { 'textfield-not-empty': !!this.state.value }) },
          _react2.default.createElement('input', { type: 'text', ref: 'input', value: this.state.value, maxLength: this.props.maxLength, onChange: this.handleChange.bind(this), placeholder: this.props.placeholder || '' }),
          _react2.default.createElement('a', { className: 'textfield-clear', onClick: this.handleClear.bind(this) })
        )
      );
    }
  }]);

  return TextField;
}(_react2.default.Component);

exports.default = TextField;