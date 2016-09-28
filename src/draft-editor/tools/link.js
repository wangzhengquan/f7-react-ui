import React  from 'react';
import classnames from 'classnames'
import TextFieldEditor from '../../widget/text-field-editor'

class Link extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
    this.state = {
    }
  }

   
  componentDidMount(){
  }

  handleAddLink(event){
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
  	 <a className="tab-link" onClick={this.handleAddLink.bind(this)}>
        <i className="icon icon-link"></i>
     </a>
  	)
  }
}
 
export {
  Link
}

export default Link
