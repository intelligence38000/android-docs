import React from 'react';
import PropTypes from 'prop-types';
import PageShell from './page-shell';
import ExamplesPage from '@mapbox/dr-ui/examples-page';
import CardContainer from '@mapbox/dr-ui/card-container';
import Card from '@mapbox/dr-ui/card';
import { RelatedHelpPages } from '../data/related-help-pages.js';

class HelpPage extends React.PureComponent {
  static propTypes = {
    frontMatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired
    }).isRequired
  };
  render() {
    const { props } = this;
    const allSections = RelatedHelpPages.map(section => {
      return {
        title: section.title,
        path: section.path
      };
    });
    const renderedCardContainers = allSections.map(section => {
      const guidesForSection = RelatedHelpPages.filter(group => {
        if (group.path === section.path) {
          return group.guides;
        }
      });
      const cardsForSection = guidesForSection[0].guides
        .filter(guide => {
          return guide.products.indexOf(props.frontMatter.product) > -1;
        })
        .map((guide, index) => {
          return (
            <Card
              key={index}
              title={guide.title}
              description={guide.description}
              path={guide.path}
            />
          );
        });
      if (cardsForSection.length > 0) {
        return (
          <CardContainer
            title={section.title}
            path={`#${section.path}`}
            fullWidthCards={true}
            cards={cardsForSection}
          />
        );
      }
    });
    return (
      <PageShell {...this.props}>
        <p className="txt-l mb30">
          Our Help page contains tutorials, troubleshooting guides, and other
          resources to help you get started.
        </p>
        <ExamplesPage
          frontMatter={this.props.frontMatter}
          cardContainers={renderedCardContainers}
        />
      </PageShell>
    );

    // const helpSections = RelatedHelpPages.map((section, index) => {
    //   return (
    //     <HelpSection
    //       key={index}
    //       path={section.path}
    //       title={section.title}
    //       description={section.description}
    //       guides={section.guides}
    //       product={this.props.frontMatter.product}
    //     />
    //   );
    // });
    // return (
    //   <PageShell frontMatter={this.props.frontMatter}>
    //     <div className="txt-l">
    //       Our Help page contains tutorials, troubleshooting guides, and other
    //       resources to help you get started.
    //     </div>
    //     {helpSections}
    //   </PageShell>
    // );
  }
}

export default HelpPage;
