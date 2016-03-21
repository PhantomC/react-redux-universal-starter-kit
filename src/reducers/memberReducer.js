const initialState = {
	auth: false,
	data: {}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case 'MEMBER_LOGIN':
			return {...initialState, auth: true, data: action.data };
		case 'MEMBER_LOGOUT':
			return initialState;
		default:
			return state;
	}
}