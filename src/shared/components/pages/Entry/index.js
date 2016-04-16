import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Helmet from 'react-helmet';

import ArticleList from '../../partials/ArticleList';
import ArticleContent from '../../partials/ArticleContent';

import './styles.css';

export default class Entry extends Component {

  componentDidMount() {
    if (this.props.articleActive.data.id != this.props.params.id) {
      this.props.getArticleContentById(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.getArticleContentById(nextProps.params.id);
    }
  }

  renderArticle() {
    if (this.props.articleActive.error) {
      return (
        <div>{ this.props.articleActive.error }</div>
      );
    }
    return (
      <ArticleContent article={this.props.articleActive.data} />
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
        transitionEnterTimeout={ 1000 }
        transitionLeaveTimeout={ 1000 }
      >
        <div key={this.props.location.pathname}>
          <Helmet 
            title={ this.props.articleActive.data.title }
            meta={[
              {
                name: 'description', 
                content: 'Add description here'
              }
            ]} 
          />
          <div className="col-md-8">
            { this.renderArticle() }
          </div>
          <div className="col-md-4">
            <ArticleList articles={this.props.articleActive.related} />
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}