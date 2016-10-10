import React  from 'react';
import TextFieldEditor from '../../widget/textfield-editor'

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
    const {editorState} = this.edit.state;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      alert('请选择加超链接的文本')
      return;
    }
    TextFieldEditor.open({
      title: '填写链接地址',
      showType: 'popup',
      onOk: (val) => {
        this.edit.createLink(val)
      } 
    })
    // this.doc.execCommand('insertHTML', false, '<div style="width: 100%;"><img width="100%" src="'+url+'""></div>');
  }
  
  render(){
  	return (
  	 <a className="tab-link" onClick={this.handleCreateLink.bind(this)}>
        <i className="icon icon-link" ></i>
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
