import React  from 'react';
import Tabs from 'react-ui/tabs'
import FontSize from './tools/font-size'
import FontColor from './tools/font-color'
import BackColor from './tools/back-color'
import FontShape from './tools/font-shape'
import FontFamily from './tools/font-family'
// import Justify from './tools/justify'
import InsertImage from './tools/insert-image'
import ListItem from './tools/list-item'
import HeadLine from './tools/headline'
import {CreateLink, RemoveLink} from './tools/link'

class Toolbar extends React.Component{
  constructor(props) {
    super(props);
    // this.doc = document
    this.state = {
      collapse: true
    }
  }
   
  componentDidMount(){
    new Tabs({tabbar: this.refs.tabbar})
  }

  handleClickSwitch(e) {
    e.preventDefault()
    this.setState({
      collapse: !this.state.collapse
    }, () =>  {this.props.onCollapse && this.props.onCollapse(this.state.collapse)})

  }
  
  render(){
  	return (
  	<div className={'picker-modal editor-toolbar-modal '+ (this.state.collapse ? 'modal-out' : 'modal-in')}>
      <div className="toolbar editor-toolbar tabbar">
        <div className="toolbar-inner">
          <InsertImage uploadFileFn={this.props.uploadFileFn} edit={this.props.edit}/>
          <CreateLink  edit={this.props.edit}/>
          <RemoveLink  edit={this.props.edit}/>

        </div>
        <a href="#" className="switch" onClick={this.handleClickSwitch.bind(this)}><i className="icon icon-picker-switch"></i></a>
      </div>
      <div className="picker-modal-inner">
        <div className="tools-tabbar left" ref="tabbar">
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
             <BackColor edit={this.props.edit}/> 
          </div>

          <div id="tab-font-family" className="content-block scroll tab">
             <FontFamily edit={this.props.edit}/>
          </div>

          <div id="tab-paragraph" className="content-block scroll tab">
             <ListItem edit={this.props.edit}/>
             <HeadLine edit={this.props.edit}/>
          </div>
        </div>
        
      </div>
    </div>
  	)
  }
}

 

module.exports = Toolbar
