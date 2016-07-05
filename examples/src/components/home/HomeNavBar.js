import Navbar from '../Navbar'

class HomeNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

HomeNavBar.defaultProps = {
  title: 'ReactUI'
}
module.exports = HomeNavBar