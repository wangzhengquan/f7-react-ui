import React  from 'react';
import ReactDOM from 'react-dom';
import history from '../history'
import $ from 'react-ui/dom'
import classNames from 'classnames';
const transitionDuration= 400;
const params = {
 
 hideNavbarOnPageScroll : true ,
 hideToolbarOnPageScroll : false ,
 hideTabbarOnPageScroll : false ,
 showBarsOnPageScrollEnd : false ,
 showBarsOnPageScrollTop : true 
}


export default class Page extends React.Component{
  constructor(props) {
    super(props);
  }
// Set pages classess for animationEnd
  animatePages(page, action, direction, finishCallback) {
      // Loading new page
      let removeClasses = 'page-on-center page-on-right page-on-left';
      let transitionClass = null;
      let activeClass = null;
       
      if (direction === 'to-left') {
        if(action ==='leave') {
          transitionClass = 'page-from-center-to-left';
          activeClass = 'page-on-left'
        }
        else if(action === 'enter'){
          transitionClass = 'page-from-right-to-center';
          activeClass = 'page-on-center'
        }
      }
      // Go inBack
      else if (direction === 'to-right') {
        if(action === 'enter'){
          transitionClass = 'page-from-left-to-center';
          activeClass = 'page-on-center'
        }
        else if(action  === 'leave'){
          transitionClass = 'page-from-center-to-right';
          activeClass = 'page-on-right'
        }
      }

      page.removeClass(removeClasses).addClass(transitionClass);
      page.animationEnd(function (e) {
         page.removeClass(transitionClass).addClass(activeClass);
         finishCallback()
      });
  }

  componentDidMount(){
    var node = this.node = this.node || $(ReactDOM.findDOMNode(this));
    //this.initPageScrollToolbars(node)
  }

  componentWillAppear(done) {
    // console.log('componentWillAppear', this.props.location && this.props.location.pathname);
    done()

  }
  componentDidAppear () {
    // console.log('componentDidAppear', this.props.location && this.props.location.pathname);
  }
  componentWillEnter (done) {
    if( !Page.anim ){
      done()
      return;
    }
    var page = $(ReactDOM.findDOMNode(this));
    if(history.inBack){
      this.animatePages(page, 'enter', 'to-right', done)
    }else{
      this.animatePages(page, 'enter', 'to-left', done)
    }
    
    
  }
  componentDidEnter () {
    // console.log('componentDidEnter', this.props.location && this.props.location.pathname);
  }
  componentWillLeave (done) {
    // console.log('componentWillLeave', this.props.location && this.props.location.pathname , history.paths);
    if (!Page.anim ){
      setTimeout(function(){
        Page.anim = true
      }, transitionDuration)
      
      done()
      return;
    }
    var page = $(ReactDOM.findDOMNode(this));
    if(history.inBack){
      this.animatePages(page, 'leave', 'to-right', done)

    } else {
      this.animatePages(page, 'leave', 'to-left', done)

    }
    
  }
  componentDidLeave () {
    // console.log('componentDidLeave', this.props.location && this.props.location.pathname);
  }

  initPageScrollToolbars  (pageContainer) {
    var me = this
    pageContainer = $(pageContainer);
    var scrollContent = pageContainer.find('.page-content');
    if (scrollContent.length === 0) return;
    var hideNavbar = (params.hideNavbarOnPageScroll || scrollContent.hasClass('hide-navbar-on-scroll') || scrollContent.hasClass('hide-bars-on-scroll')) && !(scrollContent.hasClass('keep-navbar-on-scroll') || scrollContent.hasClass('keep-bars-on-scroll'));
    var hideToolbar = (params.hideToolbarOnPageScroll || scrollContent.hasClass('hide-toolbar-on-scroll') || scrollContent.hasClass('hide-bars-on-scroll')) && !(scrollContent.hasClass('keep-toolbar-on-scroll') || scrollContent.hasClass('keep-bars-on-scroll'));
    var hideTabbar = (params.hideTabbarOnPageScroll || scrollContent.hasClass('hide-tabbar-on-scroll')) && !(scrollContent.hasClass('keep-tabbar-on-scroll'));

    if (!(hideNavbar || hideToolbar || hideTabbar)) return;
    
    var viewContainer = scrollContent.parents('.views' );
    if (viewContainer.length === 0) return;

    var navbar = viewContainer.find('.navbar'), 
        toolbar = viewContainer.find('.toolbar'), 
        tabbar;
    if (hideTabbar) {
        tabbar = viewContainer.find('.tabbar');
        if (tabbar.length === 0) tabbar = viewContainer.parents('.views' ).find('.tabbar');
    }

    var hasNavbar = navbar.length > 0,
        hasToolbar = toolbar.length > 0,
        hasTabbar = tabbar && tabbar.length > 0;

    var previousScroll, currentScroll;
        previousScroll = currentScroll = scrollContent[0].scrollTop;

    var scrollHeight, offsetHeight, reachEnd, action, navbarHidden, toolbarHidden, tabbarHidden;

    var toolbarHeight = (hasToolbar && hideToolbar) ? toolbar[0].offsetHeight : 0;
    var tabbarHeight = (hasTabbar && hideTabbar) ? tabbar[0].offsetHeight : 0;
    var bottomBarHeight = tabbarHeight || toolbarHeight;

    function handleScroll(e) {
        if (pageContainer.hasClass('page-on-left')) return;
        currentScroll = scrollContent[0].scrollTop;
        scrollHeight = scrollContent[0].scrollHeight;
        offsetHeight = scrollContent[0].offsetHeight;
        reachEnd =  currentScroll + offsetHeight >= scrollHeight - bottomBarHeight;
        navbarHidden = navbar.hasClass('navbar-hidden');
        toolbarHidden = toolbar.hasClass('toolbar-hidden');
        tabbarHidden = tabbar && tabbar.hasClass('toolbar-hidden');
        // console.log('reachEnd', reachEnd,  currentScroll + offsetHeight ,  scrollHeight - bottomBarHeight)
        if (reachEnd) {
            if (params.showBarsOnPageScrollEnd) {
                action = 'show';
            }
        }
        else if (previousScroll > currentScroll) {
            if (params.showBarsOnPageScrollTop || currentScroll <= 44) {
                action = 'show';
            }
            else {
                action = 'hide';
            }
        }
        else {
            if (currentScroll > 44) {
                action = 'hide';
            }
            else {
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
        }
        else {
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

  destroyScrollToolbars (pageContainer) {
    pageContainer = $(pageContainer);
    var scrollContent = pageContainer.find('.page-content');
    if (scrollContent.length === 0) return;
    var handler = scrollContent[0].f7ScrollToolbarsHandler;
    if (!handler) return;
    scrollContent.off('scroll', scrollContent[0].f7ScrollToolbarsHandler);
  }

  // Hide/Show Navbars/Toolbars
  hideNavbar (navbarContainer) {
      $(navbarContainer).addClass('navbar-hidden');
      return true;
  }
  showNavbar (navbarContainer) {
      var navbar = $(navbarContainer);
      navbar.addClass('navbar-hiding').removeClass('navbar-hidden').transitionEnd(function () {
          navbar.removeClass('navbar-hiding');
      });
      return true;
  }
  hideToolbar (toolbarContainer) {
      $(toolbarContainer).addClass('toolbar-hidden');
      return true;
  }
  showToolbar (toolbarContainer) {
      var toolbar = $(toolbarContainer);
      toolbar.addClass('toolbar-hiding').removeClass('toolbar-hidden').transitionEnd(function () {
          toolbar.removeClass('toolbar-hiding');
      });
  }

  render(){
    return (
      <div className={classNames("page", this.props.className)}></div>
      
    );
  }
  
}
Page.anim = true
