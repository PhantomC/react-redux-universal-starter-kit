import React, { Component } from 'react';

import Helmet from "react-helmet";

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

import CSSModules from 'react-css-modules';
import styles from './styles.css';

class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div styleName="container">
				<Helmet
				    title="React Redux Universal Starter Kit"
				/>
				<Header />
				<Nav />
				<div className="row">
					{ this.props.children }
				</div>
				<Footer />
			</div>
		);
	}
}

export default CSSModules(App, styles);