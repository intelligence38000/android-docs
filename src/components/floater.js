import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mapbox/react-icon';

export class Floater extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.oneOf([
      'example',
      'guide',
      'tutorial',
      'help',
      'playground'
    ]).isRequired,
    text: PropTypes.string.isRequired,
    clear: PropTypes.bool
  };

  render() {
    const { props } = this;
    let categoryClasses = 'ml3 txt-xs txt-bold txt-uppercase px6 round';
    if (props.category === 'example') {
      categoryClasses += ' color-blue bg-blue-faint';
    } else if (props.category === 'guide') {
      categoryClasses += ' color-purple bg-purple-faint';
    } else if (props.category === 'tutorial') {
      categoryClasses += ' color-red bg-red-faint';
    } else {
      // help
      categoryClasses += ' color-green bg-green-faint';
    }
    return (
      <div>
        <div className="fr-mm ml24-mm my12 mt6-mm mb6-mm w240-mm">
          <a href={props.url} className="unprose block color-blue-on-hover">
            <div className="border round border--gray-light flex-parent flex-parent--stretch-cross">
              <div className="flex-child flex-child--grow px12 py12">
                <div className="flex-parent">
                  <div className="flex-child">
                    <div className="txt-s txt-bold">{props.title}</div>
                  </div>
                  <div className="flex-child">
                    <div className={categoryClasses} style={{ marginTop: 2 }}>
                      {props.category}
                    </div>
                  </div>
                </div>
                <div className="txt-s mt3 color-gray">{props.text}</div>
              </div>
              <div className="flex-child flex-child--no-shrink w18 border-l border--gray-light flex-parent flex-parent--center-cross">
                <Icon name="chevron-right" themeIcon="icon--l" />
              </div>
            </div>
          </a>
        </div>
        {props.clear ? <div className="clearfix" /> : ''}
      </div>
    );
  }
}
