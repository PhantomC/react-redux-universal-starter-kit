import * as actionTypes from 'shared/redux/constants/actionTypes';

import jwt from 'jsonwebtoken';
import reactCookie from 'react-cookie';
import { AUTH_TOKEN } from 'shared/redux/constants/cookieNames';

export default store => next => action => {
  const { type, callback } = action;

  switch (type) {

    case actionTypes.MEMBER_LOGIN:
      reactCookie.save(AUTH_TOKEN, action.data.token);
      const user = jwt.decode(action.data.token);
      user.token = action.data.token;
      action.data.user = user;
      return next(action);

    case actionTypes.MEMBER_LOGOUT:
      reactCookie.remove(AUTH_TOKEN); 
      return next(action);  

    case actionTypes.MEMBER_LOAD_AUTH:
      let result = false;
      const token = reactCookie.load(AUTH_TOKEN);
      if (token) {
        const user = jwt.decode(token);
        user.token = token;
        action.data = {user};
        next({ ...action, type: actionTypes.MEMBER_LOGIN});
      }
      if (typeof callback === 'function') {
        return callback(!!token);
      }
      return result;
      
    default:
      return next(action);
  }
};