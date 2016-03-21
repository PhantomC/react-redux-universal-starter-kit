import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Entry from './containers/Entry';
import About from './containers/About';
import NotFound from './containers/NotFound';

import Login from './containers/Login';
import LoginSuccess from './containers/LoginSuccess';
import Member from './containers/Member';

export default ({ dispatch, getState }) => {
  	const checkAuth = (nextState, replace, callback) => {
    	const { member: { auth } } = getState();
  		if (!auth) {
    		replace('/login');
  		}
  		callback();
  	};

    //  return (
	// 	<Route path="/" component={App}>
	// 		<IndexRoute component={Home} />
	// 		<Route path="about" component={About} />
	// 		<Route path="articles/:id" component={Entry} />
	//      <Route path="login" component={Login}/>
	// 		<Route onEnter={checkAuth}>
	// 	        <Route path="member" component={Member}/>
	// 	        <Route path="loginSuccess" component={LoginSuccess}/>
	//      </Route>
	// 		<Route path="*" component={NotFound} status={404} />
	// 	</Route>
	// );

	return {
  		component: 'div',
	  	childRoutes: [
	  		{
			    path: '/',
			    component: App,
			    indexRoute: {
		      		component: Home
      			},
			    childRoutes: [
			      	{ 
			      		path: 'about',
			      		component: About
				    }, { 
			      		path: 'login',
			      		component: Login
				    }, { 
			      		path: 'articles/:id',
			      		component: Entry
				    }, {
				    	onEnter: checkAuth,
				    	childRoutes: [
							{ 
					      		path: 'member',
					      		component: Member
						    }, { 
					      		path: 'loginSuccess',
					      		component: Login
						    }
				    	]
				    }, { 
			      		path: '*',
			      		component: NotFound,
			      		status: 404
				    }
			    ]
	  		}
  		]
	}
};