const initialState = {};

export default function(state = initialState, {error}) {

  if (error) {
    return error.response;
  }

  return initialState;
}