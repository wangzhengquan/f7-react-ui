import Navbar from '../Navbar'

class AccordionNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

AccordionNavbar.defaultProps = {
  title: 'Accordion'
}

module.exports = AccordionNavbar