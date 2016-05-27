import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import * as memberActions from 'shared/redux/actions/memberActions';
import * as articleActions from 'shared/redux/actions/articleActions';

import ArticleList from 'shared/components/partials/Article/ArticleList';

class MyArticles extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.props.memberGetMyArticles();
  }

  handleEdit(id) {
    this.context.router.push(`member/articles/${id}`);
  }

  handleDelete(id) {
    this.props.deleteArticle(id);
  }

  render() {
    return (
      <div>
        {this.props.member.myArticles.length > 0 ? 
          <ArticleList 
            articles={this.props.member.myArticles} 
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
           /> : <p>You haven't written yet.</p>
        }
      </div>
    );
  };
}

MyArticles.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps({member}) {
  return {member};
}

module.exports = connect(mapStateToProps, {...memberActions, ...articleActions})(MyArticles);