import React  from 'react';
import classnames from 'classnames'


class InsertImage extends React.Component{
  constructor(props) {
    super(props);
    this.doc = document
    this.state = {
    }
  }

   
  componentDidMount(){
  }

  

  handleInsertImage(event){
    debugger
    var files =[].slice.call(event.target.files, 0),
        file = files[0];
    event.target.value = ''
    var url = URL.createObjectURL(file);
    this.doc.execCommand('insertHTML', false, '<div style="width: 100%;"><img width="100%" src="'+url+'""></div>');
  }
  
  render(){
  	return (
  	 <div className="link">
        <i className="icon icon-insert-img"></i>
        <input type="file" onChange={this.handleInsertImage.bind(this)}/>
     </div>
  	)
  }
}
 

module.exports = InsertImage
