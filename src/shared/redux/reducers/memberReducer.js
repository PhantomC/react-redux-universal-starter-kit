import { 
  MEMBER_LOGIN, 
  MEMBER_LOGOUT
} from '../../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case `${MEMBER_LOGIN}_REQUEST`:
      return { 
        ...state, 
        isAuthenticated: false, 
        user: action.data 
      };
    case MEMBER_LOGIN:
      console.log(action.data);
      if (action.data.token) {
        return { 
          ...state, 
          isAuthenticated: true
        };
      }
      return state;
    case MEMBER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}