import $ from './dom'
require('./resources/less/modals.less');
require('./resources/less/preloader.less');

let device = window.device = window.device || require('./device')

var _modalTemplateTempDiv = document.createElement('div');



var Modals = {
	params : {
		modalStack : true,
		material: false,
	},
	modalStack: [],
	modalStackClearQueue () {
	    if (this.modalStack.length) {
	        (this.modalStack.shift())();
	    }
	},


	openModal (modal) {
	    modal = $(modal);
	    var isModal = modal.hasClass('modal');
	    if ($('.modal.modal-in:not(.modal-out)').length && this.params.modalStack && isModal) {
	        this.modalStack.push( () => {
	            this.openModal(modal);
	        });
	        return;
	    }
	    // do nothing if this modal already shown
	    if (true === modal.data('f7-modal-shown')) {
	        return;
	    }
	    modal.data('f7-modal-shown', true);
	    modal.once('close', function() {
	       modal.removeData('f7-modal-shown');
	    });
	    var isPopover = modal.hasClass('popover');
	    var isPopup = modal.hasClass('popup');
	    var isLoginScreen = modal.hasClass('login-screen');
	    var isPickerModal = modal.hasClass('picker-modal');
	    if (isModal) {
	        modal.show();
	        modal.css({
	            marginTop: - Math.round(modal.outerHeight() / 2) + 'px'
	        });
	    }

	    var overlay;
	    if (!isLoginScreen && !isPickerModal) {
	        if ($('.modal-overlay').length === 0 && !isPopup) {
	            $('body').append('<div class="modal-overlay"></div>');
	        }
	        if ($('.popup-overlay').length === 0 && isPopup) {
	            $('body').append('<div class="popup-overlay"></div>');
	        }
	        overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
	    }
	    if (this.params.material && isPickerModal) {
	        if (modal.hasClass('picker-calendar')) {
	            if ($('.picker-modal-overlay').length === 0 && !isPopup) {
	                $('body').append('<div class="picker-modal-overlay"></div>');
	            }
	            overlay = $('.picker-modal-overlay');
	        }
	    }

	    //Make sure that styles are applied, trigger relayout;
	    var clientLeft = modal[0].clientLeft;

	    // Trugger open event
	    modal.trigger('open');

	    // Picker modal body class
	    if (isPickerModal) {
	        $('body').addClass('with-picker-modal');
	    }

	    // Classes for transition in
	    if (!isLoginScreen && !isPickerModal) overlay.addClass('modal-overlay-visible');
	    if (this.params.material && isPickerModal && overlay) overlay.addClass('modal-overlay-visible');
	    modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
	        if (modal.hasClass('modal-out')) modal.trigger('closed');
	        else modal.trigger('opened');
	    });
	    return true;
	},

	closeModal (modal) {
	    modal = $(modal || '.modal-in');
	    if (typeof modal !== 'undefined' && modal.length === 0) {
	        return;
	    }
	    var isModal = modal.hasClass('modal');
	    var isPopover = modal.hasClass('popover');
	    var isPopup = modal.hasClass('popup');
	    var isLoginScreen = modal.hasClass('login-screen');
	    var isPickerModal = modal.hasClass('picker-modal');

	    var removeOnClose = modal.hasClass('remove-on-close');

	    var overlay;
	    
	    if (isPopup) overlay = $('.popup-overlay');
	    else {
	        if (isPickerModal && this.params.material) overlay = $('.picker-modal-overlay');
	        else if (!isPickerModal) overlay = $('.modal-overlay');
	    }

	    if (isPopup){
	        if (modal.length === $('.popup.modal-in').length) {
	            overlay.removeClass('modal-overlay-visible');
	        }
	    }
	    else if (overlay && overlay.length > 0) {
	        overlay.removeClass('modal-overlay-visible');
	    }

	    modal.trigger('close');

	    // Picker modal body class
	    if (isPickerModal) {
	        $('body').removeClass('with-picker-modal');
	        $('body').addClass('picker-modal-closing');
	    }

	    if (!(isPopover && !this.params.material)) {
	        modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
	            if (modal.hasClass('modal-out')) modal.trigger('closed');
	            else {
	                modal.trigger('opened');
	                if (isPopover) return;
	            }

	            if (isPickerModal) {
	                $('body').removeClass('picker-modal-closing');
	            }
	            if (isPopup || isLoginScreen || isPickerModal || isPopover) {
	                modal.removeClass('modal-out').hide();
	                if (removeOnClose && modal.length > 0) {
	                    modal.remove();
	                }
	            }
	            else {
	                modal.remove();
	            }
	        });
	        if (isModal && this.params.modalStack) {
	            this.modalStackClearQueue();
	        }
	    }
	    else {
	        modal.removeClass('modal-in modal-out').trigger('closed').hide();
	        if (removeOnClose) {
	            modal.remove();
	        }
	    }
	    return true;
	},

	modal (params) {
		let me = this;
	    params = params || {};
	    var modalHTML = '';

	    var buttonsHTML = '';
        if (params.buttons && params.buttons.length > 0) {
            for (var i = 0; i < params.buttons.length; i++) {
                buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
            }
        }
        var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
        var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
        var afterTextHTML = params.afterText ? params.afterText : '';
        var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
        var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical': '';
        var modalButtonsHTML = params.buttons && params.buttons.length > 0 ? '<div class="modal-buttons modal-buttons-' + params.buttons.length + ' ' + verticalButtons + '">' + buttonsHTML + '</div>' : '';
        modalHTML = '<div class="modal ' + noButtons + ' ' + (params.cssClass || '') + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div>' + modalButtonsHTML + '</div>';
    

	    _modalTemplateTempDiv.innerHTML = modalHTML;

	    var modal = $(_modalTemplateTempDiv).children();

	    $('body').append(modal[0]);

	    // Add events on buttons
	    modal.find('.modal-button').each(function (index, el) {
	        $(el).on('click', function (e) {
	            if (params.buttons[index].close !== false) me.closeModal(modal);
	            if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
	            if (params.onClick) params.onClick(modal, index);
	        });
	    });
	    this.openModal(modal);
	    return modal[0];
	},

	popup (modal, removeOnClose) {
		if(arguments.length === 0 && typeof modal === '[object Boolean]'){
			removeOnClose = modal
			modal = undefined
		}
		if(!modal){
			modal = '<div class="popup"></div>'
		}
	    if (typeof removeOnClose === 'undefined') removeOnClose = true;
	    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
	        var _modal = document.createElement('div');
	        _modal.innerHTML = modal.trim();
	        if (_modal.childNodes.length > 0) {
	            modal = _modal.childNodes[0];
	            if (removeOnClose) modal.classList.add('remove-on-close');
	            $('body').append(modal);
	        }
	        else return false; //nothing found
	    }
	    modal = $(modal);
	    if (modal.length === 0) return false;
	    if (modal.parents('body').length === 0) {
	        if (removeOnClose) modal.addClass('remove-on-close');
	        $('body').append(modal[0]);
	    }
	    modal.show();

	    this.openModal(modal);
	    return modal[0];
	},

	popover (modal, target, removeOnClose) {
		if(arguments.length === 1 || (arguments.length === 2 && typeof target==='[object Boolean]')){
			removeOnClose = target
			target = modal

			modal = '<div class="popover popover-menu">' +
				      '<div class="popover-angle"></div>' +
				      '<div class="popover-inner"></div>' +
				    '</div>';
		}

	    if (typeof removeOnClose === 'undefined') removeOnClose = true;
	    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
	        var _modal = document.createElement('div');
	        _modal.innerHTML = modal.trim();
	        if (_modal.childNodes.length > 0) {
	            modal = _modal.childNodes[0];
	            if (removeOnClose) modal.classList.add('remove-on-close');
	            $('body').append(modal);
	        }
	        else return false; //nothing found
	    }
	    modal = $(modal);
	    target = $(target);
	    if (modal.length === 0 || target.length === 0) return false;
	    if (modal.parents('body').length === 0) {
	        if (removeOnClose) modal.addClass('remove-on-close');
	        $('body').append(modal[0]);
	    }
	    if (modal.find('.popover-angle').length === 0 && !this.params.material) {
	        modal.append('<div class="popover-angle"></div>');
	    }
	    modal.show();

	    var material = this.params.material;

	    function sizePopover() {
	        modal.css({left: '', top: ''});
	        var modalWidth =  modal.width();
	        var modalHeight =  modal.height(); // 13 - height of angle
	        var modalAngle, modalAngleSize = 0, modalAngleLeft, modalAngleTop;
	        if (!material) {
	            modalAngle = modal.find('.popover-angle');
	            modalAngleSize = modalAngle.width() / 2;
	            modalAngle.removeClass('on-left on-right on-top on-bottom').css({left: '', top: ''});
	        }
	        else {
	            modal.removeClass('popover-on-left popover-on-right popover-on-top popover-on-bottom').css({left: '', top: ''});
	        }

	        var targetWidth = target.outerWidth();
	        var targetHeight = target.outerHeight();
	        var targetOffset = target.offset();
	        var targetParentPage = target.parents('.page');
	        if (targetParentPage.length > 0) {
	            targetOffset.top = targetOffset.top - targetParentPage[0].scrollTop;
	        }

	        var windowHeight = $(window).height();
	        var windowWidth = $(window).width();

	        var modalTop = 0;
	        var modalLeft = 0;
	        var diff = 0;
	        // Top Position
	        var modalPosition = material ? 'bottom' : 'top';
	        if (material) {
	            if (modalHeight < windowHeight - targetOffset.top - targetHeight) {
	                // On bottom
	                modalPosition = 'bottom';
	                modalTop = targetOffset.top;
	            }
	            else if (modalHeight < targetOffset.top) {
	                // On top
	                modalTop = targetOffset.top - modalHeight + targetHeight;
	                modalPosition = 'top';
	            }
	            else {
	                // On middle
	                modalPosition = 'bottom';
	                modalTop = targetOffset.top;
	            }

	            if (modalTop <= 0) {
	                modalTop = 8;
	            }
	            else if (modalTop + modalHeight >= windowHeight) {
	                modalTop = windowHeight - modalHeight - 8;
	            }

	            // Horizontal Position
	            modalLeft = targetOffset.left;
	            if (modalLeft + modalWidth >= windowWidth - 8) {
	                modalLeft = targetOffset.left + targetWidth - modalWidth - 8;
	            }
	            if (modalLeft < 8) {
	                modalLeft = 8;
	            }
	            if (modalPosition === 'top') {
	                modal.addClass('popover-on-top');
	            }
	            if (modalPosition === 'bottom') {
	                modal.addClass('popover-on-bottom');
	            }
	            if (target.hasClass('floating-button-to-popover') && !modal.hasClass('modal-in')) {
	                modal.addClass('popover-floating-button');
	                var diffX = (modalLeft + modalWidth / 2) - (targetOffset.left + targetWidth / 2),
	                    diffY = (modalTop + modalHeight / 2) - (targetOffset.top + targetHeight / 2);
	                target
	                    .addClass('floating-button-to-popover-in')
	                    .transform('translate3d(' + diffX + 'px, ' + diffY + 'px,0)')
	                    .transitionEnd(function (e) {
	                        if (!target.hasClass('floating-button-to-popover-in')) return;
	                        target
	                            .addClass('floating-button-to-popover-scale')
	                            .transform('translate3d(' + diffX + 'px, ' + diffY + 'px,0) scale(' + (modalWidth/targetWidth) + ', ' + (modalHeight/targetHeight) + ')');
	                    });

	                modal.once('close', function () {
	                    target
	                        .removeClass('floating-button-to-popover-in floating-button-to-popover-scale')
	                        .addClass('floating-button-to-popover-out')
	                        .transform('')
	                        .transitionEnd(function (e) {
	                            target.removeClass('floating-button-to-popover-out');
	                        });
	                });
	                modal.once('closed', function () {
	                    modal.removeClass('popover-floating-button');
	                });
	            }

	        }
	        else {
	            if ((modalHeight + modalAngleSize) < targetOffset.top) {
	                // On top
	                modalTop = targetOffset.top - modalHeight - modalAngleSize;
	            }
	            else if ((modalHeight + modalAngleSize) < windowHeight - targetOffset.top - targetHeight) {
	                // On bottom
	                modalPosition = 'bottom';
	                modalTop = targetOffset.top + targetHeight + modalAngleSize;
	            }
	            else {
	                // On middle
	                modalPosition = 'middle';
	                modalTop = targetHeight / 2 + targetOffset.top - modalHeight / 2;
	                diff = modalTop;
	                if (modalTop <= 0) {
	                    modalTop = 5;
	                }
	                else if (modalTop + modalHeight >= windowHeight) {
	                    modalTop = windowHeight - modalHeight - 5;
	                }
	                diff = diff - modalTop;
	            }

	            // Horizontal Position
	            if (modalPosition === 'top' || modalPosition === 'bottom') {
	                modalLeft = targetWidth / 2 + targetOffset.left - modalWidth / 2;
	                diff = modalLeft;
	                if (modalLeft < 5) modalLeft = 5;
	                if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
	                if (modalPosition === 'top') {
	                    modalAngle.addClass('on-bottom');
	                }
	                if (modalPosition === 'bottom') {
	                    modalAngle.addClass('on-top');
	                }
	                diff = diff - modalLeft;
	                modalAngleLeft = (modalWidth / 2 - modalAngleSize + diff);
	                modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 13), 13);
	                modalAngle.css({left: modalAngleLeft + 'px'});

	            }
	            else if (modalPosition === 'middle') {
	                modalLeft = targetOffset.left - modalWidth - modalAngleSize;
	                modalAngle.addClass('on-right');
	                if (modalLeft < 5 || (modalLeft + modalWidth > windowWidth)) {
	                    if (modalLeft < 5) modalLeft = targetOffset.left + targetWidth + modalAngleSize;
	                    if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
	                    modalAngle.removeClass('on-right').addClass('on-left');
	                }
	                modalAngleTop = (modalHeight / 2 - modalAngleSize + diff);
	                modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 13), 13);
	                modalAngle.css({top: modalAngleTop + 'px'});
	            }
	        }


	        // Apply Styles
	        modal.css({top: modalTop + 'px', left: modalLeft + 'px'});
	    }

	    sizePopover();

	    $(window).on('resize', sizePopover);

	    modal.on('close', function () {
	        $(window).off('resize', sizePopover);
	    });

	    this.openModal(modal);
	    modal[0].sizePopover = sizePopover;
	    return modal[0];
	},

	pickerModal (modal, removeOnClose) {
		if(arguments.length === 0 && typeof modal === '[object Boolean]'){
			removeOnClose = modal
			modal = undefined
		}
		if(!modal){
			modal = '<div class="picker-modal"></div>'
		}
		
	    if (typeof removeOnClose === 'undefined') removeOnClose = true;
	    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
	        modal = $(modal);
	        if (modal.length > 0) {
	            if (removeOnClose) modal.addClass('remove-on-close');
	            $('body').append(modal[0]);
	        }
	        else return false; //nothing found
	    }
	    modal = $(modal);
	    if (modal.length === 0) return false;
	    if (modal.parents('body').length === 0) {
	        if (removeOnClose) modal.addClass('remove-on-close');
	        $('body').append(modal[0]);
	    }
	    if ($('.picker-modal.modal-in:not(.modal-out)').length > 0 && !modal.hasClass('modal-in')) {
	        this.closeModal('.picker-modal.modal-in:not(.modal-out)');
	    }
	    modal.show();
	    this.openModal(modal);
	    return modal[0];
	},
	 
	showPreloader (title) {
	    return this.modal({
	        title: title || 'Loading...',
	        text: '<div class="preloader">' + (this.params.material ? this.params.materialPreloaderHtml : '') + '</div>',
	        cssClass: 'modal-preloader'
	    });
	},
	
	hidePreloader () {
	    this.closeModal('.modal.modal-in');
	},

	showIndicator (materialPreloaderHtml) {
    	$('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white">' + (materialPreloaderHtml ? materialPreloaderHtml : '') + '</span></div>');
	},

	hideIndicator () {
	    $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
	}
}

$(document).on('click', '.modal-overlay, .popup-overlay, .picker-modal-overlay, .close-picker', function(e){

	var clicked = $(this);
	var isLink = clicked[0].nodeName.toLowerCase() === 'a';
	// Close Modal
    if (clicked.hasClass('modal-overlay')) {
        if ($('.modal.modal-in').length > 0 && Modals.params.modalCloseByOutside)
            Modals.closeModal('.modal.modal-in');
        if ($('.actions-modal.modal-in').length > 0 )
            Modals.closeModal('.actions-modal.modal-in');

        if ($('.popover.modal-in').length > 0) Modals.closeModal('.popover.modal-in');
    }
    if (clicked.hasClass('popup-overlay')) {
        if ($('.popup.modal-in').length > 0 && Modals.params.popupCloseByOutside)
            Modals.closeModal('.popup.modal-in');
    }
    if (clicked.hasClass('picker-modal-overlay')) {
        if ($('.picker-modal.modal-in').length > 0)
            Modals.closeModal('.picker-modal.modal-in');
    }

    // Picker
    if (clicked.hasClass('close-picker')) {
    	if(isLink){
    		e.preventDefault()
    	}
        var pickerToClose = $('.picker-modal.modal-in');
        if (pickerToClose.length > 0) {
            Modals.closeModal(pickerToClose);
        }
        else {
            pickerToClose = $('.popover.modal-in .picker-modal');
            if (pickerToClose.length > 0) {
                Modals.closeModal(pickerToClose.parents('.popover'));
            }
        }
    }
});



export default Modals