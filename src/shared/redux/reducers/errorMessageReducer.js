const initialState = {};

export default function(state = initialState, action) {
  const { error } = action;

  if (error) {
    return action.error;
  }

  return state;
}