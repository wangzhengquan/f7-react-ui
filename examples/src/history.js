import {  useRouterHistory } from 'react-router'
import { createHistory } from 'history'
// import createBrowserHistory from 'history/lib/createBrowserHistory'
const history = useRouterHistory(createHistory)({ basename: 'http://localhost:9000/' })

const PATHS_LENGTH = -1
let paths = history.paths = history.paths || []
history.canBack = false

const unlisten = history.listen(location => {

  let pathname = location.pathname
  if(pathname.charAt(0) !== '/'){
    pathname = '/'.concat(pathname)
  }
  // console.log('pathname====', pathname)
  let len = paths.length
  history.inBack = (len > 1 && pathname === paths[len-2])
  if(history.inBack) {
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

  history.canBack = (paths.length > 1)
   
  console.log("paths",paths)
})

export default history
//const history = history