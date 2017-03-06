import Navbar from '../Navbar'

class LazyLoadNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

LazyLoadNavbar.defaultProps = {
  title: 'lazy-load'
}

module.exports = LazyLoadNavbar