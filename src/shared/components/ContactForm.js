import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class ContactForm extends Component {
  render() {
    const { fields: { name, email, message }, handleSubmit } = this.props;
    return (
      <form className="form-horizontal" onSubmit={ handleSubmit }>
        <div className="form-group">
          <label className="col-md-2 control-label">Name</label>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Name" {...name} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-2 control-label">Email</label>
          <div className="col-md-4">
            <input type="email" className="form-control" placeholder="Email" {...email} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-2 control-label">Message</label>
          <div className="col-md-4">
            <textarea className="form-control" rows="3" placeholder="Message" {...message} />
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

export default reduxForm({
  form: 'contactForm',
  fields: ['name', 'email', 'message'] 
})(ContactForm);