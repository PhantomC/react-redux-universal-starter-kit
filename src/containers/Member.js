import React, { Component, PropTypes } from 'react';

import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import * as memberActions from '../actions/memberActions';

class Member extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleLogoutButton = this.handleLogoutButton.bind(this);
  }

  handleLogoutButton() {
    this.props.memberLogout();
    this.context.router.push('/');
  }

  render() {
    return (
      <div>
        <Helmet title="Member" />
        <div className="col-md-8">
          <p>Hello! {this.props.member.data.name}</p>
          <button onClick={this.handleLogoutButton}>Logout</button>
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
    member: state.member
  };
}

Member.contextTypes = {
  router: PropTypes.object
};

module.exports = connect(mapStateToProps, memberActions)(Member);