import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

function noop() {
  return null;
}

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;