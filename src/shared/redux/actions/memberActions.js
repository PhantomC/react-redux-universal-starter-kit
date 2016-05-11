import * as actionTypes from 'shared/redux/constants/actionTypes';

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

export function memberViewProfile() {
  return {
    type: actionTypes.MEMBER_VIEW_PROFILE,
    request: {
      path: '/member/profile'
    }
  };
}

export function memberGetMyArticles(memberId, limit = 20) {
  return {
    type: actionTypes.MEMBER_GET_MY_ARTICLES,
    request: {
      path: `/members/${memberId}/articles?_expand=member&_sort=id&_order=DESC&_limit=${limit}`
    }
  }
}