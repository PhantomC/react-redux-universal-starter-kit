import React, { Component } from 'react';

import Search from 'shared/components/partials/Search';
import ArticleList from 'shared/components/partials/ArticleList';
import PostForm from 'shared/components/partials/PostForm';

import jwt from 'jsonwebtoken';
import reactCookie from 'react-cookie';
import { AUTH_TOKEN } from 'shared/constants/cookieNames';

import * as Helpers from 'shared/utils/helper';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.onPostFormSubmit = this.onPostFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getArticleLatest();
  }

  onPostFormSubmit(data) {
    const token = reactCookie.load(AUTH_TOKEN);
    const user = jwt.decode(token);
    data = {
      ...data,
      excerpt: data.body,
      author: {
        name: user.name,
        avatar: user.profile_pic
      },
      date: Helpers.getCurrentUTCTime()
    }
    this.props.createNewArticle(data);
  }

  render() {
    return (
      <div>
        <div className="col-md-8 col-md-push-2">
          <Search getSearchResults={this.props.getSearchResults} />
          {this.props.member.isAuthenticated ? <PostForm onPostFormSubmit={this.onPostFormSubmit} /> : null}
          <ArticleList articles={ this.props.articleLatest } addClass="col-xs-12" />
        </div>
      </div>
    );
  }
}
