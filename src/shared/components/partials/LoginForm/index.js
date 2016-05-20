import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class LoginForm extends Component {
  render() {
    const { fields: { username, password }, handleSubmit } = this.props;
    return (
      <form className="form-horizontal" onSubmit={ handleSubmit(this.props.memberLogin) }>
        <div className="form-group">
            <input type="text" placeholder="Username" className="form-control" {...username} />
        </div>
        <div className="form-group">
            <input type="password" placeholder="Password" className="form-control" {...password} />
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary">Login</button>
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