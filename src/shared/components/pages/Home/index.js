import React, { Component } from 'react';

import Search from 'shared/components/partials/Search';
import ArticleList from 'shared/components/partials/ArticleList';
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
    console.log(data);
    // this.props.savePostFormData(data);
  }

  render() {
    return (
      <div>
        <div className="col-md-8">
          <Search getSearchResults={this.props.getSearchResults} />
          {this.props.member.isAuthenticated ? <PostForm onPostFormSubmit={this.onPostFormSubmit} /> : null}
          <ArticleList articles={ this.props.articleLatest } addClass="col-xs-12" />
        </div>
        <div className="col-md-4">
          Sidebar
        </div>
      </div>
    );
  }
}