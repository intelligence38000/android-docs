import React from 'react';
import PropTypes from 'prop-types';
import CodeSnippet from '@mapbox/react-code-snippet';
import { highlightCodeSnippet } from '../util/highlight-code-snippet';
import { AppContext } from '../context.js';

const highlightTheme = require('raw-loader!@mapbox/dr-ui/css/prism.css');

export default class OtherCodeBlock extends React.Component {
  static propTypes = {
    java: PropTypes.string.isRequired,
    kotlin: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.unconnectedCodeBlock = this.unconnectedCodeBlock.bind(this);
    let prefLanguage = 'java';
    if (prefLanguage !== 'java' && prefLanguage !== 'kotlin') {
      prefLanguage = 'java';
    }
    this.state = {
      toggleValue: prefLanguage
    };
  }

  unconnectedCodeBlock = context => {
    let code = null;
    if (context.preferredLanguage === 'java') {
      code = this.props.java;
    } else if (context.preferredLanguage === 'kotlin') {
      code = this.props.kotlin;
    }

    code = code.replace(
      /(MAPBOX_ACCESS_TOKEN|ACCESS_TOKEN)/g,
      context.userAccessToken || 'YOUR_MAPBOX_ACCESS_TOKEN'
    );
    return (
      <div className="unprose mb12">
        <CodeSnippet
          style={{ background: '#273d56' }}
          code={code}
          highlightedCode={highlightCodeSnippet(code)}
          maxHeight={480}
          highlightThemeCss={highlightTheme}
          onCopy={
            (/*value*/) => {
              /* console.log(value)*/
            }
          }
        />
      </div>
    );
  };

  render() {
    return (
      <AppContext.Consumer>{this.unconnectedCodeBlock}</AppContext.Consumer>
    );
  }
}
