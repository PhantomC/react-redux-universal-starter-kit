import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Entry from './containers/Entry';
import About from './containers/About';
import NotFound from './containers/NotFound';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/about" component={About} />
		<Route path="/articles/:id" component={Entry} />
		<Route path="*" component={NotFound} />
	</Route>
);