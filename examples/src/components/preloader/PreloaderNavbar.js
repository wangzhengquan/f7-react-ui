import Navbar from '../Navbar'

class PreloaderNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

PreloaderNavBar.defaultProps = {
  title: 'Preloader'
}
module.exports = PreloaderNavBar