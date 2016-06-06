import Modals from 'react-ui/modals'

var  hideNavbar = false

const rootRoute = {
    childRoutes: [{
        path: '/',
        component: require('./components/View'),
        indexRoute: {
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
              
              cb(null, {
                navbar: hideNavbar ? null : require('./components/home/HomeNavbar'),
                page: require('./components/home/HomePage'),

              })
              document.querySelector('title').innerHTML='example'
              Modals.hideIndicator()
            })
          }
        },

        childRoutes: [{ 
          path: 'modals',
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/modals/ModalsNavbar'),
                  page: require('./components/modals/ModalsPage')
                })
                document.querySelector('title').innerHTML='modals'
                Modals.hideIndicator()
            })
          }
        },{ 
          path: 'popover',
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/popover/PopoverNavbar'),
                  page: require('./components/popover/PopoverPage')
                })
                document.querySelector('title').innerHTML='Popover'
                Modals.hideIndicator()
            })
          }
        },{ 
          path: 'tabs',
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/tabs/TabsNavbar'),
                  page: require('./components/tabs/TabsPage')
                })
                document.querySelector('title').innerHTML='Tabs'
                Modals.hideIndicator()
            })
          }
        },{ 
          path: 'tabs-static',
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/tabs-static/TabsStaticNavbar'),
                  page: require('./components/tabs-static/TabsStaticPage')
                })
                document.querySelector('title').innerHTML='Animated Tabs'
                Modals.hideIndicator()
            })
          }
        }, { 
          path: 'tabs-animated',
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/tabs-animated/TabsAnimatedNavbar'),
                  page: require('./components/tabs-animated/TabsAnimatedPage')
                })
                document.querySelector('title').innerHTML='Animated Tabs'
                Modals.hideIndicator()
            })
          }
        }, { 
          path: 'tabs-swipeable',
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/tabs-swipeable/TabsSwipeableNavbar'),
                  page: require('./components/tabs-swipeable/TabsSwipeablePage')
                })
                document.querySelector('title').innerHTML='Animated Tabs'
                Modals.hideIndicator()
            })
          }
        }]


    }]
    
}




/*
const rootRoute2 = {
    path: '/',

    getChildRoutes(location, callback) {
      require.ensure([], function (require) {
        callback(null, [
          {
            path: 'setting',
            getComponents(location, cb) {
                console.log('======getComponents', location, this.props)
                require.ensure([], (require) => {
                    cb(null, {
                      navbar: require('./components/setting/SettingNavbar'),
                      page: require('./components/setting/SettingPage')
                    })
                })
            }
          },
          {
            path: 'about',
            getComponents(location, cb) {
                require.ensure([], (require) => {
                    cb(null, {
                      navbar: require('./components/about/AboutNavbar'),
                      page: require('./components/about/AboutPage'),
                      toolbarHidden: 'toolbarHidden'
                    })
                })
            }
          }
        ])
      })
    },

    getIndexRoute(location, callback) {
      require.ensure([], function (require) {
        callback(null, require('./components/home/HomePage'))
      })
    },

    getComponents(location, callback) {
      require.ensure([], function (require) {
        callback(null, require('./components/App'))
      })
    }
     
}
*/
export default rootRoute;