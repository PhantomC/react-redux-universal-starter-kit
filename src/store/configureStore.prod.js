import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import promiseResolver from '../middlewares/promiseResolver';

const enhancer = compose(
  applyMiddleware(
    createSagaMiddleware(rootSaga),
    promiseResolver
  )
);

export default function(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}