import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import * as memberActions from 'shared/redux/actions/memberActions';
import * as articleActions from 'shared/redux/actions/articleActions';

import MyArticleList from 'shared/components/partials/Article/MyArticleList';

class MemberPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleLogoutButton = this.handleLogoutButton.bind(this);
    this.handleProfileLinkClick = this.handleProfileLinkClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.memberGetMyArticles(1);
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
            <img src={this.props.member.user.avatar} alt={this.props.member.user.name}/>
          </div>
        </div>
        <p>Hello! {this.props.member.user.name}</p>
        <p><a href="#" onClick={this.handleProfileLinkClick}>View Profile</a></p>
        <button onClick={this.handleLogoutButton}>Logout</button>
      </div>
    );
  }

  handleDelete(id) {
    this.props.deleteArticle(id);
  }

  render() {
    return (
      <div>
        <Helmet title="Member" />
        <div className="col-md-8">
          {this.props.member.myArticles.length > 0 ? <MyArticleList articles={this.props.member.myArticles} handleDelete={this.handleDelete} /> : <p>You haven't written yet.</p>}
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

module.exports = connect(mapStateToProps, {...memberActions, ...articleActions})(MemberPage);