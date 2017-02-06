'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import classnames from 'classnames'
require('../plugins/inserthtml.js');
require('../plugins/image.js');

var InsertImage = function (_React$Component) {
  _inherits(InsertImage, _React$Component);

  function InsertImage(props) {
    _classCallCheck(this, InsertImage);

    var _this = _possibleConstructorReturn(this, (InsertImage.__proto__ || Object.getPrototypeOf(InsertImage)).call(this, props));

    _this.edit = props.edit;
    _this.state = {};
    return _this;
  }

  _createClass(InsertImage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'handleInsertImage',
    value: function handleInsertImage(event) {
      var _this2 = this;

      var files = [].slice.call(event.target.files, 0),
          file = files[0];
      event.target.value = '';

      if (this.props.handler) {
        this.props.handler(file, function (url) {
          _this2.edit.execCommand('insertimage', {
            src: url,
            width: '100%'
          }, _this2, event);
        });
      } else {
        this.edit.execCommand('insertimage', {
          src: URL.createObjectURL(file),
          width: '100%'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        { className: 'tab-link input-button' },
        _react2.default.createElement(
          'svg',
          { viewBox: '0 0 18 18' },
          ' ',
          _react2.default.createElement('rect', { className: 'ql-stroke', height: '10', width: '12', x: '3', y: '4' }),
          ' ',
          _react2.default.createElement('circle', { className: 'ql-fill', cx: '6', cy: '7', r: '1' }),
          ' ',
          _react2.default.createElement('polyline', { className: 'ql-even ql-fill', points: '5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12' }),
          ' '
        ),
        _react2.default.createElement('input', { type: 'file', accept: 'image/*', onChange: this.handleInsertImage.bind(this) })
      );
    }
  }]);

  return InsertImage;
}(_react2.default.Component);

exports.default = InsertImage;