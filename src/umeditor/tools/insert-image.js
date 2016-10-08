import React  from 'react';
// import classnames from 'classnames'
require('../plugins/inserthtml.js')
require('../plugins/image.js')

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
    
    if(this.props.handler) {
      this.props.handler( file,  (url) => {
        this.edit.execCommand('insertimage', {
          src: url,
          width: '100%'
        }, this, event)
      }) 
    } else {
      this.edit.execCommand('insertimage', {
        src: URL.createObjectURL(file),
        width: '100%'
      })
    }
    
    
  }
  
  render(){
  	return (
  	 <a className="tab-link input-button">
        <svg viewBox="0 0 18 18"> <rect className="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle className="ql-fill" cx="6" cy="7" r="1"></circle> <polyline className="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
        <input type="file" accept="image/*" onChange={this.handleInsertImage.bind(this)}/>
     </a>
  	)
  }
}
 

export default  InsertImage
