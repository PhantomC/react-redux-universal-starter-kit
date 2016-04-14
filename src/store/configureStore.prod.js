import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';
import promiseResolver from '../middlewares/promiseResolver';

const enhancer = compose(
  applyMiddleware(promiseResolver)
);

export default function(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}