import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from 'shared/system/reducers';
import authenticationMiddleware from 'shared/modules/member/authenticationMiddleware';

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(
    sagaMiddleware, 
    authenticationMiddleware
  )
);

export default function(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}