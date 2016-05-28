import React from 'react';

import Nav from 'shared/containers/Nav';

import CSSModules from 'react-css-modules';
import styles from './Header.scss';

const Header = function() {
  return (
    <div styleName="container">
      <header>
        <div className="container">
          <Nav />
        </div>
      </header>
    </div>
  );
};

export default CSSModules(Header, styles);