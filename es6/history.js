'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

// import { useRouterHistory } from 'react-router'
// import { createHistory } from 'history'

// const browserHistory = useRouterHistory(createHistory)({
//   basename: '/'
// })
// 

// var browserHistory = hashHistory
var PATHS_LENGTH = -1; /* eslint no-console: 0 */
//hashHistory
// import { hashHistory } from 'react-router'

var paths = _reactRouter.browserHistory.paths = _reactRouter.browserHistory.paths || [];

//防止测试环境加载两次的问题
if (!_reactRouter.browserHistory.unlisten) {

  _reactRouter.browserHistory.unlisten = _reactRouter.browserHistory.listen(function (location) {
    var pathname = location.pathname;
    if (pathname.charAt(0) !== '/') {
      pathname = '/'.concat(pathname);
    }

    var len = paths.length;

    _reactRouter.browserHistory.isBack = len > 1 && pathname === paths[len - 2];
    if (_reactRouter.browserHistory.isBack) {
      paths.pop();
    } else if (len === 0 || paths[len - 1] !== pathname) {
      if (PATHS_LENGTH === -1 || len < PATHS_LENGTH) paths.push(pathname);else {
        for (var i = 0; i < len - 1; i++) {
          paths[i] = paths[i + 1];
        }
        paths[len - 1] = pathname;
      }
    }

    _reactRouter.browserHistory.canBack = paths.length > 1;
  });

  window.addEventListener('popstate', function () {
    // if(paths.length > 1){
    //   paths.pop()
    //   paths.pop()
    //   browserHistory.canBack = (paths.length > 1)
    // }
    console.log('popstate');

    _reactRouter.browserHistory.isBack = true;
  });
}

exports.default = _reactRouter.browserHistory;