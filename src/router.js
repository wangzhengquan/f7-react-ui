/*======================================================
************   Navigation / Router   ************
======================================================*/
import $ from './dom'
import PARAMS from './params'
import t7 from './template'
import Navbars from './navbars'
import Pages from './pages'
// Size Navbars
var sizeNavbar =  Navbars.sizeNavbar

var router = {
    // Temporary DOM Element
    temporaryDom: document.createElement('div'),

    // Find page or navbar in passed container which are related to View
    findElement: function (selector, container, view, notCached) {
        container = $(container);
        if (notCached) selector = selector + ':not(.cached)';
        var found = container.find(selector);
        if (found.length > 1) {
            if (typeof view.selector === 'string') {
                // Search in related view
                found = container.find(view.selector + ' ' + selector);
            }
            if (found.length > 1) {
                // Search in main view
                found = container.find('.' + PARAMS.viewMainClass + ' ' + selector);
            }
        }
        if (found.length === 1) return found;
        else {
            // Try to find non cached
            if (!notCached) found = router.findElement(selector, container, view, true);
            if (found && found.length === 1) return found;
            else return undefined;
        }
    },

    // Set pages classess for animationEnd
    animatePages: function (leftPage, rightPage, direction, view) {
        // Loading new page
        var removeClasses = 'page-on-center page-on-right page-on-left';
        if (direction === 'to-left') {
            leftPage.removeClass(removeClasses).addClass('page-from-center-to-left');
            rightPage.removeClass(removeClasses).addClass('page-from-right-to-center');
        }
        // Go back
        if (direction === 'to-right') {
            leftPage.removeClass(removeClasses).addClass('page-from-left-to-center');
            rightPage.removeClass(removeClasses).addClass('page-from-center-to-right');

        }
    },

    // Prepare navbar before animarion
    prepareNavbar: function (newNavbarInner, oldNavbarInner, newNavbarPosition) {
        $(newNavbarInner).find('.sliding').each(function () {
            var sliding = $(this);
            var slidingOffset = newNavbarPosition === 'right' ? this.f7NavbarRightOffset : this.f7NavbarLeftOffset;

            if (PARAMS.animateNavBackIcon) {
                if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                    sliding.find('.back .icon').transform('translate3d(' + (-slidingOffset) + 'px,0,0)');
                }
            }
            sliding.transform('translate3d(' + slidingOffset + 'px,0,0)');
        });
    },

    // Set navbars classess for animation
    animateNavbars: function (leftNavbarInner, rightNavbarInner, direction, view) {
        // Loading new page
        var removeClasses = 'navbar-on-right navbar-on-center navbar-on-left';
        if (direction === 'to-left') {
            rightNavbarInner.removeClass(removeClasses).addClass('navbar-from-right-to-center');
            rightNavbarInner.find('.sliding').each(function () {
                var sliding = $(this);
                sliding.transform('translate3d(0px,0,0)');
                if (PARAMS.animateNavBackIcon) {
                    if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                        sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                    }
                }
            });

            leftNavbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-left');
            leftNavbarInner.find('.sliding').each(function () {
                var sliding = $(this);
                var rightText;
                if (PARAMS.animateNavBackIcon) {
                    if (sliding.hasClass('center') && rightNavbarInner.find('.sliding.left .back .icon').length > 0) {
                        rightText = rightNavbarInner.find('.sliding.left .back span');
                        if (rightText.length > 0) this.f7NavbarLeftOffset += rightText[0].offsetLeft;
                    }
                    if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                        sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarLeftOffset) + 'px,0,0)');
                    }
                }
                sliding.transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
            });
        }
        // Go back
        if (direction === 'to-right') {
            leftNavbarInner.removeClass(removeClasses).addClass('navbar-from-left-to-center');
            leftNavbarInner.find('.sliding').each(function () {
                var sliding = $(this);
                sliding.transform('translate3d(0px,0,0)');
                if (PARAMS.animateNavBackIcon) {
                    if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                        sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                    }
                }
            });

            rightNavbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-right');
            rightNavbarInner.find('.sliding').each(function () {
                var sliding = $(this);
                if (PARAMS.animateNavBackIcon) {
                    if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                        sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarRightOffset) + 'px,0,0)');
                    }
                }
                sliding.transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
            });
        }
    },

     
    preroute: function(view, options) {
        if ((PARAMS.preroute && PARAMS.preroute(view, options) === false) || (view && view.params.preroute && view.params.preroute(view, options) === false)) {
            return true;
        }
        else {
            return false;
        }
    },

    template7Render: function (view, options) {
        var url = options.url,
            content = options.content, //initial content
            t7_rendered_content = options.content, // will be rendered using Template7
            context = options.context, // Context data for Template7
            contextName = options.contextName,
            template = options.template, // Template 7 compiled template
            pageName = options.pageName;

        var t7_ctx, t7_template;
        if (typeof content === 'string') {
            if (url) {
                if (t7.template7Cache[url] && !options.ignoreCache) t7_template = t7.cache[url];
                else {
                    t7_template = t7.compile(content);
                    t7.cache[url] = t7_template;
                }
            }
            else t7_template = t7.compile(content);
        }
        else if (template) {
            t7_template = template;
        }

        if (context) t7_ctx = context;
        else {
            if (contextName) {
                if (contextName.indexOf('.') >= 0) {
                    var _ctx_path = contextName.split('.');
                    var _ctx = t7.data[_ctx_path[0]];
                    for (var i = 1; i < _ctx_path.length; i++) {
                        if (_ctx_path[i]) _ctx = _ctx[_ctx_path[i]];
                    }
                    t7_ctx = _ctx;
                }
                else t7_ctx = t7.data[contextName];
            }
            if (!t7_ctx && url) {
                t7_ctx = t7.data['url:' + url];
            }
            if (!t7_ctx && typeof content === 'string' && !template) {
                //try to find by page name in content
                var pageNameMatch = content.match(/(data-page=["'][^"^']*["'])/);
                if (pageNameMatch) {
                    var page = pageNameMatch[0].split('data-page=')[1].replace(/['"]/g, '');
                    if (page) t7_ctx = t7.data['page:' + page];
                }
            }
            if (!t7_ctx && template && t7.templates) {
                // Try to find matched template name in t7.templates
                for (var templateName in t7.templates) {
                    if (t7.templates[templateName] === template) t7_ctx = t7.data[templateName];
                }
            }
            if (!t7_ctx) t7_ctx = {};
        }

        if (t7_template && t7_ctx) {
            if (typeof t7_ctx === 'function') t7_ctx = t7_ctx();
            if (url) {
                // Extend data with URL query
                var query = $.parseUrlQuery(url);
                t7_ctx.url_query = {};
                for (var key in query) {
                    t7_ctx.url_query[key] = query[key];
                }
            }
            t7_rendered_content = t7_template(t7_ctx);
        }

        return {content: t7_rendered_content, context: t7_ctx};
    }
};


router._load = function (view, options) {
    options = options || {};
    var url = options.url,
        content = options.content, //initial content
        t7_rendered = {content: options.content},
        template = options.template, // Template 7 compiled template
        pageName = options.pageName,
        viewContainer = $(view.container),
        pagesContainer = $(view.pagesContainer),
        animatePages = options.animatePages,
        newPage, oldPage, pagesInView, i, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar, reloadPosition,
        isDynamicPage = typeof url === 'undefined' && content || template;

    if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;

    // Render with Template7
    if (PARAMS.template7Pages && typeof content === 'string' || template) {
        t7_rendered = router.template7Render(view, options);
        if (t7_rendered.content && !content) {
            content = t7_rendered.content;
        }
    }

    router.temporaryDom.innerHTML = '';

    // Parse DOM
    if (!pageName) {
        if ((typeof content === 'string') || (url && (typeof content === 'string'))) {
            router.temporaryDom.innerHTML = t7_rendered.content;
        } else {
            if ('length' in content && content.length > 1) {
                for (var ci = 0; ci < content.length; ci++) {
                    $(router.temporaryDom).append(content[ci]);
                }
            } else {
                $(router.temporaryDom).append(content);
            }
        }
    }

    // Reload position
    reloadPosition = options.reload && (options.reloadPrevious ? 'left' : 'center');

    // Find new page
    if (pageName) newPage = pagesContainer.find('.page[data-page="' + pageName + '"]');
    else {
        newPage = router.findElement('.page', router.temporaryDom, view);
    }

    // If page not found exit
    if (!newPage || newPage.length === 0 || (pageName && view.activePage && view.activePage.name === pageName)) {
        view.allowPageChange = true;
        return;
    }

    newPage.addClass(options.reload ? 'page-on-' + reloadPosition : 'page-on-right');

    // Find old page (should be the last one) and remove older pages
    pagesInView = pagesContainer.children('.page:not(.cached)');

    if (options.reload && options.reloadPrevious && pagesInView.length === 1)  {
        view.allowPageChange = true;
        return;
    }

    if (options.reload) {
        oldPage = pagesInView.eq(pagesInView.length - 1);
    }
    else {
        if (pagesInView.length > 1) {
            for (i = 0; i < pagesInView.length - 1; i++) {
                $(pagesInView[i]).addClass('cached');
            }
            // if (!view.params.domCache) {
            //     $(pagesInView[i]).remove();
            // }
            // else {
            //     $(pagesInView[i]).addClass('cached');
            // }
        }
        oldPage = pagesContainer.children('.page:not(.cached)');
    }
    newPage.removeClass('cached');

    // Dynamic navbar
    if (view.params.dynamicNavbar) {
        dynamicNavbar = true;
        // Find navbar
        if (pageName) {
            newNavbarInner = viewContainer.find('.navbar-inner[data-page="' + pageName + '"]');
        }
        else {
            newNavbarInner = router.findElement('.navbar-inner', router.temporaryDom, view);
        }
        if (!newNavbarInner || newNavbarInner.length === 0) {
            dynamicNavbar = false;
        }
        navbar = viewContainer.find('.navbar');
        if (options.reload) {
            oldNavbarInner = navbar.find('.navbar-inner:not(.cached):last-child');
        }
        else {
            oldNavbarInner = navbar.find('.navbar-inner:not(.cached)');
            if (oldNavbarInner.length > 0) {
                for (i = 0; i < oldNavbarInner.length - 1; i++) {
                  $(oldNavbarInner[i]).addClass('cached');
                    
                }

                oldNavbarInner = navbar.find('.navbar-inner:not(.cached)');
            }
        }
    }
    if (dynamicNavbar) {
        newNavbarInner.addClass(options.reload ? 'navbar-on-' + reloadPosition : 'navbar-on-right');
        newNavbarInner.removeClass('cached');
        newPage[0].f7RelatedNavbar = newNavbarInner[0];
        newNavbarInner[0].f7RelatedPage = newPage[0];
    }else {
      navbar.addClass('navbar-hidden')
    }

    // save content areas into view's cache
    if (!url) {
        var newPageName = pageName || newPage.attr('data-page');
        if (isDynamicPage) url = '#' + PARAMS.dynamicPageUrl.replace(/{{name}}/g, newPageName).replace(/{{index}}/g, view.history.length - (options.reload ? 1 : 0));
        else url = '#' + newPageName;
        // if (!view.params.domCache) {
        //     view.contentCache[url] = content;
        // }
        if (pageName) {
            view.pagesCache[url] = pageName;
        }
    }

    // Update View history
    view.url = url;
    if (options.reload) {
        var lastUrl = view.history[view.history.length - (options.reloadPrevious ? 2 : 1)];
        if (lastUrl &&
            lastUrl.indexOf('#') === 0 &&
            lastUrl in view.contentCache &&
            lastUrl !== url &&
            view.history.indexOf(lastUrl) === -1) {
            view.contentCache[lastUrl] = null;
            delete view.contentCache[lastUrl];
        }
        view.history[view.history.length - (options.reloadPrevious ? 2 : 1)] = url;
    }
    else {
        view.history.push(url);
    }

     
    // Dom manipulations
    if (options.reloadPrevious) {
        oldPage = oldPage.prev('.page');
        newPage.insertBefore(oldPage);
        if (dynamicNavbar) {
            oldNavbarInner = oldNavbarInner.prev('.navbar-inner');
            newNavbarInner.insertAfter(oldNavbarInner);
        }
    }
    else {
        pagesContainer.append(newPage[0]);
        if (dynamicNavbar) navbar.append(newNavbarInner[0]);
    }
    // Remove Old Page And Navbar
    if (options.reload) {
        if (view.initialPages.indexOf(oldPage[0]) >= 0) {
            oldPage.addClass('cached');
            if (dynamicNavbar) oldNavbarInner.addClass('cached');
        }
        else {
            oldPage.remove();
            if (dynamicNavbar) oldNavbarInner.remove();
        }
    }

     // Page Init Events
    Pages.pageInitCallback(view, {
        pageContainer: newPage[0],
        url: url,
        position: options.reload ? reloadPosition : 'right',
        navbarInnerContainer: dynamicNavbar ? newNavbarInner && newNavbarInner[0] : undefined,
        oldNavbarInnerContainer: dynamicNavbar ? oldNavbarInner && oldNavbarInner[0] : undefined,
        context: t7_rendered.context,
        query: options.query,
        fromPage: oldPage && oldPage.length && oldPage[0].f7PageData,
        reload: options.reload,
        reloadPrevious: options.reloadPrevious
    });

    // Navbar init event
    if (dynamicNavbar) {
        Navbars.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, options.reload ? reloadPosition : 'right');
    }

    var clickBack = function(event){
      var clicked = $(this);
      var url = clicked.attr('href');
      var isLink = clicked[0].nodeName.toLowerCase() === 'a';
      // Collect Clicked data- attributes
      var clickedData = clicked.dataset();

      if(isLink)
          event.preventDefault();
  
      var template = clickedData.template;
      if (clicked.hasClass('back') || template) {
           

          var pageName;
          if (!template) {
              if (url.indexOf('#') === 0 && url !== '#')  {
                  pageName = url.split('#')[1];
              }
              if (url === '#' && !clicked.hasClass('back')) return;
          }
          else {
              url = undefined;
          }

          var animatePages;
          if (typeof clickedData.animatePages !== 'undefined') {
              animatePages = clickedData.animatePages;
          }
          else {
              if (clicked.hasClass('with-animation')) animatePages = true;
              if (clicked.hasClass('no-animation')) animatePages = false;
          }

          var options = {
              animatePages: animatePages,
              ignoreCache: clickedData.ignoreCache,
              force: clickedData.force,
              reload: clickedData.reload,
              reloadPrevious: clickedData.reloadPrevious,
              pageName: pageName,
              pushState: clickedData.pushState,
              url: url
          };

          if (PARAMS.template7Pages) {
              options.contextName = clickedData.contextName;
              var context = clickedData.context;
              if (context) {
                  options.context = JSON.parse(context);
              }
          }
          if (template && template in t7.templates) {
              options.template = t7.templates[template];
          }

          if (clicked.hasClass('back')){
              // console.log('====back', options)
              view.router.back(options);

          }
           
      }
    }

    if(newNavbarInner && newNavbarInner.length > 0) {
      sizeNavbar(newNavbarInner[0]);
      newNavbarInner.on('click', '.back',clickBack)
    }

    newPage.on('click', '.back', clickBack)
    

    if (options.reload) {
        view.allowPageChange = true;
        return;
    }

    if (dynamicNavbar && animatePages) {
        router.prepareNavbar(newNavbarInner, oldNavbarInner, 'right');
    }
    // Force reLayout
    var clientLeft = newPage[0].clientLeft;

     // Before Anim Callback
    Pages.pageAnimCallback('before', view, {
        pageContainer: newPage[0],
        url: url,
        position: 'right',
        oldPage: oldPage,
        newPage: newPage,
        query: options.query,
        fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
    });

    function afterAnimation() {
        view.allowPageChange = true;
        newPage.removeClass('page-from-right-to-center page-on-right page-on-left').addClass('page-on-center');
        oldPage.removeClass('page-from-center-to-left page-on-center page-on-right').addClass('page-on-left');
        if (dynamicNavbar) {
            newNavbarInner.removeClass('navbar-from-right-to-center navbar-on-left navbar-on-right').addClass('navbar-on-center');
            oldNavbarInner.removeClass('navbar-from-center-to-left navbar-on-center navbar-on-right').addClass('navbar-on-left');
        }
        Pages.pageAnimCallback('after', view, {
            pageContainer: newPage[0],
            url: url,
            position: 'right',
            oldPage: oldPage,
            newPage: newPage,
            query: options.query,
            fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
        });
        if (!(view.params.swipeBackPage || view.params.preloadPreviousPage)) {
            oldPage.addClass('cached');
            if (dynamicNavbar) oldNavbarInner.addClass('cached');
             
        }
        if (view.params.uniqueHistory) {
            view.refreshPreviousPage();
        }
    }

    if (animatePages) {
        // Set pages before animation
        if (PARAMS.material && PARAMS.materialPageLoadDelay) {
            setTimeout(function () {
                router.animatePages(oldPage, newPage, 'to-left', view);
            }, PARAMS.materialPageLoadDelay);
        }
        else {
            router.animatePages(oldPage, newPage, 'to-left', view);
        }

        // Dynamic navbar animation
        if (dynamicNavbar) {
            setTimeout(function() {
                router.animateNavbars(oldNavbarInner, newNavbarInner, 'to-left', view);
            }, 0);
        }
        newPage.animationEnd(function (e) {
            afterAnimation();
        });
    }
    else {
        if (dynamicNavbar) newNavbarInner.find('.sliding, .sliding .back .icon').transform('');
        afterAnimation();
    }
    return [newNavbarInner && newNavbarInner[0], newPage[0]]

};

router.load = function (view, options) {
    if (router.preroute(view, options)) {
        return false;
    }
    options = options || {};
    var url = options.url;
    var content = options.content;
    var pageName = options.pageName;
    if (pageName) {
        if (pageName.indexOf('?') > 0) {
            options.query = $.parseUrlQuery(pageName);
            options.pageName = pageName = pageName.split('?')[0];
        }
    }
    var template = options.template;
    if (view.params.reloadPages === true) options.reload = true;

    if (!view.allowPageChange) return false;
    if (url && view.url === url && !options.reload && !view.params.allowDuplicateUrls) return false;
    view.allowPageChange = false;
     
    function proceed(content) {
        options.content = content;
        return router._load(view, options);
    }
    if (content || pageName) {
        return proceed(content);
    }
    else if (template) {
        return router._load(view, options);
    }

    if (!options.url || options.url === '#') {
        view.allowPageChange = true;
        return;
    }

     
    
};

router._back = function (view, options) {
    options = options || {};
    var url = options.url,
        content = options.content,
        t7_rendered = {content: options.content}, // will be rendered using Template7
        template = options.template, // Template 7 compiled template
        animatePages = options.animatePages,
        preloadOnly = options.preloadOnly,
        force = options.force,
        pageName = options.pageName;

    var viewContainer = $(view.container),
        pagesContainer = $(view.pagesContainer),
        pagesInView = pagesContainer.children('.page:not(.cached)'),
        oldPage, newPage, oldNavbarInner, newNavbarInner, navbar, navbarInners, dynamicNavbar, manipulateDom = true;

    if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;


    // Render with Template7
    if (PARAMS.template7Pages && typeof content === 'string' || template) {
        t7_rendered = router.template7Render(view, options);
        if (t7_rendered.content && !content) {
            content = t7_rendered.content;
        }
    }

    // Animation
    function afterAnimation() {
      Pages.pageBackCallback('after', view, {
          pageContainer: oldPage[0],
          url: url,
          position: 'center',
          oldPage: oldPage,
          newPage: newPage
      });
      Pages.pageAnimCallback('after', view, {
          pageContainer: newPage[0],
          url: url,
          position: 'left',
          oldPage: oldPage,
          newPage: newPage,
          query: options.query,
          fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
      });
      router.afterBack(view, oldPage[0], newPage[0]);
    }

    function animateBack() {
      // Page before animation callback
      Pages.pageBackCallback('before', view, {
          pageContainer: oldPage[0],
          url: url,
          position: 'center',
          oldPage: oldPage,
          newPage: newPage
      });
      Pages.pageAnimCallback('before', view, {
          pageContainer: newPage[0],
          url: url,
          position: 'left',
          oldPage: oldPage,
          newPage: newPage,
          query: options.query,
          fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
      });
      if (animatePages) {
          // Set pages before animation
          router.animatePages(newPage, oldPage, 'to-right', view);

          // Dynamic navbar animation
          if (dynamicNavbar) {
              setTimeout(function () {
                  router.animateNavbars(newNavbarInner, oldNavbarInner, 'to-right', view);
              }, 0);
          }

          newPage.animationEnd(function () {
              afterAnimation();
          });
      }
      else {
          if (dynamicNavbar) newNavbarInner.find('.sliding, .sliding .back .icon').transform('');
          afterAnimation();
      }
    }

    function parseNewPage() {
        router.temporaryDom.innerHTML = '';
        // Parse DOM
        if ((typeof content === 'string') || (url && (typeof content === 'string'))) {
            router.temporaryDom.innerHTML = t7_rendered.content;
        } else {
            if ('length' in content && content.length > 1) {
                for (var ci = 0; ci < content.length; ci++) {
                    $(router.temporaryDom).append(content[ci]);
                }
            } else {
                $(router.temporaryDom).append(content);
            }
        }
        newPage = router.findElement('.page', router.temporaryDom, view);

        if (view.params.dynamicNavbar) {
            // Find navbar
            newNavbarInner = router.findElement('.navbar-inner', router.temporaryDom, view);
        }
    }

    function setPages() {
        // If pages not found or there are still more than one, exit
        if (!newPage || newPage.length === 0) {
            view.allowPageChange = true;
            return;
        }
        if (view.params.dynamicNavbar) {
            if (!newNavbarInner || newNavbarInner.length === 0) {
                dynamicNavbar = false;
            }
            else {
                dynamicNavbar = true;
            }
        }
        newPage.addClass('page-on-left').removeClass('cached');
        if (dynamicNavbar) {
            navbar = viewContainer.find('.navbar');
            navbar.removeClass('navbar-hidden')
            navbarInners = viewContainer.find('.navbar-inner:not(.cached)');
            newNavbarInner.addClass('navbar-on-left').removeClass('cached');
        }

        // Remove/hide previous page in force mode
        // force 是指直接返还到指定页面
        if (force) {
            // 把pagesInView 可见的 /not cach）的page中的前一个删除，后面一个会在回退完成（afterBack方法）后删除
            var pageToRemove, navbarToRemove;
            pageToRemove = $(pagesInView[pagesInView.length - 2]);

            if (dynamicNavbar) navbarToRemove = $(pageToRemove[0] && pageToRemove[0].f7RelatedNavbar || navbarInners[navbarInners.length - 2]);
            if (view.initialPages.indexOf(pageToRemove[0]) >= 0) {
                if (pageToRemove.length && pageToRemove[0] !== newPage[0]) pageToRemove.addClass('cached');
                if (dynamicNavbar && navbarToRemove.length && navbarToRemove[0] !== newNavbarInner[0]) {
                    navbarToRemove.addClass('cached');
                }
            }
            else {
                var removeNavbar = dynamicNavbar && navbarToRemove.length;
                if (pageToRemove.length) {
                    Pages.pageRemoveCallback(view, pageToRemove[0], 'right');
                    if (removeNavbar) {
                        Navbars.navbarRemoveCallback(view, pageToRemove[0], navbar[0], navbarToRemove[0]);
                    }
                    pageToRemove.remove();
                    if (removeNavbar) navbarToRemove.remove();
                }
                else if (removeNavbar) {
                    Navbars.navbarRemoveCallback(view, pageToRemove[0], navbar[0], navbarToRemove[0]);
                    navbarToRemove.remove();
                }
            }
            pagesInView = pagesContainer.children('.page:not(.cached)');
            if (dynamicNavbar) {
                navbarInners = viewContainer.find('.navbar-inner:not(.cached)');
            }

            //只保留到指定页面历史记录的后一条（这条历史记录也会在回退完成后（afterBack方法）删除）
            if (view.history.indexOf(url) >= 0) {
                view.history = view.history.slice(0, view.history.indexOf(url) + 2);
            }
            else {
                if (view.history[[view.history.length - 2]]) {
                    view.history[view.history.length - 2] = url;
                }
                else {
                    view.history.unshift(url);
                }
            }
        }
         

        oldPage = $(pagesInView[pagesInView.length - 1]);
        if (oldPage[0] === newPage[0]) {
            oldPage = pagesContainer.children('.page.page-on-center');
            if (oldPage.length === 0 && view.activePage) oldPage = $(view.activePage.container);
        }

        if (dynamicNavbar && !oldNavbarInner) {
            oldNavbarInner = $(navbarInners[navbarInners.length - 1]);
            if (oldNavbarInner[0] === newNavbarInner[0]) {
                oldNavbarInner = navbar.children('.navbar-inner.navbar-on-center:not(.cached)');
            }
            if (oldNavbarInner.length === 0) {
                oldNavbarInner = navbar.children('.navbar-inner[data-page="'+oldPage.attr('data-page')+'"]');
            }
            if (oldNavbarInner.length === 0 || newNavbarInner[0] === oldNavbarInner[0]) dynamicNavbar = false;
        }

        if (dynamicNavbar) {
            if (manipulateDom) newNavbarInner.insertBefore(oldNavbarInner);
            newNavbarInner[0].f7RelatedPage = newPage[0];
            newPage[0].f7RelatedNavbar = newNavbarInner[0];
        }
        if (manipulateDom) newPage.insertBefore(oldPage);

        // Page Init Events
        Pages.pageInitCallback(view, {
            pageContainer: newPage[0],
            url: url,
            position: 'left',
            navbarInnerContainer: dynamicNavbar ? newNavbarInner[0] : undefined,
            oldNavbarInnerContainer: dynamicNavbar ? oldNavbarInner && oldNavbarInner[0] : undefined,
            context: t7_rendered.context,
            query: options.query,
            fromPage: oldPage && oldPage.length && oldPage[0].f7PageData,
            preloadOnly: preloadOnly
        });
        if (dynamicNavbar) {
            Navbars.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, 'right');
        }

        if (dynamicNavbar && newNavbarInner.hasClass('navbar-on-left') && animatePages) {
            router.prepareNavbar(newNavbarInner,  oldNavbarInner, 'left');
        }

        if (preloadOnly) {
            view.allowPageChange = true;
            return;
        }

        // Update View's URL
        view.url = url;

        // Force reLayout
        var clientLeft = newPage[0].clientLeft;

        animateBack();

        return;
    }

    // Simple go back when we have pages on left
    if (pagesInView.length > 1 && !force) {
        // Exit if only preloadOnly
        if (preloadOnly) {
            view.allowPageChange = true;
            return;
        }
        // Update View's URL
        view.url = view.history[view.history.length - 2];
        url = view.url;

        // Define old and new pages
        newPage = $(pagesInView[pagesInView.length - 2]);
        oldPage = $(pagesInView[pagesInView.length - 1]);

        // Dynamic navbar
        if (view.params.dynamicNavbar) {
            dynamicNavbar = true;

            // Find navbar
            navbarInners = viewContainer.find('.navbar-inner:not(.cached)');
            newNavbarInner = $(navbarInners[0]);
            oldNavbarInner = $(navbarInners[1]);
            if (newNavbarInner.length === 0 || oldNavbarInner.length === 0 || oldNavbarInner[0] === newNavbarInner[0]) {
                dynamicNavbar = false;
            }
        }
        manipulateDom = false;
        setPages();
        return;
    }

    if (!force) {
        // Go back when there is no pages on left
        if (!preloadOnly) {
            view.url = view.history[view.history.length - 2];
            url = view.url;
        }

        if (content) {
            parseNewPage();
            setPages();
            return;
        }
        else if (pageName) {
            // Get dom cached pages
            newPage = $(viewContainer).find('.page[data-page="' + pageName + '"]');
            if (view.params.dynamicNavbar) {
                newNavbarInner = $(viewContainer).find('.navbar-inner[data-page="' + pageName + '"]');
                if (newNavbarInner.length === 0 && newPage[0].f7RelatedNavbar) {
                    newNavbarInner = $(newPage[0].f7RelatedNavbar);
                }
                if (newNavbarInner.length === 0 && newPage[0].f7PageData) {
                    newNavbarInner = $(newPage[0].f7PageData.navbarInnerContainer);
                }
            }
            setPages();
            return;
        }
        else {
            view.allowPageChange = true;
            return;
        }
    }
    else {
        if (url && url === view.url || pageName && view.activePage && view.activePage.name === pageName) {
            view.allowPageChange = true;
            return;
        }
        // Go back with force url
        if (content) {
            parseNewPage();
            setPages();
            return;
        }
        else if (pageName) {
            if (pageName) url = '#' + pageName;

            newPage = $(viewContainer).find('.page[data-page="' + pageName + '"]');
            if (newPage[0].f7PageData && newPage[0].f7PageData.url) {
                url = newPage[0].f7PageData.url;
            }
            if (view.params.dynamicNavbar) {
                newNavbarInner = $(viewContainer).find('.navbar-inner[data-page="' + pageName + '"]');
                if (newNavbarInner.length === 0 && newPage[0].f7RelatedNavbar) {
                    newNavbarInner = $(newPage[0].f7RelatedNavbar);
                }
                if (newNavbarInner.length === 0 && newPage[0].f7PageData) {
                    newNavbarInner = $(newPage[0].f7PageData.navbarInnerContainer);
                }
            }
            setPages();
            return;
        }
        else {
            view.allowPageChange = true;
            return;
        }
    }

};
router.back = function (view, options) {
    if (router.preroute(view, options)) {
        return false;
    }
    options = options || {};
    var url = options.url;
    var content = options.content;
    var pageName = options.pageName;
    if (pageName) {
        if (pageName.indexOf('?') > 0) {
            options.query = $.parseUrlQuery(pageName);
            options.pageName = pageName = pageName.split('?')[0];
        }
    }
    var force = options.force;
    if (!view.allowPageChange) return false;
    view.allowPageChange = false;
    
    var pagesInView = $(view.pagesContainer).find('.page:not(.cached)');

    function proceed(content) {
      options.content = content;
      router._back(view, options);
    }
    if (pagesInView.length > 1) {
        // Simple go back to previos page in view
        router._back(view, options);
        return;
    }

    if (!force) {
        url = options.url = view.history[view.history.length - 2];
        if (!url) {
            view.allowPageChange = true;
            return;
        }
        if (url.indexOf('#') === 0 && view.contentCache[url]) {
            proceed(view.contentCache[url]);
            return;
        }
        else if (url.indexOf('#') === 0) {
            if (!pageName) options.pageName = url.split('#')[1];
            proceed();
            return;
        }
         
    }
    else {
        // Go back with force url
        if (!url && content) {
            proceed(content);
            return;
        }
        else if (!url && pageName) {
            if (pageName) url = '#' + pageName;
            proceed();
            return;
        }
         
    }
    view.allowPageChange = true;
    return;
     
};

router.afterBack = function (view, oldPage, newPage) {
    // Remove old page and set classes on new one
    oldPage = $(oldPage);
    newPage = $(newPage);

    if (view.initialPages.indexOf(oldPage[0]) >= 0) {
        oldPage.removeClass('page-from-center-to-right').addClass('cached');
    }
    else {
        Pages.pageRemoveCallback(view, oldPage[0], 'right');
        oldPage.trigger('pageBeforeRemove', {
          view:view,
          page :oldPage[0]
        })
        oldPage.remove();
    }

    newPage.removeClass('page-from-left-to-center page-on-left').addClass('page-on-center');
    view.allowPageChange = true;

    // Update View's History
    view.history.pop();

    var newNavbar;

    // Updated dynamic navbar
    if (view.params.dynamicNavbar) {
        var inners = $(view.container).find('.navbar-inner:not(.cached)');
        var oldNavbar = $(oldPage[0].f7RelatedNavbar || inners[1]);
        if (view.initialNavbars.indexOf(oldNavbar[0]) >= 0) {
            oldNavbar.removeClass('navbar-from-center-to-right').addClass('cached');
        }
        else {
            Navbars.navbarRemoveCallback(view, oldPage[0], undefined, oldNavbar[0]);
            oldNavbar.remove();
        }
        newNavbar = $(inners[0]).removeClass('navbar-on-left navbar-from-left-to-center').addClass('navbar-on-center');
    }

    // Remove pages in dom cache
    $(view.container).find('.page.cached').each(function () {
     // debugger
        var page = $(this);
        var index = page.index();
        var pageUrl = page[0].f7PageData && page[0].f7PageData.url;
        console.log(view.history)
         console.log('del',pageUrl, view.history.indexOf(pageUrl) < 0, view.initialPages.indexOf(this) < 0)
        if (pageUrl && view.history.indexOf(pageUrl) < 0 && view.initialPages.indexOf(this) < 0) {
          Pages.pageRemoveCallback(view, page[0], 'right');
          if (page[0].f7RelatedNavbar && view.params.dynamicNavbar) {
              Navbars.navbarRemoveCallback(view, page[0], undefined, page[0].f7RelatedNavbar);
          }
          page.remove();
          if (page[0].f7RelatedNavbar && view.params.dynamicNavbar) $(page[0].f7RelatedNavbar).remove();
        }
    });

     

    // Preload previous page
    if (view.params.preloadPreviousPage) {
      if (view.history.length > 1) {
          var preloadUrl = view.history[view.history.length - 2];
          var previousPage;
          var previousNavbar;
          if (preloadUrl && view.pagesCache[preloadUrl]) {
              // Load by page name
              previousPage = $(view.container).find('.page[data-page="' + view.pagesCache[preloadUrl] + '"]');
              if (previousPage.next('.page')[0] !== newPage[0]) previousPage.insertBefore(newPage);
              if (newNavbar) {
                  previousNavbar = $(view.container).find('.navbar-inner[data-page="' + view.pagesCache[preloadUrl] + '"]');
                  if(!previousNavbar || previousNavbar.length === 0) previousNavbar = newNavbar.prev('.navbar-inner.cached');
                  if (previousNavbar.next('.navbar-inner')[0] !== newNavbar[0]) previousNavbar.insertBefore(newNavbar);
              }
          }
          else {
              // Just load previous page
              previousPage = newPage.prev('.page.cached');
              if (newNavbar) previousNavbar = newNavbar.prev('.navbar-inner.cached');
          }
          if (previousPage && previousPage.length > 0) previousPage.removeClass('cached page-on-right page-on-center').addClass('page-on-left');
          if (previousNavbar && previousNavbar.length > 0) previousNavbar.removeClass('cached navbar-on-right navbar-on-center').addClass('navbar-on-left');
      }
      else {
          router.back(view, {preloadOnly: true});
      }
    }

};

export default router;
