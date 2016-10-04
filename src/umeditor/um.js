
// window.UMEDITOR_CONFIG = window.UMEDITOR_CONFIG || {};
import Plugins from './plugins/plugins'
var UM = window.UM = {
    plugins : Plugins.plugins,

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