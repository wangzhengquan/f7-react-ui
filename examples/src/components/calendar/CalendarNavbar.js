import Navbar from '../Navbar'

class CalendarNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

CalendarNavbar.defaultProps = {
  title: 'Calendar'
}

module.exports = CalendarNavbar