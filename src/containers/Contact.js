import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';

import ContactForm from '../components/ContactForm';

class Contact extends Component {
	
	constructor(props) {
		super(props);
	}

	handleSubmit(data) {
		console.log(data);
	}

	render() {
		return (
			<div>
				<Helmet title="Contact" />
				<div className="col-md-8">
					<ContactForm onSubmit={ this.handleSubmit } />
				</div>
				<div className="col-md-4">
					Sidebar		
				</div>
			</div>
		);
	}
}	

function mapStateToProps(state) {
	return {
		form: state.form
	}
}

module.exports = connect(mapStateToProps)(Contact);