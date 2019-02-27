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
git clone --recursive https://github.com/mapbox/android-docs.git
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

The test suite will lint JavaScript as well as run remark-linters that lint markdown files.

The remark-linters perform the following tasks:
- check for [broken links](https://github.com/mapbox/remark-lint-mapbox/tree/master/link-checker)
- [validate the frontmatter](https://github.com/mapbox/remark-lint-mapbox/tree/master/frontmatter) on each page
- check for [non-descriptive link text](https://github.com/mapbox/remark-lint-link-text)

If the linters log an error or warning to the console, follow the guidance from the test to fix it.

## Contributing new documentation

If you'd like to add to this repo's Android documentation, please read [the contribution guide](/CONTRIBUTING.md) to learn how to get started.
