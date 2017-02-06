'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lists = require('../../lists');

var _lists2 = _interopRequireDefault(_lists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../../resources/less/forms.less');

var headLineList = [{ label: 'AaBb(正文)', value: 'p' }, { label: 'AaBb(标题一)', value: 'h1' }, { label: 'AaBb(标题二)', value: 'h2' }, { label: 'AaBb(标题三)', value: 'h3' }, { label: 'AaBb(标题四)', value: 'h4' }];

var HeadLine = function (_React$Component) {
  _inherits(HeadLine, _React$Component);

  function HeadLine(props) {
    _classCallCheck(this, HeadLine);

    var _this = _possibleConstructorReturn(this, (HeadLine.__proto__ || Object.getPrototypeOf(HeadLine)).call(this, props));

    _this.edit = props.edit;
    _this.state = {
      value: props.value
    };
    return _this;
  }

  _createClass(HeadLine, [{
    key: 'handleChange',
    value: function handleChange(val) {
      this.setState({
        value: val
      });
      this.edit.execCommand('paragraph', val);
      // $('.public-DraftEditor-content[contenteditable=true]')[0].blur()
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
          '\u6837\u5F0F'
        ),
        _react2.default.createElement(
          'div',
          { className: 'tool-buttons scroll' },
          _react2.default.createElement(
            'div',
            { className: 'tool-buttons-inner scroll-inner' },
            _react2.default.createElement(
              _lists2.default,
              { className: 'font-family-list', style: { width: '100%', margin: '0', borderRadius: '5px' } },
              headLineList.map(function (item) {
                return _react2.default.createElement(
                  'label',
                  { className: 'label-radio item-content', style: { fontFamily: item.value }, key: item.value },
                  _react2.default.createElement('input', { type: 'radio', name: 'headline-radio', value: item.value, checked: false, onChange: _this2.handleChange.bind(_this2, item.value) }),
                  _react2.default.createElement(
                    'div',
                    { className: 'item-inner' },
                    _react2.default.createElement(
                      'div',
                      { className: 'item-title' },
                      function () {
                        switch (item.value) {
                          case 'h1':
                            return _react2.default.createElement(
                              'h1',
                              { style: { margin: 0 } },
                              item.label
                            );
                          case 'h2':
                            return _react2.default.createElement(
                              'h2',
                              { style: { margin: 0 } },
                              item.label
                            );
                          case 'h3':
                            return _react2.default.createElement(
                              'h3',
                              { style: { margin: 0 } },
                              item.label
                            );
                          case 'h4':
                            return _react2.default.createElement(
                              'h4',
                              { style: { margin: 0 } },
                              item.label
                            );
                          default:
                            return item.label;
                        }
                      }()
                    )
                  )
                );
              })
            )
          )
        )
      );
    }
  }]);

  return HeadLine;
}(_react2.default.Component);

exports.default = HeadLine;