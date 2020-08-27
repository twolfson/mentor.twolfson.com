// Load in our dependencies
const { generateBundler } = require('../server/index.js');
const { expect } = require('chai');

// Define our tests
describe('All generated HTML pages', function () {
  // DEV: If this becomes common, then memoize results in a common test file
  before(async function () {
    this.timeout(30e3);
    this.bundler = generateBundler();
    this.bundle = await this.bundler.bundle();
    // DEV: We could `.map` the `childBundles` set but this is easier
    this.htmlFile = Array.from(this.bundle.childBundles)[0].entryAsset.generated.html;
    expect(this.htmlFile).to.be.a('string');
  });

  it('has an id on each `a` element', function () {
  });

  it.skip('all elements have unique ids', function () {
  });

  it.skip('has an id on each `form` element', function () {
  });
});
