import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Helmet from 'react-helmet';
import CSSModules from 'react-css-modules';

import * as articleActions from 'shared/modules/article/articleActions';

import Page from 'shared/components/Page';
import ArticleList from 'shared/components/ArticleList';
import ArticleContent from 'shared/containers/EntryPage/ArticleContent';
import ErrorPage from 'shared/containers/ErrorPage';

import styles from './Entry.scss';

class EntryPage extends Component {

  componentWillMount() {
    if (
      this.props.error === null
      && this.props.article.data.id != this.props.params.id
    ) {
      this.props.getArticleContentById(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.getArticleContentById(nextProps.params.id);
    }
  }

  componentWillUnmount() {
    this.props.resetActiveArticle();
  }

  render() {

    if (this.props.error !== null) {
      return <ErrorPage />;
    }

    this.transitionName = this.props.location.state ? this.props.location.state.transition : 'default';
    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionAppear={ true }
        transitionName={ this.transitionName }
        transitionAppearTimeout={ 500 }
        transitionEnterTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
      >
        <div styleName="container" key={this.props.location.pathname}>
          <Helmet 
            title={ this.props.article.data.title }
            meta={[
              {
                name: 'description', 
                content: 'Add description here'
              }
            ]} 
          />
          <div styleName="body">
            <div styleName="content">
              <ArticleContent article={this.props.article.data} />
            </div>
            <div styleName="related">
              <ArticleList articles={this.props.article.related} />
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

function mapStateToProps({article, error}) {
  return {
    article: article.active,
    error
  };
}

module.exports = connect(mapStateToProps, articleActions)(Page(CSSModules(EntryPage, styles)));