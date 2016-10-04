import React  from 'react';
import classnames from 'classnames'

 
var listTypes = [
    {label: 'UL', style: 'insertorderedlist', icon: 'icon-unordered-list-item'},
    {label: 'OL', style: 'insertunorderedlist',  icon: 'icon-ordered-list-item'}
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

    this.edit.execCommand(value)
    // this.updateCommandState()
  }
  
  render(){
  	return (
  	<div className="tool-block">
      <div className="tool-name">项目符合/编号</div>
      <div className="tool-buttons">
          {
            listTypes.map(item => (
              <div className={classnames('btn common-btn', {active: false})} key={item.style}>
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
