import React  from 'react';
import classnames from 'classnames'
require('../../resources/less/scroll.less')
var prefix = 'fontSize'
var fontsizeList = [12, 16, 18, 24, 32, 48];
var fontSizeStyleMap = (function(){
  return fontsizeList.reduce((res, item) => {

    res[prefix+item] = {
      'fontSize': item+'px'
    }
    return res;
  }, {})
})()

class FontSize extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
    this.state = {
    }
  }

  handleChangeFontSize(value ){
   
    this.setState({
      value: value
    })
     this.edit.toggleFontSize(prefix+value)
  }
  
  render(){
  	return (
  	<div className="tool-block">
      <div className="tool-name">字体大小</div>
      <div className="tool-buttons xscroll">
        <div className="tool-buttons-inner scroll-inner">
          {
            fontsizeList.map(value => (
              <div className={classnames('btn common-btn', {'active': this.edit.state.editorState.getCurrentInlineStyle().has(prefix+value)})} key={value} style={{padding: '0 10px'}}>
                <input type="radio" value={value} name="fontsize" onChange={this.handleChangeFontSize.bind(this, value)}/>
                {value}px
              </div>
            ))
          }
          
           
        </div>
      </div>
    </div>
  	)
  }
}
 
export {
  fontSizeStyleMap
}

export default FontSize
