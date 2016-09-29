import React  from 'react';
import classnames from 'classnames'


class InsertImage extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
    this.state = {
    }
  }

   
  componentDidMount(){
  }

  handleInsertImage(event){
    var files =[].slice.call(event.target.files, 0),
        file = files[0];
    event.target.value = ''
    this.props.uploadFileFn(file, (url) => {
       // var url = URL.createObjectURL(file);
      this.edit.insertAtomicBlock(url, 'image')
    })
   
    // this.doc.execCommand('insertHTML', false, '<div style="width: 100%;"><img width="100%" src="'+url+'""></div>');
  }
  
  render(){
  	return (
  	 <a className="tab-link input-button">
        <i className="icon icon-insert-img"></i>
        <input type="file" onChange={this.handleInsertImage.bind(this)}/>
     </a>
  	)
  }
}
 

export default  InsertImage
