import React  from 'react';
import {Link} from 'react-router'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classnames from 'classnames';
import {List} from 'react-ui/lists'
import ImageCliper from 'react-ui/image-cliper'
require('../../resources/less/clip-image.less')
class ClipImagePage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }

  showChangeImageModal(e){
    e.preventDefault()
    ImageCliper.imageCliper({
      type: 'page',
      image: '../../resources/img/tiankong.jpg'
    }).open()
  }
  
  render(){
  	return (
  	<div className={classnames( 'page page-clip-image', this.props.className)}>
	    <div className="page-content">
	       <a className="use-header" onClick={this.showChangeImageModal.bind(this)}></a>

<div className="use-header">      
<input type="file" name="file" accept="image/*" />
</div>
	    </div>
	  </div>
  	)
  }
}

module.exports = ClipImagePage
