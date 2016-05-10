import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from 'shared/redux/reducers';
import apiResolver from 'shared/redux/middlewares/apiResolver';
import authenticationMiddleware from 'shared/redux/middlewares/authenticationMiddleware';

const enhancer = compose(
  applyMiddleware(apiResolver, authenticationMiddleware)
);

export default function(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}