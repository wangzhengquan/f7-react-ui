/*===========================
Features Support Detection
===========================*/
var support = {
    touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
    
};

support.touchEvents = {
    start: support.touch ? 'touchstart' : 'mousedown',
    move: support.touch ? 'touchmove' : 'mousemove',
    end: support.touch ? 'touchend' : 'mouseup'
}

// Export object
export default support;
