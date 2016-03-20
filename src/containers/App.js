import React, { Component } from 'react';

import Helmet from "react-helmet";

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

import style from '../scss/App.css';

export default class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<Helmet
				    title="React Redux Universal Starter Kit"
				/>
				<Header />
				<Nav />
				<div className="row">
					<div className={style.test}>
						555
					</div>
					{ this.props.children }
				</div>
				<Footer />
			</div>
		);
	}
}