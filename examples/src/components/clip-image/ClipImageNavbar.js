import Navbar from '../Navbar'

class ClipImageNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

ClipImageNavBar.defaultProps = {
  title: 'Clip Image'
}
module.exports = ClipImageNavBar