import Navbar from '../Navbar'

class ContactsNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

ContactsNavbar.defaultProps = {
  title: 'Contacts List'
}

module.exports = ContactsNavbar