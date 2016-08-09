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
        url : url
      })
    }

    ImageCliper.imageCliper({
      type: 'page',
      file: file,
      onClip: onClip,
      ratio:1,
      fill: true
    }).open()
    event.target.value = ''
  }
  
  render(){
  	return (
  	<div className={classnames( 'page page-clip-image', this.props.className)}>
	    <div className="page-content" style={{background: '#383c3d'}}>
        <div className="use-header">
          <input type="file" name="file" onChange={this.onSelectImage.bind(this)} accept="image/*" />
        </div>

        <div className="image-wraper" style={{marginTop: '10px', background: '#fff', lineHeight: '0'}}>
          {this.state.url ? <img src={this.state.url} style={{width: '100%'}}/> : ''}
        </div>

	    </div>
	  </div>
  	)
  }
}

module.exports = ClipImagePage
