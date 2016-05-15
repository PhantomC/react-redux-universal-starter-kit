import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import * as memberActions from 'shared/redux/actions/memberActions';

import LoginForm from 'shared/components/partials/LoginForm';

class LoginPage extends Component {

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

LoginPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    member: state.member
  };
}

module.exports = connect(mapStateToProps, memberActions)(LoginPage);