import Navbar from '../Navbar'

class GridNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

GridNavBar.defaultProps = {
  title: 'Grid'
}
module.exports = GridNavBar