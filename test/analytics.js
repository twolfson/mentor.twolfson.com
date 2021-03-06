// Load in our dependencies
const cheerio = require('cheerio');
const { expect } = require('chai');
const { generateBundler } = require('../server/index.js');

// Define our tests
describe('Root/Contact page', function () {
  // DEV: If this becomes common, then memoize results in a common test file
  before(async function generateHTML() {
    this.timeout(30e3);
    this.bundler = generateBundler();
    this.bundle = await this.bundler.bundle();

    let rootBundle = Array.from(this.bundle.childBundles).find((bundle) => bundle.name.endsWith('/index.html'));
    this.htmlStr = rootBundle.entryAsset.generated.html;
    expect(this.htmlStr).to.be.a('string');
  });
  before(function generateCheerio() {
    this.$ = cheerio.load(this.htmlStr);
  });

  it('has an id on each `a` element', function () {
    let $aEls = this.$('a');
    expect($aEls.length).to.be.greaterThan(3);
    $aEls.each((i, aEl) => {
      let $aEl = this.$(aEl);
      expect($aEl.attr('id')).to.not.eq(undefined, $aEl + ' id');
    });
  });

  it('all elements have unique ids', function () {
    let $idEls = this.$('[id]');
    expect($idEls.length).to.be.greaterThan(3);
    let ids = $idEls.toArray().map((idEl) => this.$(idEl).attr('id'));
    let idSet = new Set(ids);
    expect(Array.from(idSet)).to.deep.equal(ids);
  });

  it('has an id on each `form` element', function () {
    let $formEls = this.$('form');
    // DEV: Using `eq(1)` until we can test multiple forms
    expect($formEls.length).to.eq(1);
    $formEls.each((i, formEl) => {
      let $formEl = this.$(formEl);
      expect($formEl.attr('id')).to.not.eq(undefined, $formEl + ' id');
    });
  });

  it('uses `_blank` on conversion links', function () {
    let $conversionLink = this.$('#contact__email-link');
    expect($conversionLink.length).to.eq(1);
    expect($conversionLink.attr('target')).to.eq('_blank');
  });
});
