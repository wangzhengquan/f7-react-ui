/*======================================================
************   Image Lazy Loading   ************
************   Based on solution by Marc Godard, https://github.com/MarcGodard   ************
======================================================*/
import $ from './dom'
import Type from './type'

// 两块区域是否相交
function isCross(r1, r2) {
    var r = {};
    r.top = Math.max(r1.top, r2.top);
    r.bottom = Math.min(r1.bottom, r2.bottom);
    r.left = Math.max(r1.left, r2.left);
    r.right = Math.min(r1.right, r2.right);
    return r.bottom >= r.top && r.right >= r.left;
}

function isElementInViewport (el, threshold) {
    var rect = el.getBoundingClientRect();
    var threshold = threshold || 0;
    if(Type.isNumber(threshold)){
        threshold = {
            top: threshold,
            left: threshold,
            bottom: threshold,
            right: threshold
        }
    }
    if(threshold.width) {
        threshold.left = threshold.width
        threshold.right = threshold.width
    }
    if(threshold.height){
        threshold.top = threshold.height
        threshold.bottom = threshold.height
    }
// console.log(rect, window.innerWidth)

    return isCross({
        top: rect.top-threshold.top || 0,
        left: rect.left - threshold.left || 0,
        bottom: rect.bottom + threshold.bottom || 0,
        right: rect.right + threshold.right || 0
    }, {
        top: 0,
        left: 0,
        bottom: window.innerHeight,
        right: window.innerWidth
    })
    // return (
    //     rect.top >= (0 - threshold) &&
    //     rect.left >= (0 - threshold) &&
    //     rect.top <= (window.innerHeight + threshold) &&
    //     rect.left <= (window.innerWidth + threshold)
    // );
    //return isi;
}



export default class Lazyload {
    constructor(config){
        this.config = config = config || {};
        this.threshold = config.threshold;
        if(!this.threshold) {
            this.threshold = {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
        var callback = function(el, image) {
            if(image.width <= image.height){
                el.css('width',  '100%')
            } else {
                el.css('height',  '100%')
            }
            config.callback &&  config.callback(el, image)
        }

        this.loadImage = (function(cb){
            // load image
            
            var imagesSequence = [];
            var imageIsLoading = false;
            return function loadImage(el, imagesLazyLoadSequential) {
               
                el = $(el);
                var bg = el.attr('data-background');
                var src = bg ? bg : el.attr('data-src');
                if (!src) return;

                var image = new Image();
                function onLoad() {
                    el.removeClass('lazy');
                    if (bg) {
                        el.css('background-image', 'url(' + src + ')');
                        el.removeAttr('data-background')
                    }
                    else {
                        el.attr('src', src);
                        el.removeAttr('data-src')

                    }

                    // console.log(image.width, image.height)
                    cb && cb(el, image)
                    
                    

                    if (imagesLazyLoadSequential) {
                        imageIsLoading = false;
                        if (imagesSequence.length > 0) {
                            loadImage(imagesSequence.shift());
                        }
                    }
                }

                if (imagesLazyLoadSequential) {
                    if (imageIsLoading) {
                        if (imagesSequence.indexOf(el[0]) < 0) imagesSequence.push(el[0]);
                        return;
                    }
                }

                // Loading flag
                imageIsLoading = true;
                
               
                image.onload = onLoad;
                image.onerror = onLoad;
                image.src =src;
            }
        })(callback)

        this.initImagesLazyLoad();
    }
    initImagesLazyLoad () {
        var me = this;
        var scrollContainer = $(this.config.scrollContainer);
        var lazyLoadImages = this.lazyLoadImages= scrollContainer.find('.lazy');
        
        this.scrollContainer = scrollContainer;
        // Placeholder
        var placeholderSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
        if (typeof this.config.placeholder === 'string') {
            placeholderSrc = this.config.placeholder;
        }
       lazyLoadImages.each(function(){
            let $this = $(this)
            // console.log('===this.src', this.src, $this.attr('data-src'))
            if (this.src && !$this.attr('data-src')) {
                $this.attr('data-src', this.src)
            }
            if (me.config.placeholder !== false)  this.src = placeholderSrc
        });

        this.handleLazy = this._handleLazy.bind(this)
        this.handleLazy()
        this.attachEvents()

    }
    attachEvents(destroy) {
        var method = destroy ? 'off' : 'on';
        var handleLazy = this.handleLazy
         
        this.lazyLoadImages.parents('.tab')[method]('show', handleLazy);
        this.scrollContainer[method]('scroll', handleLazy);
        $(window)[method]('resize', handleLazy);
    }
    detachEvents() {
        this.attachEvents(true);
    }
     // Store detach function
    destroy () {
        this.detachEvents()
    }
    build (){
        this.attachEvents()
    }
    _handleLazy() {
        var me = this;
         
        var lazyLoadImages = this.scrollContainer.find('.lazy');
        lazyLoadImages.each((index, el) => {
            el = $(el);
            if (el.parents('.tab:not(.active)').length > 0) {
                return;
            }
            // console.log(isElementInViewport(el[0]))
            if (isElementInViewport(el[0], this.threshold)) {
                me.loadImage(el);
            }
        });
    }

     
}
