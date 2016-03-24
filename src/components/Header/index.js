import React from 'react';

import Nav from '../Nav';

import CSSModules from 'react-css-modules';
import styles from './styles.css';

const Header = function() {
	return (
		<header styleName="container">
			<div className="container">
				<Nav />
			</div>
		</header>
	);
}

export default CSSModules(Header, styles);