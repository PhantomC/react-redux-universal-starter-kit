import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class ContactForm extends Component {
	render() {
		const { fields: { firstName, lastName, email }, handleSubmit } = this.props;
		return (
			<form className="form-horizontal" onSubmit={ handleSubmit }>
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
		);
	}
}

export default reduxForm({
	form: 'contactForm',
  	fields: ['firstName', 'lastName', 'email'] 
})(ContactForm);