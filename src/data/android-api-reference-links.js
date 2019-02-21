import * as constants from '../constants';

export const androidApiReferenceLinks = {
  maps: [
    {
      label: 'Maps SDK for Android',
      id: 'maps',
      href: `/android/api/map-sdk/${constants.MAP_SDK_VERSION}/index.html`
    }
  ],
  plugins: [
    {
      label: 'MarkerView',
      id: 'markerview',
      href: `/android/api/plugins/markerview/${
        constants.MARKERVIEW_PLUGIN_VERSION
      }/index.html`
    },
    {
      label: 'Annotation',
      id: 'annotation',
      href: `/android/api/plugins/annotation/${
        constants.ANNOTATION_PLUGIN_VERSION
      }/index.html`
    },
    {
      label: 'Location layer',
      id: 'location',
      href: `/android/api/plugins/locationlayer/${
        constants.LOCATION_LAYER_PLUGIN_VERSION
      }/index.html`
    },
    {
      label: 'Building',
      id: 'building',
      href: `/android/api/plugins/building/${
        constants.BUILDING_PLUGIN_VERSION
      }/index.html`
    },
    {
      label: 'Places',
      id: 'places',
      href: `/android/api/plugins/places/${
        constants.PLACES_PLUGIN_VERSION
      }/index.html`
    },
    {
      label: 'Traffic',
      id: 'traffic',
      href: `/android/api/plugins/traffic/${
        constants.TRAFFIC_PLUGIN_VERSION
      }/index.html`
    },
    {
      label: 'Offline',
      id: 'offline',
      href: `/android/api/plugins/offline/${
        constants.OFFLINE_PLUGIN_VERSION
      }/index.html`
    },
    {
      label: 'Localization',
      id: 'localization',
      href: `/android/api/plugins/localization/${
        constants.LOCALIZATION_PLUGIN_VERSION
      }/index.html`
    },
    {
      label: 'China',
      id: 'china',
      href: `/android/api/plugins/china/${
        constants.CHINA_PLUGIN_VERSION
      }/china-release/index.html`
    }
  ],
  java: [
    {
      label: 'mapbox-java-core',
      id: 'java-core',
      href: `/android/api/mapbox-java/libjava-core/${
        constants.JAVA_SDK_VERSION
      }/index.html`
    },
    {
      label: 'mapbox-java-geojson',
      id: 'java-geojson',
      href: `/android/api/mapbox-java/libjava-geojson/${
        constants.JAVA_SDK_VERSION
      }/index.html`
    },
    {
      label: 'mapbox-java-turf',
      id: 'java-turf',
      href: `/android/api/mapbox-java/libjava-turf/${
        constants.JAVA_SDK_VERSION
      }/index.html`
    },
    {
      label: 'mapbox-java-services',
      id: 'java-services',
      href: `/android/api/mapbox-java/libjava-services/${
        constants.JAVA_SDK_VERSION
      }/index.html`
    }
  ],
  navigation: [
    {
      label: 'navigation',
      id: 'navigation',
      href: `/android/api/navigation-sdk/navigation/${
        constants.NAVIGATION_VERSION
      }/index.html`
    },
    {
      label: 'navigation-ui',
      id: 'navigation-ui',
      href: `/android/api/navigation-sdk/navigation-ui/${
        constants.NAVIGATION_VERSION
      }/index.html`
    }
  ],
  core: [
    {
      label: 'Core',
      id: 'core',
      href: `/android/api/telemetry/libcore/${
        constants.CORE_VERSION
      }/index.html`
    }
  ],
  vision: [
    {
      label: 'Vision',
      id: 'vision',
      href: `/android/api/vision/${constants.VISION_VERSION}/index.html`
    }
  ],
  'vision-ar': [
    {
      label: 'Vision AR',
      id: 'vision-ar',
      href: `/android/api/vision-ar/${constants.VISION_AR_VERSION}/index.html`
    }
  ]
};
