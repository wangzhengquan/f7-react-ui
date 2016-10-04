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
        <svg viewBox="0 0 18 18"> <rect className="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle className="ql-fill" cx="6" cy="7" r="1"></circle> <polyline className="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
        <input type="file" onChange={this.handleInsertImage.bind(this)}/>
     </a>
  	)
  }
}
 

export default  InsertImage
