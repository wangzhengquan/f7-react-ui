import Navbar from '../Navbar'

class SwiperNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

SwiperNavBar.defaultProps = {
  title: 'Swiper Slider'
}
module.exports = SwiperNavBar