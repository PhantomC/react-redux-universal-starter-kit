import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from 'shared/redux/reducers';
import promiseResolver from 'shared/redux/middlewares/promiseResolver';
import authenticationMiddleware from 'shared/redux/middlewares/authenticationMiddleware';

const enhancer = compose(
  applyMiddleware(promiseResolver, authenticationMiddleware)
);

export default function(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}