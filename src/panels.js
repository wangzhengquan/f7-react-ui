import $ from './dom'
require('./resources/less/panels.less')

var Panels = {
    allowPanelOpen : true,
    params: {

    },

    /**
     * [openPanel description]
     * @param  {[type]} conf [position('left', 'right'),removeOnClose(true, false), effect('reveal', 'cover') ]
     * @return {[type]}      [description]
     */
    openPanel (conf) {
        if (!this.allowPanelOpen) return false;
        var me = this
        var panelPosition = 'left'
        var className = ''
        var removeOnClose = true
        var effect =  undefined;
        if (typeof conf === 'string'){
            panelPosition = conf
        } else {
            panelPosition = conf.position
            className = conf.className
            removeOnClose = conf.removeOnClose
            effect = conf.effect
        }

        if(!effect){
            if(panelPosition === 'right'){
                effect = 'reveal'
            } else {
                effect = 'cover'
            }
        }
        
        var panel = $('.panel-' + panelPosition)
        if(panel.length === 0)
            panel = $('<div class="panel panel-cover panel-' + panelPosition + ' ' + className +'"></div>');
        if (panel.length === 0 || panel.hasClass('active')) return false;
        //panel.addClass(className)
        
        if(removeOnClose){
            panel.addClass('remove-on-close')
        }


        $('body').append(panel[0]);

        if ($('.panel-overlay').length === 0 ) {
            $('body').append('<div class="panel-overlay"></div>');
        }
             
        this.closePanel(); // Close if some panel is opened

        this.allowPanelOpen = false;
        panel.css({display: 'block'}).addClass('active');
        panel.trigger('open');
        if (this.params.material) {
            $('.panel-overlay').show();
        }
        // Trigger reLayout
        var clientLeft = panel[0].clientLeft;
        
        // Transition End;
        var transitionEndTarget = effect === 'reveal' ? $('.views') : panel;
        var openedTriggered = false;
        
        function panelTransitionEnd() {
            
            transitionEndTarget.transitionEnd( (e) => {
                console.log('panelTransitionEnd', this)
                if ($(e.target).is(transitionEndTarget)) {
                    if (panel.hasClass('active')) {
                        panel.trigger('opened');
                    }
                    else {
                        panel.trigger('closed');
                    }
                    if (this.params.material) $('.panel-overlay').css({display: ''});
                    this.allowPanelOpen = true;
                }
                else panelTransitionEnd.bind(this)();
            });
        }
        panelTransitionEnd.bind(this)();

        $('body').addClass('with-panel-' + panelPosition + '-' + effect);
        if(effect === 'reveal'){
            panel.addClass('panel-reveal')
        }
        return  panel[0];
    },

    closePanel () {
        var me = this
        var activePanel = $('.panel.active');
        if (activePanel.length === 0) return false;
        var removeOnClose = activePanel.hasClass('remove-on-close')
        var effect = activePanel.hasClass('panel-reveal') ? 'reveal' : 'cover';

        var panelPosition = activePanel.hasClass('panel-left') ? 'left' : 'right';
        activePanel.removeClass('active');
        var transitionEndTarget = effect === 'reveal' ? $('.views' ) : activePanel;
        activePanel.trigger('close');
        this.allowPanelOpen = false;

        transitionEndTarget.transitionEnd(  () => {
             console.log('closePanel panelTransitionEnd', this)
            if (activePanel.hasClass('active')) return;
            activePanel.css({display: ''});
            activePanel.trigger('closed');
            $('body').removeClass('panel-closing');
            if(removeOnClose) activePanel.remove()
            this.allowPanelOpen = true;
        });

        if(effect === 'reveal'){
            activePanel.removeClass('panel-reveal')
        }
        $('body').addClass('panel-closing').removeClass('with-panel-' + panelPosition + '-' + effect);

    }
}

 

$(document).on('click', '.panel-overlay', function(event){
    Panels.closePanel()
})

export default Panels;
