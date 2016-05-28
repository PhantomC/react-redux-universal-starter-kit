import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as articleActions from 'shared/modules/article/articleActions';

import SearchForm from 'shared/containers/HomePage/SearchForm';
import ArticleList from 'shared/components/ArticleList';
import PostForm from 'shared/components/PostForm';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.onPostFormSubmit = this.onPostFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getArticleLatest();
  }

  onPostFormSubmit(data) {
    this.props.createNewArticle(data);
  }

  render() {
    return (
      <div>
        <div className="col-md-8 col-md-push-2">
          <div className="row">
              <SearchForm getSearchResults={this.props.getSearchResults} />
          </div>
          {this.props.member.isAuthenticated ? <div className="row"><PostForm onPostFormSubmit={this.onPostFormSubmit} /></div> : null}
          <ArticleList articles={ this.props.articles } addClass="col-xs-12" />
        </div>
      </div>
    );
  }
}

function mapStateToProps({article, member}) {
  return {
    articles: article.latest,
    member
  };
}

module.exports = connect(mapStateToProps, articleActions)(HomePage);
