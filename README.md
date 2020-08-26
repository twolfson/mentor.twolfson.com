# mentor.twolfson.com
Website for twolfson's mentoring service

Task list:
- Update README
  - Install, development, deployment, release, LiveReload (not needed)
- Deploy to server. Could do S3 but feel like NGINX + LetsEncrypt might be faster due to S3 headaches
- Build the damn site
  - [x] Favicon
  - [x] Meta keywords and such? SEO?
  - Lighthouse/a11y check?
- Add in analytics
- Add in Sentry for any dynamic JS?
- See all TODOs
- Check for all working links
- [x] GitHub links? LinkedIn links? GitHub projects?
  - Employment? Nah
- [x] Link to review sources
- [x] Payments accepted at the bottom
- Sanity check mobile looks good still
- Add in social tags once launched

## Commands to document
- Install dependencies
  ```bash
  gem install bundler
  bundle install
  ```
- Run commands
  ```bash
  # Start development server
  bin/jekyll serve

  # Compile site for production
  bin/jekyll build
  ```

## Unlicense
As of Aug 25 2020, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
