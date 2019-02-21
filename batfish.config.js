'use strict';

const _ = require('lodash');
const path = require('path');
const rehypeSlug = require('rehype-slug');
const mapboxAssembly = require('@mapbox/mbx-assembly');

const productPageOrder = {
  'maps/overview/': [
    'index',
    'styling-map',
    'annotations',
    'location-component',
    'data-driven-styling',
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
    'offline',
    'markerview'
  ],
  'plugins/examples/': ['index'],
  'navigation/overview/': [
    'index',
    'user-location',
    'route-generation',
    'route-progress',
    'instructions',
    'notifications',
    'milestones',
    'localization',
    'off-route',
    'faster-route',
    'offline-routing',
    'camera',
    'map-styling',
    'user-interaction',
    'map-matching'
  ],
  'java/overview/': [
    'index',
    'directions',
    'directions-matrix',
    'geocoder',
    'tilequery',
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
    siteBasePath: '/android',
    siteOrigin: 'https://docs.mapbox.com',
    browserslist: mapboxAssembly.browsersList,
    postcssPlugins: mapboxAssembly.postcssPipeline.plugins,
    outputDirectory: path.join(__dirname, '_site/'),
    temporaryDirectory: path.join(__dirname, '_site_tmp/'),
    stylesheets: [
      require.resolve('@mapbox/mbx-assembly/dist/assembly.css'),
      require.resolve('@mapbox/dr-ui/css/prism.css'),
      path.join(__dirname, './vendor/docs-page-shell/page-shell-styles.css'),
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
          'vendor/docs-page-shell/page-shell-script.js'
        )
      }
    ],
    jsxtremeMarkdownOptions: {
      wrapper: path.join(__dirname, './src/components/markdown-page-shell.js'),
      rehypePlugins: [
        rehypeSlug,
        require('@mapbox/dr-ui/plugins/add-links-to-headings'),
        require('@mapbox/dr-ui/plugins/create-sections'),
        require('@mapbox/dr-ui/plugins/make-table-scroll'),
        require('@mapbox/rehype-prism')
      ]
    }
  };

  return config;
};
