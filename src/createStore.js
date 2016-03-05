import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import promiseResolver from './middlewares/promiseResolver';

export default function(initialState = {}) {
	return createStore(rootReducer, initialState, applyMiddleware(promiseResolver));
}