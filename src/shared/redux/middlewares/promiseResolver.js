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
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }

      return response.json();
    })
    .then(data => {
      if (!data) {
        next({...rest, type: FAIL, error: 'Error 404 - Not Found'});
        return false;
      }
      let result = next({...rest, type: DONE, data});

      if (typeof callback === 'function') {
        return store.dispatch(callback(data));
      }

      return result;
    })
    .catch(e => {
      return e.response.json().then(data => {
        return next({ ...rest, type: FAIL, ...data });
      });
    });
};