var  URLUtil = {}
URLUtil.parseUrlQuery = function(url) {
  var query = {},
    i, params, param;
  if (url.indexOf('?') >= 0) url = url.split('?')[1];
  else return query;
  params = url.split('&');
  for (i = 0; i < params.length; i++) {
    param = params[i].split('=');
    query[param[0]] = param[1];
  }
  return query;
};

URLUtil.serializeObject = URLUtil.param = function(obj, parents) {
  if (typeof obj === 'string') return obj;
  var resultArray = [];
  var separator = '&';
  parents = parents || [];
  var newParents;

  function var_name(name) {
    if (parents.length > 0) {
      var _parents = '';
      for (var j = 0; j < parents.length; j++) {
        if (j === 0) _parents += parents[j];
        else _parents += '[' + encodeURIComponent(parents[j]) + ']';
      }
      return _parents + '[' + encodeURIComponent(name) + ']';
    } else {
      return encodeURIComponent(name);
    }
  }

  function var_value(value) {
    return encodeURIComponent(value);
  }
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      var toPush;
      if (Array.isArray(obj[prop])) {
        toPush = [];
        for (var i = 0; i < obj[prop].length; i++) {
          if (!Array.isArray(obj[prop][i]) && typeof obj[prop][i] === 'object') {
            newParents = parents.slice();
            newParents.push(prop);
            newParents.push(i + '');
            toPush.push(URLUtil.serializeObject(obj[prop][i], newParents));
          } else {
            toPush.push(var_name(prop) + '[]=' + var_value(obj[prop][i]));
          }

        }
        if (toPush.length > 0) resultArray.push(toPush.join(separator));
      } else if (typeof obj[prop] === 'object') {
        // Object, convert to named array
        newParents = parents.slice();
        newParents.push(prop);
        toPush = URLUtil.serializeObject(obj[prop], newParents);
        if (toPush !== '') resultArray.push(toPush);
      } else if (typeof obj[prop] !== 'undefined' && obj[prop] !== '') {
        // Should be string or plain value
        resultArray.push(var_name(prop) + '=' + var_value(obj[prop]));
      }
    }
  }
  return resultArray.join(separator);
};

export default URLUtil;