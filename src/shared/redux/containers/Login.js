import { connect } from 'react-redux';
import * as memberActions from '../actions/memberActions';

import Login from '../../components/pages/Login';

function mapStateToProps(state) {
  return {
    member: state.member,
    form: state.form
  };
}

module.exports = connect(mapStateToProps, memberActions)(Login);