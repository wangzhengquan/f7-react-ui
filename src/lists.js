import React  from 'react';
import classNames from 'classnames';
require('./resources/less/lists.less');
class List extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render(){
    return (
    	<div className={classNames("list-block", this.props.className)} style={this.props.style}>
        <ul>
      	{
  	      React.Children.map(this.props.children, function (child) {
  	        return (<li>{child}</li>);
  	      })
        }
        </ul>
    	</div>
    );
  }
  
}


let ItemDivider = (props) => (
  <div className={classNames("item-divider", props.className)}>
    { props.children  }
  </div>
)
 
let ListGroupTitle = (props) => (
  <div className={classNames("list-group-title", props.className)}>
    { props.children  }
  </div>
)

export {
  List, 
  ItemDivider,
  ListGroupTitle
}

export default List;