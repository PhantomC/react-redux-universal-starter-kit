import React from 'react';

import Helmet from 'react-helmet';

export default function() {
	return (
		<div>
			<Helmet title="Member" />
			<div className="col-md-8">
				This is member page.
			</div>
			<div className="col-md-4">
				Sidebar		
			</div>
		</div>
	);
}