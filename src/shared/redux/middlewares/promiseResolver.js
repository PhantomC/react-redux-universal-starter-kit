import config from '../../configs';

require('es6-promise').polyfill();
import 'isomorphic-fetch';

import reactCookie from 'react-cookie';
import { AUTH_TOKEN } from 'shared/constants/cookieNames';

export const apiURL = `http://${config.apiHost}${config.apiPort !== 80 ? ':' + config.apiPort : ''}/api`;

function callApi(url, options) {
  return fetch(url, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        const { status, statusText } = response;
        return Promise.reject({
          status, 
          statusText
        });
      }
      return json;
    });
}

export default store => next => action => {

  const { type, request, callback, ...rest } = action;
  if (!request) return next(action);

  const { path, options = {} } = request;
  if (!path) return next(action);

  const DONE = type;
  const REQUEST = `${type}_REQUEST`;
  const FAIL = `${type}_FAIL`;

  next({...rest, type: REQUEST });

  const token = reactCookie.load(AUTH_TOKEN);
  if (token) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };
  }

  return callApi(`${apiURL}${path}`, options)
    .then(
      data => {
        let result = next({
          ...rest,
          type: DONE,
          data
        });
        if (typeof callback === 'function') {
          return callback(data, store.dispatch);
        }
        return result;
      },
      error => {
        return next({
          ...rest,
          type: FAIL,
          error
        });
      }
    );
};