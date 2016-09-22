import React  from 'react';
import classnames from 'classnames'
import $ from '../../dom'
import SupportEvents from '../../support-events'
var fontShapList = ['bold', 'italic', 'underline']
class FontShape extends React.Component{
  constructor(props) {
    super(props);
    this.edit = this.props.edit
    this.doc = this.edit.doc
    this.state = {
      commandState: {}
    }
    this.destroyList = []
  }
   
  


  updateCommandState(){
    var commandState = this.state.commandState;
    fontShapList.forEach(val => {
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

  handleClickFontBtn(cmd, e){
    e.preventDefault()
    this.doc.execCommand(cmd)
    this.updateCommandState()
  }

  render(){
  	return (
  	<div className="tool-block">
      <div className="tool-name">字形</div>
      <div className="tool-buttons">
        {
          fontShapList.map(val => (
            <a key={val} className={classnames('btn font-shape-btn common-btn', {'active': this.state.commandState[val]})} onClick={this.handleClickFontBtn.bind(this, val)}>
              <i className={'icon '+'icon-'+val}></i>
            </a>
          ))
        }
      </div>
    </div>
  	)
  }
}
 

module.exports = FontShape
