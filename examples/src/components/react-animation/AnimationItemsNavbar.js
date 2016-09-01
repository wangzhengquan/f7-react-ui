import Navbar from '../Navbar'

class AnimationItemsNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

AnimationItemsNavbar.defaultProps = {
  title: 'Animation Item'
}

module.exports = AnimationItemsNavbar