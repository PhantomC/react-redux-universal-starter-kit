import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import CSSModules from 'react-css-modules';
import styles from './styles.scss';

class Nav extends Component {
  renderMemberSection() {
    if (this.props.member.isAuthenticated) {
      return (
          <li><Link to="/member">Member</Link></li>
      );
    }

    return (
      <li><Link to="/login">Login</Link></li>
    );
  }

  render() {
    return (
      <div>
        <ul className="nav nav-pills">
          <li><Link to="/">React Redux Universal Starter Kit</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/performance">Performance Tools</Link></li>

          {this.renderMemberSection()}

        </ul>
      </div>
    );
  }
}

Nav.contextTypes = {
  router: PropTypes.object
};

export default CSSModules(Nav, styles);