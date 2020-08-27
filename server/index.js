// Heavily based on https://parceljs.org/api.html
// Load in our dependencies
const Bundler = require('parcel');

// Define our constants
const ENV_DEVELOPMENT = 'development';
const ENV_PRODUCTION = 'production';

// Fallback our environment
process.env.NODE_ENV = process.env.NODE_ENV || ENV_DEVELOPMENT;

// Set up Parcel configuration
const entryFiles = [
  __dirname + '/index.pug',
  __dirname + '/robots.txt',
];
const options = {
  port: 5000
};

// Extend options on a per-environment basis
if (process.env.NODE_ENV === ENV_PRODUCTION) {
  // DEV: This line seems to tell program to quit when done
  //   https://github.com/parcel-bundler/parcel/blob/v1.10.3/src/cli.js#L198
  options.production = true;
}

// Generate and export a bundler for extension
// https://github.com/parcel-bundler/parcel/blob/v1.10.3/src/cli.js#L213-L228
const bundler = new Bundler(entryFiles, options);
module.exports = bundler;

// If this file is being run via the CLI, then run the following
// https://github.com/parcel-bundler/parcel/blob/v1.10.3/src/cli.js#L213-L228
function async main() {
  if (process.env.NODE_ENV === ENV_DEVELOPMENT) {
    bundler.serve();
  } else if (process.env.NODE_ENV === ENV_PRODUCTION) {
    bundler.bundle();
  } else {
    throw new Error(`\`index.js\` being run in unexpected environment: ${process.env.NODE_ENV}`);
  }
};
if (require.main === module) {
  main();
}
