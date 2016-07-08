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
		backLinkText: 'Close',
		title: 'title',
		type: 'page',
		material: PARAMS.material
        
    };
    
    params = params || {};
    if (!params.backLinkText && PARAMS.material) defaults.backLinkText = '';
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }

    me.params = params;

	var toolbarTemplate = me.params.toolbarTemplate ||
        '<div class="toolbar tabbar image-cliper-toolbar">' +
            '<div class="toolbar-inner">' +
                '<a href="#" class="link cancel back">' +
                    '取消' +
                '</a>' +
                '<a href="#" class="link ok">' +
                    '选取' +
                '</a>' +
            '</div>' +
        '</div>';

    var htmlTemplate = t7.compile('<div class="image-cliper">' +
        '<div class="view navbar-fixed toolbar-fixed">' +
            '<div class="page no-toolbar {{#unless navbar}}no-navbar{{/unless}} toolbar-fixed navbar-fixed" data-page="image-cliper-slides">' +
                toolbarTemplate +
                '<div class="image-cliper-container">' +
                    '<div class="image-cliper-clip-container-shadow">' +
                        // '<div class="jcrop-hline"></div>' +
                        // '<div class="jcrop-hline bottom"></div>' +
                        // '<div class="jcrop-vline right"></div>' +
                        // '<div class="jcrop-vline"></div>' +
                         
                    '</div>' +
                    '<div class="image-cliper-clip-container">' +
                        '<span class="image-cliper-zoom-container">' +
                           '<img class="target-img" src="{{this.image}}"/>' +
                        '</span>' +
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
            var mainView = window.mainView || Views.addView('.view-main', {
                // Enable Dynamic Navbar for this view
                dynamicNavbar: true
            })

            if (!me.params.view) me.params.view = mainView;
            mainView.loadContent(htmlTemplate);
            //return;
        }
        me.layout();
        if (me.params.onOpen) {
            me.params.onOpen(me);
        }

    };

    var targetImage, imageZoomContainer, imageClipContainerShadow;
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
        
        me.imageClipContainer = me.container.find('.image-cliper-clip-container')
        imageClipContainerShadow = me.container.find('.image-cliper-clip-container-shadow')
        targetImage = me.container.find('img.target-img');
        imageZoomContainer = me.container.find('.image-cliper-zoom-container');
        me.attachEvents();
    };

    var imageIsTouched = false, imageIsMoved = false, imageTouchesStart = {},
        imageWidth, imageHeight, imageStartX, imageStartY, scale=1,
        imageMinX, imageMaxX, imageMinY, imageMaxY,
        imageTouchesCurrent = {},
        imageCurrentX, imageCurrentY,
        velocityPrevPositionX, velocityPrevPositionY, velocityPrevTime,
        velocityX, velocityY;
        
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
        if (scaledWidth < me.imageClipContainer.width() && scaledHeight < me.imageClipContainer.height()) return;

        imageMinX = Math.min((me.imageClipContainer.width() / 2 - scaledWidth / 2), 0);
        imageMaxX = -imageMinX;
        imageMinY = Math.min((me.imageClipContainer.height() / 2 - scaledHeight / 2), 0);
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
        imageMinX = Math.min((me.imageClipContainer.width()/ 2 - scaledWidth / 2), 0);
        imageMaxX = -imageMinX;
        imageMinY = Math.min((me.imageClipContainer.height() / 2 - scaledHeight / 2), 0);
        imageMaxY = -imageMinY;
        imageCurrentX = Math.max(Math.min(imageCurrentX, imageMaxX), imageMinX);
        imageCurrentY = Math.max(Math.min(imageCurrentY, imageMaxY), imageMinY);

        imageZoomContainer.transition(momentumDuration).transform('translate3d(' + imageCurrentX + 'px, ' + imageCurrentY + 'px,0)');
    };

    me.attachEvents = function (detach) {
        var action = detach ? 'off' : 'on';
        // Move image
        imageClipContainerShadow[action](Support.touchEvents.start, me.onImageTouchStart);
        imageClipContainerShadow[action](Support.touchEvents.move, me.onImageTouchMove);
        imageClipContainerShadow[action](Support.touchEvents.end, me.onImageTouchEnd);
        // me.container.find('.photo-browser-close-link')[action]('click', me.close);
    };
}

ImageCliper.imageCliper = function (params) {
    return new ImageCliper(params);
};

export default ImageCliper;