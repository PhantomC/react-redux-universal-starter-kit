import { connect } from 'react-redux';
import * as memberActions from '../actions/memberActions';

import Login from '../../components/pages/Login';

function mapStateToProps(state) {
  return {};
}

Login.contextTypes = {
  router: PropTypes.object
};

module.exports = connect(mapStateToProps, memberActions)(Login);