import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import * as memberActions from 'shared/modules/member/memberActions';

import CSSModules from 'react-css-modules';
import styles from './SignupPage.scss';

import Page from 'shared/components/Page';
import SignupForm from 'shared/containers/SignupPage/SignupForm';

class SignupPage extends Component {

  componentWillUpdate(nextProps) {
    if (nextProps.member.isAuthenticated) {
      this.context.router.push('/member');
    }
  }

  renderErrorMessage() {
    return (
      <div className="row">
        <div className="col-md-12">
          <p className="text-danger">{this.props.error.statusText}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet title="Signup" />
        <div className="col-md-12">
          <div styleName="wrapper">
            <SignupForm memberSignup={ this.props.memberSignup } />
            {this.props.error && this.renderErrorMessage()}
            <a href="/auth/facebook">Log In with Facebook</a>     
          </div>
        </div>
      </div>
    );
  }
}

SignupPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps({member, error}) {
  return {
    member,
    error
  };
}

module.exports = connect(mapStateToProps, memberActions)(Page(CSSModules(SignupPage, styles)));