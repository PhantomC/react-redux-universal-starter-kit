import { MEMBER_LOGIN, MEMBER_LOGOUT } from '../../constants/actionTypes';
import jwt from 'jsonwebtoken';
import reactCookie from 'react-cookie';

const authTokenCookieName = 'authToken';

export default store => next => action => {
	const { type } = action;

	if (type === MEMBER_LOGIN) {
		reactCookie.save(authTokenCookieName, action.data.token);
	} else if (type === MEMBER_LOGOUT) {
		reactCookie.remove(authTokenCookieName);
	}

	return next(action);
}