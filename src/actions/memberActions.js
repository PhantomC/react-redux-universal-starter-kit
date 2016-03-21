export function memberLogin(response) {
	return {
		type: 'MEMBER_LOGIN',
		data: response
	}
}

export function memberLogout() {
	return {
		type: 'MEMBER_LOGOUT'
	}
}