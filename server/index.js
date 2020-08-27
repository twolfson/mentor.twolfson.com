// Heavily based on https://parceljs.org/api.html
// Load in our dependencies
const Bundler = require('parcel');

// Define our constants
const ENV_DEVELOPMENT = 'development';
const ENV_TEST = 'test';
const ENV_PRODUCTION = 'production';

// Fallback our environment
process.env.NODE_ENV = process.env.NODE_ENV || ENV_DEVELOPMENT;

// Set up Parcel configuration
const entryFiles = [
  // DEV: All HMR files are specified first, https://github.com/parcel-bundler/parcel/issues/2340#issuecomment-593166548
  //   so all HTML files go first, using a glob
  __dirname + '/{index,contact-success}.pug',
  __dirname + '/robots.txt',
];
const options = {
  https: false,
  port: 5000,
};

// Extend options on a per-environment basis
if (process.env.NODE_ENV === ENV_DEVELOPMENT) {
  // No changes
} else if (process.env.NODE_ENV === ENV_TEST) {
  // DEV: This line seems to tell program to quit when done
  //   https://github.com/parcel-bundler/parcel/blob/v1.10.3/src/cli.js#L198
  options.production = true;
  options.logLevel = 2; // Errors and warnings only (no info)
} else if (process.env.NODE_ENV === ENV_PRODUCTION) {
  options.production = true;
}

// Generate and export a bundler for extension
// https://github.com/parcel-bundler/parcel/blob/v1.10.3/src/cli.js#L213-L228
exports.generateBundler = function () {
  return new Bundler(entryFiles, options);
};

// If this file is being run via the CLI, then run the following
// https://github.com/parcel-bundler/parcel/blob/v1.10.3/src/cli.js#L213-L228
async function main() {
  let bundler = exports.generateBundler();
  if (process.env.NODE_ENV === ENV_DEVELOPMENT) {
    // Start our server as per normal
    console.info(`Default page will be http://localhost:${options.port}/index.html`);
    let server = await bundler.serve(options.port, options.https); // eslint-disable-line no-unused-vars
    // Skipping browser open logic
  } else if (process.env.NODE_ENV === ENV_PRODUCTION) {
    bundler.bundle();
  } else {
    throw new Error(`\`index.js\` being run in unexpected environment: ${process.env.NODE_ENV}`);
  }
}
if (require.main === module) {
  main();
}
