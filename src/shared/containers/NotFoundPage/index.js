import React from 'react';

import Helmet from 'react-helmet';

import CSSModules from 'react-css-modules';
import styles from './NotFoundPage.scss';


const NotFound = function() {
  return (
    <div>
      <Helmet title="About" />
      <div className="col-md-12">
        <div styleName="container">
          <h1 styleName="title">404</h1>
          <h3 styleName="sub-title">Page Not Found</h3>
          <p styleName="messege">Sorry, but the page you are looking for has note been found. Try checking the URL for error, then hit the refresh button on your browser or try found something else in our app.</p>
        </div>
      </div>
    </div>
  );
};

module.exports = CSSModules(NotFound, styles);