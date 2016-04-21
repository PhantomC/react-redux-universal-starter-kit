import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class Member extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleLogoutButton = this.handleLogoutButton.bind(this);
  }

  handleLogoutButton() {
    this.props.memberLogout();
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Helmet title="Member" />
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-2">
              <img src={this.props.member.user.profile_pic} alt={this.props.member.user.username}/>
            </div>
          </div>
          <p>Hello! {this.props.member.user.username} ({this.props.member.user.email})</p>
          <button onClick={this.handleLogoutButton}>Logout</button>
        </div>
        <div className="col-md-4">
          Sidebar   
        </div>
      </div>
    );
  }
}