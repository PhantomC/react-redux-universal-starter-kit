import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

import articleReducer from 'shared/modules/article/articleReducer';
import memberReducer from 'shared/modules/user/memberReducer';
import errorMessageReducer from 'shared/system/reducers/errorMessageReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  member: memberReducer,
  article: articleReducer,
  errorMessage: errorMessageReducer
});

export default rootReducer;