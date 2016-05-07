import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import ContactForm from 'shared/components/partials/ContactForm';

export default class Contact extends Component {
  
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
    this.props.saveContactFormData(data)
      .then(() => {
        this.setState({
          sent: true
        });
        setTimeout(() => {
          this.context.router.push('/');
        }, 2000);
      });
  }

  render() {
    return (
      <div>
        <Helmet title="Contact" />
        <div className="col-md-8">
          <ContactForm onContactFormSubmit={ this.onContactFormSubmit } />
          { this.state.sent ? (
            <div className="alert alert-success">
              <strong>Success!</strong> Your message was sent successfully.
            </div>
          ) : null }
        </div>
        <div className="col-md-4">
          Sidebar   
        </div>
      </div>
    );
  }
} 