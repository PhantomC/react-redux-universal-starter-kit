import React from 'react';
import { Link } from 'react-router';

import CSSModules from 'react-css-modules';
import styles from './styles.css';

const Nav = function() {
	return (
		<div>
			<ul className="nav nav-pills">
				<li><Link to="/">React Redux Universal Starter Kit</Link></li>
				<li><Link to="/gallery">Gallery</Link></li>
				<li><Link to="/member">Member</Link></li>
				<li><Link to="/about">About</Link></li>
			</ul>
		</div>
	);
}

export default CSSModules(Nav, styles);