'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _params = require('./params');

var _params2 = _interopRequireDefault(_params);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _navbars = require('./navbars');

var _navbars2 = _interopRequireDefault(_navbars);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*======================================================
************   Views   ************
======================================================*/
var views = [];
var View = function View(selector, params) {
    var defaults = {
        dynamicNavbar: true,
        domCache: true,
        linksView: undefined,
        reloadPages: false,
        uniqueHistory: _params2.default.uniqueHistory,
        uniqueHistoryIgnoreGetParameters: _params2.default.uniqueHistoryIgnoreGetParameters,
        allowDuplicateUrls: _params2.default.allowDuplicateUrls,
        swipeBackPage: _params2.default.swipeBackPage,
        swipeBackPageAnimateShadow: _params2.default.swipeBackPageAnimateShadow,
        swipeBackPageAnimateOpacity: _params2.default.swipeBackPageAnimateOpacity,
        swipeBackPageActiveArea: _params2.default.swipeBackPageActiveArea,
        swipeBackPageThreshold: _params2.default.swipeBackPageThreshold,
        animatePages: _params2.default.animatePages,
        preloadPreviousPage: _params2.default.preloadPreviousPage
    };
    var i;

    // Params
    params = params || {};

    // Disable dynamic navbar for material theme
    if (params.dynamicNavbar && _params2.default.material) params.dynamicNavbar = false;

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
    var container = (0, _dom2.default)(selector);
    view.container = container[0];

    // Fix Selector

    if (typeof selector !== 'string') {
        // Supposed to be HTMLElement or Dom7
        selector = (container.attr('id') ? '#' + container.attr('id') : '') + (container.attr('class') ? '.' + container.attr('class').replace(/ /g, '.').replace('.active', '') : '');
        view.selector = selector;
    }

    // Is main
    view.main = container.hasClass(_params2.default.viewMainClass);

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

    view.allowPageChange = true;
    // Location
    var docLocation = document.location.href;

    // History
    view.history = [];
    var viewURL = docLocation;

    // Active Page
    var currentPage, currentPageData;
    if (!view.activePage) {
        currentPage = (0, _dom2.default)(view.pagesContainer).find('.page-on-center');
        if (currentPage.length === 0) {
            currentPage = (0, _dom2.default)(view.pagesContainer).find('.page:not(.cached)');
            currentPage = currentPage.eq(currentPage.length - 1);
        }
        if (currentPage.length > 0) {
            currentPageData = currentPage[0].f7PageData;
        }
    }

    // View startup URL
    if (currentPage) {
        view.url = container.attr('data-url') || view.params.url || '#' + currentPage.attr('data-page');
        view.pagesCache[view.url] = currentPage.attr('data-page');
    } else view.url = container.attr('data-url') || view.params.url || viewURL;

    // Update current page Data
    if (currentPageData) {
        currentPageData.view = view;
        currentPageData.url = view.url;
        if (view.params.dynamicNavbar && !currentPageData.navbarInnerContainer) {
            currentPageData.navbarInnerContainer = view.initialNavbars[view.initialPages.indexOf(currentPageData.container)];
        }
        view.activePage = currentPageData;
        currentPage[0].f7PageData = currentPageData;
    }

    // Store to history main view's url
    if (view.url) {
        view.history.push(view.url);
    }

    // Add view to app
    views.push(view);
    // if (view.main) reactUI.mainView = view;

    // Router
    view.router = {
        load: function load(options) {
            return _router2.default.load(view, options);
        },
        back: function back(options) {
            return _router2.default.back(view, options);
        },
        // Shortcuts
        loadPage: function loadPage(options) {
            options = options || {};
            if (typeof options === 'string') {
                var url = options;
                options = {};
                if (url && url.indexOf('#') === 0 && view.params.domCache) {
                    options.pageName = url.split('#')[1];
                } else options.url = url;
            }
            return _router2.default.load(view, options);
        },
        loadContent: function loadContent(content) {
            return _router2.default.load(view, { content: content });
        },
        reloadPage: function reloadPage(url) {
            return _router2.default.load(view, { url: url, reload: true });
        },
        reloadContent: function reloadContent(content) {
            return _router2.default.load(view, { content: content, reload: true });
        },
        reloadPreviousPage: function reloadPreviousPage(url) {
            return _router2.default.load(view, { url: url, reloadPrevious: true, reload: true });
        },
        reloadPreviousContent: function reloadPreviousContent(content) {
            return _router2.default.load(view, { content: content, reloadPrevious: true, reload: true });
        },
        refreshPage: function refreshPage() {
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
                } else if (view.contentCache[options.url]) {
                    options.content = view.contentCache[options.url];
                    options.url = undefined;
                    delete options.url;
                }
            }
            return _router2.default.load(view, options);
        },
        refreshPreviousPage: function refreshPreviousPage() {
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
            return _router2.default.load(view, options);
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

    // Bars methods
    view.hideNavbar = function () {
        return _navbars2.default.hideNavbar(container.find('.navbar'));
    };
    view.showNavbar = function () {
        return _navbars2.default.showNavbar(container.find('.navbar'));
    };
    view.hideToolbar = function () {
        return _navbars2.default.hideToolbar(container.find('.toolbar'));
    };
    view.showToolbar = function () {
        return _navbars2.default.showToolbar(container.find('.toolbar'));
    };

    // Destroy
    view.destroy = function () {
        view = undefined;
    };

    // Return view
    return view;
};

View.views = views;
View.addView = function (selector, params) {
    return new View(selector, params);
};

View.getCurrentView = function (index) {
    var popoverView = (0, _dom2.default)('.popover.modal-in .view');
    var popupView = (0, _dom2.default)('.popup.modal-in .view');
    var panelView = (0, _dom2.default)('.panel.active .view');
    var appViews = (0, _dom2.default)('.views');
    // Find active view as tab
    var appView = appViews.children('.view');
    // Propably in tabs or split view
    if (appView.length > 1) {
        if (appView.hasClass('tab')) {
            // Tabs
            appView = appViews.children('.view.active');
        } else {
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

exports.default = View;