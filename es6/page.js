'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var transitionDuration = 400;
var params = {

  hideNavbarOnPageScroll: true,
  hideToolbarOnPageScroll: false,
  hideTabbarOnPageScroll: false,
  showBarsOnPageScrollEnd: false,
  showBarsOnPageScrollTop: true
};

var Page = function (_React$Component) {
  _inherits(Page, _React$Component);

  function Page(props) {
    _classCallCheck(this, Page);

    var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

    _this.destroyList = [];
    return _this;
  }
  // Set pages classess for animationEnd


  _createClass(Page, [{
    key: 'animatePages',
    value: function animatePages(page, action, direction, finishCallback) {
      // Loading new page
      var removeClasses = 'page-on-center page-on-right page-on-left';
      var transitionClass = null;
      var activeClass = null;

      if (direction === 'to-left') {
        if (action === 'leave') {
          transitionClass = 'page-from-center-to-left';
          activeClass = 'page-on-left';
        } else if (action === 'enter') {
          transitionClass = 'page-from-right-to-center';
          activeClass = 'page-on-center';
        }
      }
      // Go isBack
      else if (direction === 'to-right') {
          if (action === 'enter') {
            transitionClass = 'page-from-left-to-center';
            activeClass = 'page-on-center';
          } else if (action === 'leave') {
            transitionClass = 'page-from-center-to-right';
            activeClass = 'page-on-right';
          }
        }

      page.removeClass(removeClasses).addClass(transitionClass);
      page.animationEnd(function (e) {
        page.removeClass(transitionClass).addClass(activeClass);
        finishCallback();
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.node = this.node || (0, _dom2.default)(_reactDom2.default.findDOMNode(this));
      //this.initPageScrollToolbars(node)
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroy();
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(done) {
      // console.log('componentWillAppear', this.props.location && this.props.location.pathname);
      done();
    }
  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {
      // console.log('componentDidAppear', this.props.location && this.props.location.pathname);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(done) {
      if (!Page.anim) {
        done();
        return;
      }
      var page = (0, _dom2.default)(_reactDom2.default.findDOMNode(this));
      if (_history2.default.isBack) {
        this.animatePages(page, 'enter', 'to-right', done);
      } else {
        this.animatePages(page, 'enter', 'to-left', done);
      }
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      // console.log('componentDidEnter', this.props.location && this.props.location.pathname);
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(done) {
      // console.log('componentWillLeave', this.props.location && this.props.location.pathname , history.paths);
      if (!Page.anim) {
        setTimeout(function () {
          Page.anim = true;
        }, transitionDuration);

        done();
        return;
      }
      var page = (0, _dom2.default)(_reactDom2.default.findDOMNode(this));
      if (_history2.default.isBack) {
        this.animatePages(page, 'leave', 'to-right', done);
      } else {
        this.animatePages(page, 'leave', 'to-left', done);
      }
    }
  }, {
    key: 'componentDidLeave',
    value: function componentDidLeave() {
      // console.log('componentDidLeave', this.props.location && this.props.location.pathname);
    }
  }, {
    key: 'initPageScrollToolbars',
    value: function initPageScrollToolbars(pageContainer) {
      var me = this;
      pageContainer = (0, _dom2.default)(pageContainer);
      var scrollContent = pageContainer.find('.page-content');
      if (scrollContent.length === 0) return;
      var hideNavbar = (params.hideNavbarOnPageScroll || scrollContent.hasClass('hide-navbar-on-scroll') || scrollContent.hasClass('hide-bars-on-scroll')) && !(scrollContent.hasClass('keep-navbar-on-scroll') || scrollContent.hasClass('keep-bars-on-scroll'));
      var hideToolbar = (params.hideToolbarOnPageScroll || scrollContent.hasClass('hide-toolbar-on-scroll') || scrollContent.hasClass('hide-bars-on-scroll')) && !(scrollContent.hasClass('keep-toolbar-on-scroll') || scrollContent.hasClass('keep-bars-on-scroll'));
      var hideTabbar = (params.hideTabbarOnPageScroll || scrollContent.hasClass('hide-tabbar-on-scroll')) && !scrollContent.hasClass('keep-tabbar-on-scroll');

      if (!(hideNavbar || hideToolbar || hideTabbar)) return;

      var viewContainer = scrollContent.parents('.views');
      if (viewContainer.length === 0) return;

      var navbar = viewContainer.find('.navbar'),
          toolbar = viewContainer.find('.toolbar'),
          tabbar;
      if (hideTabbar) {
        tabbar = viewContainer.find('.tabbar');
        if (tabbar.length === 0) tabbar = viewContainer.parents('.views').find('.tabbar');
      }

      var hasNavbar = navbar.length > 0,
          hasToolbar = toolbar.length > 0,
          hasTabbar = tabbar && tabbar.length > 0;

      var previousScroll, currentScroll;
      previousScroll = currentScroll = scrollContent[0].scrollTop;

      var scrollHeight, offsetHeight, reachEnd, action, navbarHidden, toolbarHidden, tabbarHidden;

      var toolbarHeight = hasToolbar && hideToolbar ? toolbar[0].offsetHeight : 0;
      var tabbarHeight = hasTabbar && hideTabbar ? tabbar[0].offsetHeight : 0;
      var bottomBarHeight = tabbarHeight || toolbarHeight;

      function handleScroll(e) {
        if (pageContainer.hasClass('page-on-left')) return;
        currentScroll = scrollContent[0].scrollTop;
        scrollHeight = scrollContent[0].scrollHeight;
        offsetHeight = scrollContent[0].offsetHeight;
        reachEnd = currentScroll + offsetHeight >= scrollHeight - bottomBarHeight;
        navbarHidden = navbar.hasClass('navbar-hidden');
        toolbarHidden = toolbar.hasClass('toolbar-hidden');
        tabbarHidden = tabbar && tabbar.hasClass('toolbar-hidden');
        // console.log('reachEnd', reachEnd,  currentScroll + offsetHeight ,  scrollHeight - bottomBarHeight)
        if (reachEnd) {
          if (params.showBarsOnPageScrollEnd) {
            action = 'show';
          }
        } else if (previousScroll > currentScroll) {
          if (params.showBarsOnPageScrollTop || currentScroll <= 44) {
            action = 'show';
          } else {
            action = 'hide';
          }
        } else {
          if (currentScroll > 44) {
            action = 'hide';
          } else {
            action = 'show';
          }
        }

        if (action === 'show') {
          if (hasNavbar && hideNavbar && navbarHidden) {
            me.showNavbar(navbar);
            pageContainer.removeClass('no-navbar-by-scroll');
            navbarHidden = false;
          }
          if (hasToolbar && hideToolbar && toolbarHidden) {
            me.showToolbar(toolbar);
            pageContainer.removeClass('no-toolbar-by-scroll');
            toolbarHidden = false;
          }
          if (hasTabbar && hideTabbar && tabbarHidden) {
            me.showToolbar(tabbar);
            pageContainer.removeClass('no-tabbar-by-scroll');
            tabbarHidden = false;
          }
        } else {
          if (hasNavbar && hideNavbar && !navbarHidden) {
            me.hideNavbar(navbar);
            pageContainer.addClass('no-navbar-by-scroll');
            navbarHidden = true;
          }
          if (hasToolbar && hideToolbar && !toolbarHidden) {
            me.hideToolbar(toolbar);
            pageContainer.addClass('no-toolbar-by-scroll');
            toolbarHidden = true;
          }
          if (hasTabbar && hideTabbar && !tabbarHidden) {
            me.hideToolbar(tabbar);
            pageContainer.addClass('no-tabbar-by-scroll');
            tabbarHidden = true;
          }
        }

        previousScroll = currentScroll;
      }
      scrollContent.on('scroll', handleScroll);
      scrollContent[0].f7ScrollToolbarsHandler = handleScroll;
    }
  }, {
    key: 'destroyScrollToolbars',
    value: function destroyScrollToolbars(pageContainer) {
      pageContainer = (0, _dom2.default)(pageContainer);
      var scrollContent = pageContainer.find('.page-content');
      if (scrollContent.length === 0) return;
      var handler = scrollContent[0].f7ScrollToolbarsHandler;
      if (!handler) return;
      scrollContent.off('scroll', scrollContent[0].f7ScrollToolbarsHandler);
    }

    // Hide/Show Navbars/Toolbars

  }, {
    key: 'hideNavbar',
    value: function hideNavbar(navbarContainer) {
      (0, _dom2.default)(navbarContainer).addClass('navbar-hidden');
      return true;
    }
  }, {
    key: 'showNavbar',
    value: function showNavbar(navbarContainer) {
      var navbar = (0, _dom2.default)(navbarContainer);
      navbar.addClass('navbar-hiding').removeClass('navbar-hidden').transitionEnd(function () {
        navbar.removeClass('navbar-hiding');
      });
      return true;
    }
  }, {
    key: 'hideToolbar',
    value: function hideToolbar(toolbarContainer) {
      (0, _dom2.default)(toolbarContainer).addClass('toolbar-hidden');
      return true;
    }
  }, {
    key: 'showToolbar',
    value: function showToolbar(toolbarContainer) {
      var toolbar = (0, _dom2.default)(toolbarContainer);
      toolbar.addClass('toolbar-hiding').removeClass('toolbar-hidden').transitionEnd(function () {
        toolbar.removeClass('toolbar-hiding');
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.destroyList.forEach(function (fun) {
        fun();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: (0, _classnames2.default)('page', this.props.className), 'data-page': this.props.pageName });
    }
  }]);

  return Page;
}(_react2.default.Component);

exports.default = Page;

Page.anim = true;