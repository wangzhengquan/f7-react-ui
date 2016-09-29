require('../resources/less/editor.less')
require('../resources/less/scroll.less')
window.UMEDITOR_CONFIG = window.UMEDITOR_CONFIG || {};

var UM = window.UM = {
    plugins : {},

    commands : {},

    I18N : {},

    version : '1.2.2'
};

var dom = UM.dom = {};
export {
	UM,
	dom
}
export default UM;