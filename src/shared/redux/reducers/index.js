import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

import memberReducer from './memberReducer';
import articleLatestReducer from './articleLatestReducer';
import articleActiveReducer from './articleActiveReducer';
import errorMessageReducer from './errorMessageReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  member: memberReducer,
  articleLatest: articleLatestReducer,
  articleActive: articleActiveReducer,
  errorMessage: errorMessageReducer
});

export default rootReducer;