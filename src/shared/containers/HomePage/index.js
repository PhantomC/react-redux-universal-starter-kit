import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as articleActions from 'shared/modules/article/articleActions';

import Page from 'shared/components/Page';
import SearchForm from 'shared/containers/HomePage/SearchForm';
import ArticleList from 'shared/components/ArticleList';
import PostForm from 'shared/components/PostForm';

import ErrorPage from 'shared/containers/ErrorPage';

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
    
    if (this.props.error !== null) {
      return <ErrorPage />;
    }

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

function mapStateToProps({article, member, error}) {
  return {
    articles: article.latest,
    member,
    error
  };
}

module.exports = connect(mapStateToProps, articleActions)(Page(HomePage));
