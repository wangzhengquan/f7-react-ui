import Navbar from '../Navbar'

class EditorNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

EditorNavbar.defaultProps = {
  title: 'React Quill Editor'
}

module.exports = EditorNavbar