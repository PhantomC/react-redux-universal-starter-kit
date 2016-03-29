import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, getValues } from 'redux-form';

import Helmet from 'react-helmet';

class Contact extends Component {
	
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		const myContactFormValues = getValues(this.props.form.contactForm);
		console.log(myContactFormValues);
	}

	render() {
    	const {fields: {firstName, lastName, email}} = this.props;
		return (
			<div>
				<Helmet title="Contact" />
				<div className="col-md-8">
					This is contact page.
					<form onSubmit={ this.handleSubmit }>
				        <div>
				          	<label>First Name</label>
				          	<input type="text" placeholder="First Name" {...firstName}/>
				        </div>
				        <div>
				          	<label>Last Name</label>
				          	<input type="text" placeholder="Last Name" {...lastName}/>
				        </div>
				        <div>
				          	<label>Email</label>
				          	<input type="email" placeholder="Email" {...email}/>
				        </div>
				        <button type="submit">Submit</button>
			      	</form>
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

Contact = connect(mapStateToProps)(Contact);
Contact = reduxForm({
	form: 'contactForm',
  	fields: ['firstName', 'lastName', 'email'] 
})(Contact);

module.exports = Contact;