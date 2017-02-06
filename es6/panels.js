'use strict';

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _params = require('./params');

var _params2 = _interopRequireDefault(_params);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./resources/less/panels.less');

var Panels = {
    allowPanelOpen: true,

    /**
     * [openPanel description]
     * @param  {[type]} conf [position('left', 'right'),removeOnClose(true, false), effect('reveal', 'cover') ]
     * @return {[type]}      [description]
     */
    openPanel: function openPanel(conf) {
        if (!this.allowPanelOpen) return false;
        var panelPosition = 'left';
        var className = '';
        var removeOnClose = true;
        var effect = undefined;
        if (typeof conf === 'string') {
            panelPosition = conf;
        } else {
            panelPosition = conf.position;
            className = conf.className;
            removeOnClose = conf.removeOnClose;
            effect = conf.effect;
        }

        if (!effect) {
            if (panelPosition === 'right') {
                effect = 'reveal';
            } else {
                effect = 'cover';
            }
        }

        var panel = (0, _dom2.default)('.panel-' + panelPosition);
        if (panel.length === 0) panel = (0, _dom2.default)('<div class="panel panel-cover panel-' + panelPosition + ' ' + className + '"></div>');
        if (panel.length === 0 || panel.hasClass('active')) return false;
        //panel.addClass(className)

        if (removeOnClose) {
            panel.addClass('remove-on-close');
        }

        (0, _dom2.default)('body').append(panel[0]);

        if ((0, _dom2.default)('.panel-overlay').length === 0) {
            (0, _dom2.default)('body').append('<div class="panel-overlay"></div>');
        }

        this.closePanel(); // Close if some panel is opened

        this.allowPanelOpen = false;
        panel.css({ display: 'block' }).addClass('active');
        panel.trigger('open');
        if (_params2.default.material) {
            (0, _dom2.default)('.panel-overlay').show();
        }
        // Trigger reLayout
        var clientLeft = panel[0].clientLeft;

        // Transition End;
        var transitionEndTarget = effect === 'reveal' ? (0, _dom2.default)('.views') : panel;
        var openedTriggered = false;

        function panelTransitionEnd() {
            var _this = this;

            transitionEndTarget.transitionEnd(function (e) {
                if ((0, _dom2.default)(e.target).is(transitionEndTarget)) {
                    if (panel.hasClass('active')) {
                        panel.trigger('opened');
                    } else {
                        panel.trigger('closed');
                    }
                    if (_params2.default.material) (0, _dom2.default)('.panel-overlay').css({ display: '' });
                    _this.allowPanelOpen = true;
                } else panelTransitionEnd.bind(_this)();
            });
        }
        panelTransitionEnd.bind(this)();

        (0, _dom2.default)('body').addClass('with-panel-' + panelPosition + '-' + effect);
        if (effect === 'reveal') {
            panel.addClass('panel-reveal');
        }
        return panel[0];
    },
    closePanel: function closePanel(activePanel) {
        var _this2 = this;

        activePanel = activePanel ? (0, _dom2.default)(activePanel) : (0, _dom2.default)('.panel.active');
        if (activePanel.length === 0) return false;
        var removeOnClose = activePanel.hasClass('remove-on-close');
        var effect = activePanel.hasClass('panel-reveal') ? 'reveal' : 'cover';

        var panelPosition = activePanel.hasClass('panel-left') ? 'left' : 'right';
        activePanel.removeClass('active');
        var transitionEndTarget = effect === 'reveal' ? (0, _dom2.default)('.views') : activePanel;
        activePanel.trigger('close');
        this.allowPanelOpen = false;

        transitionEndTarget.transitionEnd(function () {
            if (activePanel.hasClass('active')) return;
            activePanel.css({ display: '' });
            activePanel.trigger('closed');
            (0, _dom2.default)('body').removeClass('panel-closing');
            if (removeOnClose) activePanel.remove();
            _this2.allowPanelOpen = true;
        });

        if (effect === 'reveal') {
            activePanel.removeClass('panel-reveal');
        }
        (0, _dom2.default)('body').addClass('panel-closing').removeClass('with-panel-' + panelPosition + '-' + effect);
    }
};

(0, _dom2.default)(document).on('click', '.panel-overlay', function (event) {
    Panels.closePanel();
});
module.exports = Panels;
// export default Panels;