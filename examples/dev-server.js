const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
// const options = {
//   contentBase: './dist',
//   hot: true,
//   host: 'localhost'
// };
const options = config.devServer

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(options.port, options.host, () => {
  console.log('dev server listening on port '+ options.port);
});