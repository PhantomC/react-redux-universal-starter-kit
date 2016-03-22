import React from 'react';
import ReactDOM from 'react-dom';

import useScroll from 'scroll-behavior/lib/useStandardScroll';

import { match, Router, browserHistory, useRouterHistory } from 'react-router';
import getRoutes from './routes';

import createBrowserHistory from 'history/lib/createBrowserHistory';
const createScrollHistory = useScroll(createBrowserHistory);
const appHistory = useRouterHistory(createScrollHistory)();

import { Provider } from 'react-redux';
import createStore from './createStore';

const store = createStore(window.__INITIAL_STATE__);

const routes = getRoutes(store);
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

match({ routes, location }, () => {
	ReactDOM.render(
		<Provider store={store}>
			<Router routes={routes} history={appHistory} />
		</Provider>
		, document.getElementById('app'));
});