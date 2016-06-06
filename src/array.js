var $ = {}
$.isArray = function (arr) {
    if (Object.prototype.toString.apply(arr) === '[object Array]') return true;
    else return false;
};
$.each = function (obj, callback) {
    if (typeof obj !== 'object') return;
    if (!callback) return;
    var i, prop;
    if ($.isArray(obj) || obj instanceof Dom7) {
        // Array
        for (i = 0; i < obj.length; i++) {
            callback(i, obj[i]);
        }
    }
    else {
        // Object
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                callback(prop, obj[prop]);
            }
        }
    }
};
$.unique = function (arr) {
    var unique = [];
    for (var i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
    }
    return unique;
};

export default $