import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import Editor from 'react-ui/editor'
// require('react-ui/editor/plugins/image')
require('react-ui/editor/lang/zh_CN')

class EditorPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
    this.editor = Editor.create('textarea[name="content"]', {
          resizeType : 1,
          allowPreviewEmoticons : false,
          allowImageUpload : true,
          // fullscreenMode: true,
          width: '100%',
          height: '100%',
          items : [
            'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
            'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
            'insertunorderedlist', '|', 'emoticons', 'image', 'link']
        });
  }
  handleGetHtml(e){
    e.preventDefault()
    alert(this.editor.html());
  }
  render(){
  	return (
  	<div className={classnames( 'page toolbar-through', this.props.className)}>
	    <div className="page-content">
        <form style={{height: '100%'}}>
          <textarea name="content" style={{width: '100%', height:'100%',visibility:'hidden'}} defaultValue="<p style='color: red;'>123123</p>"></textarea>
        </form>
	    </div>
      <div className="toolbar">
        <div className="toolbar-inner">
          <a href="#" className="link" onClick={this.handleGetHtml.bind(this)}>Get Html</a>
          <a href="#" data-popover=".popover-menu" className="open-popover link">Menu</a>
        </div>
      </div>
	  </div>
  	)
  }
}

module.exports = EditorPage
