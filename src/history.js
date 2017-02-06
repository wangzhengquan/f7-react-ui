 /* eslint no-console: 0 */
 //hashHistory
// import { hashHistory } from 'react-router'
import { browserHistory } from 'react-router'
// import { useRouterHistory } from 'react-router'
// import { createHistory } from 'history'

// const browserHistory = useRouterHistory(createHistory)({
//   basename: '/'
// })
// 

// var browserHistory = hashHistory
const PATHS_LENGTH = -1
let paths = browserHistory.paths = browserHistory.paths || []

//防止测试环境加载两次的问题
if(!browserHistory.unlisten){

  browserHistory.unlisten = browserHistory.listen(location => {
    let pathname = location.pathname
    if(pathname.charAt(0) !== '/'){
      pathname = '/'.concat(pathname)
    }

    let len = paths.length

    browserHistory.isBack = (len > 1 && pathname === paths[len-2])
    if(browserHistory.isBack) {
      paths.pop()
    } else if (len === 0 || paths[len-1] !== pathname){
      if(PATHS_LENGTH === -1 || len < PATHS_LENGTH)
        paths.push(pathname)
      else{
        for(let i = 0; i < len - 1; i++){
          paths[i] = paths[i+1]
        }
        paths[len - 1] = pathname
      }
    }
    
     

    browserHistory.canBack = (paths.length > 1)
  })


  window.addEventListener('popstate', function () {
    // if(paths.length > 1){
    //   paths.pop()
    //   paths.pop()
    //   browserHistory.canBack = (paths.length > 1)
    // }
    console.log('popstate')

    browserHistory.isBack = true
    
  })
}

export default browserHistory
