import Navbar from '../Navbar'

class TmpNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

TmpNavbar.defaultProps = {
  title: 'Media Lists'
}

module.exports = TmpNavbar