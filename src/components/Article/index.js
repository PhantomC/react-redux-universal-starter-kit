import React from 'react';

import { Link } from 'react-router';

import CSSModules from 'react-css-modules';
import styles from './styles.css';

const Article = function(props) {
  return (
    <article styleName="container" className={props.addClass}>
      <div className="image">
        <Link to={{pathname: `/articles/${props.article.id}`, state: {transition: 'slide'}}}>
          <img src="http://placehold.it/400x200" alt="" />
        </Link>
      </div>
      <div className="caption">
        <h2 styleName="title">
          <Link to={{pathname: `/articles/${props.article.id}`, state: {transition: 'slide'}}}>{ props.article.title }</Link>
        </h2>
        <p>Description ...</p>
      </div>
    </article>
  );
};

export default CSSModules(Article, styles);