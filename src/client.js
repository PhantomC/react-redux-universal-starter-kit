import React from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

import { Provider } from 'react-redux';

import createStore from './createStore';

ReactDOM.render(
	<Provider store={createStore(window.__INITIAL_STATE__)}>
		<Router routes={routes} history={browserHistory} />
	</Provider>
	, document.getElementById('app'));