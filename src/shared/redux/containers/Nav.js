import { connect } from 'react-redux';
import * as memberActions from '../actions/memberActions';

import Nav from '../../components/layouts/Nav';

function mapStateToProps({member}) {
  return {member};
}

module.exports = connect(mapStateToProps, memberActions)(Nav);