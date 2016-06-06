import config from 'shared/system/configs';

require('es6-promise').polyfill();
import 'isomorphic-fetch';

import reactCookie from 'react-cookie';
import { AUTH_TOKEN } from 'shared/system/constants';

export const apiURL = `http://${config.apiHost}${config.apiPort !== 80 ? ':' + config.apiPort : ''}/api`;

export default function request(url, options = {}) {

  if (
      options.method === 'POST' ||
      options.method === 'PUT' ||
      options.method === 'PATCH'
    ) {
    options.headers = {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    options.body = JSON.stringify(options.body);
  }

  const token = reactCookie.load(AUTH_TOKEN);
  if (token) {
    options.headers = {
      ...options.headers,
      'Authorization': token
    };
  }

  return fetch(`${apiURL}${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((error) => ({ error }));
}

function parseJSON(response) {
  return response.json();
}


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}