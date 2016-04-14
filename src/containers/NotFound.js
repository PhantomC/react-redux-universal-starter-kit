import React from 'react';

import Helmet from 'react-helmet';

const NotFound = function() {
  return (
    <div>
      <Helmet title="About" />
      <div className="col-md-8">
        Error 404 - Not Found.
      </div>
      <div className="col-md-4">
        Sidebar   
      </div>
    </div>
  );
};

module.exports = NotFound;