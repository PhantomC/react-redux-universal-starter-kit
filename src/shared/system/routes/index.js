import React from 'react';
import { Route, IndexRoute } from 'react-router';

if (typeof require.ensure !== 'function') require.ensure = function(d, c) { c(require); };

import { MEMBER_LOAD_AUTH } from 'shared/redux/constants/actionTypes';

export default ({ dispatch, getState }) => {
  
  const isAuthenticated = (nextState, replace) => {
    
    let { member: { isAuthenticated } } = getState();

    function checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        replace('/login');
      }
    }
    
    if (!isAuthenticated) {
      dispatch({
        type: MEMBER_LOAD_AUTH,
        callback: (isAuthenticated) => {
          checkAuth(isAuthenticated);
        }
      });
    } else {
      checkAuth(isAuthenticated);
    }

  };

  const hasAlreadyLoggedIn = (nextState, replace) => {
    let { member: { isAuthenticated } } = getState();

    if (isAuthenticated) {
      replace('/member');
    }
  };

  return {
    component: 'div',
    childRoutes: [
      {
        path: '/',
        component: require('shared/components/layouts/App'),
        indexRoute: {
          getComponent: (location, cb) => {
            require.ensure([], (require) => {
              cb(null, require('shared/containers/HomePage'));
            }, 'home');
          }         
        },
        childRoutes: [
          {
            path: 'contact',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/containers/ContactPage'));
              }, 'contact');
            }               
          }, {
            path: 'gallery',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/containers/GalleryPage'));
              }, 'gallery');
            }
          }, {
            path: 'performance',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/containers/PerformancePage'));
              }, 'performance');
            }               
          }, {
            path: 'articles/:id',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/containers/EntryPage'));
              }, 'entry');
            }
          }, {
            onEnter: hasAlreadyLoggedIn,     
            path: 'login',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/containers/LoginPage'));
              }, 'login');
            }
          }, {
            onEnter: isAuthenticated,     
            path: 'member',
            component: require('shared/containers/MemberPage'),
            indexRoute: {
              getComponent: (location, cb) => {
                require.ensure([], (require) => {
                  cb(null, require('shared/containers/MemberPage/MyArticles'));
                }, 'myArticles');
              }
            },
            childRoutes: [
              {
                path: 'bookmarks',
                getComponent: (location, cb) => {
                  require.ensure([], (require) => {
                    cb(null, require('shared/containers/MemberPage/MyBookmarks'));
                  }, 'myBookmarks');
                }
              }, {
                path: 'articles/:id',
                getComponent: (location, cb) => {
                  require.ensure([], (require) => {
                    cb(null, require('shared/containers/MemberPage/ArticleEdit'));
                  }, 'articleEdit');
                }
              }
            ]
          }, {
            path: '*',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/containers/NotFoundPage'));
              }, 'notfound');
            },
            status: 404
          }
        ]
      }
    ]
  };
};