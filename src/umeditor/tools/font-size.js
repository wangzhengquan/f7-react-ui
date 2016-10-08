import React  from 'react';
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Modals from '../../modals'
import List from '../../lists'
require('../plugins/font.js')
require('../../resources/less/forms.less')
require('../../resources/less/scroll.less')
var fontsizeList = [{
  value: '12px',
  label: '12px'
}, {
  value: '16px',
  label: '16px'
}, {
  value: '18px',
  label: '18px'
}, {
  value: '24px',
  label: '24px'
}, {
  value: '32px',
  label: '32px'
}, {
  value: '48px',
  label: '48px'
}];
 
class FontSizeList extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
    this.state = {
      value: props.value
    }
  }

  handleChange(val){
    this.setState({
      value: val
    })
    this.props.onChange(val)
  }

  render() {
    return (
    <span>
      <div className="toolbar">
        <div className="toolbar-inner">
          <div className="left"></div>
          <div className="right"><a href="#" onClick={this.props.onClose} className="link close-picker">Done</a></div>
        </div>
      </div>
      <div className="picker-modal-inner  y-scroll">
          <List className="font-size-list" style={{width: '100%', margin: '0'}}>
          {
            fontsizeList.map((item) => (
                <label className="label-radio item-content" style={{fontFamily: item.value+'px'}} key={item.value}>
                  <input type="radio" name="font-size-radio" value={item.value} checked={this.state.value === item.value} onChange={this.handleChange.bind(this, item.value)}/>
                  <div className="item-inner">
                    <div className="item-title">{item.label}</div>
                  </div>
                </label>
            ))
          }
          </List>
      </div>
    </span>
      
    )
  }
}

class FontSize extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
    this.state = {
      value: this.edit.queryCommandState('fontsize')
    }
    this.edit.addListener('selectionchange', () => {
        this.setState({
          value: this.edit.queryCommandState('fontsize')
        })
        // $btn.edui().disabled(state == -1).active(state == 1)
    });
   
  }

  handleChangeFontSize(value ){
   
    this.setState({
      value: value
    })
     this.edit.execCommand('fontsize', value)
  }

  handleClick(e){
    e.preventDefault()

    var modal = Modals.pickerModal()
    var closeModal = (e) => {
        e.preventDefault()
        Modals.closeModal(modal)
    }

    var onChange = (val) => {
      this.handleChangeFontSize(val);
      Modals.closeModal(modal)
    }
    ReactDOM.render(<FontSizeList value={this.state.value} onChange={onChange} onClose={closeModal}/>, modal)
  }
  
  render_(){
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

  render() {
    return (
      <a className="tab-link" onClick={this.handleClick.bind(this)}>
        字号
      </a>
    )
  }
}
  
export default FontSize
