import { connect } from 'react-redux';
import * as memberActions from '../actions/memberActions';

import Member from '../../components/pages/Member';

function mapStateToProps(state) {
  return {
    member: state.member
  };
}


module.exports = connect(mapStateToProps, memberActions)(Member);