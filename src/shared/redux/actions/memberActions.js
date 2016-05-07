import { 
  MEMBER_LOGIN, 
  MEMBER_LOGOUT,
  MEMBER_VIEW_PROFILE
} from 'shared/constants/actionTypes';

export function memberLogin(data) {
  return {
    type: MEMBER_LOGIN,
    data,
    request: {
      path: '/login',
      options: {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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