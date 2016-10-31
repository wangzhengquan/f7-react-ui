import Navbar from '../Navbar'

class SliderNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

SliderNavbar.defaultProps = {
  title: 'Slider'
}

module.exports = SliderNavbar