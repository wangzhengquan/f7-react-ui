import Navbar from '../Navbar'

class PhotoBrowserNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

PhotoBrowserNavBar.defaultProps = {
  title: 'Photo Browser'
}
module.exports = PhotoBrowserNavBar