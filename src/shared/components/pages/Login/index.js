import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import LoginForm from 'shared/components/partials/LoginForm';

export default class Login extends Component {

  componentWillUpdate(nextProps) {
    if (nextProps.member.isAuthenticated) {
      this.context.router.push('/member');
    }
  }

  renderErrorMessage() {
    return (
      <div className="row">
        <div className="col-md-12">
          <p className="text-danger">{this.props.member.error.statusText}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet title="Member Login" />
        <div className="col-md-8">
          <LoginForm memberLogin={ this.props.memberLogin } />

          {this.props.member.error && this.renderErrorMessage()}

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