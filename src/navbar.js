/* eslint no-console: 0 */
import React  from 'react';
import ReactDOM from 'react-dom';
import $ from './dom'
import history from './history'
import PARAMS from './params'
import Navbars from './navbars'
const transitionDuration= 400;


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
          if (PARAMS.animateNavBackIcon) {
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
            window.setTimeout(function () {
               navbarInner.removeClass('navbar-from-right-to-center').addClass('navbar-on-center');
               finishCallback()
            }, transitionDuration)

            navbarInner.find('.sliding').each(function () {
                var sliding = $(this);
                sliding.transform('translate3d(0px,0,0)');
                if (PARAMS.animateNavBackIcon) {
                    if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                        sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                    }
                }
            });
            
          } else if (action === 'leave'){
            navbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-left');
            window.setTimeout(function (e) {
               navbarInner.removeClass('navbar-from-center-to-left').addClass('navbar-on-left');
               finishCallback()
            }, transitionDuration);

            let rightNavbarInner = navbarInner.closest('.navbar').find('.navbar-inner:first-child')
            navbarInner.find('.sliding').each(function () {
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
                // console.log('leave', this, this.f7NavbarLeftOffset)
                sliding.transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
            });
            
          }
      }
      // Go back
      if (direction === 'to-right') {
        if(action === 'enter'){
          navbarInner.removeClass(removeClasses).addClass('navbar-from-left-to-center');
          window.setTimeout(function () {
             navbarInner.removeClass('navbar-from-left-to-center').addClass('navbar-on-center');
             finishCallback()
          }, transitionDuration);

          navbarInner.find('.sliding').each(function () {
              var sliding = $(this);
              sliding.transform('translate3d(0px,0,0)');
              if (PARAMS.animateNavBackIcon) {
                  if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                      sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                  }
              }
          });
          
        } else if(action === 'leave'){
          navbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-right');
          window.setTimeout(function () {
             navbarInner.removeClass('navbar-from-center-to-right').addClass('navbar-on-right');
             finishCallback()
          }, transitionDuration);
          navbarInner.find('.sliding').each(function () {
              var sliding = $(this);
              if (PARAMS.animateNavBackIcon) {
                  if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                      sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarRightOffset) + 'px,0,0)');
                  }
              }
              sliding.transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
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
      },17)
      
    }else{
      this.prepareNavbar (node, 'right')
      setTimeout( () => {
        this.animateNavbars(node, 'enter', 'to-left', done)
      }, 17)
      
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
       <div className="navbar-inner" data-page={location.pathname==='/' ? 'index' : location.pathname.charAt(0) === '/' ? location.pathname.substring(1) : location.pathname}>
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
