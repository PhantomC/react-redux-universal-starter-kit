import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

import articleReducer from './articleReducer';
import memberReducer from './memberReducer';
import errorMessageReducer from './errorMessageReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  member: memberReducer,
  article: articleReducer,
  errorMessage: errorMessageReducer
});

export default rootReducer;