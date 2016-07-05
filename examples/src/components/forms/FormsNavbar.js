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
  title: 'Forms'
}
module.exports = ModalsNavBar