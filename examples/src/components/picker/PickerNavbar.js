import React  from 'react'
import Navbar from '../Navbar'

class ModalsNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

ModalsNavBar.defaultProps = {
  title: 'Picker'
}
module.exports = ModalsNavBar