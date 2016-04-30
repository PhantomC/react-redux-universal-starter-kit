import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class ContactForm extends Component {
  render() {
    const { fields: { name, email, message }, handleSubmit } = this.props;
    return (
      <form className="form-horizontal" onSubmit={ handleSubmit(this.props.onContactFormSubmit) }>
        <div className={`form-group${name.touched && name.invalid ? ' has-danger' : '' }`}>
          <label className="col-md-2 control-label">Name</label>
          <div className="col-md-4">
            <input type="text" placeholder="Name" className="form-control" {...name} />
            <div className="text-help">
              { name.touched ? name.error : null }
            </div>
          </div>
        </div>
        <div className={`form-group${email.touched && email.invalid ? ' has-danger' : '' }`}>
          <label className="col-md-2 control-label">Email</label>
          <div className="col-md-4">
            <input type="email" placeholder="Email" className="form-control" {...email} />
            { email.touched ? email.error : null }
          </div>
        </div>
        <div className={`form-group${message.touched && message.invalid ? ' has-danger' : '' }`}>
          <label className="col-md-2 control-label">Message</label>
          <div className="col-md-4">
            <textarea placeholder="Message" rows="3" className="form-control" {...message} />
            { message.touched ? message.error : null }
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

ContactForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Please enter name';
  }

  if (!values.email) {
    errors.email = 'Please enter email';
  }

  if (!values.message) {
    errors.message = 'Please enter message';
  }
  return errors;
}

export default reduxForm({
  form: 'contactForm',
  fields: ['name', 'email', 'message'],
  validate
})(ContactForm);