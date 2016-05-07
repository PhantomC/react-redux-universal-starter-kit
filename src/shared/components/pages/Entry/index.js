import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Helmet from 'react-helmet';
import CSSModules from 'react-css-modules';

import ArticleList from 'shared/components/partials/ArticleList';
import ArticleContent from 'shared/components/partials/ArticleContent';

import styles from './styles.scss';

class Entry extends Component {

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
        <div>{ this.props.articleActive.error.statusText }</div>
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
        transitionEnterTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
      >
        <div styleName="container" key={this.props.location.pathname}>
          <Helmet 
            title={ this.props.articleActive.data.title }
            meta={[
              {
                name: 'description', 
                content: 'Add description here'
              }
            ]} 
          />
          <div styleName="body">
            <div className="col-md-8">
              { this.renderArticle() }
            </div>
            <div className="col-md-4">
              <ArticleList articles={this.props.articleActive.related} />
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default CSSModules(Entry, styles);