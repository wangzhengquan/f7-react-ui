import React from 'react';
import classnames from 'classnames'
import $ from '../dom'
import Type from '../type'
import SupportEvents from '../support-events'
require('../resources/less/swiper.less');


export default class Slider extends React.Component {

    constructor(props) {
        super(props);

        var params = this.params = Object.assign({
            pagination: '.swiper-pagination',
            autoplay: 4000,
            loop: true,
            defaultIndex: 0,
            animation: 'slide',
            direction: 'horizontal'
        }, this.props.params)
        var children = this.props.children
        if (children.length > 1 && params.loop) {

            children = [React.cloneElement(children[children.length - 1]), ...children, React.cloneElement(children[0])]
        }
        this.state = {
            children: children,
            activeIndex: params.defaultIndex,
            animation: 'none'
        }
        this.destroyList = []
    }

    componentDidMount() {
        if (this.props.children.length > 1) {
            this.initSlider()
        }
    }

    initSlider() {
        var swiperContainer = this.swiperContainer = $(this.refs.swiperContainer)
        this.slideSize = swiperContainer.width()
        this.swiperWrapper = swiperContainer.find('.swiper-wrapper');
        this.swiperSlides = swiperContainer.find('.swiper-wrapper .swiper-slide');


        this.setDefaultIndex(this.params.defaultIndex);

        if (this.params.autoplay) {
            this.play();
        }
        this.attachEvents()

    }

    setDefaultIndex(index) {
        /*if( this.items.length < 2){
        	return;
        }*/
        var _defaultIndex = index;
        if (this.params.loop) {
            _defaultIndex++;
        }

        this.go(_defaultIndex, 'none');
    }


    getAnimStyles(anim, index) {
        var me = this;
        var styles = {
            'horizontal': {
                'none': {
                    'WebkitTransitionDuration': '0s',
                    'transitionDuration': '0s',
                    'WebkitTransform': 'translate3d(' + (-1 * index * me.slideSize) + 'px,0,0)',
                    'transform': 'translate3d(' + (-1 * index * me.slideSize) + 'px,0,0)',
                    'WebkitBackfaceVisibility': 'hidden',
                    'backfaceVisibility': 'hidden',
                    opacity: 1
                },
                'slide': {
                    'WebkitTransitionDuration': '300ms',
                    'transitionDuration': '300ms',
                    'WebkitTransform': 'translate3d(' + (-1 * index * me.slideSize) + 'px,0,0)',
                    'transform': 'translate3d(' + (-1 * index * me.slideSize) + 'px,0,0)',
                    'WebkitBackfaceVisibility': 'hidden',
                    'backfaceVisibility': 'hidden',
                    opacity: 1
                }
            },
            'vertical': {
                'none': {
                    'WebkitTransitionDuration': '0s',
                    'transitionDuration': '0s',
                    'WebkitTransform': 'translate3d(0,' + (-1 * index * me.slideSize) + 'px,0)',
                    'transform': 'translate3d(0,' + (-1 * index * me.slideSize) + 'px,0)',
                    'WebkitBackfaceVisibility': 'hidden',
                    'backfaceVisibility': 'hidden',
                    opacity: 1
                },
                'slide': {
                    'WebkitTransitionDuration': '300ms',
                    'transitionDuration': '300ms',
                    'WebkitTransform': 'translate3d(0,' + (-1 * index * me.slideSize) + 'px,0)',
                    'transform': 'translate3d(0,' + (-1 * index * me.slideSize) + 'px,0)',
                    'WebkitBackfaceVisibility': 'hidden',
                    'backfaceVisibility': 'hidden',
                    opacity: 1
                }
            }
        }
        return styles[this.params.direction][anim]

    }

    /**
     * 
     * @param index 当前显示对象的索引，从0开始
     * @param animation
     * @param cb
     * @returns this
     */
    go(index, animation, completeFn) {
    	// debugger
        if(Type.isFunction(animation)){
			completeFn = animation;
			animation = this.params.animation;
		}
        animation = animation || this.params.animation;

        if (index >= this.slidesLenght) {
            index = index % this.slidesLenght;
        }
        // if (index == this.state.activeIndex) {
        //     return this;
        // }
         
        this.setState({
            activeIndex: index,
            animation: animation,
            animStyle: this.getAnimStyles(animation, index)
        })

         
        

        this.swiperWrapper.transitionEnd(function(){
        	 
        	completeFn && completeFn.bind(this)()
        })


        return this;
    }

    //下一个索引
    getNextIndex() {
        var _index = this.state.activeIndex + 1;
        if (_index >= this.state.children.length) {
            _index = _index % this.state.children.length;
        }
        return _index;
    }
    //上一个索引
    getPreIndex() {
            var _index = this.state.activeIndex + this.state.children.length - 1;
            if (_index >= this.state.children.length) {
                _index = _index % this.state.children.length;
            }
            return _index;
        }
        //下一个
    next() {
        var me = this;
        

        me.go(me.getNextIndex(), function() {
            if (me.params.loop && me.isLast()) {
               me.fixNextLoop();
                return this;
            }
        });

        return this;
    }

    //上一个
    previous(callback) {
        var me = this;
        if (me.slidesLength < 2) {
            callback && callback.call(me);
            return this;
        }
        me.go(me.getPreIndex(), function() {
            if (me.params.loop && me.isFirst()) {
                me.fixPreLoop();
                return this;
            }
            callback && callback.call(me);
        });
        return this;
    }

    isLast() {
        return this.state.activeIndex === this.state.children.length - 1;
    }

    isFirst() {
        return this.state.activeIndex === 0;
    }

    // 修正跑马灯结尾的滚动位置
    fixNextLoop() {
        this.go(1, 'none');
        return;

    }

    // 修正跑马灯开始的滚动位置
    fixPreLoop() {
        // jayli 这里需要调试修正，继续调试
        this.go(this.state.children.length - 2, 'none');
        return;
    }

    //自动播放
    play() {
        var self = this;
        if (self.timer !== null) {
            clearTimeout(self.timer);
        }
        self.timer = setTimeout(function() {
            self.next().play();
        }, Number(self.params.autoplay));
        self.stoped = false;
        return this;
    }

    //停止自动播放
    stop() {
        var self = this;
        clearTimeout(self.timer);
        self.timer = null;
        self.stoped = true;
        return this;
    }

    /**
     * 如果是循环轮播，返回对象的可见索引
     * @param index
     * @returns
     */
    getRealIndex(index) {
        var me = this,
            _index = index;
        if (me.params.loop) {

            if (index == 0) {
                _index = me.props.children.length - 1;
            } else if (index == me.state.children.length - 1) {
                _index = 0;
            } else {
                _index = index - 1;
            }
        }
        return _index;
    }

    

    destroy() {
        this.destroyList.forEach((fun) => {
            fun()
        })
        this.destroyList = []
        this.detachEvents()
    }

    componentWillUnmount() {
        this.destroy()
    }
    attachEvents(){
    	this.initEvents(false)
    }
    detachEvents(){
    	this.initEvents(true)
    }
    initEvents(detach){
    	var action = detach ? 'off' : 'on';
		var me = this;
		var supportTouch = SupportEvents.touch
		var touchEvents = SupportEvents.touchEvents
		var touchEventsTarget = this.swiperWrapper
	/*	this.el.delegate('touchmove touchstart touchend', '.hscroll-content', function(e){
			 
			return true;
		});*/
		var onTouchStart = function(e){
			console.log('touch start')
			me.allowClick = true;
			me.stop();
			me.touching = true;
			me.setState({
				animStyle: Object.assign({}, me.state.animStyle, {
					'WebkitTransitionDuration': '0s',
					'transitionDuration': '0s'

				})
			});

			var clientX = (supportTouch ? e.changedTouches[0].clientX : e.clientX)
			var clientY = (supportTouch ? e.changedTouches[0].clientY : e.clientY)
			 
			me.startX = clientX;
			me.startY = clientY;
			
			me.startPos = me.params.direction === 'horizontal' ?clientX : clientY;
			
			me.startTime = new Date().getTime();//如果快速手滑，则掠过touchmove，因此需要计算时间
			if (e.type !== 'touchstart') {
				e.preventDefault()
			}

		}


		var onTouchMove = function(e){
			console.log('touch move')
			if(!me.touching) return;
			e.preventDefault()
			e.stopPropagation();
			me.allowClick = false;
			var slideSize = me.slideSize;
			// 确保单手指滑动，而不是多点触碰
			if(e.touches && e.touches.length > 1 ) return;

			var clientX = (supportTouch ? e.touches[0].clientX : e.clientX)
			var clientY = (supportTouch ? e.touches[0].clientY : e.clientY)
			//delta > 0 ，右移，delta < 0 左移
			me.delta = me.params.direction == 'horizontal' ? clientX  - me.startPos :  clientY - me.startPos; 

			//判断是否在边界反滑动，true，出现了反滑动，false，正常滑动
			var anti = me.params.loop ? false : ( me.isLast() && me.delta < 0 || me.isFirst() && me.delta > 0 );

			if(anti){
				me.delta = me.delta / 3; //如果是边界反滑动，则增加阻尼效果
			}

			// 判断是否需要上下滑动页面

			var isScrolling = ( Math.abs(me.delta) < Math.abs( me.params.direction == 'horizontal' ? (clientY- me.startY) : (clientX- me.startX) ) ) ? true: false

			if(!isScrolling){
				// 阻止默认上下滑动事件
				//e.stopPropagation();
				//e.preventDefault();
				me.stop();
				var dic = me.delta - me.state.activeIndex * slideSize;
				 
				 
				// 立即跟随移动
				if( me.params.direction == 'horizontal'){
					me.setState({
						animStyle: {
							'WebkitTransitionDuration': '0s',
							'transitionDuration': '0s',
							'WebkitTransform':'translate3d('+dic+'px,0,0)',
							'transform':'translate3d('+dic+'px,0,0)'
						}
					})
					 
				}else{
					me.setState({
						animStyle: {
							'WebkitTransitionDuration': '0s',
							'transitionDuration': '0s',
							'WebkitTransform':'translate3d(0,'+dic+'px,0)',
							'transform':'translate3d(0,'+dic+'px,0)'
						}
					})
					 
				}
				return false;
			}else{
				return true;
			}
				
			
		}

		var onTouchEnd = function(e){
			if (!me.allowClick) {
	            e.preventDefault();
	        }
			me.touching = false;
			var clientX = (supportTouch ? e.changedTouches[0].clientX : e.clientX)
			var clientY = (supportTouch ? e.changedTouches[0].clientY : e.clientY)
			var endPos = me.params.direction == 'horizontal' ? clientX : clientY;
			me.delta = Math.abs(endPos - me.startPos);//滑过的距离
			var swipe_forward = Math.abs(endPos) < Math.abs(me.startPos);//是否是向左滑动
			var swipe_backward = !swipe_forward;
			//判断是否在边界反滑动，true，出现了反滑动，false，正常滑动
			var anti = me.params.loop ? false : ( me.isLast() && swipe_forward || me.isFirst() && swipe_backward );

			//复位
			var reset = function(){
				me.go(me.state.activeIndex);
			};

			//根据手势走向上一个或下一个
			var goswipe = function(){
				if(swipe_forward){//下一帧
					me.next();
				}else{//上一帧
					me.previous();
				}
			};
			var isScrolling = ( Math.abs(me.delta) < Math.abs( me.params.direction == 'horizontal' ? (clientY- me.startY) : (clientX- me.startX) ) ) ? true: false
			if(!anti && !isScrolling &&(
					// 支持touchmove，跑马灯效果，任意帧，touchmove足够的距离
					(me.delta > me.slideSize / 2)
					//快速手滑  me.delta>10 避免将不精确的点击误认为是滑动
					|| ( (new Date().getTime() - me.startTime < 550) && me.delta > 10 )
				)){

				//根据根据手滑方向翻到上一页和下一页
				goswipe();
			}else{
				//复位
				reset();
			}

			if(me.params.autoplay && me.stoped){
				me.play();
			}
		 
		}

		if (supportTouch) {
            touchEventsTarget[action](touchEvents.start, onTouchStart, false);
            touchEventsTarget[action](touchEvents.move, onTouchMove, true);
            touchEventsTarget[action](touchEvents.end, onTouchEnd, false);
        }
        else {
            touchEventsTarget[action]('mousedown', onTouchStart, false);
            $(document)[action]('mousemove', onTouchMove, true);
            $(document)[action]('mouseup', onTouchEnd, false);
        }

		var preventClicks = function(e){
			if (!me.allowClick) {
	            e.preventDefault();
	            e.stopPropagation();
	            
	        }
		}

		touchEventsTarget[action]('click', preventClicks, true);
		
		var onResize = function(){
			me.slideSize = me.swiperContainer.width()
			me.go(me.state.activeIndex, 'none');
		}
		$(window)[action]( 'resize', onResize);
		
	 
	}

    render() {
      return (
		<div className={classnames('swiper-container swiper-container-horizontal', this.props.className)} ref="swiperContainer">
		  {
		  	this.props.children && this.props.children.length > 1 ? (
		  	  <div className="swiper-pagination color-white swiper-pagination-bullets">
		  	  	{
		  	  	  this.props.children.map((child, index) => (
			        <span className={classnames('swiper-pagination-bullet', {'swiper-pagination-bullet-active': this.getRealIndex(this.state.activeIndex)===index})} key={index}></span>
			      ))
		  	  	}
		      	
		      </div>
		  	) : ''
		  }
	      
	      <div className="swiper-wrapper" style={this.state.animStyle}>
	      {
		      this.state.children.map((child, index) => (
		        <div className="swiper-slide" key={index}>{child}</div>
		      ))
	      }
	      
	      </div>
	    </div>
      )

    }
}
