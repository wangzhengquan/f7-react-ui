import Navbar from '../Navbar'

class TmpNavBar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

TmpNavBar.defaultProps = {
  title: 'Swiper Slider'
}

module.exports = TmpNavBar