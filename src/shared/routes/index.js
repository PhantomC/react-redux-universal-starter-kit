import React from 'react';
import { Route, IndexRoute } from 'react-router';

if (typeof require.ensure !== 'function') require.ensure = function(d, c) { c(require); };

import { MEMBER_LOAD_AUTH } from 'shared/constants/actionTypes';

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
              cb(null, require('shared/redux/containers/Home'));
            }, 'home');
          }         
        },
        childRoutes: [
          {
            path: 'contact',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/redux/containers/Contact'));
              }, 'contact');
            }               
          }, {
            path: 'gallery',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/components/pages/Gallery'));
              }, 'gallery');
            }
          }, {
            path: 'performance',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/redux/containers/Performance'));
              }, 'performance');
            }               
          }, {
            path: 'articles/:id',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/redux/containers/Entry'));
              }, 'entry');
            }
          }, {
            onEnter: hasAlreadyLoggedIn,     
            path: 'login',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/redux/containers/Login'));
              }, 'login');
            }
          }, {
            onEnter: isAuthenticated,     
            path: 'member',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/redux/containers/Member'));
              }, 'member');
            }
          }, {
            path: '*',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('shared/components/pages/NotFound'));
              }, 'notfound');
            },
            status: 404
          }
        ]
      }
    ]
  };
};