import { 
  MEMBER_LOGIN, 
  MEMBER_LOGOUT
} from '../../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case `${MEMBER_LOGIN}_REQUEST`:
      return { 
        ...state,
        isAuthenticated: false, 
        user: {},
        error: null
      };

    case MEMBER_LOGIN:
      return { 
        ...state, 
        isAuthenticated: true,
        error: null,
        user: action.data.user
      };

    case `${MEMBER_LOGIN}_FAIL`:
      return {
        ...state,
        isAuthenticated: false,
        error: action.error,
        user: {}
      };

    case MEMBER_LOGOUT:
      return initialState;

    default:
      return state;
  }
}