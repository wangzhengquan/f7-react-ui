import React  from 'react';
import classnames from 'classnames'

var justifyList = ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];
var justifyIcons = {
  justifyLeft: 'icon-justify-left',
  justifyCenter: 'icon-justify-center',
  justifyRight: 'icon-justify-right',
  justifyFull: 'icon-justify-full'
}

class Justify extends React.Component{
  constructor(props) {
    super(props);
    this.doc = document
    this.state = {
      commandState: {}
    }
    this.destroyList = []
  }

  
  
  destroy(){
    this.destroyList.forEach((fun) => {
      fun()
    })
  }

  handleChangeJustify(value){
    // var commandState = this.state.commandState
    // commandState[value] = this.doc.queryCommandState(value)
    // this.setState(commandState)

    this.doc.execCommand(value)
    // this.updateCommandState()
  }
  
  render(){
  	return (
  	<div className="tool-block">
      <div className="tool-name">对齐</div>
      <div className="tool-buttons">
          {
            justifyList.map(value => (
              <div className={classnames('btn common-btn justify-btn', {'active': this.state.commandState[value]})} key={value}>
                <input type="radio" value={value} name="justify" onChange={this.handleChangeJustify.bind(this, value)}/>
                <i className={classnames('icon', justifyIcons[value])}></i>
              </div>
            ))
          }
      </div>
    </div>
  	)
  }
}
 

module.exports = Justify
