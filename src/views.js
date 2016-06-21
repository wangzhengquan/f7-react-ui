/*======================================================
************   Views   ************
======================================================*/
import reactUI from 'react-ui'
import PARAMS from './params'
import router from './router'
import $ from './dom'
var views = reactUI.views = [];
var View = function (selector, params) {
    var defaults = {
        dynamicNavbar: false,
        domCache: false,
        linksView: undefined,
        reloadPages: false,
        uniqueHistory: PARAMS.uniqueHistory,
        uniqueHistoryIgnoreGetParameters: PARAMS.uniqueHistoryIgnoreGetParameters,
        allowDuplicateUrls: PARAMS.allowDuplicateUrls,
        swipeBackPage: PARAMS.swipeBackPage,
        swipeBackPageAnimateShadow: PARAMS.swipeBackPageAnimateShadow,
        swipeBackPageAnimateOpacity: PARAMS.swipeBackPageAnimateOpacity,
        swipeBackPageActiveArea: PARAMS.swipeBackPageActiveArea,
        swipeBackPageThreshold: PARAMS.swipeBackPageThreshold,
        animatePages: PARAMS.animatePages,
        preloadPreviousPage: PARAMS.preloadPreviousPage
    };
    var i;

    // Params
    params = params || {};

    // Disable dynamic navbar for material theme
    if (params.dynamicNavbar && PARAMS.material) params.dynamicNavbar = false;

    // Extend params with defaults
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }
    // View
    var view = this;
    view.params = params;

    // Selector
    view.selector = selector;

    // Container
    var container = $(selector);
    view.container = container[0];

    // Fix Selector

    if (typeof selector !== 'string') {
        // Supposed to be HTMLElement or Dom7
        selector = (container.attr('id') ? '#' + container.attr('id') : '') + (container.attr('class') ? '.' + container.attr('class').replace(/ /g, '.').replace('.active', '') : '');
        view.selector = selector;
    }

    // Is main
    view.main = container.hasClass(PARAMS.viewMainClass);

    // Content cache
    view.contentCache = {};

    // Pages cache
    view.pagesCache = {};

    // Store View in element for easy access
    container[0].f7View = view;

    // Pages
    view.pagesContainer = container.find('.pages')[0];
    view.initialPages = [];
    view.initialPagesUrl = [];
    view.initialNavbars = [];
    if (view.params.domCache) {
        var initialPages = container.find('.page');
        for (i = 0; i < initialPages.length; i++) {
            view.initialPages.push(initialPages[i]);
            view.initialPagesUrl.push('#' + initialPages.eq(i).attr('data-page'));
        }
        if (view.params.dynamicNavbar) {
            var initialNavbars = container.find('.navbar-inner');
            for (i = 0; i < initialNavbars.length; i++) {
                view.initialNavbars.push(initialNavbars[i]);
            }
        }

    }

    view.allowPageChange = true;

    // Location
    var docLocation = document.location.href;

    // History
    view.history = [];
    var viewURL = docLocation;
    var pushStateSeparator = PARAMS.pushStateSeparator;
    var pushStateRoot = PARAMS.pushStateRoot;
    if (PARAMS.pushState && view.main) {
        if (pushStateRoot) {
            viewURL = pushStateRoot;
        }
        else {
            if (viewURL.indexOf(pushStateSeparator) >= 0 && viewURL.indexOf(pushStateSeparator + '#') < 0) viewURL = viewURL.split(pushStateSeparator)[0];
        }

    }

    // Active Page
    var currentPage, currentPageData;
    if (!view.activePage) {
        currentPage = $(view.pagesContainer).find('.page-on-center');
        if (currentPage.length === 0) {
            currentPage = $(view.pagesContainer).find('.page:not(.cached)');
            currentPage = currentPage.eq(currentPage.length - 1);
        }
        if (currentPage.length > 0) {
            currentPageData = currentPage[0].f7PageData;
        }
    }

    // View startup URL
    if (view.params.domCache && currentPage) {
        view.url = container.attr('data-url') || view.params.url || '#' + currentPage.attr('data-page');   
        view.pagesCache[view.url] = currentPage.attr('data-page');
    }
    else view.url = container.attr('data-url') || view.params.url || viewURL;

    // Update current page Data
    if (currentPageData) {
        currentPageData.view = view;
        currentPageData.url = view.url;
        if (view.params.domCache && view.params.dynamicNavbar && !currentPageData.navbarInnerContainer) {
            currentPageData.navbarInnerContainer = view.initialNavbars[view.initialPages.indexOf(currentPageData.container)];
        }
        view.activePage = currentPageData;
        currentPage[0].f7PageData = currentPageData;
    }

    // Store to history main view's url
    if (view.url) {
        view.history.push(view.url);
    }

    // Touch events
    var isTouched = false,
        isMoved = false,
        touchesStart = {},
        isScrolling,
        activePage = [],
        previousPage = [],
        viewContainerWidth,
        touchesDiff,
        allowViewTouchMove = true,
        touchStartTime,
        activeNavbar = [],
        previousNavbar = [],
        activeNavElements,
        previousNavElements,
        activeNavBackIcon,
        previousNavBackIcon,
        dynamicNavbar,
        pageShadow,
        el;

   

    // Add view to app
    reactUI.views.push(view);
    // if (view.main) reactUI.mainView = view;

    // Router 
    view.router = {
        load: function (options) {
            return router.load(view, options);
        },
        back: function (options) {
            return router.back(view, options);  
        },
        // Shortcuts
        loadPage: function (options) {
            options = options || {};
            if (typeof options === 'string') {
                var url = options;
                options = {};
                if (url && url.indexOf('#') === 0 && view.params.domCache) {
                    options.pageName = url.split('#')[1];
                }
                else options.url = url;
            }
            return router.load(view, options);
        },
        loadContent: function (content) {
            return router.load(view, {content: content});
        },
        reloadPage: function (url) {
            return router.load(view, {url: url, reload: true});
        },
        reloadContent: function (content) {
            return router.load(view, {content: content, reload: true});
        },
        reloadPreviousPage: function (url) {
            return router.load(view, {url: url, reloadPrevious: true, reload: true});
        },
        reloadPreviousContent: function (content) {
            return router.load(view, {content: content, reloadPrevious: true, reload: true});
        },
        refreshPage: function () {
            var options = {
                url: view.url,
                reload: true,
                ignoreCache: true
            };
            if (options.url && options.url.indexOf('#') === 0) {
                if (view.params.domCache && view.pagesCache[options.url]) {
                    options.pageName = view.pagesCache[options.url];
                    options.url = undefined;
                    delete options.url;
                }
                else if (view.contentCache[options.url]) {
                    options.content = view.contentCache[options.url];
                    options.url = undefined;
                    delete options.url;
                }
            }
            return router.load(view, options);
        },
        refreshPreviousPage: function () {
            var options = {
                url: view.history[view.history.length - 2],
                reload: true,
                reloadPrevious: true,
                ignoreCache: true
            };
            if (options.url && options.url.indexOf('#') === 0 && view.params.domCache && view.pagesCache[options.url]) {
                options.pageName = view.pagesCache[options.url];
                options.url = undefined;
                delete options.url;
            }
            return router.load(view, options);
        }
    };

    // Aliases for temporary backward compatibility
    view.loadPage = view.router.loadPage;
    view.loadContent = view.router.loadContent;
    view.reloadPage = view.router.reloadPage;
    view.reloadContent = view.router.reloadContent;
    view.reloadPreviousPage = view.router.reloadPreviousPage;
    view.reloadPreviousContent = view.router.reloadPreviousContent;
    view.refreshPage = view.router.refreshPage;
    view.refreshPreviousPage = view.router.refreshPreviousPage;
    view.back = view.router.back;

    // Destroy
    view.destroy = function () {
        view = undefined;
    };


    // Return view
    return view;
};

View.views = views;
View.addView = reactUI.addView = function (selector, params) {
    return new View(selector, params);
};

View.getCurrentView = function (index) {
    var popoverView = $('.popover.modal-in .view');
    var popupView = $('.popup.modal-in .view');
    var panelView = $('.panel.active .view');
    var appViews = $('.views');
    // Find active view as tab
    var appView = appViews.children('.view');
    // Propably in tabs or split view
    if (appView.length > 1) {
        if (appView.hasClass('tab')) {
            // Tabs
            appView = appViews.children('.view.active');
        }
        else {
            // Split View, leave appView intact
        }
    }
    if (popoverView.length > 0 && popoverView[0].f7View) return popoverView[0].f7View;
    if (popupView.length > 0 && popupView[0].f7View) return popupView[0].f7View;
    if (panelView.length > 0 && panelView[0].f7View) return panelView[0].f7View;
    if (appView.length > 0) {
        if (appView.length === 1 && appView[0].f7View) return appView[0].f7View;
        if (appView.length > 1) {
            var currentViews = [];
            for (var i = 0; i < appView.length; i++) {
                if (appView[i].f7View) currentViews.push(appView[i].f7View);
            }
            if (currentViews.length > 0 && typeof index !== 'undefined') return currentViews[index];
            if (currentViews.length > 1) return currentViews;
            if (currentViews.length === 1) return currentViews[0];
            return undefined;
        }
    }
    return undefined;
};

export default View;
