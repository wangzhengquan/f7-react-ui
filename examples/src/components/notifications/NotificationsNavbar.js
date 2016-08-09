import Navbar from '../Navbar'

class NotificationsNavBar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

NotificationsNavBar.defaultProps = {
  title: 'Notifications'
}
module.exports = NotificationsNavBar