import React from 'react';
import ReactDOM from 'react-dom';

import useScroll from 'scroll-behavior/lib/useStandardScroll';

import { Router, browserHistory, useRouterHistory } from 'react-router';
import routes from './routes';

import createBrowserHistory from 'history/lib/createBrowserHistory';
const createScrollHistory = useScroll(createBrowserHistory);
const appHistory = useRouterHistory(createScrollHistory)();

import { Provider } from 'react-redux';
import createStore from './createStore';

ReactDOM.render(
	<Provider store={createStore(window.__INITIAL_STATE__)}>
		<Router routes={routes} history={appHistory} />
	</Provider>
	, document.getElementById('app'));