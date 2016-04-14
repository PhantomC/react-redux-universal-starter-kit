import React, { Component, PropTypes } from 'react';

import Helmet from 'react-helmet';
import FacebookLogin from 'react-facebook-login';

import { connect } from 'react-redux';
import * as memberActions from '../actions/memberActions';

class Login extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook(response) {
    if (response.accessToken) {
      this.props.memberLogin(response);
      this.context.router.push('/member');
    }
  }

  render() {
    return (
      <div>
        <Helmet title="Member Login" />
        <div className="col-md-8">
          <FacebookLogin
            appId="1600436380279259"
            autoLoad={true}
            callback={this.responseFacebook} />
        </div>
        <div className="col-md-4">
          Sidebar   
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

Login.contextTypes = {
  router: PropTypes.object
}

module.exports = connect(mapStateToProps, memberActions)(Login);