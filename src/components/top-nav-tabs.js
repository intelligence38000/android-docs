import React from 'react';
import PropTypes from 'prop-types';
import TabList from '@mapbox/mr-ui/tab-list';
import ApiTabDropdown from './api-dropdown';
import { listTabs } from '../util/list-tabs';
import listSubfolders from '@mapbox/batfish/data/list-subfolders';
import {
  androidApiReferenceLinks,
  latestStableVersion
} from '../data/android-api-reference-links';
import constants from '../constants';
import _ from 'lodash';

class TopNavTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 641
    };
  }

  componentDidMount() {
    this.throttledHandleWindowResize();
    window.addEventListener('resize', this.throttledHandleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledHandleWindowResize);
  }

  throttledHandleWindowResize = _.throttle(() => {
    this.setState({
      width: document.body.clientWidth
    });
  }, 200);
  render() {
    const { props } = this;

    const config = {
      // MAPS DROPDOWN
      maps: {
        dropdownItems: androidApiReferenceLinks[props.product].map(
          (link, index) => {
            return (
              <li key={index}>
                <a
                  href={link.href}
                  className={
                    link.label === latestStableVersion[props.product]
                      ? 'link--blue link txt-bold'
                      : 'link link--gray'
                  }
                >
                  {link.label}
                  {link.label === latestStableVersion[props.product] ? (
                    <span> &mdash; latest stable</span>
                  ) : (
                    ''
                  )}
                </a>
              </li>
            );
          }
        ),
        apiDropdownMenu: [
          {
            label: 'API reference',
            id: 'api',
            href: `/ios/api/map-sdk/${constants.MAP_SDK_VERSION}`
          }
        ]
      },
      // NAVIGATION DROPDOWN
      navigation: {
        dropdownItems: androidApiReferenceLinks[props.product].map(
          (link, index) => {
            return (
              <li
                className={
                  link.label === latestStableVersion[props.product]
                    ? 'txt-bold'
                    : 'mt12'
                }
                key={index}
              >
                <span className="block">
                  {link.label}{' '}
                  {link.label === latestStableVersion[props.product] ? (
                    <span> &mdash; latest stable</span>
                  ) : (
                    ''
                  )}{' '}
                </span>
                <a
                  className={`${
                    link.label === latestStableVersion[props.product]
                      ? 'link--blue'
                      : 'link--gray'
                  } link block`}
                  href={`/android/api/navigation-sdk/navigation/${
                    link.label
                  }/index.html`}
                >
                  navigation
                </a>
                <a
                  className={`${
                    link.label === latestStableVersion[props.product]
                      ? 'link--blue'
                      : 'link--gray'
                  } link block`}
                  href={`/android/api/navigation-sdk/navigation-ui/${
                    link.label
                  }/index.html`}
                >
                  navigation-ui
                </a>
              </li>
            );
          }
        ),
        apiDropdownMenu: [
          {
            label: 'API reference (navigation)',
            id: 'api',
            href: `/ios/api/navigation/${constants.NAVIGATION_VERSION}`
          },
          {
            label: 'API reference (navigation-ui)',
            id: 'api',
            href: `/ios/api/navigation-ui/${constants.NAVIGATION_VERSION}`
          }
        ]
      },
      // DEFAULT DROPDOWN
      default: {
        dropdownItems: androidApiReferenceLinks[props.product].map(
          (link, index) => {
            return (
              <li key={index}>
                <a className="link link--gray" href={link.href}>
                  {link.label}
                </a>
              </li>
            );
          }
        ),
        apiDropdownMenu: androidApiReferenceLinks[props.product].map(item => {
          return {
            label: item.label,
            id: item.id,
            href: item.href
          };
        })
      }
    };

    const dropdownItems = config[props.product]
      ? config[props.product].dropdownItems
      : config['default'].dropdownItems;

    let apiDropdownMenu = [];
    if (dropdownItems.length > 1) {
      if (this.state.width > 640) {
        apiDropdownMenu = [
          {
            label: (
              <ApiTabDropdown dropdownContent={<ul>{dropdownItems}</ul>} />
            ),
            id: 'api',
            href: '#'
          }
        ];
      } else {
        apiDropdownMenu = config[props.product]
          ? config[props.product].apiDropdownMenu
          : config['default'].apiDropdownMenu;
        if (!config[props.product]) {
          apiDropdownMenu.unshift({
            label: 'API reference',
            id: 'api',
            href: '#',
            disabled: true
          });
        }
      }
    } else {
      apiDropdownMenu = [
        {
          label: 'API reference',
          id: 'api',
          href: androidApiReferenceLinks[props.product][0].href
        }
      ];
    }

    // Determine the contents and style of the TopNavTabs
    const allTabs = listTabs(props.product, listSubfolders, apiDropdownMenu);
    return <TabList items={allTabs} activeItem={props.activeTab} />;
  }
}

TopNavTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired
};

export default TopNavTabs;
