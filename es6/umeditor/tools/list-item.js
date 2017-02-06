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

var listTypes = [{ label: 'UL', style: 'insertorderedlist', icon: 'icon-unordered-list-item' }, { label: 'OL', style: 'insertunorderedlist', icon: 'icon-ordered-list-item' }];

var ListItem = function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem(props) {
    _classCallCheck(this, ListItem);

    var _this = _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));

    _this.edit = props.edit;
    return _this;
  }

  _createClass(ListItem, [{
    key: 'handleChangeListItem',
    value: function handleChangeListItem(value) {
      // var commandState = this.state.commandState
      // commandState[value] = this.doc.queryCommandState(value)
      // this.setState(commandState)

      this.edit.execCommand(value);
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
          '\u9879\u76EE\u7B26\u5408/\u7F16\u53F7'
        ),
        _react2.default.createElement(
          'div',
          { className: 'tool-buttons' },
          listTypes.map(function (item) {
            return _react2.default.createElement(
              'div',
              { className: (0, _classnames2.default)('btn common-btn', { active: false }), key: item.style },
              _react2.default.createElement('input', { type: 'radio', value: item.style, name: 'justify', onChange: _this2.handleChangeListItem.bind(_this2, item.style) }),
              _react2.default.createElement('i', { className: (0, _classnames2.default)('icon', item.icon) })
            );
          })
        )
      );
    }
  }]);

  return ListItem;
}(_react2.default.Component);

exports.default = ListItem;