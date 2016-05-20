import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CSSModules from 'react-css-modules';
import styles from './Nav.scss';

import * as memberActions from 'shared/redux/actions/memberActions';

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
        <div styleName="logo"><Link to="/">React Redux <span>Universal Starter Kit</span></Link></div>
        <ul styleName="nav">
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {this.renderMemberSection()}
        </ul>
      </div>
    );
  }
}

Nav.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps({member}) {
  return {member};
}

export default connect(mapStateToProps, memberActions)(CSSModules(Nav, styles));
