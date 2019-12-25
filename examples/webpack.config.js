'use strict';

const path = require('path');
// console.log('============')
// console.log(process)
// console.log('============')
const args = require('minimist')(process.argv.slice(2));

// List of allowed environments
const allowedEnvs = ['dev', 'prop', 'test'];

// Set the correct environment
console.log("args._==", args._);
var env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (args.env) {
  env = args.env;
} else {
  env = 'prod';
}
// process.env.REACT_WEBPACK_ENV = env;

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : 'prod';
  let config = require(path.join(__dirname, 'webpack.' + validEnv));
  return config;
}

module.exports = buildConfig(env);
