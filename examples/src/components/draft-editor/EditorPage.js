import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import Editor from 'react-ui/draft-editor/editor'
// require('react-ui/editor/plugins/image')
// require('react-ui/editor/lang/zh_CN')

class EditorPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
   
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>

	    <div className="page-content" >
         <Editor/>
	    </div>
      
	  </div>
  	)
  }
}

module.exports = EditorPage
