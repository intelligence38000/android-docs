import React from 'react';
import PropTypes from 'prop-types';
import PopoverTrigger from '@mapbox/react-popover-trigger';
import Icon from '@mapbox/mr-ui/icon';

class ApiTabDropdown extends React.PureComponent {
  render() {
    const { props } = this;
    return (
      <PopoverTrigger
        content={props.dropdownContent}
        popoverProps={{
          placement: 'bottom',
          themePopover:
            'round shadow-darken25 hmax480 scroll-auto scroll-styled px24 py12'
        }}
        respondsToHover={true}
      >
        <div className="py0">
          API reference
          <span className="color-gray-light ml6">
            <Icon name="chevron-down" inline={true} />
          </span>
          <span className="none-mm color-gray-light ml6">
            <Icon name="share" inline={true} />
          </span>
        </div>
      </PopoverTrigger>
    );
  }
}

ApiTabDropdown.propTypes = {
  dropdownContent: PropTypes.node.isRequired
};

export default ApiTabDropdown;
