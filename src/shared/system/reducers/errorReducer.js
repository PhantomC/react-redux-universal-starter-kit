import * as actionTypes from 'shared/system/constants/actionTypes';

export default function(state = null, action) {  

  const { type, error } = action

  if (type === actionTypes.RESET_ERROR) {
    return null;
  } else if (error) {
    return action.error.response;
  }

  return state;
}