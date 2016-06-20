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
        },  { 
          path: 'infinite-scroll',
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/infinite-scroll/InfiniteScrollNavbar'),
                  page: require('./components/infinite-scroll/InfiniteScrollPage')
                })
                document.querySelector('title').innerHTML='Infinite scroll'
                Modals.hideIndicator()
            })
          }
        },
        { 
          path: 'grid',
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/grid/GridNavbar'),
                  page: require('./components/grid/GridPage')
                })
                document.querySelector('title').innerHTML='Grid'
                Modals.hideIndicator()
            })
          }
        }, { 
          path: 'picker',
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/picker/PickerNavbar'),
                  page: require('./components/picker/PickerPage')
                })
                document.querySelector('title').innerHTML='Picker'
                Modals.hideIndicator()
            })
          }
        }, { 
          path: 'forms',
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/forms/FormsNavbar'),
                  page: require('./components/forms/FormsPage')
                })
                document.querySelector('title').innerHTML='Forms'
                Modals.hideIndicator()
            })
          }
        }, { 
          path: 'forms-elements',
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/forms-elements/FormsElementsNavbar'),
                  page: require('./components/forms-elements/FormsElementsPage')
                })
                document.querySelector('title').innerHTML='Forms Elements'
                Modals.hideIndicator()
            })
          }
        }, { 
          path: 'list-view',
          getComponents(location, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/list-view/ListViewNavbar'),
                  page: require('./components/list-view/ListViewPage')
                })
                document.querySelector('title').innerHTML='List View'
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