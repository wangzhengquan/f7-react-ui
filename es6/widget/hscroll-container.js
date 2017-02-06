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

require('../resources/less/widget/hscroll-container.less');

var HScrollContainer = function (_React$Component) {
  _inherits(HScrollContainer, _React$Component);

  function HScrollContainer(props) {
    _classCallCheck(this, HScrollContainer);

    return _possibleConstructorReturn(this, (HScrollContainer.__proto__ || Object.getPrototypeOf(HScrollContainer)).call(this, props));
  }

  _createClass(HScrollContainer, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('hscroll-container no-scrollbar', this.props.className) },
        _react2.default.createElement(
          'div',
          { className: 'hscroll-content' },
          this.props.children && this.props.children.map(function (child, index) {
            return _react2.default.createElement(
              'div',
              { className: 'hscroll-item', key: index },
              child
            );
          })
        )
      );
    }
  }]);

  return HScrollContainer;
}(_react2.default.Component);

exports.default = HScrollContainer;