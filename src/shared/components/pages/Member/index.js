import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class Member extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleLogoutButton = this.handleLogoutButton.bind(this);
    this.handleProfileLinkClick = this.handleProfileLinkClick.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.member.isAuthenticated) {
      this.context.router.push('/login');
    }
  }

  handleLogoutButton() {
    this.props.memberLogout();
  }

  handleProfileLinkClick() {
    this.props.memberViewProfile();
  }

  renderMemberProfile() {

    if (!this.props.member.isAuthenticated) {
      return null;
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <img src={this.props.member.user.profile_pic} alt={this.props.member.user.username}/>
          </div>
        </div>
        <p>Hello! {this.props.member.user.username} ({this.props.member.user.email})</p>
        <p><a href="#" onClick={this.handleProfileLinkClick}>View Profile</a></p>
        <button onClick={this.handleLogoutButton}>Logout</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet title="Member" />
        <div className="col-md-8">
          {this.renderMemberProfile()}
        </div>
        <div className="col-md-4">
          Sidebar   
        </div>
      </div>
    );
  }
}

Member.contextTypes = {
  router: PropTypes.object
};