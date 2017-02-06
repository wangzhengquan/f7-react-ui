'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

var _params = require('./params');

var _params2 = _interopRequireDefault(_params);

var _navbars = require('./navbars');

var _navbars2 = _interopRequireDefault(_navbars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-console: 0 */


var transitionDuration = 400;

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar(props) {
    _classCallCheck(this, Navbar);

    var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));

    _this.state = {
      title: _this.props.title
    };
    return _this;
  }

  /**
   * Prepare navbar before animarion
   * @param  {[type]} newNavbarInner    [description]
   * @param  {[type]} newNavbarPosition [description]
   * @return {[type]}                   [description]
   */


  _createClass(Navbar, [{
    key: 'prepareNavbar',
    value: function prepareNavbar(newNavbarInner, newNavbarPosition) {
      if (newNavbarPosition === 'right') {
        newNavbarInner.addClass('navbar-on-right');
      } else if (newNavbarPosition === 'left') {
        newNavbarInner.addClass('navbar-on-left');
      }

      (0, _dom2.default)(newNavbarInner).find('.sliding').each(function () {
        var sliding = (0, _dom2.default)(this);
        var slidingOffset = newNavbarPosition === 'right' ? this.f7NavbarRightOffset : this.f7NavbarLeftOffset;
        if (_params2.default.animateNavBackIcon) {
          if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
            sliding.find('.back .icon').transform('translate3d(' + -slidingOffset + 'px,0,0)');
          }
        }
        sliding.transform('translate3d(' + slidingOffset + 'px,0,0)');
      });
    }
    /**
     * Set navbars classess for animation
     * @param  {[type]} navbarInner [description]
     * @param  {[type]} action      [description]
     * @param  {[type]} direction   [description]
     * @return {[type]}             [description]
     */

  }, {
    key: 'animateNavbars',
    value: function animateNavbars(navbarInner, action, direction, finishCallback) {
      // Loading new page
      navbarInner = (0, _dom2.default)(navbarInner);
      var removeClasses = 'navbar-on-right navbar-on-center navbar-on-left';
      if (direction === 'to-left') {
        if (action === 'enter') {
          navbarInner.removeClass(removeClasses).addClass('navbar-from-right-to-center');
          window.setTimeout(function () {
            navbarInner.removeClass('navbar-from-right-to-center').addClass('navbar-on-center');
            finishCallback();
          }, transitionDuration);

          navbarInner.find('.sliding').each(function () {
            var sliding = (0, _dom2.default)(this);
            sliding.transform('translate3d(0px,0,0)');
            if (_params2.default.animateNavBackIcon) {
              if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                sliding.find('.back .icon').transform('translate3d(0px,0,0)');
              }
            }
          });
        } else if (action === 'leave') {
          (function () {
            navbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-left');
            window.setTimeout(function (e) {
              navbarInner.removeClass('navbar-from-center-to-left').addClass('navbar-on-left');
              finishCallback();
            }, transitionDuration);

            var rightNavbarInner = navbarInner.closest('.navbar').find('.navbar-inner:first-child');
            navbarInner.find('.sliding').each(function () {
              var sliding = (0, _dom2.default)(this);
              var rightText;
              if (_params2.default.animateNavBackIcon) {
                if (sliding.hasClass('center') && rightNavbarInner.find('.sliding.left .back .icon').length > 0) {
                  rightText = rightNavbarInner.find('.sliding.left .back span');
                  if (rightText.length > 0) this.f7NavbarLeftOffset += rightText[0].offsetLeft;
                }
                if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                  sliding.find('.back .icon').transform('translate3d(' + -this.f7NavbarLeftOffset + 'px,0,0)');
                }
              }
              // console.log('leave', this, this.f7NavbarLeftOffset)
              sliding.transform('translate3d(' + this.f7NavbarLeftOffset + 'px,0,0)');
            });
          })();
        }
      }
      // Go back
      if (direction === 'to-right') {
        if (action === 'enter') {
          navbarInner.removeClass(removeClasses).addClass('navbar-from-left-to-center');
          window.setTimeout(function () {
            navbarInner.removeClass('navbar-from-left-to-center').addClass('navbar-on-center');
            finishCallback();
          }, transitionDuration);

          navbarInner.find('.sliding').each(function () {
            var sliding = (0, _dom2.default)(this);
            sliding.transform('translate3d(0px,0,0)');
            if (_params2.default.animateNavBackIcon) {
              if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                sliding.find('.back .icon').transform('translate3d(0px,0,0)');
              }
            }
          });
        } else if (action === 'leave') {
          navbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-right');
          window.setTimeout(function () {
            navbarInner.removeClass('navbar-from-center-to-right').addClass('navbar-on-right');
            finishCallback();
          }, transitionDuration);
          navbarInner.find('.sliding').each(function () {
            var sliding = (0, _dom2.default)(this);
            if (_params2.default.animateNavBackIcon) {
              if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                sliding.find('.back .icon').transform('translate3d(' + -this.f7NavbarRightOffset + 'px,0,0)');
              }
            }
            sliding.transform('translate3d(' + this.f7NavbarRightOffset + 'px,0,0)');
          });
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log('componentDidMount', this.props.location && this.props.location.pathname);
      var node = this.node = (0, _dom2.default)(_reactDom2.default.findDOMNode(this));
      var onResize = function onResize() {
        _navbars2.default.sizeNavbar(node);
      };
      (0, _dom2.default)(window).on('resize', onResize);
      this.destroy = function () {
        (0, _dom2.default)(window).off('resize', onResize);
      };
      _navbars2.default.sizeNavbar(node);
    }
  }, {
    key: 'componentWillUnMount',
    value: function componentWillUnMount() {
      this.destroy();
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(done) {
      console.log('componentWillAppear', this.props.location && this.props.location.pathname);
      done();
    }
  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {
      console.log('componentDidAppear', this.props.location && this.props.location.pathname);
      //this._enterStyle();
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(done) {
      var _this2 = this;

      console.log('componentWillEnter', this.props.location && this.props.location.pathname);
      if (!Navbar.anim) {
        setTimeout(function () {
          Navbar.anim = true;
        }, transitionDuration);
        done();
        return;
      }
      var node = this.node || (0, _dom2.default)(_reactDom2.default.findDOMNode(this));
      if (_history2.default.isBack) {
        this.prepareNavbar(node, 'left');
        setTimeout(function () {
          _this2.animateNavbars(node, 'enter', 'to-right', done);
        }, 17);
      } else {
        this.prepareNavbar(node, 'right');
        setTimeout(function () {
          _this2.animateNavbars(node, 'enter', 'to-left', done);
        }, 17);
      }
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      console.log('componentDidEnter', this.props.location && this.props.location.pathname);
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(done) {
      console.log('componentWillLeave', this.props.location && this.props.location.pathname);
      if (!Navbar.anim) {
        done();
        return;
      }
      var node = this.node || (0, _dom2.default)(_reactDom2.default.findDOMNode(this));
      if (_history2.default.isBack) {
        this.animateNavbars(node, 'leave', 'to-right', done);
      } else {
        this.animateNavbars(node, 'leave', 'to-left', done);
      }
    }
  }, {
    key: 'componentDidLeave',
    value: function componentDidLeave() {
      console.log('componentDidLeave', this.props.location && this.props.location.pathname);
    }
  }, {
    key: 'handleBackClick',
    value: function handleBackClick(e) {
      e.preventDefault();
      _history2.default.go(-1);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.canBack === undefined) {
        this.canBack = _history2.default.canBack;
      }

      return _react2.default.createElement(
        'div',
        { className: 'navbar-inner', 'data-page': this.props.pageName },
        this.canBack ? _react2.default.createElement(
          'div',
          { className: 'left sliding' },
          _react2.default.createElement(
            'a',
            { onClick: this.handleBackClick.bind(this), className: 'back link' },
            _react2.default.createElement('i', { className: 'icon icon-back' }),
            _react2.default.createElement(
              'span',
              null,
              '\u8FD4\u56DE'
            )
          )
        ) : '',
        _react2.default.createElement(
          'div',
          { className: 'center sliding' },
          this.state.title || ''
        )
      );
    }
  }]);

  return Navbar;
}(_react2.default.Component);

exports.default = Navbar;

Navbar.sizeNavbar = _navbars2.default.sizeNavbar;
Navbar.sizeNavbars = _navbars2.default.sizeNavbars;

Navbar.anim = true;