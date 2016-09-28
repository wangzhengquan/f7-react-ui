import React  from 'react';
import ReactDOM from 'react-dom'
import $ from '../dom'
import Tabs from 'react-ui/tabs'
import FontSize from './tools/font-size'
import FontColor from './tools/font-color'
import FontShape from './tools/font-shape'
import FontFamily from './tools/font-family'
import Justify from './tools/justify'
import InsertImage from './tools/insert-image'

class Toolbar extends React.Component{
  constructor(props) {
    super(props);
    this.doc = document
  }
   
  componentDidMount(){
    new Tabs({tabbar: this.refs.tabbar})
  }

  
  
  render(){
  	return (
  	<span>
      <div className="toolbar">
        <div className="toolbar-inner">
          <div className="center">
            <InsertImage  edit={this.props.edit}/>
          </div>
          <div className="right"><a href="#" onClick={this.props.onClickSwitch} className="link"><i className="icon icon-picker-switch"></i></a></div>
        </div>
      </div>
      <div className="picker-modal-inner">
        <div className="tabbar tool-tabbar left" ref="tabbar">
          <a href="#tab-font" className="tab-link active"> 
            <i className="icon icon-font"></i>
          </a>
          <a href="#tab-font-family" className="tab-link">
             <i className="icon icon-font-family"></i>
          </a>
          <a href="#tab-paragraph" className="tab-link">
             <i className="icon icon-paragraph"></i>
          </a>
          
        </div>
        <div  className="center tabs">
          <div id="tab-font" className="content-block scroll tab active">
             <FontSize edit={this.props.edit}/>
             <FontShape edit={this.props.edit}/>
             <FontColor edit={this.props.edit}/>
          </div>

          <div id="tab-font-family" className="content-block scroll tab">
             <FontFamily edit={this.props.edit}/>
          </div>

          <div id="tab-paragraph" className="content-block scroll tab">
             <Justify edit={this.props.edit}/>
          </div>
        </div>
        
      </div>
    </span>
  	)
  }
}

Toolbar.init = function(edit){
  var modal = $('<div class="picker-modal editor-toolbar-modal"></div>')
  $('body').append(modal[0]);
  var onClickSwitch = function() {
    if(modal.hasClass('modal-in')){
      modal.removeClass('modal-in').addClass('modal-out')
    } else {
      modal.removeClass('modal-out').addClass('modal-in')
    }
  }
  ReactDOM.render(<Toolbar onClickSwitch={onClickSwitch} edit={edit}/>, modal[0])
}

module.exports = Toolbar
