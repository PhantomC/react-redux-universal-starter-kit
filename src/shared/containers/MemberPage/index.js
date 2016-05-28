import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CSSModules from 'react-css-modules';
import styles from './MemberPage.scss';

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
      <div styleName="wrapper">
        <div styleName="header">
          <div styleName="thumbnail">
            <img src={this.props.member.user.avatar} alt={this.props.member.user.name}/>
          </div>
        </div>
        <p styleName="greeting">Hello! {this.props.member.user.name}</p>
        <ul styleName="list">
          <li><Link to={'/member'}>My Articles</Link></li>
          <li><Link to={'/member/bookmarks'}>My Bookmarks</Link></li>
        </ul>
        <div styleName="footer">
          <button styleName="logout" className="btn btn-primary" onClick={this.handleLogoutButton}>Logout</button>
        </div>
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

module.exports = connect(mapStateToProps, memberActions)(CSSModules(MemberPage, styles));