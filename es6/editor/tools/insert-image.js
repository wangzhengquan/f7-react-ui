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

var InsertImage = function (_React$Component) {
  _inherits(InsertImage, _React$Component);

  function InsertImage(props) {
    _classCallCheck(this, InsertImage);

    var _this = _possibleConstructorReturn(this, (InsertImage.__proto__ || Object.getPrototypeOf(InsertImage)).call(this, props));

    _this.doc = document;
    _this.state = {};
    return _this;
  }

  _createClass(InsertImage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'handleInsertImage',
    value: function handleInsertImage(event) {
      debugger;
      var files = [].slice.call(event.target.files, 0),
          file = files[0];
      event.target.value = '';
      var url = URL.createObjectURL(file);
      this.doc.execCommand('insertHTML', false, '<div style="width: 100%;"><img width="100%" src="' + url + '""></div>');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'link' },
        _react2.default.createElement('i', { className: 'icon icon-insert-img' }),
        _react2.default.createElement('input', { type: 'file', onChange: this.handleInsertImage.bind(this) })
      );
    }
  }]);

  return InsertImage;
}(_react2.default.Component);

module.exports = InsertImage;