import React from 'react';
import { Route, IndexRoute } from 'react-router';

if (typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };

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
			    component: require('../containers/App'),
      			indexRoute: {
				    getComponent: (location, cb) => {
				        require.ensure([], (require) => {
				          	cb(null, require('../containers/Home'))
				        }, 'home')
			      	}      		
      			},
      			childRoutes: [
      				{
      					path: 'about',
						getComponent: (location, cb) => {
					        require.ensure([], (require) => {
					          	cb(null, require('../containers/About'))
					        }, 'about')
				      	}      					
      				}, {
      					path: 'contact',
						getComponent: (location, cb) => {
					        require.ensure([], (require) => {
					          	cb(null, require('../containers/Contact'))
					        }, 'contact')
				      	}      					
      				}, {
      					path: 'gallery',
						getComponent: (location, cb) => {
					        require.ensure([], (require) => {
					          	cb(null, require('../containers/Gallery'))
					        }, 'gallery')
				      	}      					
      				}, {
      					path: 'login',
      					getComponent: (location, cb) => {
					        require.ensure([], (require) => {
					          	cb(null, require('../containers/Login'))
					        }, 'login')
				      	}
      				}, {
      					path: 'articles/:id',
      					getComponent: (location, cb) => {
					        require.ensure([], (require) => {
					          	cb(null, require('../containers/Entry'))
					        }, 'entry')
				      	}
      				}, {
						onEnter: checkAuth,
						childRoutes: [
							{ 
					      		path: 'member',
					      		getComponent: (location, cb) => {
							        require.ensure([], (require) => {
							          	cb(null, require('../containers/Member'))
							        }, 'member')
						      	}
						    }
						]
					}, {
      					path: '*',
      					getComponent: (location, cb) => {
					        require.ensure([], (require) => {
					          	cb(null, require('../containers/NotFound'))
					        }, 'notfound')
				      	},
      					status: 404
      				}
      			]
	  		}
  		]
	}
};