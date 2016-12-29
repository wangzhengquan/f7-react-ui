/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');
const host = config.host
// const host = 'localhost'

new WebpackDevServer(webpack(config), config.devServer)
.listen(config.port, host, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at '+host+':' + config.port);
  console.log('Opening your system browser...');
  open('http://'+host+':' + config.port + '/webpack-dev-server/');
});
