import React from 'react';

import Helmet from 'react-helmet';

const About = function() {
  return (
    <div>
      <Helmet title="About" />
      <div className="col-md-8">
        This is about page.
      </div>
      <div className="col-md-4">
        Sidebar   
      </div>
    </div>
  );
};

module.exports = About;