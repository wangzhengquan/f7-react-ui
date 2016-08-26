import Navbar from '../Navbar'

class SwipeDeleteNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

SwipeDeleteNavbar.defaultProps = {
  title: 'Swipe To Delete'
}

module.exports = SwipeDeleteNavbar