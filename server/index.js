// Heavily based on https://parceljs.org/api.html
// Load in our dependencies
const Bundler = require('parcel-bundler');

//
// Single entrypoint file location:
const entryFiles = [__dirname + '/index.pug'];

// Bundler options
const options = {
};

(async function() {
  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(entryFiles, options);

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  // const bundle = await bundler.bundle();
  await bundler.serve();
})();
