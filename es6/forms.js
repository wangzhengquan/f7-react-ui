'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = exports.Option = exports.DateField = exports.ResizableTextarea = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dom = require('react-ui/dom');

var _dom2 = _interopRequireDefault(_dom);

var _date = require('react-ui/date');

var _date2 = _interopRequireDefault(_date);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./resources/less/lists.less');
require('./resources/less/forms.less');

var resizeTextarea = function resizeTextarea(textarea) {
  textarea = (0, _dom2.default)(textarea);

  textarea.css({ 'height': '' });
  var height = textarea[0].offsetHeight;
  var diff = height - textarea[0].clientHeight;
  //
  var scrollHeight = textarea[0].scrollHeight;
  if (scrollHeight + diff > height) {
    var newAreaHeight = scrollHeight + diff;
    textarea.css('height', newAreaHeight + 'px');
  }
};

/*===============================================================================
************   DateField   ************
===============================================================================*/

var DateField = function (_React$Component) {
  _inherits(DateField, _React$Component);

  function DateField(props) {
    _classCallCheck(this, DateField);

    return _possibleConstructorReturn(this, (DateField.__proto__ || Object.getPrototypeOf(DateField)).call(this, props));
  }

  _createClass(DateField, [{
    key: 'render',
    value: function render() {
      var value = this.props.value || '';
      if (value) {
        if (typeof value === 'number') {
          value = _date2.default.format(new Date(value), this.props.format || 'yyyy-MM-dd');
        } else if (toString.call(value) === '[object Date]') {
          value = _date2.default.format(value, this.props.format || 'yyyy-MM-dd');
        }
      }
      return _react2.default.createElement('input', { type: this.props.type || 'date', placeholder: this.props.placeholder, onChange: this.props.onChange, name: this.props.name || false, style: this.props.style, value: value });
    }
  }]);

  return DateField;
}(_react2.default.Component);

/*===============================================================================
************   Resizable textarea   ************
===============================================================================*/

var ResizableTextarea = function (_React$Component2) {
  _inherits(ResizableTextarea, _React$Component2);

  function ResizableTextarea(props) {
    _classCallCheck(this, ResizableTextarea);

    var _this2 = _possibleConstructorReturn(this, (ResizableTextarea.__proto__ || Object.getPrototypeOf(ResizableTextarea)).call(this, props));

    _this2.destroyList = [];
    return _this2;
  }

  _createClass(ResizableTextarea, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroyList.forEach(function (fun) {
        fun();
      });
      this.destroyList = [];
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var textarea = _reactDom2.default.findDOMNode(this);
      // textarea = $(textarea);

      // var textareaTimeout;
      // function handleTextarea() {
      //     clearTimeout(textareaTimeout);
      //     textareaTimeout = setTimeout(function () {
      //         resizeTextarea(textarea);
      //     }, 0);
      // }
      // textarea.on('change keydown keypress keyup paste cut', handleTextarea);
      // this.destroyList.push(function () {
      //     textarea.off('change keydown keypress keyup paste cut', handleTextarea);
      // })

      resizeTextarea(textarea);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var textarea = _reactDom2.default.findDOMNode(this);
      resizeTextarea(textarea);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('textarea', { value: this.props.value || '', className: this.props.className, placeholder: this.props.placeholder, onChange: this.props.onChange });
    }
  }]);

  return ResizableTextarea;
}(_react2.default.Component);

/*===============================================================================
************   Select   ************
===============================================================================*/

var Option = function (_React$Component3) {
  _inherits(Option, _React$Component3);

  /**
   * [constructor description]
   * @param  {[type]} props [multiple, image, icon, color, name, selected]
   * @return {[type]}       [description]
   */
  function Option(props) {
    _classCallCheck(this, Option);

    return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));
  }

  _createClass(Option, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.props.onSelect && this.props.onSelect(event.target.value, event);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var inputType = _props.multiple ? 'checkbox' : 'radio';
      var optionHasMedia = _props.image || _props.icon || inputType === 'checkbox';
      var titleColor = _props.color ? 'color-' + _props.color : '';
      if (_props.type === 'label') {
        return _react2.default.createElement(
          'div',
          { className: 'item-divider' },
          _props.children
        );
      }
      return _react2.default.createElement(
        'label',
        { className: (0, _classnames2.default)('item-content', 'label-' + inputType, _props.className) },
        _react2.default.createElement('input', { type: inputType, name: _props.name, defaultValue: _props.value, onChange: this.handleChange.bind(this), defaultChecked: _props.selected ? 'checked' : false }),
        optionHasMedia ? _react2.default.createElement(
          'div',
          { className: 'item-media' },
          inputType === 'checkbox' ? _react2.default.createElement('i', { className: 'icon icon-form-checkbox' }) : '',
          _props.icon ? _react2.default.createElement('i', { className: (0, _classnames2.default)('icon', _props.icon) }) : '',
          _props.image ? _react2.default.createElement('img', { src: _props.image }) : ''
        ) : '',
        _react2.default.createElement(
          'div',
          { className: 'item-inner' },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)('item-title', titleColor) },
            _props.children
          )
        )
      );
    }
  }]);

  return Option;
}(_react2.default.Component);

var Select = function (_React$Component4) {
  _inherits(Select, _React$Component4);

  /**
   * [constructor description]
   * @param  {[type]} props [multiple : 'multiple', image, icon, color, name, selected]
   * @return {[type]}       [description]
   */
  function Select(props) {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));
  }

  _createClass(Select, [{
    key: 'render',
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement(
        'div',
        { className: 'list-block', style: this.props.style },
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.Children.map(this.props.children, function (child) {
            return _react2.default.createElement(
              'li',
              null,
              _this5.props.type === 'label' ? child : _react2.default.cloneElement(child, {
                name: _this5.props.name,
                multiple: _this5.props.multiple,
                onSelect: _this5.props.onSelect
              })
            );
          })
        )
      );
    }
  }]);

  return Select;
}(_react2.default.Component);

exports.ResizableTextarea = ResizableTextarea;
exports.DateField = DateField;
exports.Option = Option;
exports.Select = Select;