import Modals from 'react-ui/modals'

var  hideNavbar = false

const rootRoute = {
  //childRoutes: [{
    path: '/',
    component: require('./components/View'),
    indexRoute: {
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
          
          cb(null, {
            navbar: hideNavbar ? null : require('./components/home/HomeNavbar'),
            page: require('./components/home/HomePage')

          })
          document.querySelector('title').innerHTML='example'
          Modals.hideIndicator()
        })
      }
    },

    childRoutes: [{
      path: 'accordion',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/accordion/AccordionNavbar'),
              page: require('./components/accordion/AccordionPage')
            })
            document.querySelector('title').innerHTML='Accordion'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'autocomplete',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/autocomplete/AutocompleteNavbar'),
              page: require('./components/autocomplete/AutocompletePage')
            })
            document.querySelector('title').innerHTML='Autocomplete'
            Modals.hideIndicator()
        })
      }
    },{
      path: 'calendar',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/calendar/CalendarNavbar'),
              page: require('./components/calendar/CalendarPage')
            })
            document.querySelector('title').innerHTML='Calendar'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'cards',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/cards/CardsNavbar'),
              page: require('./components/cards/CardsPage')
            })
            document.querySelector('title').innerHTML='Cards'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'contacts',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/contacts/ContactsNavbar'),
              page: require('./components/contacts/ContactsPage')
            })
            document.querySelector('title').innerHTML='Contacts List'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'modals',
      getComponents(nextState, cb) {
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
      getComponents(nextState, cb) {
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
      getComponents(nextState, cb) {
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
      getComponents(nextState, cb) {
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
      getComponents(nextState, cb) {
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
      getComponents(nextState, cb) {
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
      getComponents(nextState, cb) {
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
      getComponents(nextState, cb) {
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
      getComponents(nextState, cb) {
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
      getComponents(nextState, cb) {
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
      getComponents(nextState, cb) {
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
      getComponents(nextState, cb) {
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
    }, {
      path: 'searchbar',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/searchbar/SearchbarNavbar'),
              page: require('./components/searchbar/SearchbarPage')
            })
            document.querySelector('title').innerHTML='Search Bar'
            Modals.hideIndicator()
        })
      }
    },  {
      path: 'spinners',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/spinners/SpinnersNavbar'),
              page: require('./components/spinners/SpinnersPage')
            })
            document.querySelector('title').innerHTML='Spinners'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'preloader',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/preloader/PreloaderNavbar'),
              page: require('./components/preloader/PreloaderPage')
            })
            document.querySelector('title').innerHTML='Preloader'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'photo-browser',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/photo-browser/PhotoBrowserNavbar'),
              page: require('./components/photo-browser/PhotoBrowserPage')
            })
            document.querySelector('title').innerHTML='PhotoBrowser'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'pull-to-refresh',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/pull-to-refresh/PullToRefreshNavbar'),
              page: require('./components/pull-to-refresh/PullToRefreshPage')
            })
            document.querySelector('title').innerHTML='pull-to-refresh'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'lazy-load',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/lazy-load/LazyLoadNavbar'),
              page: require('./components/lazy-load/LazyLoadPage')
            })
            document.querySelector('title').innerHTML='lazy-load'
            Modals.hideIndicator()
        })
      }
    },  {
      path: 'bars',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/bars/BarsNavbar'),
              page: require('./components/bars/BarsPage')
            })
            document.querySelector('title').innerHTML='Navbars And Toolbars'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'clip-image',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/clip-image/ClipImageNavbar'),
              page: require('./components/clip-image/ClipImagePage')
            })
            document.querySelector('title').innerHTML='Clip Image'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'swipe-delete',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/swipe-delete/SwipeDeleteNavbar'),
              page: require('./components/swipe-delete/SwipeDeletePage')
            })
            document.querySelector('title').innerHTML='Swipe To Delete Slider'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'swiper',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/swiper/SwiperNavbar'),
              page: require('./components/swiper/SwiperPage')
            })
            document.querySelector('title').innerHTML='Swiper Slider'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'slider',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/slider/SliderNavbar'),
              page: require('./components/slider/SliderPage')
            })
            document.querySelector('title').innerHTML='Slider'
            Modals.hideIndicator()
        })
      }
    },  {
      path: 'swiper-pagination-progress',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/swiper/SwiperPaginationProgressNavbar'),
              page: require('./components/swiper/SwiperPaginationProgressPage')
            })
            document.querySelector('title').innerHTML='Swiper Pagination Progress'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'notifications',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/notifications/NotificationsNavbar'),
              page: require('./components/notifications/NotificationsPage')
            })
            document.querySelector('title').innerHTML='Notifications'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'animation-items',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/react-animation/AnimationItemsNavbar'),
              page: require('./components/react-animation/AnimationItemsPage')
            })
            document.querySelector('title').innerHTML='Animation Item'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'media-lists',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/media-lists/MediaListsNavbar'),
              page: require('./components/media-lists/MediaListsPage')
            })
            document.querySelector('title').innerHTML='Media Lists'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'umeditor',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/umeditor/EditorNavbar'),
              page: require('./components/umeditor/EditorPage')
            })
            document.querySelector('title').innerHTML='Editor'
            Modals.hideIndicator()
        })
      }
    },{
      path: 'draft-editor',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/draft-editor/EditorNavbar'),
              page: require('./components/draft-editor/EditorPage')
            })
            document.querySelector('title').innerHTML='Draft Editor'
            Modals.hideIndicator()
        })
      }
    }, {
      path: 'quill-editor',
      getComponents(nextState, cb) {
        Modals.showIndicator()
        require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/quill-editor/EditorNavbar'),
              page: require('./components/quill-editor/EditorPage')
            })
            document.querySelector('title').innerHTML='Quill Editor'
            Modals.hideIndicator()
        })
      }
    }]

    


  //}]
    
}




/*
const rootRoute2 = {
    path: '/',

    getChildRoutes(nextState, callback) {
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