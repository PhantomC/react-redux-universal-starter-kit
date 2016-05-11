import React, { Component } from 'react';

import SearchForm from 'shared/components/partials/SearchForm';
import ArticleList from 'shared/components/partials/Article/ArticleList';
import PostForm from 'shared/components/partials/PostForm';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.onPostFormSubmit = this.onPostFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getArticleLatest();
  }

  onPostFormSubmit(data) {
    this.props.createNewArticle(data);
  }

  render() {
    return (
      <div>
        <div className="col-md-8 col-md-push-2">
          <SearchForm getSearchResults={this.props.getSearchResults} />
          {this.props.member.isAuthenticated ? <PostForm onPostFormSubmit={this.onPostFormSubmit} /> : null}
          <ArticleList articles={ this.props.articleLatest } addClass="col-xs-12" />
        </div>
      </div>
    );
  }
}
