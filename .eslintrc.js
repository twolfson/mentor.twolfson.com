const RULE_IGNORE = 0;
module.exports = {
  // Inherit from our package
  extends: 'eslint-config-twolfson',
  parserOptions: {
    ecmaVersion: 2017,
  },

  rules: {
    'comma-dangle': RULE_IGNORE,
  },

  // Configure our environment
  // http://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    es6: true,
    node: true,
    mocha: true,
  }
};
