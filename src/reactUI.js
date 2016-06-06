// DOM Library Utilites
let $ = {}

let guid = 0

$.guid = function() {
  return '' + guid++
}



$.getTranslate = function(el, axis) {
  var matrix, curTransform, curStyle, transformMatrix;

  // automatic axis detection
  if (typeof axis === 'undefined') {
    axis = 'x';
  }

  curStyle = window.getComputedStyle(el, null);
  if (window.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(',').length > 6) {
      curTransform = curTransform.split(', ').map(function(a) {
        return a.replace(',', '.');
      }).join(', ');
    }
    // Some old versions of Webkit choke when 'none' is passed; pass
    // empty string instead in this case
    transformMatrix = new WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
    matrix = transformMatrix.toString().split(',');
  }

  if (axis === 'x') {
    //Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix)
      curTransform = transformMatrix.m41;
    //Crazy IE10 Matrix
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[12]);
    //Normal Browsers
    else
      curTransform = parseFloat(matrix[4]);
  }
  if (axis === 'y') {
    //Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix)
      curTransform = transformMatrix.m42;
    //Crazy IE10 Matrix
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[13]);
    //Normal Browsers
    else
      curTransform = parseFloat(matrix[5]);
  }

  return curTransform || 0;
};


$.requestAnimationFrame = function(callback) {
  if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
  else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
  else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
  else {
    return window.setTimeout(callback, 1000 / 60);
  }
};
$.cancelAnimationFrame = function(id) {
  if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
  else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
  else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
  else {
    return window.clearTimeout(id);
  }
};
$.supportTouch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);

export default $;
