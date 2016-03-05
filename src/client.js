import React from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import promiseResolver from './middlewares/promiseResolver';

const store = createStore(rootReducer, applyMiddleware(promiseResolver));

ReactDOM.render(
	<Provider store={store}>
		<Router routes={routes} history={browserHistory} />
	</Provider>
	, document.getElementById('app'));