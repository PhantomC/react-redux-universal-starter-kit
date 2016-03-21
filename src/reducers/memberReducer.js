const initialState = {
	auth: false,
	data: {}
}

export default function(state = initialState, action) {
	console.log(action.type)
	switch(action.type) {
		case 'MEMBER_LOGIN':
			return {...initialState, auth: true }
		default:
			return state;
	}
}