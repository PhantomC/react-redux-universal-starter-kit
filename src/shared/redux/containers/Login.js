import { connect } from 'react-redux';
import * as memberActions from '../actions/memberActions';

import Login from '../../components/pages/Login';

module.exports = connect(null, memberActions)(Login);