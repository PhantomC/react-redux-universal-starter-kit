import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from 'shared/redux/reducers';
import apiMiddleware from 'shared/redux/middlewares/apiMiddleware';
import authenticationMiddleware from 'shared/redux/middlewares/authenticationMiddleware';

const enhancer = compose(
  applyMiddleware(apiMiddleware, authenticationMiddleware)
);

export default function(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}