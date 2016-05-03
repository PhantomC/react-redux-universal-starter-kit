import config from './shared/configs';

import React from 'react';
import ReactDOM from 'react-dom';

import useScroll from 'scroll-behavior/lib/useStandardScroll';

import { match, Router, browserHistory, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import getRoutes from './shared/routes';

import createBrowserHistory from 'history/lib/createBrowserHistory';
const createScrollHistory = useScroll(createBrowserHistory);
const appHistory = useRouterHistory(createScrollHistory)();

import { Provider } from 'react-redux';
import createStore from './shared/redux/store/createStore';
import { MEMBER_LOAD_AUTH } from './shared/constants/actionTypes';

const store = createStore(window.__INITIAL_STATE__);

const history = syncHistoryWithStore(appHistory, store);

const routes = getRoutes(store);
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

const Root = <Router routes={routes} history={history} />;
const dest = document.getElementById('app');

match({ routes, location }, () => {
  ReactDOM.render(
    <Provider store={store} key="provider">
      {
        (() => {
          if (!config.isProduction) {
            const DevTools = require('./shared/components/partials/DevTools');
            return (
              <div>
                { Root }
                <DevTools />
              </div>
            );
          }
          return Root;
        })()
      }
    </Provider>
    , dest);
});