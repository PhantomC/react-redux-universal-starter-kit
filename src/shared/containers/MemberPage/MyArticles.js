import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import * as memberActions from 'shared/redux/actions/memberActions';
import * as articleActions from 'shared/redux/actions/articleActions';

import MyArticleList from 'shared/components/partials/Article/MyArticleList';

class MyArticles extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.memberGetMyArticles(1);
  }

  handleEdit(id) {
    this.props.deleteArticle(id);
  }

  handleDelete(id) {
    this.props.deleteArticle(id);
  }

  render() {
    return (
      <div>
        {this.props.member.myArticles.length > 0 ? <MyArticleList articles={this.props.member.myArticles} handleDelete={this.handleDelete} /> : <p>You haven't written yet.</p>}
      </div>
    );
  }
}

function mapStateToProps({member}) {
  return {member};
}

module.exports = connect(mapStateToProps, {...memberActions, ...articleActions})(MyArticles);