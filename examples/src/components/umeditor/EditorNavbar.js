import Navbar from '../Navbar'

class UMEditorNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

UMEditorNavbar.defaultProps = {
  title: 'Editor'
}

module.exports = UMEditorNavbar