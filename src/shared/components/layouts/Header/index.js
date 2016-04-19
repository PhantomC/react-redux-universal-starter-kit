import React from 'react';

import Nav from '../../../redux/containers/Nav';

import CSSModules from 'react-css-modules';
import styles from './styles.css';

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