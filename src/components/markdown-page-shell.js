import React from 'react';
import PropTypes from 'prop-types';
import PageShell from './page-shell';
import Icon from '@mapbox/mr-ui/icon';

class MarkdownPageshell extends React.Component {
  render() {
    let productInfo = null;
    if (this.props.frontMatter.products) {
      const products = ['Navigation SDK', 'Navigation UI SDK'].map((p, i) => {
        return (
          <div key={i}>
            <span
              className={
                this.props.frontMatter.products.indexOf(p) > -1
                  ? 'color-green'
                  : 'color-red-faint'
              }
            >
              <Icon
                name={
                  this.props.frontMatter.products.indexOf(p) > -1
                    ? 'check'
                    : 'close'
                }
                inline={true}
              />
            </span>
            <span
              className={
                this.props.frontMatter.products.indexOf(p) > -1
                  ? 'color-gray-dark'
                  : 'color-gray-light'
              }
            >
              {p}
            </span>
          </div>
        );
      });
      productInfo = (
        <div className="mt0-mm mt60 pt0-mm pt24 pb24 mb24 border-b border--gray-light">
          <div className="flex-parent flex-parent--start-cross">
            <div className="flex-child mr12 txt-bold">SDKs covered:</div>
            <div className="flex-child">{products}</div>
          </div>
        </div>
      );
    }

    return (
      <PageShell {...this.props}>
        <div className="prose">
          {this.props.frontMatter.title !== 'Introduction' ? (
            <h1 className="txt-fancy">{this.props.frontMatter.title}</h1>
          ) : (
            ''
          )}
          {productInfo !== null ? productInfo : ''}
          {this.props.children}
        </div>
      </PageShell>
    );
  }
}

MarkdownPageshell.propTypes = {
  frontMatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    topic: PropTypes.oneOf([
      'Getting started',
      'Dynamic styling',
      'Data visualization',
      'Extrusions',
      'Add markers and infoWindows to the map',
      'User interaction',
      'Add features to a map',
      'Set a map style',
      'Image generation',
      'Offline',
      'Notifications'
    ]),
    headings: PropTypes.arrayOf(
      PropTypes.shape({
        level: PropTypes.number.isRequired,
        slug: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    )
  }).isRequired
};

export default MarkdownPageshell;
