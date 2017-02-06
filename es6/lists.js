'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListGroupTitle = exports.ItemDivider = exports.List = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./resources/less/lists.less');

var List = function (_React$Component) {
  _inherits(List, _React$Component);

  function List(props) {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));
  }

  _createClass(List, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('list-block', this.props.className), style: this.props.style },
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.Children.map(this.props.children, function (child) {
            if (child.type === 'li') {
              return child;
            }
            return _react2.default.createElement(
              'li',
              null,
              child
            );
          })
        )
      );
    }
  }]);

  return List;
}(_react2.default.Component);

var ItemDivider = function ItemDivider(props) {
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)('item-divider', props.className) },
    props.children
  );
};

var ListGroupTitle = function ListGroupTitle(props) {
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)('list-group-title', props.className) },
    props.children
  );
};

exports.List = List;
exports.ItemDivider = ItemDivider;
exports.ListGroupTitle = ListGroupTitle;
exports.default = List;