import { connect } from 'react-redux';
import * as memberActions from '../actions/memberActions';

import Member from '../../components/pages/Member';

function mapStateToProps({member}) {
  return {member};
}


module.exports = connect(mapStateToProps, memberActions)(Member);