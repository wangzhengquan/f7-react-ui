
import React  from 'react';

class Edit extends React.Component{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
  		<div style={{height: '100%', padding: '10px'}} className="ke-edit" contentEditable="true"></div>
  	)
  }
}

module.exports = Edit
