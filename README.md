# mentor.twolfson.com
Website for twolfson's mentoring service

Task list:
- Update README
  - Install, development, deployment, release, LiveReload
- Deploy to server. Could do S3 but feel like NGINX + LetsEncrypt might be faster due to S3 headaches
- Build the damn site
  - Favicon
- Add in analytics
- Add in Sentry for any dynamic JS?
- See all TODOs

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
