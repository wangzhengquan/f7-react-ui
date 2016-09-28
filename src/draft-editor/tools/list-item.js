import React  from 'react';
import classnames from 'classnames'

 
var listTypes = [
    {label: 'UL', style: 'unordered-list-item', icon: 'icon-unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item',  icon: 'icon-ordered-list-item'}
  ];
 
class ListItem extends React.Component{
  constructor(props) {
    super(props);
    this.edit = props.edit
  }

  handleChangeListItem(value){
    // var commandState = this.state.commandState
    // commandState[value] = this.doc.queryCommandState(value)
    // this.setState(commandState)

    this.edit.toggleBlockType(value)
    // this.updateCommandState()
  }
  
  render(){
    var selection =  this.edit.state.editorState.getSelection();
    var blockType = this.edit.state.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  	return (
  	<div className="tool-block">
      <div className="tool-name">项目符合/编号</div>
      <div className="tool-buttons">
          {
            listTypes.map(item => (
              <div className={classnames('btn common-btn', {active: blockType === item.style})} key={item.style}>
                <input type="radio" value={item.style} name="justify" onChange={this.handleChangeListItem.bind(this, item.style)}/>
                <i className={classnames('icon', item.icon)}></i>
              </div>
            ))
          }
      </div>
    </div>
  	)
  }
}
 

export default ListItem
