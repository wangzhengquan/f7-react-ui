/*======================================================
************   Image Lazy Loading   ************
************   Based on solution by Marc Godard, https://github.com/MarcGodard   ************
======================================================*/
import $ from './dom'

function isElementInViewport (el, threshold) {
    var rect = el.getBoundingClientRect();
    var threshold = threshold || 0;

    return (
        rect.top >= (0 - threshold) &&
        rect.left >= (0 - threshold) &&
        rect.top <= (window.innerHeight + threshold) &&
        rect.left <= (window.innerWidth + threshold)
    );
    //console.log(isi,rect.top ,rect.left ,(0 - threshold),(0 - threshold), (window.innerHeight + threshold), (window.innerWidth + threshold))
    //return isi;
}

var loadImage = (function(){
    // load image
    var imagesSequence = [];
    var imageIsLoading = false;
    return function loadImage(el, imagesLazyLoadSequential) {
        el = $(el);

        var bg = el.attr('data-background');
        var src = bg ? bg : el.attr('data-src');
        if (!src) return;

        function onLoad() {
            el.removeClass('lazy').addClass('lazy-loaded');
            if (bg) {
                el.css('background-image', 'url(' + src + ')');
                el.removeAttr('data-background')
            }
            else {
                el.attr('src', src);
                el.removeAttr('data-src')

            }

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
        
        var image = new Image();
        image.onload = onLoad;
        image.onerror = onLoad;
        image.src =src;
    }
})()

export default class Lazyload {
    constructor(config){
        this.config = config;
        this.initImagesLazyLoad();
    }
    initImagesLazyLoad () {
        var me = this
        var pageContainer = $(this.config.pageContainer);;

        // Lazy images
        var lazyLoadImages;
        if (pageContainer.hasClass('lazy')) {
            lazyLoadImages = pageContainer;
            pageContainer = lazyLoadImages.parents('.page');
        }
        else {
            lazyLoadImages = pageContainer.find('.lazy');
        }
        //if (lazyLoadImages.length === 0) return;

        // Scrollable page content
        var pageContent;
        if (pageContainer.hasClass('page-content'))  {
            pageContent = pageContainer;
            pageContainer = pageContainer.parents('.page');
        }
        else  {
            pageContent = pageContainer.find('.page-content');
        }
        if (pageContent.length === 0) return;
        this.pageContainer = pageContainer;
        this.pageContent = pageContent;
        // Placeholder
        var placeholderSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
        if (typeof this.config.placeholder === 'string') {
            placeholderSrc = this.config.placeholder;
        }
        if (this.config.placeholder !== false) lazyLoadImages.each(function(){
            if ($(this).attr('data-src')) $(this).attr('src', placeholderSrc);
        });

        this.handleLazy()
        this.attachEvents()

    }
    attachEvents(destroy) {
        var method = destroy ? 'off' : 'on';
        // lazyLoadImages.parents('.tab')[method]('show', handleLazy);
        this.pageContent[method]('scroll', this.handleLazy.bind(this));
        $(window)[method]('resize', this.handleLazy.bind(this));
    }   
    detachEvents() {
        this.attachEvents(true);
    }
     // Store detach function
    destroy () {
        this.detachEvents()
    }
    build (){
        attachEvents()
    } 
    handleLazy() {
        var lazyLoadImages = this.pageContainer.find('.lazy');
        lazyLoadImages.each((index, el) => {
            el = $(el);
            if (el.parents('.tab:not(.active)').length > 0) {
                return;
            }
            if (isElementInViewport(el[0])) {
                loadImage(el);
            }
        });
    }

     
}
