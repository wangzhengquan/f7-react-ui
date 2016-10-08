import Editor from './editor'
import React from 'react'
import ContentEditable from 'react-contenteditable'

// import FontSize from './tools/font-size'
// import FontColor from './tools/font-color'
// import BackColor from './tools/back-color'
// import FontShape from './tools/font-shape'
// import FontFamily from './tools/font-family'
// import Justify from './tools/justify'
import InsertImage from './tools/insert-image'
// import ListItem from './tools/list-item'
// import HeadLine from './tools/headline'
import {CreateLink} from './tools/link'
require('../resources/less/editor/top-toolbar.less')
require('../resources/less/editor/rich-editor.less')

class Toolbar extends React.Component{
  constructor(props) {
    super(props);
    this.handlers = this.props.handlers || {}
   
  }
   
  componentDidMount(){
  }

  
  render(){
  	return (
  	<div className="toolbar editor-toolbar tabbar">
      <div className="toolbar-inner">
        <InsertImage handler={this.handlers['image']} edit={this.props.edit}/>
        <CreateLink  edit={this.props.edit}/>
      </div>
    </div>
  	)
  }
}

class DefaultEditor extends Editor{
	constructor(props) {
	    super(props);
	    this.state = {
	      value: this.props.value || ''
	    }
	}


	render(){
	    return (
	    <div style={Object.assign({}, styles.editorWrapper)}>
        <Toolbar edit={this} handlers={this.props.handlers}/>
	      <div className="rich-editor" ref="editor" >
	        <ContentEditable className="rich-editor-area" 
	          html={this.state.value} // innerHTML of the editable div 
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