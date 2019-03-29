import React from 'react';
import PropTypes from 'prop-types';
import ExamplesPage from '@mapbox/dr-ui/examples-page';
import CardContainer from '@mapbox/dr-ui/card-container';
import Card from '@mapbox/dr-ui/card';
import PageShell from './page-shell';
import { getTopics } from '../util/get-topics';
import listExamples from '@mapbox/batfish/data/list-examples';
import AppropriateImage from './appropriate-image';

class AndroidExamplesPage extends React.PureComponent {
  static propTypes = {
    frontMatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const examplesByProduct = listExamples.filter(example => {
      return example.path.indexOf(this.props.frontMatter.product) > -1;
    });
    let uniqueCategories = getTopics(examplesByProduct).filter(category => {
      return category.title !== 'Getting started';
    });
    uniqueCategories.unshift({
      title: 'Getting started',
      path: '#getting-started'
    });

    const renderedCardContainers = uniqueCategories.map(topic => {
      const cardsForTopic = examplesByProduct
        .filter(example => {
          return example.topic === topic.title;
        })
        .map((example, index) => {
          let exampleImage = <div className="bg-blue-faint w-full h120" />;
          if (/http/.test(example.image)) {
            exampleImage = (
              <div
                className="w-full h120"
                style={{
                  backgroundImage: `url(${example.image})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
              />
            );
          } else if (example.image !== null) {
            exampleImage = (
              <AppropriateImage
                imageId={example.image}
                style={{ borderRadius: '4px' }}
                background={true}
              />
            );
          }
          return (
            <Card
              key={index}
              title={example.title}
              description={example.description}
              path={example.path}
              thumbnail={exampleImage}
            />
          );
        });
      return (
        <CardContainer
          title={topic.title}
          path={topic.path}
          fullWidthCards={false}
          cards={cardsForTopic}
        />
      );
    });

    return (
      <PageShell frontMatter={this.props.frontMatter}>
        <ExamplesPage
          frontMatter={this.props.frontMatter}
          cardContainers={renderedCardContainers}
        />
      </PageShell>
    );
  }
}

export default AndroidExamplesPage;
