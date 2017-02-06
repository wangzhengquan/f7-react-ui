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

var headLineList = [{ label: 'AaBb(正文)', value: 'unstyled' }, { label: 'AaBb(标题一)', value: 'header-one' }, { label: 'AaBb(标题二)', value: 'header-two' }, { label: 'AaBb(标题三)', value: 'header-three' }, { label: 'AaBb(标题四)', value: 'header-four' }];

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
      this.edit.toggleBlockType(val);
      // $('.public-DraftEditor-content[contenteditable=true]')[0].blur()
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var selection = this.edit.state.editorState.getSelection();
      var blockType = this.edit.state.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

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
                  _react2.default.createElement('input', { type: 'radio', name: 'headline-radio', value: item.value, checked: blockType === item.value, onChange: _this2.handleChange.bind(_this2, item.value) }),
                  _react2.default.createElement(
                    'div',
                    { className: 'item-inner' },
                    _react2.default.createElement(
                      'div',
                      { className: 'item-title' },
                      function () {
                        switch (item.value) {
                          case 'header-one':
                            return _react2.default.createElement(
                              'h1',
                              { style: { margin: 0 } },
                              item.label
                            );
                          case 'header-two':
                            return _react2.default.createElement(
                              'h2',
                              { style: { margin: 0 } },
                              item.label
                            );
                          case 'header-three':
                            return _react2.default.createElement(
                              'h3',
                              { style: { margin: 0 } },
                              item.label
                            );
                          case 'header-four':
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