'use strict';

const _ = require('lodash');
const path = require('path');
const rehypeSlug = require('rehype-slug');
const mapboxAssembly = require('@mapbox/mbx-assembly');
const makeTableScroll = require('./plugins/make-table-scroll');
const cssDir = path.join(__dirname, './src/css');

const productPageOrder = {
  'maps/overview/': [
    'index',
    'styling-map',
    'annotations',
    'location-component',
    'runtime-styling',
    'expressions',
    'clustering',
    'camera',
    'events',
    'offline',
    'query',
    'gestures',
    'snapshotter'
  ],
  'maps/examples/': ['index'],
  'maps/tutorials/': ['index'],
  'plugins/overview/': [
    'index',
    'annotation',
    'building',
    'location-layer',
    'traffic',
    'localization',
    'places',
    'china',
    'offline'
  ],
  'plugins/examples/': ['index'],
  'navigation/overview/': [
    'index',
    'milestones',
    'navigation-options',
    'navigation-ui',
    'off-route',
    'faster-route',
    'camera',
    'route-progress',
    'map-matching'
  ],
  'java/overview/': [
    'index',
    'directions-matrix',
    'geocoder',
    'optimization',
    'static-image',
    'map-matching',
    'turf'
  ],
  'java/examples/': ['index'],
  'core/overview/': ['index'],
  'vision/overview/': ['index'],
  'vision-ar/overview/': ['index']
};

module.exports = () => {
  const config = {
    siteBasePath: '/android-docs',
    siteOrigin: 'https://www.mapbox.com',
    browserslist: mapboxAssembly.browsersList,
    postcssPlugins: mapboxAssembly.postcssPipeline.plugins,
    stylesheets: [
      require.resolve('@mapbox/mbx-assembly/dist/assembly.css'),
      path.join(cssDir, 'prism.css'),
      path.join(__dirname, './vendor/dotcom-page-shell/page-shell-styles.css'),
      path.join(__dirname, './src/css/site.css'),
      require.resolve('@mapbox/dr-ui/css/docs-prose.css')
    ],
    dataSelectors: {
      platform: function() {
        return 'Android';
      },
      // Returns a dictionary for looking up ordered array of pages by product id
      // (slug).
      orderedPages: data => {
        const pages = data.pages.map(p => ({
          title: p.frontMatter.title,
          path: p.path
        }));
        const result = _.reduce(
          productPageOrder,
          (reduced, order, prefix) => {
            reduced[prefix] = order.map(item => {
              return pages.find(p => {
                const urlEnding = item === 'index' ? '' : `${item}/`;
                return new RegExp(`${prefix}${urlEnding}$`).test(p.path);
              });
            });
            return reduced;
          },
          {}
        );
        return result;
      },
      listExamples: data => {
        const examples = data.pages
          .filter(page => {
            return /\/examples\/+./.exec(page.path);
          })
          .map(example => {
            return {
              path: example.path,
              title: example.frontMatter.title,
              description: example.frontMatter.description,
              topic: example.frontMatter.topic,
              image: example.frontMatter.thumbnail
            };
          });
        return examples;
      },
      listSubfolders: data => {
        const folders = data.pages
          .filter(file => {
            return file.path.split('/').length === 5;
          })
          .map(folder => {
            return folder;
          });
        return folders;
      }
    },
    webpackLoaders: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@mapbox/svg-react-transformer-loader',
            options: {
              template: 'fancy'
            }
          }
        ]
      }
    ],
    babelPlugins: [require('babel-plugin-lodash')],
    applicationWrapperPath: path.join(
      __dirname,
      'src/components/application-wrapper.js'
    ),
    vendorModules: ['@mapbox/appropriate-images-react', 'array-find'],
    inlineJs: [
      {
        filename: path.join(
          __dirname,
          'vendor/dotcom-page-shell/page-shell-script.js'
        )
      }
    ],
    jsxtremeMarkdownOptions: {
      wrapper: path.join(__dirname, './src/components/markdown-page-shell.js'),
      rehypePlugins: [
        rehypeSlug,
        require('@mapbox/dr-ui/plugins/add-links-to-headings'),
        makeTableScroll,
        require('@mapbox/rehype-prism')
      ]
    }
  };

  return config;
};
