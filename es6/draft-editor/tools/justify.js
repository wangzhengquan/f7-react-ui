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

var justifyList = ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];
var justifyIcons = {
  justifyLeft: 'icon-justify-left',
  justifyCenter: 'icon-justify-center',
  justifyRight: 'icon-justify-right',
  justifyFull: 'icon-justify-full'
};

var Justify = function (_React$Component) {
  _inherits(Justify, _React$Component);

  function Justify(props) {
    _classCallCheck(this, Justify);

    var _this = _possibleConstructorReturn(this, (Justify.__proto__ || Object.getPrototypeOf(Justify)).call(this, props));

    _this.doc = document;
    _this.state = {
      commandState: {}
    };
    _this.destroyList = [];
    return _this;
  }

  _createClass(Justify, [{
    key: 'destroy',
    value: function destroy() {
      this.destroyList.forEach(function (fun) {
        fun();
      });
    }
  }, {
    key: 'handleChangeJustify',
    value: function handleChangeJustify(value) {
      // var commandState = this.state.commandState
      // commandState[value] = this.doc.queryCommandState(value)
      // this.setState(commandState)

      this.doc.execCommand(value);
      // this.updateCommandState()
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
          '\u5BF9\u9F50'
        ),
        _react2.default.createElement(
          'div',
          { className: 'tool-buttons' },
          justifyList.map(function (value) {
            return _react2.default.createElement(
              'div',
              { className: (0, _classnames2.default)('btn common-btn justify-btn', { 'active': _this2.state.commandState[value] }), key: value },
              _react2.default.createElement('input', { type: 'radio', value: value, name: 'justify', onChange: _this2.handleChangeJustify.bind(_this2, value) }),
              _react2.default.createElement('i', { className: (0, _classnames2.default)('icon', justifyIcons[value]) })
            );
          })
        )
      );
    }
  }]);

  return Justify;
}(_react2.default.Component);

module.exports = Justify;