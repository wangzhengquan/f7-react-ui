import Navbar from '../Navbar'

class PullToRefreshNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

PullToRefreshNavbar.defaultProps = {
  title: 'pull-to-refresh'
}

module.exports = PullToRefreshNavbar