'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _url = require('./url');

var _url2 = _interopRequireDefault(_url);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*======================================================
************   Pages   ************
======================================================*/
// Page Callbacks API
var pages = {};
pages.pageCallbacks = {};

pages.onPage = function (callbackName, pageName, callback) {
    if (pageName && pageName.split(' ').length > 1) {
        var pageNames = pageName.split(' ');
        var returnCallbacks = [];
        for (var i = 0; i < pageNames.length; i++) {
            returnCallbacks.push(pages.onPage(callbackName, pageNames[i], callback));
        }
        returnCallbacks.remove = function () {
            for (var i = 0; i < returnCallbacks.length; i++) {
                returnCallbacks[i].remove();
            }
        };
        returnCallbacks.trigger = function () {
            for (var i = 0; i < returnCallbacks.length; i++) {
                returnCallbacks[i].trigger();
            }
        };
        return returnCallbacks;
    }
    var callbacks = pages.pageCallbacks[callbackName][pageName];
    if (!callbacks) {
        callbacks = pages.pageCallbacks[callbackName][pageName] = [];
    }
    pages.pageCallbacks[callbackName][pageName].push(callback);
    return {
        remove: function remove() {
            var removeIndex;
            for (var i = 0; i < callbacks.length; i++) {
                if (callbacks[i].toString() === callback.toString()) {
                    removeIndex = i;
                }
            }
            if (typeof removeIndex !== 'undefined') callbacks.splice(removeIndex, 1);
        },
        trigger: callback
    };
};

//Create callbacks methods dynamically
function createPageCallback(callbackName) {
    var capitalized = callbackName.replace(/^./, function (match) {
        return match.toUpperCase();
    });
    pages['onPage' + capitalized] = function (pageName, callback) {
        return pages.onPage(callbackName, pageName, callback);
    };
}

var pageCallbacksNames = 'beforeInit init reinit beforeAnimation afterAnimation back afterBack beforeRemove'.split(' ');
for (var i = 0; i < pageCallbacksNames.length; i++) {
    pages.pageCallbacks[pageCallbacksNames[i]] = {};
    createPageCallback(pageCallbacksNames[i]);
}

pages.triggerPageCallbacks = function (callbackName, pageName, pageData) {
    var allPagesCallbacks = pages.pageCallbacks[callbackName]['*'];
    if (allPagesCallbacks) {
        for (var j = 0; j < allPagesCallbacks.length; j++) {
            allPagesCallbacks[j](pageData);
        }
    }
    var callbacks = pages.pageCallbacks[callbackName][pageName];
    if (!callbacks || callbacks.length === 0) return;
    for (var i = 0; i < callbacks.length; i++) {
        callbacks[i](pageData);
    }
};

// On Page Init Callback
pages.pageInitCallback = function (view, params) {
    var pageContainer = params.pageContainer;
    if (pageContainer.f7PageInitialized && view && !view.params.domCache) return;

    var pageQuery = params.query;
    if (!pageQuery) {
        if (params.url && params.url.indexOf('?') > 0) {
            pageQuery = _url2.default.parseUrlQuery(params.url || '');
        } else if (pageContainer.f7PageData && pageContainer.f7PageData.query) {
            pageQuery = pageContainer.f7PageData.query;
        } else {
            pageQuery = {};
        }
    }

    // Page Data
    var pageData = {
        container: pageContainer,
        url: params.url,
        query: pageQuery,
        name: (0, _dom2.default)(pageContainer).attr('data-page'),
        view: view,
        from: params.position,
        context: params.context,
        navbarInnerContainer: params.navbarInnerContainer,
        fromPage: params.fromPage
    };
    if (params.fromPage && !params.fromPage.navbarInnerContainer && params.oldNavbarInnerContainer) {
        params.fromPage.navbarInnerContainer = params.oldNavbarInnerContainer;
    }

    if (pageContainer.f7PageInitialized && (view && view.params.domCache || !view && (0, _dom2.default)(pageContainer).parents('.popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal').length > 0)) {
        // Reinit Page
        pages.reinitPage(pageContainer);

        // Callbacks
        pages.triggerPageCallbacks('reinit', pageData.name, pageData);
        (0, _dom2.default)(pageData.container).trigger('pageReinit', { page: pageData });
        return;
    }
    pageContainer.f7PageInitialized = true;

    // Store pagedata in page
    pageContainer.f7PageData = pageData;

    // Update View's activePage
    if (view && !params.preloadOnly && !params.reloadPrevious) {
        // Add data-page on view
        (0, _dom2.default)(view.container).attr('data-page', pageData.name);
        // Update View active page data
        view.activePage = pageData;
    }

    // Before Init Callbacks
    pages.triggerPageCallbacks('beforeInit', pageData.name, pageData);
    (0, _dom2.default)(pageData.container).trigger('pageBeforeInit', { page: pageData });

    // Init page
    pages.initPage(pageContainer);

    // Init Callback
    //app.pluginHook('pageInit', pageData);
    pages.triggerPageCallbacks('init', pageData.name, pageData);
    // console.log('pageData.container', pageData.container)
    (0, _dom2.default)(pageData.container).trigger('pageInit', { page: pageData });
};
pages.pageRemoveCallback = function (view, pageContainer, position) {
    var pageContext;
    if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
    // Page Data
    var pageData = {
        container: pageContainer,
        name: (0, _dom2.default)(pageContainer).attr('data-page'),
        view: view,
        url: pageContainer.f7PageData && pageContainer.f7PageData.url,
        query: pageContainer.f7PageData && pageContainer.f7PageData.query,
        navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
        from: position,
        context: pageContext
    };
    // Before Init Callback
    pages.triggerPageCallbacks('beforeRemove', pageData.name, pageData);
    (0, _dom2.default)(pageData.container).trigger('pageBeforeRemove', { page: pageData });
};
pages.pageBackCallback = function (callback, view, params) {
    // Page Data
    var pageContainer = params.pageContainer;
    var pageContext;
    if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;

    var pageData = {
        container: pageContainer,
        name: (0, _dom2.default)(pageContainer).attr('data-page'),
        url: pageContainer.f7PageData && pageContainer.f7PageData.url,
        query: pageContainer.f7PageData && pageContainer.f7PageData.query,
        view: view,
        from: params.position,
        context: pageContext,
        navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
        swipeBack: params.swipeBack
    };

    if (callback === 'after') {
        pages.triggerPageCallbacks('afterBack', pageData.name, pageData);
        (0, _dom2.default)(pageContainer).trigger('pageAfterBack', { page: pageData });
    }
    if (callback === 'before') {
        pages.triggerPageCallbacks('back', pageData.name, pageData);
        (0, _dom2.default)(pageData.container).trigger('pageBack', { page: pageData });
    }
};
pages.pageAnimCallback = function (callback, view, params) {
    var pageContainer = params.pageContainer;
    var pageContext;
    if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;

    var pageQuery = params.query;
    if (!pageQuery) {
        if (params.url && params.url.indexOf('?') > 0) {
            pageQuery = _url2.default.parseUrlQuery(params.url || '');
        } else if (pageContainer.f7PageData && pageContainer.f7PageData.query) {
            pageQuery = pageContainer.f7PageData.query;
        } else {
            pageQuery = {};
        }
    }
    // Page Data
    var pageData = {
        container: pageContainer,
        url: params.url,
        query: pageQuery,
        name: (0, _dom2.default)(pageContainer).attr('data-page'),
        view: view,
        from: params.position,
        context: pageContext,
        swipeBack: params.swipeBack,
        navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
        fromPage: params.fromPage
    };
    var oldPage = params.oldPage,
        newPage = params.newPage;

    // Update page date
    pageContainer.f7PageData = pageData;

    if (callback === 'after') {
        pages.triggerPageCallbacks('afterAnimation', pageData.name, pageData);
        (0, _dom2.default)(pageData.container).trigger('pageAfterAnimation', { page: pageData });
    }
    if (callback === 'before') {
        // Add data-page on view
        (0, _dom2.default)(view.container).attr('data-page', pageData.name);

        // Update View's activePage
        if (view) view.activePage = pageData;

        // Hide/show navbar dynamically
        if (newPage.hasClass('no-navbar') && !oldPage.hasClass('no-navbar')) {
            view.hideNavbar();
        }
        if (!newPage.hasClass('no-navbar') && (oldPage.hasClass('no-navbar') || oldPage.hasClass('no-navbar-by-scroll'))) {
            view.showNavbar();
        }
        // Hide/show navbar toolbar
        if (newPage.hasClass('no-toolbar') && !oldPage.hasClass('no-toolbar')) {
            view.hideToolbar();
        }
        if (!newPage.hasClass('no-toolbar') && (oldPage.hasClass('no-toolbar') || oldPage.hasClass('no-toolbar-by-scroll'))) {
            view.showToolbar();
        }
        // Hide/show tabbar
        var tabBar;
        if (newPage.hasClass('no-tabbar') && !oldPage.hasClass('no-tabbar')) {
            tabBar = (0, _dom2.default)(view.container).find('.tabbar');
            if (tabBar.length === 0) tabBar = (0, _dom2.default)(view.container).parents('.views').find('.tabbar');
            //app.hideToolbar(tabBar);
        }
        if (!newPage.hasClass('no-tabbar') && (oldPage.hasClass('no-tabbar') || oldPage.hasClass('no-tabbar-by-scroll'))) {
            tabBar = (0, _dom2.default)(view.container).find('.tabbar');
            if (tabBar.length === 0) tabBar = (0, _dom2.default)(view.container).parents('.views').find('.tabbar');
            //app.showToolbar(tabBar);
        }

        oldPage.removeClass('no-navbar-by-scroll no-toolbar-by-scroll');
        // Callbacks
        pages.triggerPageCallbacks('beforeAnimation', pageData.name, pageData);
        (0, _dom2.default)(pageData.container).trigger('pageBeforeAnimation', { page: pageData });
    }
};

// Init Page Events and Manipulations
pages.initPage = function (pageContainer) {
    pageContainer = (0, _dom2.default)(pageContainer);
    if (pageContainer.length === 0) return;
};
pages.reinitPage = function (pageContainer) {
    pageContainer = (0, _dom2.default)(pageContainer);
    if (pageContainer.length === 0) return;
};
pages.initPageWithCallback = function (pageContainer) {
    pageContainer = (0, _dom2.default)(pageContainer);
    var viewContainer = pageContainer.parents('.view');
    if (viewContainer.length === 0) return;
    var view = viewContainer[0].f7View || undefined;
    var url = view && view.url ? view.url : undefined;
    if (viewContainer && pageContainer.attr('data-page')) {
        viewContainer.attr('data-page', pageContainer.attr('data-page'));
    }
    pages.pageInitCallback(view, { pageContainer: pageContainer[0], url: url, position: 'center' });
};

exports.default = pages;