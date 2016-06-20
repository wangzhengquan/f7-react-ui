import React  from 'react'
import Navbar from '../Navbar'

class FormsElementsNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

FormsElementsNavBar.defaultProps = {
  title: 'Form Elements'
}
module.exports = FormsElementsNavBar