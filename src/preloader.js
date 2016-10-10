import React from 'react'

require('./resources/less/preloader.less');
let Preloader = (props) => (
  <div className="infinite-scroll-preloader">
    <div className="preloader"></div>
  </div>
);

export default Preloader