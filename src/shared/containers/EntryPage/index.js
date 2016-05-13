import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Helmet from 'react-helmet';
import CSSModules from 'react-css-modules';

import * as articleActions from 'shared/redux/actions/articleActions';

import ArticleList from 'shared/components/partials/Article/ArticleList';
import ArticleContent from 'shared/components/partials/Article/ArticleContent';

import styles from './Entry.scss';

class EntryPage extends Component {

  componentDidMount() {
    if (this.props.article.data.id != this.props.params.id) {
      this.props.getArticleContentById(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.getArticleContentById(nextProps.params.id);
    }
  }

  renderArticle() {
    if (this.props.article.error) {
      return (
        <div>{ this.props.article.error.statusText }</div>
      );
    }
    return (
      <ArticleContent article={this.props.article.data} />
    );
  }

  render() {
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
              { this.renderArticle() }
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

EntryPage.prefetchData = [
  function(params) {
    return articleActions.getArticleContentById(params.id);
  }
];

function mapStateToProps({article}) {
  return {
    article: article.active
  };
}

module.exports = connect(mapStateToProps, articleActions)(CSSModules(EntryPage, styles));