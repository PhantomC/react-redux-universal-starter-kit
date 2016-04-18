import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import LoginForm from '../../partials/LoginForm';

export default class Login extends Component {
  
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    this.props.memberLogin(data);
  }

  componentDidUpdate() {
    if (this.props.member.isAuthenticated) {
      this.context.router.push('/member');
    }
  }

  render() {
    return (
      <div>
        <Helmet title="Member Login" />
        <div className="col-md-8">
          <LoginForm onSubmit={ this.handleSubmit } />
        </div>
        <div className="col-md-4">
          Sidebar   
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object
};