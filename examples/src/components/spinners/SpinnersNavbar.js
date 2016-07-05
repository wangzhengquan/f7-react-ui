import Navbar from '../Navbar'

class SpinnersNavbar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

SpinnersNavbar.defaultProps = {
  title: 'Spinners'
}
module.exports = SpinnersNavbar