require('es6-promise').polyfill();
require('isomorphic-fetch');

export default store => next => action => {

  const { type, request, callback, ...rest } = action;
  if (!request) return next(action);

  const { url, options = {} } = request;
  if (!url) return next(action);

  const DONE = type;
  const REQUEST = `${type}_REQUEST`;
  next({...rest, type: REQUEST });

  return fetch(url, options)
    .then(function(response) {
      if (response.status >= 400) {
        return false;
      }
      return response.json();
    })
    .then(data => {
      if (!data) {
        next({...rest, type: DONE, error: 'Error 404 - Not Found'});
        return false;
      }
      let result = next({...rest, type: DONE, data});

      if (typeof callback === 'function') {
        return store.dispatch(callback(data));
      }

      return result;
    });
};