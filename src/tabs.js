/* ===============================================================================
************   Tabs   ************
=============================================================================== */
import $ from './dom'
import Swiper from './swiper'
import MicroEvent from './microevent'
require('./resources/less/tabs.less')
require('./resources/less/forms.less')
class Tabs {
	/**
	 * [constructor description]
	 * @param  {[type]} conf [tabbar, tabbarHighlight, effect(animated, swipeable)]
	 * @return {[type]}      [description]
	 */
	
	constructor(conf){
		var me = this
		this.destroyList = []
		this.conf = Object.assign({}, conf);
		this.tabbar = $(conf.tabbar);
		this.tabbar.on('click', '.tab-link', function(e){
			var clicked = $(this)
			var isLink = clicked[0].nodeName.toLowerCase() === 'a';
			if(isLink) e.preventDefault()
			me.showTab(clicked.dataset.tab || clicked.attr('href'), clicked);
		})

		var tabLink = this.tabbar.find('.tab-link.active')
		
		var newTab = $(tabLink.dataset.tab || tabLink.attr('href'));
		this.tabs = newTab.parent('.tabs');
		this.tabsParent = this.tabs.parent();
		this.isAnimatedTabs = (conf.effect === 'animated') || this.tabsParent.hasClass('tabs-animated-wrap');
		this.isSwipeableTabs = (conf.effect === 'swipeable') || this.tabsParent.hasClass('tabs-swipeable-wrap')
		if(this.isSwipeableTabs){
			var swiperContainer = this.tabsParent;
			swiperContainer.addClass('swiper-container').children('.tabs').addClass('swiper-wrapper').children('.tab').addClass('swiper-slide');
			var params;
			if (swiperContainer.data('swiper')) {
			    params = JSON.parse(swiperContainer.data('swiper'));
			}
			else {
			    params = swiperContainer.dataset();
			}
			params.onSlideChangeStart = function (s) {
		        me.showTab(s.slides.eq(s.activeIndex));
		    };
			var slider = this.slider = new Swiper(swiperContainer[0], params);
			this.destroyList.push(function(){slider.destroy(); })
		}

		var tabbar = this.tabbar = tabLink.parents('.tabbar');

		if (this.conf.tabbarHighlight) {
            
            if (tabbar.length > 0) {
                if (tabbar.find('.tab-link-highlight').length === 0) {
                    tabbar.find('.tabbar-inner').append('<span class="tab-link-highlight"></span>');
                }
                function tabbarSetHighlight() {
                	me.setTabbarHighlight(tabbar, tabLink);
			    }
			    tabbarSetHighlight()

			    $(window).on('resize', tabbarSetHighlight);
			    this.destroyList.push(function(){$(window).off('resize', tabbarSetHighlight);})
                
            } else {
            	this.conf.tabbarHighlight = false
            }
        }
		
		
		//me.showTab(tabLink.dataset.tab || activeLink.attr('href'), activeLink);
	}

	destroy(){
		this.destroyList.forEach(function(fun)  {
			fun()
		})
		
	}

	setTabbarHighlight (tabbar, activeLink) {
	    tabbar = $(tabbar);
	    activeLink = activeLink || tabbar.find('.tab-link.active');

	    var tabLinkWidth, highlightTranslate;
	    if (tabbar.hasClass('tabbar-scrollable')) {
	        tabLinkWidth = activeLink[0].offsetWidth + 'px';
	        highlightTranslate = (this.rtl ? - activeLink[0].offsetLeft: activeLink[0].offsetLeft) + 'px';
	    }
	    else {
	        tabLinkWidth = 1 / tabbar.find('.tab-link').length * 100 + '%';
	        highlightTranslate = (this.rtl ? - activeLink.index(): activeLink.index()) * 100 + '%';
	    }

	    tabbar.find('.tab-link-highlight')
	        .css({width: tabLinkWidth})
	        .transform('translate3d(' + highlightTranslate + ',0,0)');
	}

	showTab (tab, tabLink, force) {
	    var newTab = $(tab);
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
	    newTab.trigger('show');
	    // Animated tabs
	    if (this.isAnimatedTabs) {
	    	
	        var tabTranslate = (this.rtl ? newTab.index() : -newTab.index()) * 100;
	        tabs.transform('translate3d(' + tabTranslate + '%,0,0)');
	    }

	    // Swipeable tabs
	    if (this.isSwipeableTabs) {
	    	if (this.slider.activeIndex !== newTab.index()) this.slider.slideTo(newTab.index(), undefined, false);
	    }

	    // Find related link for new tab
	    if (tabLink) tabLink = $(tabLink);
	    else {
	        // Search by id
	        if (typeof tab === 'string') tabLink = $('.tab-link[href="' + tab + '"]');
	        else tabLink = $('.tab-link[href="#' + newTab.attr('id') + '"]');
	        // Search by data-tab
	        if (!tabLink || tabLink && tabLink.length === 0) {
	            $('[data-tab]').each(function () {
	                if (newTab.is($(this).attr('data-tab'))) tabLink = $(this);
	            });
	        }
	    }
	    if (tabLink.length === 0) return;

	    // Find related link for old tab
	    var oldTabLink;
	    if (oldTab && oldTab.length > 0) {
	        // Search by id
	        var oldTabId = oldTab.attr('id');
	        if (oldTabId) oldTabLink = $('.tab-link[href="#' + oldTabId + '"]');
	        // Search by data-tab
	        if (!oldTabLink || oldTabLink && oldTabLink.length === 0) {
	            $('[data-tab]').each(function () {
	                if (oldTab.is($(this).attr('data-tab'))) oldTabLink = $(this);
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
	    
	    this.fireEvent('show', newTab, tabLink)
	    return true;
	}
}

MicroEvent.mixin(Tabs)
export default Tabs
