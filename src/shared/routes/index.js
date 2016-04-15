import React from 'react';
import { Route, IndexRoute } from 'react-router';

if (typeof require.ensure !== 'function') require.ensure = function(d, c) { c(require); };

export default ({ dispatch, getState }) => {
  const checkAuth = (nextState, replace, callback) => {
    const { member: { auth } } = getState();
    if (!auth) {
      replace('/login');
    }
    callback();
  };

  return {
    component: 'div',
    childRoutes: [
      {
        path: '/',
        component: require('../redux/containers/App'),
        indexRoute: {
          getComponent: (location, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../redux/containers/Home'));
            }, 'home');
          }         
        },
        childRoutes: [
          {
            path: 'about',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('../redux/containers/About'));
              }, 'about');
            }               
          }, {
            path: 'contact',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('../redux/containers/Contact'));
              }, 'contact');
            }               
          }, {
            path: 'gallery',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('../redux/containers/Gallery'));
              }, 'gallery');
            }
          }, {
            path: 'performance',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('../redux/containers/Performance'));
              }, 'performance');
            }               
          }, {
            path: 'login',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('../redux/containers/Login'));
              }, 'login');
            }
          }, {
            path: 'articles/:id',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('../redux/containers/Entry'));
              }, 'entry');
            }
          }, {
            onEnter: checkAuth,
            childRoutes: [
              { 
                path: 'member',
                getComponent: (location, cb) => {
                  require.ensure([], (require) => {
                    cb(null, require('../redux/containers/Member'));
                  }, 'member');
                }
              }
            ]
          }, {
            path: '*',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('../redux/containers/NotFound'));
              }, 'notfound');
            },
            status: 404
          }
        ]
      }
    ]
  };
};