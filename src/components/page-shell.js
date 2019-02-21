import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withLocation } from '@mapbox/batfish/modules/with-location';
import ReactPageShell from '../../vendor/docs-page-shell/react-page-shell.js';
import { routeToPrefixed } from '@mapbox/batfish/modules/route-to';
import Icon from '@mapbox/mr-ui/icon';
// dr-ui components
import TopbarSticker from '@mapbox/dr-ui/topbar-sticker';
import BackToTopButton from '@mapbox/dr-ui/back-to-top-button';
import ProductMenu from '@mapbox/dr-ui/product-menu/product-menu';
import PageLayout from '@mapbox/dr-ui/page-layout';
import NavigationAccordion from '@mapbox/dr-ui/navigation-accordion';
import SectionedNavigation from '@mapbox/dr-ui/sectioned-navigation';
// util functions
import { getTopics } from '../util/get-topics';
// data
import { RelatedHelpPages } from '../data/related-help-pages';
import { productNames } from '../data/product-names';
import listExamples from '@mapbox/batfish/data/list-examples';
import orderedPages from '@mapbox/batfish/data/ordered-pages';
import TopNavTabs from './top-nav-tabs';

class PageShell extends React.Component {
  static propTypes = {
    frontMatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      product: PropTypes.string
    }).isRequired,
    children: PropTypes.node.isRequired,
    // From withLocation
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    headings: PropTypes.arrayOf(
      PropTypes.shape({
        level: PropTypes.number.isRequired,
        slug: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    )
  };

  componentDidMount() {
    // initialize analytics
    if (window && window.initializeMapboxAnalytics) {
      window.initializeMapboxAnalytics();
    }
  }

  render() {
    const { frontMatter, location, children } = this.props;
    const meta = this.props.meta || {};
    if (!meta.title && frontMatter.title) {
      meta.title = frontMatter.title;
    }
    if (!meta.description && frontMatter.description) {
      meta.description = frontMatter.description;
    }
    if (!meta.pathname) {
      meta.pathname = location.pathname;
    }

    const normalizedPathname = /\/$/.test(location.pathname)
      ? this.props.location.pathname
      : `${this.props.location.pathname}/`;
    const baseUrl = location.pathname.split('/')[1];
    const checkBaseUrl = new RegExp(`/${baseUrl}/([^/]+/)([^/]+/)`);
    const pathPrefixMatch = checkBaseUrl.exec(normalizedPathname);
    if (!pathPrefixMatch) {
      throw new Error(`No subnav known for ${location.pathname}`);
    }

    const product = location.pathname.split('/')[2];
    const activeTab = location.pathname.split('/')[3];
    const activeTabProper =
      activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

    let pageNavigation = '';
    let pageNavigationNarrowStick = false;
    if (activeTab === 'overview') {
      const parseHeadings = arr => {
        return arr.map((heading, index) => {
          return {
            level: heading.level,
            text: heading.text,
            slug: heading.slug,
            order: index
          };
        });
      };

      const orderedHeadings = this.props.frontMatter.headings
        ? parseHeadings(this.props.frontMatter.headings)
        : parseHeadings(this.props.headings);

      const topLevelHeadings = orderedHeadings.filter(h => h.level === 2);
      const secondLevelItems = topLevelHeadings.map((h2, index) => {
        const nextH2 = topLevelHeadings[index + 1];
        return {
          title: h2.text,
          path: h2.slug,
          thirdLevelItems: orderedHeadings
            .filter(
              f =>
                f.level === 3 &&
                f.order > h2.order &&
                (nextH2 ? f.order < nextH2.order : true)
            )
            .map(h3 => {
              return {
                title: h3.text.replace(/i2157|i2860/, ''),
                path: h3.slug
              };
            })
        };
      });
      pageNavigation = (
        <div className="mx0-mm ml-neg24 mr-neg36 relative-mm absolute right left">
          <NavigationAccordion
            currentPath={location.pathname}
            contents={{
              firstLevelItems:
                orderedPages[pathPrefixMatch[1] + pathPrefixMatch[2]],
              secondLevelItems: secondLevelItems || null
            }}
            onDropdownChange={value => {
              routeToPrefixed(value);
            }}
          />
        </div>
      );
    } else {
      let sections = [];
      if (activeTab === 'examples') {
        const allTopics = getTopics(listExamples);
        const examplesByProduct = listExamples.filter(example => {
          return example.path.indexOf(product) > -1;
        });
        sections = allTopics
          .map(topic => {
            const examplesForTopic = examplesByProduct
              .filter(example => {
                return example.topic === topic.title;
              })
              .map(example => {
                return {
                  text: example.title,
                  url: example.path
                };
              });
            return {
              title: topic.title,
              url: `/android/${product}/examples/${topic.path}`,
              items: examplesForTopic
            };
          })
          .filter(topic => {
            return topic.items.length > 0;
          });
      } else if (activeTab === 'help') {
        const allSections = RelatedHelpPages.map(section => {
          return {
            title: section.title,
            path: section.path
          };
        });
        sections = allSections
          .map(section => {
            const guidesForSection = RelatedHelpPages.filter(group => {
              if (section.path === group.path) {
                return group.guides;
              }
            });
            const items = guidesForSection[0].guides
              .filter(guide => {
                return guide.products.indexOf(product) > -1;
              })
              .map(guide => {
                return {
                  text: guide.title,
                  url: guide.path
                };
              });
            return {
              title: section.title,
              url: `#${section.path}`,
              items: items
            };
          })
          .filter(section => {
            return section.items.length > 0;
          });
      }
      pageNavigation = (
        <div className="ml36 mr12">
          <SectionedNavigation
            hideSubItems={
              frontMatter.title === 'Examples' || frontMatter.title === 'Help'
            }
            sections={sections}
          />
        </div>
      );
    }

    // Determine what to display as the title
    let renderedTitle = '';
    if (frontMatter.title === 'Introduction') {
      renderedTitle = <div className="mt0-mm mt60" />;
    } else if (
      frontMatter.title === 'Examples' ||
      frontMatter.title === 'Help'
    ) {
      renderedTitle = (
        <h1 className="txt-h1 txt-fancy mt0-mm mt60 pt0-mm pt24 pb24">
          {frontMatter.title}
        </h1>
      );
    } else {
      const products = ['Navigation SDK', 'Navigation UI SDK'].map(p => {
        return (
          <div>
            <span
              className={
                frontMatter.products.indexOf(p) > -1
                  ? 'color-green'
                  : 'color-red-faint'
              }
            >
              <Icon
                name={frontMatter.products.indexOf(p) > -1 ? 'check' : 'close'}
                inline={true}
              />
            </span>
            <span
              className={
                frontMatter.products.indexOf(p) > -1
                  ? 'color-gray-dark'
                  : 'color-gray-light'
              }
            >
              {p}
            </span>
          </div>
        );
      });
      renderedTitle = (
        <div className="mt0-mm mt60 pt0-mm pt24 pb24 mb24 border-b border--gray-light">
          <h1 className="txt-h1 txt-fancy">{frontMatter.title}</h1>
          <div className="mt12">
            <div className="flex-parent flex-parent--start-cross">
              <div className="flex-child mr12 txt-bold">Products covered:</div>
              <div className="flex-child">{products}</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <ReactPageShell {...this.props} meta={meta} darkHeaderText={true}>
        <Helmet>
          <link
            rel="canonical"
            href={`https://docs.mapbox.com${meta.pathname}`}
          />
        </Helmet>
        <div className="shell-header-buffer" />
        <TopbarSticker>
          <div className="limiter">
            <div className="grid grid--gut36 mr-neg36 mr0-mm">
              <div className="col col--4-mm col--12">
                <div className="ml24 pt12">
                  <ProductMenu
                    productName={productNames[product]}
                    homePage="/android/"
                  />
                </div>
              </div>
              <div className="col col--8-mm col--12">
                <TopNavTabs product={product} activeTab={activeTab} />
              </div>
            </div>
          </div>
        </TopbarSticker>
        <div className="limiter">
          <PageLayout
            sidebarTitle={<div className="ml36">{activeTabProper}</div>}
            sidebarContent={pageNavigation}
            sidebarContentStickyTop={60}
            sidebarContentStickyTopNarrow={0}
            currentPath={location.pathname}
            sidebarStackedOnNarrowScreens={pageNavigationNarrowStick}
          >
            <React.Fragment>{renderedTitle}</React.Fragment>
            {children}
            <div className="fixed block none-mm mx24 my24 z5 bottom right">
              <BackToTopButton />
            </div>
          </PageLayout>
        </div>
      </ReactPageShell>
    );
  }
}

export default withLocation(PageShell);
