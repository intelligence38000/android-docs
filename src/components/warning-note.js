import React from 'react';
import PropTypes from 'prop-types';
import Note from '@mapbox/dr-ui/note';
import WarningImage from '@mapbox/dr-ui/warning-image';

class WarningNote extends React.Component {
  render() {
    const { props } = this;
    return (
      <Note
        title={props.title ? props.title : 'Warning'}
        theme="warning"
        imageComponent={<WarningImage color="orange" size="60" />}
      >
        {props.children}
      </Note>
    );
  }
}

WarningNote.propTypes = {
  children: PropTypes.node.isRequired
};

export { WarningNote };
