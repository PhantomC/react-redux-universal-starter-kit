import { connect } from 'react-redux';

import * as contactActions from '../actions/contactActions';

import Contact from '../../components/pages/Contact';

function mapStateToProps(state) {
  return {
    form: state.form
  };
}

module.exports = connect(mapStateToProps, contactActions)(Contact);