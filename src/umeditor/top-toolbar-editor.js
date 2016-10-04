import Editor from './editor'
import React from 'react'
import ContentEditable from 'react-contenteditable'

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
require('../resources/less/editor/top-toolbar.less')
require('../resources/less/editor/rich-editor.less')

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
  	<div className="toolbar editor-toolbar tabbar">
      <div className="toolbar-inner">
        <InsertImage uploadFileFn={this.props.uploadFileFn} edit={this.props.edit}/>
        <CreateLink  edit={this.props.edit}/>
        <RemoveLink  edit={this.props.edit}/>
      </div>
    </div>
  	)
  }
}

class DefaultEditor extends Editor{
	constructor(props) {
	    super(props);
	    this.state = {
	      html: '<p>Hello <i>World</i></p>',
	      collapsed: true
	    }
	}


	render(){
	    return (
	    <div style={Object.assign({}, styles.editorWrapper)}>
        <Toolbar edit={this} uploadFileFn={this.props.uploadFileFn}/>
	      <div className="rich-editor" ref="editor" >
	        <ContentEditable className="rich-editor-area" 
	          html={this.state.html} // innerHTML of the editable div 
	          disabled={false}       // use true to disable edition 
	          onChange={this.handleChange.bind(this)} // handle innerHTML change 
	        />
	      </div>
	     
	    </div>
	    )
	}
}


const styles = {
  editorWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
    
  } 
}

export default DefaultEditor