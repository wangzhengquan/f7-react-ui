import React  from 'react';
import classnames from 'classnames'


var fontsizeList = [10, 12,  16, 18,24, 32,48];
class FontSize extends React.Component{
  constructor(props) {
    super(props);
    this.edit = this.props.edit
    this.doc = this.edit.doc
    this.state = {

    }
  }

   
  componentDidMount(){
  }

  

  handleChangeFontSize(value , event){
    var size = {}
    fontsizeList.forEach( (val, idx) => {
      size[val] = idx
    })
    this.setState({
      value: value
    })
    this.doc.execCommand('fontSize', false, size[value])
  }
  
  render(){
  	return (
  	<div className="tool-block">
      <div className="tool-name">字体大小</div>
      <div className="tool-buttons xscroll">
        <div className="tool-buttons-inner scroll-inner">
          {
            fontsizeList.map(value => (
              <div className={classnames('btn common-btn', {'active': this.state.value===value})} key={value} style={{padding: '0 10px'}}>
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
 

module.exports = FontSize
