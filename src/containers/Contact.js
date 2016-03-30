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
					<form className="form-horizontal" onSubmit={ this.handleSubmit }>
				        <div className="form-group">
				          	<label className="col-md-2 control-label">First Name</label>
				          	<div className="col-md-4">
				          		<input type="text" className="form-control" placeholder="First Name" {...firstName}/>
			          		</div>
				        </div>
				        <div className="form-group">
				          	<label className="col-md-2 control-label">Last Name</label>
				          	<div className="col-md-4">
				          		<input type="text" className="form-control" placeholder="Last Name" {...lastName}/>
			          		</div>
				        </div>
				        <div className="form-group">
				          	<label className="col-md-2 control-label">Email</label>
				          	<div className="col-md-4">
				          		<input type="email" className="form-control" placeholder="Email" {...email}/>
			          		</div>
				        </div>
				        <div className="form-group">
					        <div className="col-sm-12 col-md-offset-2">
					        	<button type="submit" className="btn btn-default">Submit</button>
				        	</div>
			        	</div>
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