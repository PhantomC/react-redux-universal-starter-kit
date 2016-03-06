import React, { Component } from 'react';

import Helmet from "react-helmet";

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
				<Helmet
				    title="React Redux Universal Starter Kit"
				    link={[
				        {
				        	"rel": "stylesheet", 
				        	"href": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
				        }
				    ]}
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