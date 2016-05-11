import { connect } from 'react-redux';
import * as memberActions from 'shared/redux/actions/memberActions';

import Login from 'shared/components/pages/Login';

function mapStateToProps(state) {
  return {
    member: state.member,
    form: state.form
  };
}

module.exports = connect(mapStateToProps, memberActions)(Login);