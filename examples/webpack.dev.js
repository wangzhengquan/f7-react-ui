const baseConfig = require('./webpack.base.js')
const defaultConfig = require('./webpack.default.js')
const {NamedModulesPlugin, HotModuleReplacementPlugin} = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
	devtool: 'inline-source-map',
  devServer: {
      contentBase: defaultConfig.distDir,
      hot: true,
      historyApiFallback: true,
      // compress: true,
      host: '0.0.0.0',
      port: 8080
  },
  output: {
      // filename: '[name].js',
      // filename: '[name].[chunkhash].js',
      filename: '[name].[hash].js',
      path: defaultConfig.distDir,
      publicPath: '/'
  },
  plugins: [
  	new NamedModulesPlugin(),
    new HotModuleReplacementPlugin()
  ]

})
