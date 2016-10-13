import Navbar from '../Navbar'

class CardsNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

CardsNavbar.defaultProps = {
  title: 'Cards'
}

module.exports = CardsNavbar