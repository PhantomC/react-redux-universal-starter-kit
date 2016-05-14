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
    console.log(data);
    // this.props.createNewArticle(data);
  }

  render() {
    return (
      <div>
        <PostForm onPostFormSubmit={this.onPostFormSubmit} />
      </div>
    );
  }
}

module.exports = connect(null, articleActions)(ArticleEdit);