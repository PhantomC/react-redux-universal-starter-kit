import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import * as articleActions from 'shared/redux/actions/articleActions';

import PostForm from 'shared/components/partials/PostForm';

class ArticleEdit extends Component {

  constructor(props) {
    super(props);
    this.onPostFormSubmit = this.onPostFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.editArticle(this.props.params.id);
  }

  onPostFormSubmit(data) {
    this.props.updateArticleById(this.props.articleId, data).then(()=>{
      this.context.router.push('/member');
    });
  }

  render() {
    return (
      <div>
        <PostForm onPostFormSubmit={this.onPostFormSubmit} />
      </div>
    );
  }
}

ArticleEdit.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps({member}) {
  return {
    articleId: member.myArticleEdit.id
  };
}

module.exports = connect(mapStateToProps, articleActions)(ArticleEdit);