import React, { Component } from 'react';

import Search from 'shared/components/partials/Search';
import ArticleList from 'shared/components/partials/ArticleList';

export default class Home extends Component {

  componentDidMount() {
    this.props.getArticleLatest();
  }

  render() {
    return (
      <div>
        <div className="col-md-8">
          <Search getSearchResults={this.props.getSearchResults} />
          <ArticleList articles={ this.props.articleLatest } addClass="col-xs-6 col-sm-4" />
        </div>
        <div className="col-md-4">
          Sidebar
        </div>
      </div>
    );
  }
}