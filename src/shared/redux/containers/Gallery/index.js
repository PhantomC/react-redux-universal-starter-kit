import React, { Component } from 'react';

import Helmet from 'react-helmet';

import $ from 'jquery';

if (process.env.BROWSER == true) {
  require('./magnific-popup/magnific-popup.css');
  require('./magnific-popup/magnific-popup');
}

class Gallery extends Component {
  
  componentDidMount() {
    $(this.refs.galleryContainer).magnificPopup({
      delegate: 'a',
      type: 'image'
    });
  }

  render() {
    return (
      <div>
        <Helmet title="Gallery" />
        <div className="col-md-8">
          <div ref="galleryContainer" className="row">
            <div className="col-xs-6 col-md-3">
              <a href="/images/gallery/1.jpg" className="thumbnail">
                  <img src="/images/gallery/1.jpg" alt="..." />
              </a>
            </div>
            <div className="col-xs-6 col-md-3">
              <a href="/images/gallery/2.jpg" className="thumbnail">
                  <img src="/images/gallery/2.jpg" alt="..." />
              </a>
            </div>
            <div className="col-xs-6 col-md-3">
              <a href="/images/gallery/3.jpg" className="thumbnail">
                  <img src="/images/gallery/3.jpg" alt="..." />
              </a>
            </div>
            <div className="col-xs-6 col-md-3">
              <a href="/images/gallery/4.jpg" className="thumbnail">
                  <img src="/images/gallery/4.jpg" alt="..." />
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          Sidebar   
        </div>
      </div>
    );
  }
}

module.exports = Gallery;