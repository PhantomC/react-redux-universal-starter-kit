import { MEMBER_LOGIN, MEMBER_LOGOUT } from '../../constants/actionTypes';

export function memberLogin(data) {
  return {
    type: MEMBER_LOGIN,
    data
  };
}

export function memberLogout() {
  return {
    type: MEMBER_LOGOUT
  };
}