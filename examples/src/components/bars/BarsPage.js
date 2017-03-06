import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
class BarsPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
  
  componentDidMount(){
  }
 
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
        <div className="list-block">
          <ul>
            <li><a href="bars-deep-navbar.html" className="item-link">
                <div className="item-content">
                  <div className="item-media"><i className="icon icon-f7"></i></div>
                  <div className="item-inner">
                    <div className="item-title">Deep Dynamic Navbar</div>
                  </div>
                </div></a></li>
            <li><a href="bars-hide.html" className="item-link">
                <div className="item-content">
                  <div className="item-media"><i className="icon icon-f7"></i></div>
                  <div className="item-inner">
                    <div className="item-title">Hide Navbar & Toolbar</div>
                  </div>
                </div></a></li>
            <li><a href="bars-tabbar.html" className="item-link">
                <div className="item-content">
                  <div className="item-media"><i className="icon icon-f7"></i></div>
                  <div className="item-inner">
                    <div className="item-title">Tab Bar</div>
                  </div>
                </div></a></li>
            <li><a href="bars-tabbar-labels.html" className="item-link">
                <div className="item-content">
                  <div className="item-media"><i className="icon icon-f7"></i></div>
                  <div className="item-inner">
                    <div className="item-title">Tab Bar With Labels</div>
                  </div>
                </div></a></li>
            <li><a href="bars-hide-on-scroll.html" className="item-link">
                <div className="item-content">
                  <div className="item-media"><i className="icon icon-f7"></i></div>
                  <div className="item-inner">
                    <div className="item-title">Hide Bars On Scroll</div>
                  </div>
                </div></a></li>
            <li><a href="bars-sub-navbar.html" className="item-link">
                <div className="item-content">
                  <div className="item-media"><i className="icon icon-f7"></i></div>
                  <div className="item-inner">
                    <div className="item-title">Sub Navbar</div>
                  </div>
                </div></a></li>
          </ul>
        </div>
      </div>
	  </div>
  	)
  }
}
module.exports = BarsPage