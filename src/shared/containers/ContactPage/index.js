import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import * as contactActions from 'shared/redux/actions/contactActions';

import CSSModules from 'react-css-modules';
import styles from './ContactPage.scss';


import ContactForm from 'shared/components/partials/ContactForm';

class ContactPage extends Component {
  
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.onContactFormSubmit = this.onContactFormSubmit.bind(this);
    this.state = {
      sent: false
    };
  }

  onContactFormSubmit(data) {
    this.props.saveContactFormData(data);
    this.setState({
      sent: true
    });
    setTimeout(() => {
      this.context.router.push('/');
    }, 2000);
  }

  render() {
    return (
      <div>
        <Helmet title="Contact" />
        <div className="col-md-12">
          <div styleName="container">
            <ContactForm onContactFormSubmit={ this.onContactFormSubmit } />
            { this.state.sent ? (
              <div className="alert alert-success">
                <strong>Success!</strong> Your message was sent successfully.
              </div>
            ) : null }          
          </div>
        </div>
      </div>
    );
  }
}

module.exports = connect(null, contactActions)(CSSModules(ContactPage, styles));