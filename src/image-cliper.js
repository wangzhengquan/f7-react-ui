/*======================================================
************   Image Cliper   ************
======================================================*/
import PARAMS from './params'
import t7 from './template'
import $ from './dom'
import Modals from './modals'
import Views from './views'
import Support from './support'
import Device from './device'
require('./resources/less/image-cliper.less')

var ImageCliper = function (params) {
	var me = this;
	var defaults = {
		cancelText: 'Cancel',
        okText: 'Ok',
		title: 'title',
		type: 'page',
        navbar: true,
		material: PARAMS.material,
        ratio: 1
        
    };
    
    params = params || {};
    if (!params.backLinkText && PARAMS.material) defaults.backLinkText = '';
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }

    if(params.file){
        this.fileName = params.file.name
        params.url = URL.createObjectURL(params.file);
    }

    if(params.ratio >= 1){
        params.ratioText = params.ratio +':1';
    } else if(params.ratio + ''.indexOf('/') > 0){
        params.ratioText = (params.ratio + '').replace('/', ':');
    } else if(params.ratio < 1){
        params.ratioText = params.ratio * 100 +'%';
    } else {
        params.ratioText = params.ratio;
    }

    
    me.params = params;
    
    var navbarTemplate = me.params.navbarTemplate ||
        '<div class="navbar image-cliper-navbar">' +
            '<div class="navbar-inner">' +
                '<div class="left sliding">' +
                     
                '</div>' +
                '<div class="center sliding">' +
                    '<span style="margin-right: 5px;">宽高比例</span> ' +
                    '<span>{{ratioText}}</span> ' +
                '</div>' +
                '<div class="right"></div>' +
            '</div>' +
        '</div>';

	var toolbarTemplate = me.params.toolbarTemplate ||
        '<div class="toolbar tabbar image-cliper-toolbar">' +
            '<div class="toolbar-inner">' +
                '<a href="#" class="link close-popup image-cliper-close-link cancel"> {{cancelText}} </a>' +
                '<a href="#" class="link ok  image-cliper-ok-link">{{okText}}</a>' +
            '</div>' +
        '</div>';

    var htmlTemplate = t7.compile('<div class="image-cliper">' +
        '<div class="view navbar-fixed toolbar-fixed">' +
             
            '<div class="page no-navbar toolbar-fixed navbar-fixed" data-page="image-cliper-slides">' +
                
                toolbarTemplate +
                '<div class="ratio-bar"><span class="ratio-name">宽高比例</span><span class="ratio-value">{{ratioText}}</span></div>'+
                '<div class="image-cliper-container">' +
                    '<div class="image-cliper-clip-container-shadow">' +
                    '</div>' +
                    '<div class="image-cliper-clip-container">' +
                        '<div class="jcrop-hline"></div>' +
                        '<div class="jcrop-hline bottom"></div>' +
                        '<div class="jcrop-vline right"></div>' +
                        '<div class="jcrop-vline"></div>' +
                        '<span class="image-cliper-zoom-container">' +
                           '<img class="target-img" src="{{this.url}}"/>' +
                        '</span>' +
                       // '<canvas class="image-cliper-canvas" width="100%" height="100%"></canvas>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>')(me.params);

     

    me.open = function () {
         
        if (me.opened) {
            return;
        }

        me.opened = true;
        if (me.params.type === 'standalone') {
            $('body').append(htmlTemplate);
        }
        if (me.params.type === 'popup') {
            me.popup = Modals.popup('<div class="popup image-cliper-popup">' + htmlTemplate + '</div>');
        }
        if (me.params.type === 'page') {
            var mainView =  window.mainView  = window.mainView || Views.addView('.view-main', {
                // Enable Dynamic Navbar for this view
                dynamicNavbar: true
            })

            if (!me.params.view) me.params.view = mainView;
            var result = mainView.loadContent(htmlTemplate);
             
            //return;
        }
        me.layout();
        if (me.params.onOpen) {
            me.params.onOpen(me);
        }

    };

    var targetImage, imageZoomContainer, imageClipContainerShadow, imageClipContainer,
        canvas, imageClipContainerWidth, imageClipContainerHeight, scale=1;

    me.layout = function () {
        if (me.params.type === 'page') {
            me.container = $('.image-cliper-container').parents('.view');
        }
        else {
            me.container = $('.image-cliper');
        }
        if (me.params.type === 'standalone') {
            me.container.addClass('image-cliper-in');
            
        }
        
        imageClipContainer = me.container.find('.image-cliper-clip-container')
        imageClipContainerShadow = me.container.find('.image-cliper-clip-container-shadow')
        targetImage = me.container.find('img.target-img');
        imageZoomContainer = me.container.find('.image-cliper-zoom-container');

        imageClipContainerWidth =  imageClipContainer[0].offsetWidth;
        imageClipContainerHeight = imageClipContainer[0].offsetWidth / me.params.ratio;
      // alert( imageClipContainerWidth)
       // alert(targetImage[0].offsetHeight)
        // if(me.params.fill){
        //     setTimeout(function(){
        //         if(imageClipContainerHeight>targetImage[0].offsetHeight){
        //             scale = imageClipContainerHeight/targetImage[0].offsetHeight
        //             targetImage.transform('translate3d(0,0,0) scale(' + scale + ')');
        //         }
        //     }, 500)
                
        // }
        
        canvas = $('<canvas class="image-cliper-canvas" width="' + imageClipContainerWidth + '" height="' + imageClipContainerHeight + '"></canvas>')[0];
        imageClipContainer.append(canvas);

        imageClipContainer.css('height', imageClipContainerHeight + 'px') ;
        imageClipContainerShadow.css('height', imageClipContainerHeight + 'px');



        me.attachEvents();
    };

    me.close = function () {
        me.opened = false;
         
        if (me.params.onClose) {
            me.params.onClose(me);
        }
        // Detach events
        me.attachEvents(true);
        // Delete from DOM
        if (me.params.type === 'standalone') {
            me.container.removeClass('photo-browser-in').addClass('photo-browser-out').animationEnd(function () {
                me.container.remove();
            });
        } else if(me.params.type === 'page'){
            window.mainView.back()
        }
    };

    

    me.ok = function(e) {

        e.preventDefault()
        if(!clip){
            var scaledWidth = targetImage[0].offsetWidth * scale;
            var scaledHeight = targetImage[0].offsetHeight * scale;
            clip = {
                x: 0,
                y: -Math.min((imageClipContainer.height() / 2 - scaledHeight / 2), 0),
                width: imageClipContainer.width(),
                height: scaledHeight > imageClipContainer.height() ? imageClipContainer.height() : scaledHeight
            }
        }
        me.clipImage(clip.x, clip.y, clip.width, clip.height, function(){
            me.close()
        })
       
    }

    me.clipImage = function(sx, sy, sw, sh, cb) {
       var ctx = canvas.getContext('2d');
       var dx = sx,
           //dy = imageClipContainer.height() > sh ? imageClipContainer.height()/2 - sh/2 : 0,
           dy=0,
           dw = sw,
           dh = sh;

       if(imageClipContainer.height() > sh){
        //当剪贴区的高度大于图片高度时，设置画布的高度等于图片高度,去除余白
        $(canvas).attr('height', sh)
       }
       var scale = targetImage[0].naturalWidth / imageClipContainer.width()
          sx = sx * scale,
          sy = sy * scale,
          sw = sw * scale,
          sh = sh * scale;

        ctx.drawImage(targetImage[0], sx, sy, sw, sh, dx, dy, dw, dh);
        //console.log('====clip===', sx, sy, sw, sh, imageClipContainer.width(), imageClipContainer.height())
        canvas.toBlob(function(blob) {
            me.params.onClip && me.params.onClip(blob, me.fileName)
            cb && cb()
        });
    }

    var imageIsTouched = false, imageIsMoved = false, imageTouchesStart = {},
        imageWidth, imageHeight, imageStartX, imageStartY,
        imageMinX, imageMaxX, imageMinY, imageMaxY,
        imageTouchesCurrent = {},
        imageCurrentX, imageCurrentY,
        velocityPrevPositionX, velocityPrevPositionY, velocityPrevTime,
        velocityX, velocityY,
        clip;
        
    me.onImageTouchStart = function (e) {
        if (imageIsTouched) return;
        if (Device.os === 'android') e.preventDefault();

        imageIsTouched = true;
        imageTouchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        imageTouchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    };

    me.onImageTouchMove = function (e) {
        if (!imageIsTouched) return;
        if (!imageIsMoved) {
            imageWidth = targetImage[0].offsetWidth;
            imageHeight = targetImage[0].offsetHeight;
            imageStartX = $.getTranslate(imageZoomContainer[0], 'x') || 0;
            imageStartY = $.getTranslate(imageZoomContainer[0], 'y') || 0;
            imageZoomContainer.transition(0);
        }
        // Define if we need image drag
        var scaledWidth = imageWidth * scale;
        var scaledHeight = imageHeight * scale;
        if (scaledWidth < imageClipContainer.width() && scaledHeight < imageClipContainer.height()) return;

        imageMinX = Math.min((imageClipContainer.width() / 2 - scaledWidth / 2), 0);
        imageMaxX = -imageMinX;
        imageMinY = Math.min((imageClipContainer.height() / 2 - scaledHeight / 2), 0);
        imageMaxY = -imageMinY;
        
        imageTouchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        imageTouchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        // if (!imageIsMoved) {
        //     if (
        //         (Math.floor(imageMinX) === Math.floor(imageStartX) && imageTouchesCurrent.x < imageTouchesStart.x) ||
        //         (Math.floor(imageMaxX) === Math.floor(imageStartX) && imageTouchesCurrent.x > imageTouchesStart.x)
        //         ) {
        //         imageIsTouched = false;
        //         return;
        //     }
        // }
        e.preventDefault();
        e.stopPropagation();
        imageIsMoved = true;
        imageCurrentX = imageTouchesCurrent.x - imageTouchesStart.x + imageStartX;
        imageCurrentY = imageTouchesCurrent.y - imageTouchesStart.y + imageStartY;
        
        if (imageCurrentX < imageMinX) {
            imageCurrentX =  imageMinX + 1 - Math.pow((imageMinX - imageCurrentX + 1), 0.8);
        }
        if (imageCurrentX > imageMaxX) {
            imageCurrentX = imageMaxX - 1 + Math.pow((imageCurrentX - imageMaxX + 1), 0.8);
        }
        
        if (imageCurrentY < imageMinY) {
            imageCurrentY =  imageMinY + 1 - Math.pow((imageMinY - imageCurrentY + 1), 0.8);
        }
        if (imageCurrentY > imageMaxY) {
            imageCurrentY = imageMaxY - 1 + Math.pow((imageCurrentY - imageMaxY + 1), 0.8);
        }

        //Velocity
        if (!velocityPrevPositionX) velocityPrevPositionX = imageTouchesCurrent.x;
        if (!velocityPrevPositionY) velocityPrevPositionY = imageTouchesCurrent.y;
        if (!velocityPrevTime) velocityPrevTime = Date.now();
        velocityX = (imageTouchesCurrent.x - velocityPrevPositionX) / (Date.now() - velocityPrevTime) / 2;
        velocityY = (imageTouchesCurrent.y - velocityPrevPositionY) / (Date.now() - velocityPrevTime) / 2;
        if (Math.abs(imageTouchesCurrent.x - velocityPrevPositionX) < 2) velocityX = 0;
        if (Math.abs(imageTouchesCurrent.y - velocityPrevPositionY) < 2) velocityY = 0;
        velocityPrevPositionX = imageTouchesCurrent.x;
        velocityPrevPositionY = imageTouchesCurrent.y;
        velocityPrevTime = Date.now();

        imageZoomContainer.transform('translate3d(' + imageCurrentX + 'px, ' + imageCurrentY + 'px,0)');
    };

    me.onImageTouchEnd = function (e) {
        if (!imageIsTouched || !imageIsMoved) {
            imageIsTouched = false;
            imageIsMoved = false;
            return;
        }
        imageIsTouched = false;
        imageIsMoved = false;
        var momentumDurationX = 300;
        var momentumDurationY = 300;
        var momentumDistanceX = velocityX * momentumDurationX;
        var newPositionX = imageCurrentX + momentumDistanceX;
        var momentumDistanceY = velocityY * momentumDurationY;
        var newPositionY = imageCurrentY + momentumDistanceY;

        //Fix duration
        if (velocityX !== 0) momentumDurationX = Math.abs((newPositionX - imageCurrentX) / velocityX);
        if (velocityY !== 0) momentumDurationY = Math.abs((newPositionY - imageCurrentY) / velocityY);
        var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

        imageCurrentX = newPositionX;
        imageCurrentY = newPositionY;

        // Define if we need image drag
        var scaledWidth = imageWidth * scale;
        var scaledHeight = imageHeight * scale;
        imageMinX = Math.min((imageClipContainer.width()/ 2 - scaledWidth / 2), 0);
        imageMaxX = -imageMinX;
        imageMinY = Math.min((imageClipContainer.height() / 2 - scaledHeight / 2), 0);
        imageMaxY = -imageMinY;
        imageCurrentX = Math.max(Math.min(imageCurrentX, imageMaxX), imageMinX);
        imageCurrentY = Math.max(Math.min(imageCurrentY, imageMaxY), imageMinY);
        
        clip ={
            x: 0,
            y: - imageMinY - imageCurrentY,
            width: imageClipContainer.width(),
            height: scaledHeight > imageClipContainer.height() ? imageClipContainer.height() : scaledHeight
        }
        imageZoomContainer.transition(momentumDuration).transform('translate3d(' + imageCurrentX + 'px, ' + imageCurrentY + 'px,0)');

    };
    

    me.attachEvents = function (detach) {
        var action = detach ? 'off' : 'on';
        // Move image
        // imageClipContainerShadow
        imageClipContainerShadow[action](Support.touchEvents.start, me.onImageTouchStart);
        imageClipContainerShadow[action](Support.touchEvents.move, me.onImageTouchMove);
        imageClipContainerShadow[action](Support.touchEvents.end, me.onImageTouchEnd);
        
        imageClipContainer[action](Support.touchEvents.start, me.onImageTouchStart);
        imageClipContainer[action](Support.touchEvents.move, me.onImageTouchMove);
        imageClipContainer[action](Support.touchEvents.end, me.onImageTouchEnd);
        me.container.find('.image-cliper-close-link')[action]('click', me.close);
        me.container.find('.image-cliper-ok-link')[action]('click', me.ok);
    };
}

ImageCliper.imageCliper = function (params) {
    return new ImageCliper(params);
};

export default ImageCliper;