import React from 'react';
import PropTypes from 'prop-types';
import { withLocation } from '@mapbox/batfish/modules/with-location';
import ReactPageShell from '../../vendor/dotcom-page-shell/react-page-shell.js';
import { routeToPrefixed } from '@mapbox/batfish/modules/route-to';
// dr-ui components
import TopbarSticker from '@mapbox/dr-ui/topbar-sticker';
import BackToTopButton from '@mapbox/dr-ui/back-to-top-button';
import ProductMenu from '@mapbox/dr-ui/product-menu/product-menu';
import ProductMenuDropdown from '@mapbox/dr-ui/product-menu-dropdown';
import { ProductMenuItems } from '@mapbox/dr-ui/data/product-menu-items';
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
      pageNavigationNarrowStick = true;
      const secondLevelItems = frontMatter.headings
        .filter(heading => {
          return heading.level === 2;
        })
        .map(h2 => {
          return {
            title: h2.text,
            path: h2.slug
          };
        });
      pageNavigation = (
        <div className="mx0-mm ml-neg24 mr-neg36 relative-mm absolute right left">
          <NavigationAccordion
            currentPath={location.pathname}
            contents={{
              firstLevelItems:
                orderedPages[pathPrefixMatch[1] + pathPrefixMatch[2]],
              secondLevelItems: secondLevelItems
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
              url: topic.path,
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
          <SectionedNavigation sections={sections} />
        </div>
      );
    }

    // Determine what to display as the title
    let renderedTitle = '';
    if (frontMatter.title === 'Introduction') {
      renderedTitle = <div className="mt0-mm mt60" />;
    } else {
      renderedTitle = (
        <h1 className="txt-h1 txt-fancy mt0-mm mt60 pt0-mm pt24 pb24">
          {frontMatter.title}
        </h1>
      );
    }

    return (
      <ReactPageShell {...this.props} meta={meta} darkHeaderText={true}>
        <div className="shell-header-buffer" />
        <TopbarSticker>
          <div className="limiter">
            <div className="grid grid--gut36 mr-neg36 mr0-mm">
              <div className="col col--4-mm col--12">
                <div className="ml24 pt12">
                  <ProductMenu productName={productNames[product]}>
                    <ProductMenuDropdown categories={ProductMenuItems} />
                  </ProductMenu>
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
            {renderedTitle}
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
