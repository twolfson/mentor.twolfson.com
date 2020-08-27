# mentor.twolfson.com [![Build status](https://circleci.com/gh/twolfson/mentor.twolfson.com/tree/master.svg?style=svg)](https://circleci.com/gh/twolfson/mentor.twolfson.com/tree/master)

Website for twolfson's mentoring service

https://mentor.twolfson.com/

## Getting started
To run this repo locally, execute the following:

```bash
# Clone repo
git clone https://github.com/twolfson/mentor.twolfson.com

# Install our dependencies
npm install

# Run our server
npm start
# Server running at http://localhost:5000
```

Website will be accessible at: http://localhost:5000/index.html

## Documentation
We provide the following scripts/commands:

- `npm start`, start our local development server
  - Files will automatically be updated via Parcel.js' hot module replacement
  - This sometimes requires rebooting on file addition/deletion but is a slick alternative to LiveReload
- `npm run build`, builds files for production
- `foundry release <version>`, creates a new `git tag` version and updates `package.json` via `foundry`
  - Requires `foundry.cli` is installed
- `./deploy.sh <ssh-server>`, builds and deploys static files to an SSH server

## Unlicense
As of Aug 25 2020, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
