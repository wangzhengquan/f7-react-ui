import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import ImageCliper from 'react-ui/image-cliper'
require('../../resources/less/clip-image.less')
class ClipImagePage extends AnimationPage{
  constructor(props) {
    super(props);
    this.state = {}
  }
   
  componentDidMount(){
  }

   

  onSelectImage(event){
    var files =[].slice.call(event.target.files, 0),
        file = files[0];

    var onClip =  (blob) => {
      var url = URL.createObjectURL(blob);
      this.setState({
        imgUrl : url
      })
    }

    ImageCliper.imageCliper({
      type: 'page',
      imageFile: file,
      onClip: onClip,
      ratio:2
    }).open()
    event.target.value = ''
  }
  
  render(){
  	return (
  	<div className={classnames( 'page page-clip-image', this.props.className)}>
	    <div className="page-content">
        <div className="use-header">
          <input type="file" name="file" onChange={this.onSelectImage.bind(this)} accept="image/*" />
        </div>

        <div className="image-wraper" style={{marginTop: '10px'}}>
          {this.state.imgUrl ? <img src={this.state.imgUrl} style={{width: '100%'}}/> : ''}
        </div>

	    </div>
	  </div>
  	)
  }
}

module.exports = ClipImagePage
