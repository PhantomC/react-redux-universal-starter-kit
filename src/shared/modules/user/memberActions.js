import jwt from 'jsonwebtoken';
import reactCookie from 'react-cookie';
import { AUTH_TOKEN } from 'shared/system/constants';

import * as actionTypes from 'shared/modules/user/actionTypes';

export function memberLogin(data) {
  return {
    type: actionTypes.MEMBER_LOGIN,
    data,
    request: {
      path: '/login',
      options: {
        method: 'POST',
        body: data
      }
    }
  };
}

export function memberLogout() {
  return {
    type: actionTypes.MEMBER_LOGOUT
  };
}

export function memberGetMyArticles(limit = 20) {
  const token = reactCookie.load(AUTH_TOKEN);
  const user = jwt.decode(token);
  return {
    type: actionTypes.MEMBER_GET_MY_ARTICLES,
    request: {
      path: `/members/${user.id}/articles?_expand=member&_sort=id&_order=DESC&_limit=${limit}`
    }
  };
}