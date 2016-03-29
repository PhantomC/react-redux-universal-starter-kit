import React, { Component } from 'react';

import Helmet from "react-helmet";

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './global.css';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Helmet
				    title="React Redux Universal Starter Kit"
				/>
				<Header />
				<div styleName="body" className="container">
					<div className="row">
						{ this.props.children }
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

module.exports = CSSModules(App, styles);