// import 'core-js/fn/object/assign';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Router, Route,browserHistory,IndexRoute } from 'react-router'

// import HomeView from './components/home/HomeView'
// import SettingView from './components/tab/SettingView'
// import AnimationView from './components/tab/AnimationView'
// import App from './App';
// require('react-ui/resources/less/intro.less');
// require('react-ui/resources/less/icons.less');
// require('react-ui/resources/less/views.less');
// require('react-ui/resources/less/pages.less');
// require('./resources/less/app.less')
// require('react-ui/resources/less/react-ui.ios.colors.less')

// // Render the main component into the dom
// ReactDOM.render(
//   <Router history={browserHistory}>
//     <Route path="/" component={App}>
//       /* add it here, as a child of `/` */
//       <IndexRoute component={HomeView}/>
//       /*no used*/ 
//       <Route path="setting" component={SettingView}/>
//       <Route path="anim" component={AnimationView}/>
//     </Route>

//   </Router>, document.getElementById('my-app'));



import React from 'react';
import ReactDOM from 'react-dom';
import { Router} from 'react-router'
import history from 'react-ui/history'
import rootRoute from './router'
import 'react-ui/fast-clicks'
require('react-ui/resources/less/intro.less');
require('react-ui/resources/less/icons.less');
require('react-ui/resources/less/views.less');
require('react-ui/resources/less/pages.less');
require('react-ui/resources/less/statusbar.less');
require('react-ui/resources/less/toolbars.less');
require('react-ui/resources/less/toolbars-pages.less');
require('react-ui/resources/less/tabs.less');
require('react-ui/resources/less/badges.less');


// require('react-ui/resources/less/react-ui.ios.less')

require('react-ui/resources/less/react-ui.ios.colors.less')

require('./resources/less/app.less')
ReactDOM.render( 
  <Router history={ history } routes={ rootRoute } />,
  document.getElementById('app')
)
