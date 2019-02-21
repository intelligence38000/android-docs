import React from 'react';
import PropTypes from 'prop-types';
import BookImage from '@mapbox/dr-ui/book-image';
import Note from '@mapbox/dr-ui/note';

class DocNote extends React.Component {
  render() {
    const { props } = this;
    return (
      <Note imageComponent={<BookImage size="60" />}>{props.children}</Note>
    );
  }
}

DocNote.propTypes = {
  children: PropTypes.node.isRequired
};

export { DocNote };
