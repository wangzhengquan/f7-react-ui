import React  from 'react';
import ReactDOM from 'react-dom';
import $ from 'react-ui/dom'
import history from './history'
const animateNavBackIcon = false;
const transitionDuration= 400;
const rtl = false

export default  class Navbar extends React.Component{
  

    constructor(props) {
      super(props);
    }

    componentDidMount(){
      console.log('Navbar', this)
      var navbar = $(ReactDOM.findDOMNode(this));
      this.sizeNavbar(navbar)
    }

    sizeNavbar(_navbar){
      var n = $(_navbar);

      if (n.hasClass('cached')) return;
      var left = rtl ? n.find('.right') : n.find('.left'),
          right = rtl ? n.find('.left') : n.find('.right'),
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
      // RTL inverter
      var inverter = rtl ? -1 : 1;

      if (center.hasClass('sliding')) {
          center[0].f7NavbarLeftOffset = -(currLeft + diff) * inverter;
          center[0].f7NavbarRightOffset = (navbarWidth - currLeft - diff - centerWidth) * inverter;
          if (onLeft) {
              if (animateNavBackIcon) {
                  var activeNavbarBackLink = n.parent().find('.navbar-on-center').find('.left.sliding .back .icon ~ span');
                  if (activeNavbarBackLink.length > 0) {
                      center[0].f7NavbarLeftOffset += activeNavbarBackLink[0].offsetLeft;
                  }
              }
              center.transform('translate3d(' + center[0].f7NavbarLeftOffset + 'px, 0, 0)');
          }
      }
      if (!noLeft && left.hasClass('sliding')) {
          if (rtl) {
              left[0].f7NavbarLeftOffset = -(navbarWidth - left[0].offsetWidth) / 2 * inverter;
              left[0].f7NavbarRightOffset = leftWidth * inverter;
          }
          else {
              left[0].f7NavbarLeftOffset = -leftWidth;
              left[0].f7NavbarRightOffset = (navbarWidth - left[0].offsetWidth) / 2;
              if (animateNavBackIcon && left.find('.back .icon').length > 0) {
                  left[0].f7NavbarRightOffset -= left.find('.back .icon')[0].offsetWidth;
              }
          }
          if (onLeft) left.transform('translate3d(' + left[0].f7NavbarLeftOffset + 'px, 0, 0)');
      }
      if (!noRight && right.hasClass('sliding')) {
          if (rtl) {
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
          subnavbar[0].f7NavbarLeftOffset = rtl ? subnavbar[0].offsetWidth : -subnavbar[0].offsetWidth;
          subnavbar[0].f7NavbarRightOffset = -subnavbar[0].f7NavbarLeftOffset;
      }

      // Center left
      var centerLeft = diff;
      if (rtl && noLeft && noRight && center.length > 0) centerLeft = -centerLeft;
      center.css({left: centerLeft + 'px'});
    }

   /**
    * Prepare navbar before animarion
    * @param  {[type]} newNavbarInner    [description]
    * @param  {[type]} newNavbarPosition [description]
    * @return {[type]}                   [description]
    */
    prepareNavbar (newNavbarInner, newNavbarPosition) {
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
            window.setTimeout(function (e) {

               navbarInner.removeClass('navbar-from-right-to-center').addClass('navbar-on-center');
               finishCallback()
            }, transitionDuration)

            navbarInner.find('.sliding').each(function () {
                var sliding = $(this);
                sliding.transform('translate3d(0px,0,0)');
                if (animateNavBackIcon) {
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
            navbarInner.find('.sliding').each(function () {
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
                sliding.transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
            });
            
          }
      }
      // Go back
      if (direction === 'to-right') {
        if(action === 'enter'){
          navbarInner.removeClass(removeClasses).addClass('navbar-from-left-to-center');
          navbarInner.find('.sliding').each(function () {
              var sliding = $(this);
              sliding.transform('translate3d(0px,0,0)');
              if (animateNavBackIcon) {
                  if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                      sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                  }
              }
          });
          window.setTimeout(function (e) {
             navbarInner.removeClass('navbar-from-left-to-center').addClass('navbar-on-center');
             finishCallback()
          }, transitionDuration);
        } else if(action === 'leave'){
          navbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-right');
          navbarInner.find('.sliding').each(function () {
              var sliding = $(this);
              if (animateNavBackIcon) {
                  if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                      sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarRightOffset) + 'px,0,0)');
                  }
              }
              sliding.transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
          });
          window.setTimeout(function (e) {
             navbarInner.removeClass('navbar-from-center-to-right').addClass('navbar-on-right');
             finishCallback()
          }, transitionDuration);
        }
      }
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
    console.log('componentWillEnter', this.props.location && this.props.location.pathname, history.paths);
    if( !Navbar.anim ){
       
      done()
      return;
    }
    var navbarinner = $(ReactDOM.findDOMNode(this));
    if(history.inBack){
      this.prepareNavbar (navbarinner, 'left')
      this.animateNavbars(navbarinner, 'enter', 'to-right', done)
    }else{
      this.prepareNavbar (navbarinner, 'right')
      this.animateNavbars(navbarinner, 'enter', 'to-left', done)
    }
    
    
  }

  componentDidEnter () {
    console.log('componentDidEnter', this.props.location && this.props.location.pathname);
  }

  componentWillLeave (done) {
    console.log('componentWillLeave', this.props.location && this.props.location.pathname , history.paths);
    if( !Navbar.anim ){
       Navbar.anim = true
      done()
      return;
    }
    var navbarinner = $(ReactDOM.findDOMNode(this));
    if(history.inBack){
      this.animateNavbars(navbarinner, 'leave', 'to-right', done)

    } else {
      this.animateNavbars(navbarinner, 'leave', 'to-left', done)

    }
    
  }

  componentDidLeave () {
    console.log('componentDidLeave', this.props.location && this.props.location.pathname);
  }

  render(){
    return (
      <div className="navbar-inner" ref="navbarinner"></div>
    )
  }
}
 Navbar.anim = true
