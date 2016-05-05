import React from 'react';

import CSSModules from 'react-css-modules';
import styles from './styles.scss';

const Footer = function() {
  return (
    <footer styleName="container">
      <div className="container">
        <p className="text-center"><a href="https://github.com/suranartnc/react-redux-universal-starter-kit">React Redux Universal Starter Kit</a></p>
      </div>
    </footer>
  );
};

export default CSSModules(Footer, styles);