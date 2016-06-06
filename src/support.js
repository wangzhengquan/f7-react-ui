/*===========================
Features Support Detection
===========================*/
var support = {
    touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
};

// Export object
export default support;
