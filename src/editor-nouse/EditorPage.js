import React  from 'react';
import {Link} from 'react-router'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classnames from 'classnames';
import {List} from 'react-ui/lists'

class EditorPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
	      <form>
           <iframe className="ke-edit-iframe" frameBorder="0" style={{width: '100%', height: '100%'}}>
            <html>
              <body className="ke-content" contentEditable="true"><p>KindEditor</p></body>
            </html>
           </iframe>
        </form>
	    </div>

      <div className="toolbar">
        <div className="toolbar-inner"><a href="#" className="link">Dummy Link</a><a href="#" data-popover=".popover-menu" className="open-popover link">Menu</a></div>
      </div>
	  </div>
  	)
  }
}

module.exports = EditorPage
