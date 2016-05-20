import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class ContactForm extends Component {
  render() {
    const { fields: { name, email, message }, handleSubmit } = this.props;
    return (
      <form className="form-horizontal" onSubmit={ handleSubmit(this.props.onContactFormSubmit) }>
        <div className={`form-group${name.touched && name.invalid ? ' has-danger' : '' }`}>
            <input type="text" placeholder="Name" className="form-control" {...name} />
            <div className="text-help">
              { name.touched ? name.error : null }
            </div>
        </div>
        <div className={`form-group${email.touched && email.invalid ? ' has-danger' : '' }`}>
            <input type="email" placeholder="Email" className="form-control" {...email} />
            <div className="text-help">
            { email.touched ? email.error : null }
            </div>
        </div>
        <div className={`form-group${message.touched && message.invalid ? ' has-danger' : '' }`}>
            <textarea placeholder="Message" rows="3" className="form-control" {...message} />
            <div className="text-help">
            { message.touched ? message.error : null }
            </div>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary">Send</button>
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