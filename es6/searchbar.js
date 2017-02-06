'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchbarOverlay = exports.Searchbar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _params = require('react-ui/params');

var _params2 = _interopRequireDefault(_params);

var _device = require('react-ui/device');

var _device2 = _interopRequireDefault(_device);

var _dom = require('react-ui/dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classnames = require('classnames');

require('./resources/less/searchbar.less');
var cancelMarginProp = 'margin-right';

var Searchbar = function (_React$Component) {
  _inherits(Searchbar, _React$Component);

  function Searchbar(props) {
    _classCallCheck(this, Searchbar);

    var _this = _possibleConstructorReturn(this, (Searchbar.__proto__ || Object.getPrototypeOf(Searchbar)).call(this, props));

    _this.state = {
      value: '',
      searchbarActive: false
    };
    _this.cancelButtonHasMargin = false;
    _this.destroyList = [];

    return _this;
  }

  _createClass(Searchbar, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroy();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.container = (0, _dom2.default)(_reactDom2.default.findDOMNode(this));
      this.pageContainer = this.container.parents('.page').eq(0);
      if (this.pageContainer.length === 0) {
        this.pageContainer = (0, _dom2.default)(this.container.parents('.navbar-inner').eq(0)[0].f7RelatedPage);
      }
      this.cancelButton = this.container.find('.searchbar-cancel');
      this.input = this.container.find('input[type="search"]');
      this.overlay = this.pageContainer.length > 0 ? this.pageContainer.find('.searchbar-overlay') : (0, _dom2.default)('.searchbar-overlay');
      if (this.props.overlay && this.overlay.length === 0 && this.pageContainer.length > 0) {

        this.pageContainer.append('<div class="searchbar-overlay"></div>');
        this.overlay = this.pageContainer.find('.searchbar-overlay');
      }
      if (this.overlay.length > 0) {
        this.overlay.on('click', this.disable.bind(this));
        this.destroyList.push(function () {
          _this2.overlay.off('click');
        });
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.destroyList.forEach(function (fun) {
        fun();
      });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      event.preventDefault();
      this.state.value !== '' && this.props.onSubmit && this.props.onSubmit(this.state.value);
    }
  }, {
    key: 'setCancelButtonMargin',
    value: function setCancelButtonMargin() {
      var cancelButton = this.cancelButton;
      cancelButton.transition(0).show();
      cancelButton.css(cancelMarginProp, -cancelButton[0].offsetWidth + 'px');
      var clientLeft = cancelButton[0].clientLeft;
      cancelButton.transition('');
      this.cancelButtonHasMargin = true;
    }
  }, {
    key: 'onFocus',
    value: function onFocus(e) {
      this.props.onFocus && this.props.onFocus(e);
      this.enable(e);
    }
  }, {
    key: 'enable',
    value: function enable(e) {
      var _this3 = this;

      var _enable = function _enable() {
        if (!_this3.state.searchbarActive) {
          _this3.setState({
            active: true
          });
          _this3.overlay.length > 0 && _this3.overlay.addClass('searchbar-overlay-active');
        }

        if (_this3.props.cancelButton && !_params2.default.material) {
          if (!_this3.cancelButtonHasMargin) {
            _this3.setCancelButtonMargin();
          }
          _this3.cancelButton.css(cancelMarginProp, '0px');
        }
        _this3.props.enableSearch && _this3.props.enableSearch();
        _this3.props.onEnable && _this3.props.onEnable();
      };
      if (_device2.default.ios && !_params2.default.material && e && e.type === 'focus') {
        setTimeout(function () {
          _enable();
        }, 400);
      } else {
        _enable();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      var s = this;
      var oldValue = this.state.value;
      var newValue = '';
      this.setState({ value: newValue });
      this.props.onChange && this.props.onChange(newValue, oldValue);
      this.setState({
        active: false
      });
      if (s.cancelButton.length > 0 && !_params2.default.material) s.cancelButton.css(cancelMarginProp, -s.cancelButton[0].offsetWidth + 'px');

      s.overlay.length > 0 && s.overlay.removeClass('searchbar-overlay-active');

      var _disable = function _disable() {
        s.input.blur();
      };
      if (_device2.default.ios) {
        setTimeout(function () {
          _disable();
        }, 400);
      } else {
        _disable();
      }
      this.props.onDisable && this.props.onDisable();
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(e) {
      e.preventDefault();
      this.disable();
      this.props.onCancel && this.props.onCancel();
    }
  }, {
    key: 'handleClear',
    value: function handleClear(event) {
      event.preventDefault();
      var oldValue = this.state.value;
      var newValue = '';
      if (oldValue !== newValue) {
        this.setState({ value: newValue });
        this.props.onChange && this.props.onChange(newValue, oldValue);
        this.props.onClear && this.props.onClear();
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      // console.log(event)
      var oldValue = this.state.value;
      var newValue = event.target.value;
      this.setState({ value: newValue });
      this.props.onChange && this.props.onChange(newValue, oldValue);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { onSubmit: this.onSubmit.bind(this), action: '',
          className: classnames('searchbar', this.props.className, {
            'searchbar-not-empty': this.state.value !== '',
            'searchbar-active': this.state.active
          }), style: this.props.style },
        _react2.default.createElement(
          'div',
          { className: 'searchbar-input' },
          _react2.default.createElement('input', { type: 'search', value: this.state.value, placeholder: this.props.placeholder, onFocus: this.onFocus.bind(this), onChange: this.handleChange.bind(this) }),
          _react2.default.createElement('a', { href: '#', onClick: this.handleClear.bind(this), className: 'searchbar-clear' })
        ),
        this.props.cancelButton ? _react2.default.createElement(
          'a',
          { href: '#', onClick: this.handleCancel.bind(this), className: 'searchbar-cancel' },
          '\u53D6\u6D88'
        ) : ''
      );
    }
  }]);

  return Searchbar;
}(_react2.default.Component);

Searchbar.propTypes = {
  placeholder: _react2.default.PropTypes.string.isRequired
};
Searchbar.defaultProps = {
  placeholder: '搜索',
  overlay: false,
  cancelButton: false
};

var SearchbarOverlay = function SearchbarOverlay(props) {
  return _react2.default.createElement('div', { className: 'searchbar-overlay' });
};

exports.Searchbar = Searchbar;
exports.SearchbarOverlay = SearchbarOverlay;
exports.default = Searchbar;