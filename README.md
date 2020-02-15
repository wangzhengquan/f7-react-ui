先展示一些实例效果：https://wangzhengquan.github.io/f7-react-ui/examples/dist/index.html
 
工程搭建说明完整代码: `git clone -b simple-project https://github.com/wangzhengquan/react-redux-tpl` 

### 目标：搭建一个react工程，并且实现如下功能
* 实现手机的页面切换的过度效果
* 实现代码分片的懒加载

### 实现：工程搭建步骤如下

1 **下载一个脚手架**   
`git clone -b scaff https://github.com/wangzhengquan/react-redux-tpl`,因为这个工程是从旧有的项目中抽取出来的，还是基于react15 和 react-router2，所以修改package.json,如下：

```js
"react": "^15.0.0", 
"react-dom": "^15.0.0",  
"react-router": "^2.8.1",  
```
2  **新建路由文件 src/router.js**   
该文件时负责配置页面路由访问的

```js
import Modals from 'react-ui/modals'

var  hideNavbar = false

const rootRoute = {
  path: '/',
  component: require('./components/View'),
  indexRoute: {
    //懒加载处理，访问该页面时才会加载相关资源
    getComponents(nextState, cb) {
      //显示loadding
      Modals.showIndicator()

      //webpack split打包处理方式
      Promise.all([
        import('./components/home/HomeNavbar'),
        import('./components/home/HomePage')
      ]).then( ([navbar, page]) => {
        cb(null, {
          navbar: hideNavbar ? null : navbar,
          page: page

        })
        document.querySelector('title').innerHTML='Home'
        Modals.hideIndicator()
      })
    }
  },

  childRoutes: [{
    path: 'product',
    getComponents(nextState, cb) {
      Modals.showIndicator()
      Promise.all([
        import('./components/product/ProductNavbar'),
        import('./components/product/ProductPage')
      ]).then( ([navbar, page])  => {
          cb(null, {
            navbar: hideNavbar ? null : navbar,
            page: page
          })
          document.querySelector('title').innerHTML='Product'
          Modals.hideIndicator()
      })
    }
  }, {
    path: 'order',
    getComponents(nextState, cb) {
      Modals.showIndicator()
      Promise.all([
        import('./components/order/OrderNavbar'),
        import('./components/order/OrderPage')
      ]).then( ([navbar, page])  => {
          cb(null, {
            navbar: hideNavbar ? null : navbar,
            page: page
          })
          document.querySelector('title').innerHTML='Product'
          Modals.hideIndicator()
      })
    }
  }]

}

 
export default rootRoute;
```

3  **新建根组件文件 src/components/View.js**

```
import React from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'
import ReactUI from 'react-ui/react-ui'
import classNames from 'classnames';

class View extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render(){
    let navbar = this.props.navbar
    let page = this.props.page
    let toolbar =this.props.toolbar

    return (

        <div className={classNames('view view-main', this.props.className)} >
          {/*-----navbar------*/}
          <ReactTransitionGroup component="div" className={classNames('navbar', {'navbar-hidden': !!!navbar})}>
             {navbar ? React.cloneElement(navbar, {
                key: (this.props.location ? this.props.location.pathname.concat('/navbar') : ReactUI.guid() ),
                pageName: location.pathname==='/' ? 'index' : location.pathname.charAt(0) === '/' ? location.pathname.substring(1) : location.pathname
              }) : '' }
          </ReactTransitionGroup>

          {/*-----pages-------*/}
          <ReactTransitionGroup className={classNames('pages')} component="div">
            {React.cloneElement(page, {
              className: {'navbar-through': !!navbar, 'toolbar-through': !!toolbar, 'tabbar-labels-through': !!toolbar},
              key: (this.props.location ? this.props.location.pathname : ReactUI.guid() ),
              pageName: location.pathname==='/' ? 'index' : location.pathname.charAt(0) === '/' ? location.pathname.substring(1) : location.pathname
            })}
          </ReactTransitionGroup>

          {/*-----Toobar-------*/}
          
          { toolbar ? toolbar : ''}
          {/*-----toolbar end -------*/}
        </div>
    );
  }
  
}

module.exports = View

```
其中ReactTransitionGroup 是一个基础的动画组件，当子组件从中添加或移除时会触发相关的钩子函数,如：

```
componentWillAppear()
componentDidAppear()
componentWillEnter()
componentDidEnter()
componentWillLeave()
componentDidLeave()

```

**4 新建src/components/Page.js。**  
  在上面ReactTransitionGroup提供的几个hooks（钩子）函数的里面做动画处理，所有的page都继承该组件
  
  ```
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
    this.destroyList = []
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
      // Go isBack
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
      page.animationEnd(function () {
         page.removeClass(transitionClass).addClass(activeClass);
         finishCallback()
      });
  }

  componentDidMount(){
    this.node = this.node || $(ReactDOM.findDOMNode(this));
    //this.initPageScrollToolbars(node)

  }


  componentWillUnmount(){
    this.destroy()
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
    if(history.isBack){
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
    if(history.isBack){
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

    function handleScroll() {
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


  destroy(){
    this.destroyList.forEach((fun) => {
      fun()
    })
  }

  render(){
    return (
      <div className={classNames('page', this.props.className)} data-page={this.props.pageName}></div>
      
    );
  }
  
}
Page.anim = true
  ```
**5 新建src/components/Navbar.js。**  
同上面的page一样的功能，做Navbar的动画处理，所有的Navbar都继承该Navbar

```
/* eslint no-console: 0 */
import React  from 'react';
import ReactDOM from 'react-dom';
import $ from 'react-ui/dom'
import history from '../history'
// import PARAMS from 'react-ui/params'
import Navbars from 'react-ui/navbars'
const transitionDuration = 400;
const animateNavBackIcon = true

export default  class Navbar extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        title: this.props.title
      }
    }

   /**
    * Prepare navbar before animarion
    * @param  {[type]} newNavbarInner    [description]
    * @param  {[type]} newNavbarPosition [description]
    * @return {[type]}                   [description]
    */
    prepareNavbar (newNavbarInner, newNavbarPosition) {
      if(newNavbarPosition === 'right'){
        newNavbarInner.addClass('navbar-on-right')
      } else if(newNavbarPosition === 'left'){
        newNavbarInner.addClass('navbar-on-left')
      }

      $(newNavbarInner).find('.sliding').each(function () {
          var sliding = $(this);
          var slidingOffset = newNavbarPosition === 'right' ? this.f7NavbarRightOffset : this.f7NavbarLeftOffset;
          if (animateNavBackIcon) {
              if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                  sliding.find('.back .icon').transform('translate3d(' + (-slidingOffset) + 'px,0,0)');
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
    animateNavbars (navbarInner, action, direction, finishCallback) {
      // Loading new page
      navbarInner = $(navbarInner);
      var removeClasses = 'navbar-on-right navbar-on-center navbar-on-left';
      if (direction === 'to-left') {
          if(action === 'enter'){
            navbarInner.removeClass(removeClasses).addClass('navbar-from-right-to-center');
             
           // window.setTimeout(function () {
           //    navbarInner.removeClass('navbar-from-right-to-center').addClass('navbar-on-center');
           //    finishCallback()
           // }, transitionDuration)

            navbarInner.find('.sliding').each(function (index) {
              console.log('sliding', arguments)
                var sliding = $(this);
                sliding.transform('translate3d(0px,0,0)');
                if(index===0) {
                  sliding.transitionEnd(function(){
                    navbarInner.removeClass('navbar-from-right-to-center').addClass('navbar-on-center');
                    finishCallback()
                  })
                }
                if (animateNavBackIcon) {
                    if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                        sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                    }
                }
            });
            
          } else if (action === 'leave'){
            navbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-left');
            
           // window.setTimeout(function (e) {
           //    navbarInner.removeClass('navbar-from-center-to-left').addClass('navbar-on-left');
           //    finishCallback()
           // }, transitionDuration);

            let rightNavbarInner = navbarInner.closest('.navbar').find('.navbar-inner:first-child')
            navbarInner.find('.sliding').each(function (index) {
                var sliding = $(this);
                var rightText;
                if (animateNavBackIcon) {
                    if (sliding.hasClass('center') && rightNavbarInner.find('.sliding.left .back .icon').length > 0) {
                        rightText = rightNavbarInner.find('.sliding.left .back span');
                        if (rightText.length > 0) this.f7NavbarLeftOffset += rightText[0].offsetLeft;
                    }
                    if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                        sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarLeftOffset) + 'px,0,0)');
                    }
                }
                // console.log('leave', this, this.f7NavbarLeftOffset)
                sliding.transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
                if(index === 0) {
                  sliding.transitionEnd(function(){
                    navbarInner.removeClass('navbar-from-center-to-left').addClass('navbar-on-left');
                    finishCallback()
                  })
                }
            });
            
          }
      }
      // Go back
      if (direction === 'to-right') {
        if(action === 'enter'){
          navbarInner.removeClass(removeClasses).addClass('navbar-from-left-to-center');
           
          //window.setTimeout(function () {
          //   navbarInner.removeClass('navbar-from-left-to-center').addClass('navbar-on-center');
          //   finishCallback()
          //}, transitionDuration);

          navbarInner.find('.sliding').each(function (index) {
              var sliding = $(this);
              sliding.transform('translate3d(0px,0,0)');
              if (animateNavBackIcon) {
                  if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                      sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                  }
              }
              if(index === 0) {
                sliding.transitionEnd(function(){
                  navbarInner.removeClass('navbar-from-left-to-center').addClass('navbar-on-center');
                  finishCallback()
                })
              }
          });
          
        } else if(action === 'leave'){
          navbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-right');
           
         // window.setTimeout(function () {
         //    navbarInner.removeClass('navbar-from-center-to-right').addClass('navbar-on-right');
         //    finishCallback()
         // }, transitionDuration);
          navbarInner.find('.sliding').each(function (index) {
              var sliding = $(this);
              if (animateNavBackIcon) {
                  if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                      sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarRightOffset) + 'px,0,0)');
                  }
              }
              sliding.transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
              if(index === 0) {
                sliding.transitionEnd(function(){
                  navbarInner.removeClass('navbar-from-center-to-right').addClass('navbar-on-right');
                  finishCallback()
                })
              }
          });
          
        }
      }
  }

  componentDidMount(){
    console.log('componentDidMount', this.props.location && this.props.location.pathname)
    var node = this.node = $(ReactDOM.findDOMNode(this));
    var onResize =  () => {
      Navbars.sizeNavbar(node)
    }
    $(window).on('resize', onResize);
    this.destroy = () => {
      $(window).off('resize', onResize)
    }
    Navbars.sizeNavbar(node)
  }

  componentWillUnMount(){
    this.destroy()
  }
  
  componentWillAppear(done) {
    console.log('componentWillAppear', this.props.location && this.props.location.pathname);
    done()

  }
  componentDidAppear () {
    console.log('componentDidAppear', this.props.location && this.props.location.pathname);
    //this._enterStyle();
  }
  componentWillEnter (done) {
    console.log('componentWillEnter', this.props.location && this.props.location.pathname);
    if (!Navbar.anim ){
      setTimeout(function(){
        Navbar.anim = true
      }, transitionDuration)
      done()
      return;
    }
    var node = this.node || $(ReactDOM.findDOMNode(this));
    if(history.isBack){
      this.prepareNavbar (node, 'left')
      setTimeout( () => {
        this.animateNavbars(node, 'enter', 'to-right', done)
      },0)
      
    }else{
      this.prepareNavbar (node, 'right')
      setTimeout( () => {
        this.animateNavbars(node, 'enter', 'to-left', done)
      }, 0)
      
    }
    
    
  }

  componentDidEnter () {
    console.log('componentDidEnter', this.props.location && this.props.location.pathname);
  }

  componentWillLeave (done) {
    console.log('componentWillLeave', this.props.location && this.props.location.pathname );
    if( !Navbar.anim ){
      done()
      return;
    }
    var node = this.node || $(ReactDOM.findDOMNode(this));
    if(history.isBack){
      this.animateNavbars(node, 'leave', 'to-right', done)
    } else {
      this.animateNavbars(node, 'leave', 'to-left', done)
    }
    
  }

  componentDidLeave () {
    console.log('componentDidLeave', this.props.location && this.props.location.pathname);
  }

  handleBackClick(e){
    e.preventDefault()
    history.go(-1)
  }

  render(){
    if(this.canBack === undefined){
      this.canBack = history.canBack;
    }
    
    return (
       <div className="navbar-inner" data-page={this.props.pageName}>
          {
          this.canBack ?
          <div className="left sliding" ><a onClick={this.handleBackClick.bind(this)} className="back link"><i className="icon icon-back" ></i><span>返回</span></a></div> : ''
          }
            
          <div className="center sliding">{this.state.title || ''}</div>
        </div>
    )
  }
}
Navbar.sizeNavbar = Navbars.sizeNavbar;
Navbar.sizeNavbars = Navbars.sizeNavbars;

Navbar.anim = true
```

**6 新建 src/history.js**

```
/* eslint no-console: 0 */

import { browserHistory } from 'react-router'
// import { hashHistory } from 'react-router'
// var browserHistory = hashHistory
const PATHS_LENGTH = -1
let paths = browserHistory.paths = browserHistory.paths || []

//防止测试环境加载两次的问题
if(!browserHistory.unlisten){

  browserHistory.unlisten = browserHistory.listen(location => {
    let pathname = location.pathname
    if(pathname.charAt(0) !== '/'){
      pathname = '/'.concat(pathname)
    }

    let len = paths.length

    //isBack标记是否时回退到上一页，还是进入到新一页，以显示不同的动画效果
    browserHistory.isBack = (len > 1 && pathname === paths[len-2])
    if(browserHistory.isBack) {
      paths.pop()
    } else if (len === 0 || paths[len-1] !== pathname){
      if(PATHS_LENGTH === -1 || len < PATHS_LENGTH){
        //不限制历史记录长度
         paths.push(pathname)
      }
      else{
        //超出限制历史记录长度
        for(let i = 0; i < len - 1; i++){
          paths[i] = paths[i+1]
        }
        paths[len - 1] = pathname
      }
    }
     
    //canback标记是否显示navbar的回退按钮
    browserHistory.canBack = (paths.length > 1)
  })


  window.addEventListener('popstate', function () {

    browserHistory.isBack = true
    
  })
}

export default browserHistory
```
**7 新建router里配置的页面和导航条**   
  src/home/HomeNavbar.js   
  src/home/HomePage.js   
  src/components/order/OrderNavbar.js  
  src/components/order/OrderPage.js  
  src/components/product/ProductNavbar.js  
  src/components/product/ProductPage.js    
  具体代码参考git仓库源码  
  
  **8 测试**   
  `npm start`  
  
  


