import React  from 'react';
import ReactDOM from 'react-dom';
import $ from './dom'
import history from './history'
import PARAMS from './params'
const transitionDuration= 400;

var sizeNavbar = function(navbarinner){
  var n = $(navbarinner);

  if (n.hasClass('cached')) return;
  var left = PARAMS.rtl ? n.find('.right') : n.find('.left'),
      right = PARAMS.rtl ? n.find('.left') : n.find('.right'),
      center = n.find('.center'),
      subnavbar = n.find('.subnavbar'),
      noLeft = left.length === 0,
      noRight = right.length === 0,
      leftWidth = noLeft ? 0 : left.outerWidth(true),
      rightWidth = noRight ? 0 : right.outerWidth(true),
      centerWidth = center.outerWidth(true),
      navbarStyles = n.styles(),
      navbarWidth = n[0].offsetWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10),
      onLeft = n.hasClass('navbar-on-left'),
      currLeft, diff;

  if (noRight) {
      currLeft = navbarWidth - centerWidth;
  }
  if (noLeft) {
      currLeft = 0;
  }
  if (!noLeft && !noRight) {
      currLeft = (navbarWidth - rightWidth - centerWidth + leftWidth) / 2;
  }
  var requiredLeft = (navbarWidth - centerWidth) / 2;
  if (navbarWidth - leftWidth - rightWidth > centerWidth) {
      if (requiredLeft < leftWidth) {
          requiredLeft = leftWidth;
      }
      if (requiredLeft + centerWidth > navbarWidth - rightWidth) {
          requiredLeft = navbarWidth - rightWidth - centerWidth;
      }
      diff = requiredLeft - currLeft;
  }
  else {
      diff = 0;
  }
  // PARAMS.RTL inverter
  var inverter = PARAMS.rtl ? -1 : 1;

  if (center.hasClass('sliding')) {
      center[0].f7NavbarLeftOffset = -(currLeft + diff) * inverter;
      center[0].f7NavbarRightOffset = (navbarWidth - currLeft - diff - centerWidth) * inverter;
      if (onLeft) {
          if (PARAMS.animateNavBackIcon) {
              var activeNavbarBackLink = n.parent().find('.navbar-on-center').find('.left.sliding .back .icon ~ span');
              if (activeNavbarBackLink.length > 0) {
                  center[0].f7NavbarLeftOffset += activeNavbarBackLink[0].offsetLeft;
              }
          }
          center.transform('translate3d(' + center[0].f7NavbarLeftOffset + 'px, 0, 0)');
      }
  }
  if (!noLeft && left.hasClass('sliding')) {
      if (PARAMS.rtl) {
          left[0].f7NavbarLeftOffset = -(navbarWidth - left[0].offsetWidth) / 2 * inverter;
          left[0].f7NavbarRightOffset = leftWidth * inverter;
      }
      else {
          left[0].f7NavbarLeftOffset = -leftWidth;
          left[0].f7NavbarRightOffset = (navbarWidth - left[0].offsetWidth) / 2;
          if (PARAMS.animateNavBackIcon && left.find('.back .icon').length > 0) {
              left[0].f7NavbarRightOffset -= left.find('.back .icon')[0].offsetWidth;
          }
      }
      if (onLeft) left.transform('translate3d(' + left[0].f7NavbarLeftOffset + 'px, 0, 0)');
  }
  if (!noRight && right.hasClass('sliding')) {
      if (PARAMS.rtl) {
          right[0].f7NavbarLeftOffset = -rightWidth * inverter;
          right[0].f7NavbarRightOffset = (navbarWidth - right[0].offsetWidth) / 2 * inverter;
      }
      else {
          right[0].f7NavbarLeftOffset = -(navbarWidth - right[0].offsetWidth) / 2;
          right[0].f7NavbarRightOffset = rightWidth;
      }
      if (onLeft) right.transform('translate3d(' + right[0].f7NavbarLeftOffset + 'px, 0, 0)');
  }
  if (subnavbar.length && subnavbar.hasClass('sliding')) {
      subnavbar[0].f7NavbarLeftOffset = PARAMS.rtl ? subnavbar[0].offsetWidth : -subnavbar[0].offsetWidth;
      subnavbar[0].f7NavbarRightOffset = -subnavbar[0].f7NavbarLeftOffset;
  }

  // Center left
  var centerLeft = diff;
  if (PARAMS.rtl && noLeft && noRight && center.length > 0) centerLeft = -centerLeft;
  center.css({left: centerLeft + 'px'});
}

var sizeNavbars = function (viewContainer) {
    if (PARAMS.material) return;
    var navbarInner = viewContainer ? $(viewContainer).find('.navbar .navbar-inner:not(.cached)') : $('.navbar .navbar-inner:not(.cached)');
    navbarInner.each(function () {
        sizeNavbar(this)
    })
};

export default  class Navbar extends React.Component{
    constructor(props) {
      super(props);
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
            window.setTimeout(function (e) {

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
          window.setTimeout(function (e) {
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
          window.setTimeout(function (e) {
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
    console.log("componentDidMount", this.props.location && this.props.location.pathname)
    var node = this.node = $(ReactDOM.findDOMNode(this));
    var onResize =  (event) => {
      sizeNavbar(node)
    }
    $(window).on('resize', onResize);
    this.destroy = () => {
      $(window).off('resize', onResize)
    }
    sizeNavbar(node)
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
    if(history.inBack){
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
    if(history.inBack){
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
       <div className="navbar-inner" >
          {
          this.canBack ? 
          <div className="left sliding" ><a onClick={this.handleBackClick.bind(this)} className="back link"><i className="icon icon-back" ></i><span>返回</span></a></div> : ''
          }
            
          <div className="center sliding">{this.props.title || ''}</div>
        </div>
    )
  }
}
Navbar.sizeNavbar = sizeNavbar;
Navbar.sizeNavbars = sizeNavbars;

Navbar.anim = true
