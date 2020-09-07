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
  __dirname + '/index.pug',
  __dirname + '/bootcamp-alternative.pug',
  __dirname + '/contact-success.pug',
  __dirname + '/404.pug',
  __dirname + '/robots.txt',
  __dirname + '/sitemap.txt',
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
/* eslint-disable no-console */
async function main() {
  let bundler = exports.generateBundler();
  if (process.env.NODE_ENV === ENV_DEVELOPMENT) {
    // Start our server as per normal
    console.info(`Default page will be http://localhost:${options.port}/index.html`);
    let server = await bundler.serve(options.port, options.https); // eslint-disable-line no-unused-vars
    // Skipping browser open logic

    // Override our server to behave more like NGINX
    // https://github.com/parcel-bundler/parcel/blob/v1.10.3/src/Server.js#L43-L72
    let _handleRequest = server._events.request;
    server._events.request = function (req, res, next) {
      // If someone is requesting `/index.html`, then redirect them to `/`
      // req.url = '/main.c5ebeee7.css';
      if (req.url.startsWith('/index.html')) {
        if (req.url.indexOf('?') !== -1) { throw new Error('Query string not supported in redirects yet'); }
        // DEV: 302 is temporary redirect (301 is permanent)
        // https://stackoverflow.com/a/4062281
        res.writeHead(302, {
          Location: '/'
        });
        res.end();
        return;
      }

      // If someone is requesting `/`, then serve it as `index.html`
      if (req.url === '/' || req.url === '/?') {
        req.url = '/index.html';
      }

      // DEV: Usually the callback/`next` is for more middleware but they seem to only use it for 404
      //   https://github.com/parcel-bundler/parcel/blob/v1.10.3/src/Server.js#L43-L111
      return _handleRequest.call(this, req, res, function custom404() {
        req.url = '/404.html';
        _handleRequest.call(this, req, res);
      });
    };
  } else if (process.env.NODE_ENV === ENV_PRODUCTION) {
    bundler.bundle();
  } else {
    throw new Error(`\`index.js\` being run in unexpected environment: ${process.env.NODE_ENV}`);
  }
}
if (require.main === module) {
  main();
}
