import React from 'react';

import { Link } from 'react-router';

import CSSModules from 'react-css-modules';
import styles from './Article.scss';

const Article = function(props) {
  const { article, handleDelete, handleEdit } = props;
  return (
    <article styleName="container" className={props.addClass}>
      <header>
        <div className="row">
          <div className="col-xs-1">
            <img styleName="avatar" src={article.member.avatar} alt=""/>
          </div>
          <div className="col-xs-11">
            <span styleName="author">{article.member.name}</span>
          </div>
        </div>
        <h2 styleName="title">
          <Link to={{pathname: `/articles/${article.id}`, state: {transition: 'slide'}}}>{article.title}</Link>
        </h2>
      </header>
      <div styleName="excerpt">
        <p>{article.excerpt}</p>
      </div>
      {handleEdit ? <button onClick={handleEdit.bind(null, article.id)}>Edit</button> : null}
      {handleDelete ? <button onClick={handleDelete.bind(null, article.id)}>Delete</button> : null}
    </article>
  );
};

export default CSSModules(Article, styles);