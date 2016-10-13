import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';

class ContactsPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
	         未实现
	    </div>
	  </div>
  	)
  }
}

module.exports = ContactsPage
