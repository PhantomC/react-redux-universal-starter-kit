import React from 'react';

import ArticleItem from 'shared/components/partials/Article/ArticleItem';

export default function(props) {
  return (
    <div className="row">
      { props.articles.map(function(article, index) {
        return (
          <ArticleItem key={ article.id } 
            article={ article } 
            addClass={props.addClass} 
            handleEdit={props.handleEdit} 
            handleDelete={props.handleDelete}
          />
        );
      }) }
    </div>
  );
}