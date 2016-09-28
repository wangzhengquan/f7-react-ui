import React  from 'react';
import classnames from 'classnames'
import $ from '../../dom'
import SupportEvents from '../../support-events'


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

  updateCommandState(){
    var commandState = this.state.commandState;
    justifyList.forEach(val => {
      commandState[val] = this.doc.queryCommandState(val)
    })
    this.setState({
      commandState: commandState
    })
  }
   
  componentDidMount(){

    var fn = ()  => {
      // console.log('bold', this.doc.queryCommandState('bold'),   typeof this.doc.queryCommandState('bold'))
      this.updateCommandState()
    }

    $(this.doc).on(SupportEvents.touchEvents.end, fn)

    this.destroyList.push(()=> {
       $(this.doc).off(SupportEvents.touchEvents.end, fn)
    })
  }

  componentWillUnmount(){
    this.destroy()
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
    this.updateCommandState()
  }
  
  render(){
    console.log(this.state)
    console.log(this.state.commandState['justifyCenter'])
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
