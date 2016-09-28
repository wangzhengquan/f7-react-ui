import React  from 'react';
import classnames from 'classnames'
// var fontShapList = ['bold', 'italic', 'underline']

var fontShapList = [
  {label: 'bold', style: 'BOLD'},
  {label: 'italic', style: 'ITALIC'},
  {label: 'underline', style: 'UNDERLINE'}
];
class FontShape extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
     
  }
   
  

  
  handleClickFontBtn(cmd, e){
    e.preventDefault()
    this.props.edit.toggleInlineStyle(cmd)

  }

  render(){
  	return (
  	<div className="tool-block">
      <div className="tool-name">字形</div>
      <div className="tool-buttons">
        {
          fontShapList.map((item) => (
            <a key={item.style} className={classnames('btn font-shape-btn common-btn', {'active': this.edit.state.editorState.getCurrentInlineStyle().has(item.style)})} onClick={this.handleClickFontBtn.bind(this, item.style)}>
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
