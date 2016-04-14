import React from 'react';

import CSSModules from 'react-css-modules';
import styles from './styles.css';

const ArticleContent = function(props) {
  return (
    <article styleName="container">
      <h1 styleName="title">{ props.article.title }</h1>
      <div dangerouslySetInnerHTML={{ __html: props.article.body }} />
    </article>
  );
};

export default CSSModules(ArticleContent, styles);