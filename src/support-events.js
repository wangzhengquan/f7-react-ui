/*===========================
Features Support Detection
===========================*/
var SupportEvents = {
    touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
    
};

SupportEvents.touchEvents = {
    start: SupportEvents.touch ? 'touchstart' : 'mousedown',
    move: SupportEvents.touch ? 'touchmove' : 'mousemove',
    end: SupportEvents.touch ? 'touchend' : 'mouseup'
}

// Export object
export default SupportEvents;
