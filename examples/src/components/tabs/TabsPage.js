import React  from 'react';
import {Link} from 'react-router'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classNames from 'classnames';
import {List, ContentBlockTitle, ItemDivider, ListGroupTitle} from 'react-ui/lists'

class TabsPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   

  
  render(){
  	return (
  	<div className={classNames( "page", this.props.className)}>
	    <div className="page-content">
	        <List>
	          <Link to="tabs-static" className="item-content item-link">
	              <div className="item-media"><i className="icon icon-f7"></i></div>
	              <div className="item-inner">
	                <div className="item-title">Static Tabs</div>
	              </div></Link>
	          <Link to="tabs-animated" className="item-content item-link">
	              <div className="item-media"><i className="icon icon-f7"></i></div>
	              <div className="item-inner">
	                <div className="item-title">Animated Tabs</div>
	              </div></Link>
	          <Link to="tabs-swipeable" className="item-content item-link">
	              <div className="item-media"><i className="icon icon-f7"></i></div>
	              <div className="item-inner">
	                <div className="item-title">Swipeable Tabs</div>
	                <div className="item-after"><span className="badge bg-green">NEW</span></div>
	              </div></Link>
	        </List>
	    </div>
	  </div>
  	)
  }
}

module.exports = TabsPage
