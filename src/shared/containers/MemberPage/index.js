import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as memberActions from 'shared/redux/actions/memberActions';

class MemberPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleLogoutButton = this.handleLogoutButton.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.member.isAuthenticated) {
      this.context.router.push('/login');
    }
  }

  handleLogoutButton() {
    this.props.memberLogout();
  }

  renderMemberProfile() {

    if (!this.props.member.isAuthenticated) {
      return null;
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <img src={this.props.member.user.avatar} alt={this.props.member.user.name}/>
          </div>
        </div>
        <p>Hello! {this.props.member.user.name}</p>
        <ul>
          <li><Link to={`/member`}>My Articles</Link></li>
          <li><Link to={`/member/bookmarks`}>My Bookmarks</Link></li>
        </ul>
        <button onClick={this.handleLogoutButton}>Logout</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet title="Member" />
        <div className="col-md-8">
          {this.props.children}
        </div>
        <div className="col-md-4">
          {this.renderMemberProfile()}
        </div>
      </div>
    );
  }
}

MemberPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps({member}) {
  return {member};
}

module.exports = connect(mapStateToProps, memberActions)(MemberPage);