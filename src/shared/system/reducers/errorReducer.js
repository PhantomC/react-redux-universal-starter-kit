import * as actionTypes from 'shared/system/constants/actionTypes';

const initialState = null;

export default function(state = initialState, action) {  

  const { type, error } = action

  if (type === actionTypes.RESET_ERROR) {
    return null;
  } else if (error) {
    return action.error.response;
  }

  return state;
}