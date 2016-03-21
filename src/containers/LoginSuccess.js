import React from 'react';

import Helmet from 'react-helmet';

export default function() {
	return (
		<div>
			<Helmet title="Login Success" />
			<div className="col-md-8">
				Login Success!
			</div>
			<div className="col-md-4">
				Sidebar		
			</div>
		</div>
	);
}