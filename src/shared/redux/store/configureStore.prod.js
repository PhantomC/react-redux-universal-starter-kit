import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';
import promiseResolver from '../middlewares/promiseResolver';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';

const enhancer = compose(
  applyMiddleware(promiseResolver, authenticationMiddleware)
);

export default function(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}