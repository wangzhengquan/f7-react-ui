'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactTransitionGroup = require('react/lib/ReactTransitionGroup');

var _ReactTransitionGroup2 = _interopRequireDefault(_ReactTransitionGroup);

var _reactUi = require('./react-ui');

var _reactUi2 = _interopRequireDefault(_reactUi);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_React$Component) {
  _inherits(View, _React$Component);

  function View(props) {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, props));
  }

  _createClass(View, [{
    key: 'render',
    value: function render() {
      var navbar = this.props.navbar;
      var page = this.props.page;
      var toolbar = this.props.toolbar;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('view view-main', this.props.className) },
        _react2.default.createElement(
          _ReactTransitionGroup2.default,
          { component: 'div', className: (0, _classnames2.default)('navbar', { 'navbar-hidden': !!!navbar }) },
          navbar ? _react2.default.cloneElement(navbar, {
            key: this.props.location ? this.props.location.pathname.concat('/navbar') : _reactUi2.default.guid(),
            pageName: location.pathname === '/' ? 'index' : location.pathname.charAt(0) === '/' ? location.pathname.substring(1) : location.pathname
          }) : ''
        ),
        _react2.default.createElement(
          _ReactTransitionGroup2.default,
          { className: (0, _classnames2.default)('pages'), component: 'div' },
          _react2.default.cloneElement(page, {
            className: { 'navbar-through': !!navbar, 'toolbar-through': !!toolbar, 'tabbar-labels-through': !!toolbar },
            key: this.props.location ? this.props.location.pathname : _reactUi2.default.guid(),
            pageName: location.pathname === '/' ? 'index' : location.pathname.charAt(0) === '/' ? location.pathname.substring(1) : location.pathname
          })
        ),
        toolbar ? toolbar : ''
      );
    }
  }]);

  return View;
}(_react2.default.Component);

module.exports = View;