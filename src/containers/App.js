import React, { Component } from 'react';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
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