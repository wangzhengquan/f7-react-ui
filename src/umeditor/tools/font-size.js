import React  from 'react';
import classnames from 'classnames'
require('../../resources/less/scroll.less')
var fontsizeList = [12, 16, 18, 24, 32, 48];
 

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
     this.edit.execCommand('fontsize', value)
  }
  
  render(){
  	return (
  	<div className="tool-block">
      <div className="tool-name">字体大小</div>
      <div className="tool-buttons xscroll">
        <div className="tool-buttons-inner scroll-inner">
          {
            fontsizeList.map(value => (
              <a onClick={this.handleChangeFontSize.bind(this, value)} className={classnames('btn common-btn', {'active': false})} key={value} style={{padding: '0 10px'}}>
                {value}px
              </a>
            ))
          }
          
           
        </div>
      </div>
    </div>
  	)
  }
}
  
export default FontSize
