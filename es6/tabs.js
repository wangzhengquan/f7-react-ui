'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* ===============================================================================
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ************   Tabs   ************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     =============================================================================== */

// import Swiper from './swiper'


var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _microevent = require('./microevent');

var _microevent2 = _interopRequireDefault(_microevent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('./resources/less/forms.less');
require('./resources/less/tabs.less');

var Tabs = function () {
	/**
  * [constructor description]
  * @param  {[type]} conf [tabbar, tabbarHighlight, effect(animated, swipeable)]
  * @return {[type]}      [description]
  */

	function Tabs(conf) {
		var _this = this;

		_classCallCheck(this, Tabs);

		var me = this;
		this.destroyList = [];
		this.conf = Object.assign({}, conf);
		this.tabbar = (0, _dom2.default)(conf.tabbar);
		this.tabbar.on('click', '.tab-link', function (e) {
			var clicked = (0, _dom2.default)(this);
			var isLink = clicked[0].nodeName.toLowerCase() === 'a';
			if (isLink) e.preventDefault();
			me.showTab(clicked.dataset.tab || clicked.attr('href'), clicked);
		});

		var tabLink = this.tabbar.find('.tab-link.active');

		var newTab = (0, _dom2.default)(tabLink.dataset.tab || tabLink.attr('href'));
		this.tabs = newTab.parent('.tabs');
		this.tabsParent = this.tabs.parent();
		this.isAnimatedTabs = conf.effect === 'animated' || this.tabsParent.hasClass('tabs-animated-wrap');
		this.isSwipeableTabs = conf.effect === 'swipeable' || this.tabsParent.hasClass('tabs-swipeable-wrap');
		if (this.isSwipeableTabs) {
			require.ensure([], function (require) {
				var Swiper = require('./swiper');
				var swiperContainer = _this.tabsParent;
				swiperContainer.addClass('swiper-container').children('.tabs').addClass('swiper-wrapper').children('.tab').addClass('swiper-slide');
				var params;
				if (swiperContainer.data('swiper')) {
					params = JSON.parse(swiperContainer.data('swiper'));
				} else {
					params = swiperContainer.dataset();
				}

				params.onSlideChangeStart = function (s) {
					me.showTab(s.slides.eq(s.activeIndex));
				};
				params.onSlideChangeEnd = function (s) {
					s.slides.eq(s.activeIndex).trigger('show');
				};
				var slider = _this.slider = new Swiper(swiperContainer[0], params);
				_this.destroyList.push(function () {
					slider.destroy();
				});
			});
		}

		var tabbar = this.tabbar = tabLink.parents('.tabbar');

		if (this.conf.tabbarHighlight) {

			if (tabbar.length > 0) {
				(function () {
					var tabbarSetHighlight = function tabbarSetHighlight() {
						me.setTabbarHighlight(tabbar, tabLink);
					};

					if (tabbar.find('.tab-link-highlight').length === 0) {
						tabbar.find('.tabbar-inner').append('<span class="tab-link-highlight"></span>');
					}

					tabbarSetHighlight();

					(0, _dom2.default)(window).on('resize', tabbarSetHighlight);
					_this.destroyList.push(function () {
						(0, _dom2.default)(window).off('resize', tabbarSetHighlight);
					});
				})();
			} else {
				this.conf.tabbarHighlight = false;
			}
		}

		//me.showTab(tabLink.dataset.tab || activeLink.attr('href'), activeLink);
	}

	_createClass(Tabs, [{
		key: 'destroy',
		value: function destroy() {
			this.destroyList.forEach(function (fun) {
				fun();
			});
		}
	}, {
		key: 'setTabbarHighlight',
		value: function setTabbarHighlight(tabbar, activeLink) {
			tabbar = (0, _dom2.default)(tabbar);
			activeLink = activeLink || tabbar.find('.tab-link.active');

			var tabLinkWidth, highlightTranslate;
			if (tabbar.hasClass('tabbar-scrollable')) {
				tabLinkWidth = activeLink[0].offsetWidth + 'px';
				highlightTranslate = (this.rtl ? -activeLink[0].offsetLeft : activeLink[0].offsetLeft) + 'px';
			} else {
				tabLinkWidth = 1 / tabbar.find('.tab-link').length * 100 + '%';
				highlightTranslate = (this.rtl ? -activeLink.index() : activeLink.index()) * 100 + '%';
			}

			tabbar.find('.tab-link-highlight').css({ width: tabLinkWidth }).transform('translate3d(' + highlightTranslate + ',0,0)');
		}
	}, {
		key: 'showTab',
		value: function showTab(tab, tabLink, force) {
			var newTab = (0, _dom2.default)(tab);
			if (arguments.length === 2) {
				if (typeof tabLink === 'boolean') {
					force = tabLink;
				}
			}
			if (newTab.length === 0) return false;
			if (newTab.hasClass('active')) {
				if (force) newTab.trigger('show');
				return false;
			}
			var tabs = this.tabs;
			if (tabs.length === 0) return false;

			// Return swipeouts in hidden tabs
			this.allowSwipeout = true;

			// Remove active class from old tabs
			var oldTab = tabs.children('.tab.active').removeClass('active');

			//newTab.show()
			// Add active class to new tab

			newTab.addClass('active');
			// Trigger 'show' event on new tab
			// Animated tabs
			if (this.isAnimatedTabs) {

				var tabTranslate = (this.rtl ? newTab.index() : -newTab.index()) * 100;
				tabs.transform('translate3d(' + tabTranslate + '%,0,0)');
				tabs.transitionEnd(function () {
					newTab.trigger('show');
				});
			} else if (this.isSwipeableTabs) {
				// Swipeable tabs
				if (this.slider.activeIndex !== newTab.index()) this.slider.slideTo(newTab.index(), undefined, true);
			} else {
				newTab.trigger('show');
			}

			// Find related link for new tab
			if (tabLink) tabLink = (0, _dom2.default)(tabLink);else {
				// Search by id
				if (typeof tab === 'string') tabLink = (0, _dom2.default)('.tab-link[href="' + tab + '"]');else tabLink = (0, _dom2.default)('.tab-link[href="#' + newTab.attr('id') + '"]');
				// Search by data-tab
				if (!tabLink || tabLink && tabLink.length === 0) {
					(0, _dom2.default)('[data-tab]').each(function () {
						if (newTab.is((0, _dom2.default)(this).attr('data-tab'))) tabLink = (0, _dom2.default)(this);
					});
				}
			}
			if (tabLink.length === 0) return;

			// Find related link for old tab
			var oldTabLink;
			if (oldTab && oldTab.length > 0) {
				// Search by id
				var oldTabId = oldTab.attr('id');
				if (oldTabId) oldTabLink = (0, _dom2.default)('.tab-link[href="#' + oldTabId + '"]');
				// Search by data-tab
				if (!oldTabLink || oldTabLink && oldTabLink.length === 0) {
					(0, _dom2.default)('[data-tab]').each(function () {
						if (oldTab.is((0, _dom2.default)(this).attr('data-tab'))) oldTabLink = (0, _dom2.default)(this);
					});
				}
			}

			// Update links' classes
			if (tabLink && tabLink.length > 0) {
				tabLink.addClass('active');
				// Material Highlight
				if (this.conf.tabbarHighlight) {
					this.setTabbarHighlight(this.tabbar, tabLink);
				}
			}
			if (oldTabLink && oldTabLink.length > 0) oldTabLink.removeClass('active');

			this.fireEvent('show', newTab, tabLink);
			return true;
		}
	}]);

	return Tabs;
}();

_microevent2.default.mixin(Tabs);
exports.default = Tabs;