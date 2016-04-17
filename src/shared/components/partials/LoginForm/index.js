import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class LoginForm extends Component {
  render() {
    const { fields: { username, password }, handleSubmit } = this.props;
    return (
      <form className="form-horizontal" onSubmit={ handleSubmit }>
        <div className="form-group">
          <label className="col-md-2 control-label">Username</label>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Username" {...username} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-2 control-label">Password</label>
          <div className="col-md-4">
            <input type="password" className="form-control" placeholder="Password" {...password} />
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

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'loginForm',
  fields: ['username', 'password'] 
})(LoginForm);