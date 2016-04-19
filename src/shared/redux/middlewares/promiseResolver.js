require('es6-promise').polyfill();
require('isomorphic-fetch');

export const apiURL = `${process.env.HOSTNAME || 'http://localhost'}${process.env.NODE_ENV === 'production' ? '' : ':' + (process.env.PORT || '3000')}/api`;

export default store => next => action => {

  const { type, request, callback, ...rest } = action;
  if (!request) return next(action);

  const { path, options = {} } = request;
  if (!path) return next(action);

  const DONE = type;
  const REQUEST = `${type}_REQUEST`;
  const FAIL = `${type}_FAIL`;

  next({...rest, type: REQUEST });

  return fetch(`${apiURL}${path}`, options)
    .then(function(response) {
      if (response.status >= 400) {
        next({ ...rest, type: FAIL, error: response.status });
        return false;
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        let result = next({...rest, type: DONE, data});
        if (typeof callback === 'function') {
          return store.dispatch(callback(data));
        }
        return result;
      }
      return false;
    })
};