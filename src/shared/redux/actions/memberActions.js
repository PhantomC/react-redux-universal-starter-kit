import { 
  MEMBER_LOGIN, 
  MEMBER_LOGOUT,
  MEMBER_VIEW_PROFILE,
  MEMBER_GET_MY_ARTICLES
} from 'shared/redux/constants/actionTypes';

export function memberLogin(data) {
  return {
    type: MEMBER_LOGIN,
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
    type: MEMBER_LOGOUT
  };
}

export function memberViewProfile() {
  return {
    type: MEMBER_VIEW_PROFILE,
    request: {
      path: '/member/profile'
    }
  };
}

export function memberGetMyArticles(memberId, limit = 20) {
  return {
    type: MEMBER_GET_MY_ARTICLES,
    request: {
      path: `/members/${memberId}/articles?_expand=member&_sort=id&_order=DESC&_limit=${limit}`
    }
  }
}