import React  from 'react';
import classnames from 'classnames'
// var fontShapList = ['bold', 'italic', 'underline']
require('../plugins/font.js')

var fontShapList = [
  {label: 'bold', style: 'bold'},
  {label: 'italic', style: 'italic'},
  {label: 'underline', style: 'underline'}
];
class FontShape extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
     
  }
   
  

  
  handleClickFontBtn(cmd, e){
    e.preventDefault()
    this.edit.execCommand(cmd)

  }

  render(){
  	return (
  	<div className="tool-block">
      <div className="tool-name">字形</div>
      <div className="tool-buttons">
        {
          fontShapList.map((item) => (
            <a key={item.style} className={classnames('btn font-shape-btn common-btn', {'active': false})} onClick={this.handleClickFontBtn.bind(this, item.style)}>
              <i className={'icon '+'icon-'+item.label}></i>
            </a>
          ))
        }
      </div>
    </div>
  	)
  }
}
 

module.exports = FontShape
