# Android documentation

[![Build Status](https://travis-ci.com/mapbox/android-docs.svg?branch=publisher-production)](https://travis-ci.com/mapbox/android-docs)

This repo hosts all of the Android documentation for the Mapbox platform, including the Maps SDK, the Java SDK, the Navigation SDK, and Mapbox Plugins. Visit [Mapbox Android Docs](https://docs.mapbox.com/android/maps/overview/) to view the live website.

## Getting started

### Requirements

To host this website locally, you'll need to have Node.js installed and setup via [nvm](https://github.com/creationix/nvm#installation).

### Installation

This repository uses git submodules, so it needs to be cloned recursively to include:

- `examples/maps`, sourced from [`mapbox-android-demo`](https://github.com/mapbox/mapbox-android-demo)
- `examples/navigation`, sourced from [`mapbox-navigation-android`](https://github.com/mapbox/mapbox-navigation-android/tree/master/app/src/main/java/com/mapbox/services/android/navigation/testapp/activity)

```
git clone --recursive git@github.com:mapbox/android-docs.git
```

Change your working directory to the cloned repository:

```
cd android-docs
```

Use `nvm` to install and use the version of node specified in `.nvmrc`:

 ```
nvm install
nvm use
```

Upgrade your version of `npm`:

 ```
npm install -g npm@6
```

To install site and build dependencies, run:

```sh
npm install
```

### Hosting locally

The Android documentation uses [Batfish](https://github.com/mapbox/batfish), a static-site generator powered by react and webpack. To get started contributing to the documentation and running the site locally you'll need to navigate to this projects folder and execute:

```
npm start
```

This will set up a server running at http://localhost:8080/android/. If you make changes to the source content, your browser should automatically refresh using livereload once you save the file.

### Running tests locally

To run the tests locally, run:

```sh
npm test
```

The test suite will lint JavaScript as well as:

* Run remark-linters that lint markdown files
  - check for [broken links](https://github.com/mapbox/remark-lint-mapbox/tree/master/link-checker)
  - [validate the frontmatter](https://github.com/mapbox/remark-lint-mapbox/tree/master/frontmatter) on each page
  - check for [non-descriptive link text](https://github.com/mapbox/remark-lint-link-text)
* Run [@mapbox/copyeditor](https://github.com/mapbox/copyeditor) to validate writing
  - asserts the Mapbox documentation style guide
  - checks spelling
  - checks for plain language and suggests alternatives

If the tests return an error or warning, follow the guidance from the test to fix it.

## Updating for SDK releases

To update the site for a Maps SDK or Navigation SDK release:

1. Run `node scripts/update.js <product> <version>`. Where :
    - `<product>` is either `maps` or `navigation`
    - `<version>` is the version number. It must follow the format `X.X.X`, where `X` is an integer. Optional: append the version number with `-beta.X` or `-rc.X` where `X` is also an integer.
2. Commit and push the commits that are created.

Running `scripts/update.js` will:

- Update the relevant variable in [`src/constants.json`](/src/constants.json).
- Add the new version number to the relevant data file ([`src/data/*-version-numbers.json`](/src/data/)).
- Rewrite the relevant HTML redirects in the [`api/`](/api/) folder to point to the docs for the new version number.

## Contributing new documentation

If you'd like to add to this repo's Android documentation, please read [the contribution guide](/CONTRIBUTING.md) to learn how to get started.
