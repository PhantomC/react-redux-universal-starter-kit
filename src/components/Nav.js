import React from 'react';
import { Link } from 'react-router';

export default function() {
	return (
		<div>
			<ul className="nav nav-pills">
				<li><Link to="/">Home</Link></li>
				<li><Link to="/about">About</Link></li>
			</ul>
		</div>
	);
}