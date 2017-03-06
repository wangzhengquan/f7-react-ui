import Navbar from '../Navbar'

class BarsNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

BarsNavbar.defaultProps = {
  title: 'Navbars And Toolbars'
}

module.exports = BarsNavbar