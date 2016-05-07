import React from 'react';

import Article from 'shared/components/partials/Article';

export default function(props) {
  return (
    <div className="row">
      { props.articles.map(function(article, index) {
        return (
          <Article key={ article.id } article={ article } addClass={props.addClass} />
        );
      }) }
    </div>
  );
}