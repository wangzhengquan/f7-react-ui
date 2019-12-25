const baseConfig = require('./webpack.base')
const defaultConfig = require('./webpack.default')
const webpack =  require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  output: {
      // filename: '[name].js',
      // filename: '[name].[chunkhash].js',
      filename: '[name].[hash].js',
      path: defaultConfig.distDir,
      publicPath: './'
  },
   
  plugins: [
    new UglifyJSPlugin(),

    new webpack.DefinePlugin({
       'process.env': {
         'NODE_ENV': JSON.stringify('production')
       }
    }),
    
    new webpack.HashedModuleIdsPlugin()
  ]

})