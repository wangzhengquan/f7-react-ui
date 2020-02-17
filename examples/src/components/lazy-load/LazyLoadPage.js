import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import LazyLoad from 'react-ui/lazy-load'

import  natureImg1 from '../../resources/img/nature-500x500-1.jpg';
import  natureImg2 from '../../resources/img/nature-500x500-2.jpg';
import  natureImg3 from '../../resources/img/nature-500x500-3.jpg';
import  natureImg4 from '../../resources/img/nature-500x500-4.jpg';
import  natureImg5 from '../../resources/img/nature-500x500-5.jpg';
import  natureImg6 from '../../resources/img/nature-500x500-6.jpg';
import  natureImg7 from '../../resources/img/nature-500x500-7.jpg';
import  natureImg8 from '../../resources/img/nature-500x500-8.jpg';
import  natureImg9 from '../../resources/img/nature-500x500-1.jpg';
import  natureImg10 from '../../resources/img/nature-500x500-10.jpg';

class LazyLoadPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){

    var lazyload = new LazyLoad({scrollContainer: this.refs.pageContent})
    this.destroyList.push(() => {lazyload.destroy()})
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	     <div className="page-content" ref="pageContent">
  	     <div className="content-block">
          <div className="content-block-inner">
            <p>Lazy Load delays loading of images on page while they are outside of viewport until user scrolls to them.</p>
            <p>It will make the page load faster, improve scrolling performance and also save traffic.</p>
          </div>
        </div>
        <div className="content-block">
          <div className="content-block-inner">
            <p> <img data-src={natureImg1} width="1500" height="1500" className="lazy lazy-fadeIn ks-demo-lazy"/></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus viverra lectus sit amet lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque faucibus consectetur mauris eget lobortis. Maecenas efficitur efficitur mauris ac vehicula. Sed ut lectus laoreet, semper nisi vel, maximus massa. Duis at lorem vitae sem auctor condimentum a at neque. Phasellus vel scelerisque dui. Morbi varius nibh eu finibus rutrum.</p>
            <p> <img data-src={natureImg2} width="1500" height="1500" className="lazy lazy-fadeIn ks-demo-lazy"/></p>
            <p>Aenean id congue orci. Aliquam gravida nulla nec sollicitudin consectetur. Donec iaculis ipsum in purus tincidunt sagittis quis vehicula sapien. Vestibulum quis consectetur nibh. Pellentesque vehicula ligula sit amet commodo malesuada. Proin eget dolor sodales, egestas sapien sed, consectetur ante. Vivamus imperdiet porttitor condimentum. Aliquam sit amet tellus quis mauris dapibus convallis eu in nulla. Aliquam erat volutpat.</p>
            <p> <img data-src={natureImg3} width="1500" height="1500" className="lazy lazy-fadeIn ks-demo-lazy"/></p>
            <p>Pellentesque aliquam maximus libero a tincidunt. Nunc rhoncus tellus ac congue commodo. Aenean malesuada ante sit amet erat efficitur vehicula ac id ipsum. Suspendisse sed purus vel nisl rhoncus feugiat et ut ante. Mauris vehicula ligula sed nisl vulputate, nec ullamcorper quam vehicula. Etiam eu turpis eget sem luctus rutrum at porta nulla. Ut posuere lorem et nisi faucibus molestie.</p>
            <p> <img data-src={natureImg4} width="1500" height="1500" className="lazy lazy-fadeIn ks-demo-lazy"/></p>
            <p>Duis ullamcorper velit id enim rutrum, vel venenatis lacus laoreet. Sed id bibendum ligula, sed congue erat. Maecenas rhoncus posuere lorem ac consectetur. Duis accumsan, urna id pharetra tincidunt, libero nibh tincidunt enim, vestibulum suscipit turpis neque nec ante.</p>
            <p> <img data-src={natureImg5} width="1500" height="1500" className="lazy lazy-fadeIn ks-demo-lazy"/></p>
            <p>Suspendisse potenti. Curabitur et neque ac ante dapibus mollis tempor eget ex. Vivamus porttitor faucibus dui. Nulla eleifend hendrerit cursus. Sed elit nulla, pulvinar vitae diam eget, consectetur efficitur orci. Vivamus vel pharetra sapien. Suspendisse tortor tortor, iaculis at ullamcorper sit amet, vestibulum vel arcu. Aenean sed eleifend sapien. Praesent at varius metus.</p>
            <p> <img data-src={natureImg6} width="1500" height="1500" className="lazy lazy-fadeIn ks-demo-lazy"/></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet nisl eget neque blandit lobortis. Sed sagittis risus id vestibulum finibus. Cras vestibulum sem et massa hendrerit maximus. Vestibulum suscipit tristique iaculis. Nam vitae risus non eros auctor tincidunt quis vel nulla. Sed volutpat, libero ac blandit vehicula, est sem gravida lectus, sed imperdiet sapien risus ut neque.</p>
            <p> <img data-src={natureImg7} width="1500" height="1500" className="lazy lazy-fadeIn ks-demo-lazy"/></p>
            <p>Aenean id congue orci. Aliquam gravida nulla nec sollicitudin consectetur. Donec iaculis ipsum in purus tincidunt sagittis quis vehicula sapien. Vestibulum quis consectetur nibh. Pellentesque vehicula ligula sit amet commodo malesuada. Proin eget dolor sodales, egestas sapien sed, consectetur ante. Vivamus imperdiet porttitor condimentum. Aliquam sit amet tellus quis mauris dapibus convallis eu in nulla. Aliquam erat volutpat.</p>
            <p> <img data-src={natureImg8} width="1500" height="1500" className="lazy lazy-fadeIn ks-demo-lazy"/></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus viverra lectus sit amet lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque faucibus consectetur mauris eget lobortis. Maecenas efficitur efficitur mauris ac vehicula. Sed ut lectus laoreet, semper nisi vel, maximus massa. Duis at lorem vitae sem auctor condimentum a at neque. Phasellus vel scelerisque dui. Morbi varius nibh eu finibus rutrum.</p>
            <p> <img data-src={natureImg9} width="1500" height="1500" className="lazy lazy-fadeIn ks-demo-lazy"/></p>
            <p>Pellentesque aliquam maximus libero a tincidunt. Nunc rhoncus tellus ac congue commodo. Aenean malesuada ante sit amet erat efficitur vehicula ac id ipsum. Suspendisse sed purus vel nisl rhoncus feugiat et ut ante. Mauris vehicula ligula sed nisl vulputate, nec ullamcorper quam vehicula. Etiam eu turpis eget sem luctus rutrum at porta nulla. Ut posuere lorem et nisi faucibus molestie.</p>
            <p> <img data-src={natureImg10} width="1500" height="1500" className="lazy lazy-fadeIn ks-demo-lazy"/></p>
            <p>Duis ullamcorper velit id enim rutrum, vel venenatis lacus laoreet. Sed id bibendum ligula, sed congue erat. Maecenas rhoncus posuere lorem ac consectetur. Duis accumsan, urna id pharetra tincidunt, libero nibh tincidunt enim, vestibulum suscipit turpis neque nec ante.</p>
            <p><b>Using as background image:</b></p>
            <div data-background={natureImg5} className="lazy lazy-fadeIn ks-demo-lazy"></div>
            <p>Suspendisse potenti. Curabitur et neque ac ante dapibus mollis tempor eget ex. Vivamus porttitor faucibus dui. Nulla eleifend hendrerit cursus. Sed elit nulla, pulvinar vitae diam eget, consectetur efficitur orci. Vivamus vel pharetra sapien. Suspendisse tortor tortor, iaculis at ullamcorper sit amet, vestibulum vel arcu. Aenean sed eleifend sapien. Praesent at varius metus.</p>
          </div>
        </div>
	     </div>
	  </div>
  	)
  }
}

module.exports = LazyLoadPage
