import { browserHistory } from 'react-router'
const PATHS_LENGTH = -1
let paths = browserHistory.paths = browserHistory.paths || []
browserHistory.canBack = false

const unlisten = browserHistory.listen(location => {

  let pathname = location.pathname
  if(pathname.charAt(0) !== '/'){
    pathname = '/'.concat(pathname)
  }
  // console.log('pathname====', pathname)
  let len = paths.length 
  browserHistory.inBack = (len > 1 && pathname === paths[len-2])
  if(browserHistory.inBack) {
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
   
  console.log("paths",paths)
})

export default browserHistory