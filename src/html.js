var HtmlHelper = {}

HtmlHelper.escape = function (val) {
    return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

HtmlHelper.unescape = function (val) {
    return val.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}
export default HtmlHelper;