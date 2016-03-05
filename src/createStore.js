import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import promiseResolver from './middlewares/promiseResolver';

const store = createStore(rootReducer, applyMiddleware(promiseResolver));

export default store;