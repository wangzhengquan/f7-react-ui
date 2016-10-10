import React  from 'react';
import classnames from 'classnames'
import TextFieldEditor from '../../widget/textfield-editor'
require('../plugins/link.js')
class CreateLink extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
    this.state = {
    }
  }

   
  componentDidMount(){
  }

  handleCreateLink(event){
    event.preventDefault()
    // const {editorState} = this.edit.state;
    // const selection = editorState.getSelection();
    // if (selection.isCollapsed()) {
    //   alert('请选择加超链接的文本')
    //   return;
    // }
    TextFieldEditor.open({
      title: '填写链接地址',
      showType: 'popup',
      onOk: (val) => {
        this.edit.execCommand('link', val)
      } 
    })
  }
  
  render(){
  	return (
  	 <a className="tab-link" onClick={this.handleCreateLink.bind(this)}>
        <svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line> <path className="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path> <path className="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path> </svg>
     </a>
  	)
  }
}

class RemoveLink extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
    this.state = {
    }
  }

   
  componentDidMount(){
  }

  handleRemoveLink(event){
    event.preventDefault()
    this.edit.removeLink()
    // this.doc.execCommand('insertHTML', false, '<div style="width: 100%;"><img width="100%" src="'+url+'""></div>');
  }
  
  render(){
    return (
     <a className="tab-link" onClick={this.handleRemoveLink.bind(this)}>
        <i className="icon icon-unlink" style={{width: '25px', height: '25px'}}></i>
     </a>
    )
  }
}
 
export {
  CreateLink,
  RemoveLink
}

export default CreateLink
