import React, { Component } from 'react';

import Helmet from 'react-helmet';

class Performance extends Component {
	
	componentDidMount() {
	
	}

	componentWillUnmount() {

  	}

	render() {
		return (
			<div>
				<Helmet title="Gallery" />
				<div className="col-md-8">
					Performance Tools
				</div>
				<div className="col-md-4">
					Sidebar		
				</div>
			</div>
		);
	}
}

module.exports = Performance;