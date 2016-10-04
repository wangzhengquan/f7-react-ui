import React  from 'react';
import Edit from './Edit'
import Toolbar from './toolbar'
require('../resources/less/editor/bottom-toolbar.less')
require('../resources/less/scroll.less')
class Editor extends React.Component{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  	Toolbar.init(this.edit)
  }
  
  render(){
  	return (
  		<div className="editor" style={{height: '100%', width: '100%'}}><Edit/></div>
  	)
  }
}




export default Editor;


