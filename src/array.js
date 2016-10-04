var ArrayHelper = {}

ArrayHelper.isArray = function (val) {
    if (!val) {
        return false;
    }
    return Object.prototype.toString.call(val) === '[object Array]';
};

ArrayHelper.toArray = function (obj, offset) {
    return Array.prototype.slice.call(obj, offset || 0);
}

ArrayHelper.each = function (obj, fn) {
    if (ArrayHelper.isArray(obj)) {
        for (var i = 0, len = obj.length; i < len; i++) {
            if (fn.call(obj[i], obj[i], i) === false) {
                break;
            }
        }
    } else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (fn.call(obj[key], obj[key], key) === false) {
                    break;
                }
            }
        }
    }
};

ArrayHelper.inArray = function (arr, val) {
    for (var i = 0, len = arr.length; i < len; i++) {
        if (val === arr[i]) {
            return i;
        }
    }
    return -1;
}

ArrayHelper.unique = function (arr) {
    var unique = [];
    for (var i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
    }
    return unique;
};

export default ArrayHelper