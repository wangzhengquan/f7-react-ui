import React  from 'react';
import {Link} from 'react-router'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classNames from 'classnames';
import {List, ContentBlockTitle, ItemDivider, ListGroupTitle} from 'react-ui/list'

class TmpPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   

  
  render(){
  	return (
  	<div className={classNames( "page", this.props.className)}>
	    <div className="page-content">
	         
	    </div>
	  </div>
  	)
  }
}

module.exports = TmpPage
