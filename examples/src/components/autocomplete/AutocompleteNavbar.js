import Navbar from '../Navbar'

class AutocompleteNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

AutocompleteNavbar.defaultProps = {
  title: 'Autocomplete'
}

module.exports = AutocompleteNavbar