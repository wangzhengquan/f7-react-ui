import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import Editor from 'react-ui/umeditor'
// require('react-ui/editor/plugins/image')
// require('react-ui/editor/lang/zh_CN')

class UMEditorPage extends AnimationPage{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
     
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

module.exports = UMEditorPage
