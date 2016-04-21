import { 
  MEMBER_LOGIN, 
  MEMBER_LOAD_AUTH, 
  MEMBER_LOGOUT 
} from '../../constants/actionTypes';

import jwt from 'jsonwebtoken';
import reactCookie from 'react-cookie';

const authTokenCookieName = 'authToken';

export default store => next => action => {
  const { type, callback } = action;

  switch (type) {

    case MEMBER_LOGIN:
      reactCookie.save(authTokenCookieName, action.data.token);
      const user = jwt.decode(action.data.token);
      user.token = action.data.token;
      action.data.user = user;
      return next(action);

    case MEMBER_LOGOUT:
      reactCookie.remove(authTokenCookieName); 
      return next(action);  

    case MEMBER_LOAD_AUTH:
      let result = false;
      const token = reactCookie.load(authTokenCookieName);
      if (token) {
        const user = jwt.decode(token);
        user.token = token;
        action.data = {user};
        next({ ...action, type: MEMBER_LOGIN});
      }
      if (typeof callback === 'function') {
        return callback(!!token);
      }
      return result;
      
    default:
      return next(action);
  }
};