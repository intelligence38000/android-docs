---
title: User location
description: Learn how to retrieve and manager user location in the Mapbox Navigation SDK and Navigation UI SDK for Android.
products:
  - Navigation SDK
  - Navigation UI SDK
tag: fundamentals
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import AppropriateImage from '../../../components/appropriate-image'"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
---

<!--copyeditor ignore best-->

Navigation applications often use the user's current location as the `origin` when requesting a route. With the Navigation SDK, this is done using the `LocationEngine` class. By default, the Navigation SDK will use the best location engine available and display the user's location with the default styles described below. This guide walks through how to customize both the user location icon and the location engine.

{{<Note title="More on LocationEngine" imageComponent={<BookImage size="60" />}>}}
For more details on how `LocationEngine` works, [see the `LocationEngine` documentation](https://docs.mapbox.com/android/core/overview/#locationengine).
{{</Note>}}

## Navigation UI SDK

The logic for getting user location lives in the core Navigation SDK. If you are using the Navigation UI SDK, that data will be styled and displayed in a UI component. Read about default styles for the Navigation UI and where to find more information on customizing the style below.

### User location in map view

{{
<div className="grid grid--gut36 my24">
  <div className="col col--8-mm col--12">
}}
By default, the style of the user location dot that is added to the map is inherited from the default in the Mapbox Maps SDK for Android. This is a blue dot with a white stroke and a small blue triangle that shows the direction the device is facing.

You can read more about custom styling options for the user location dot in the [Maps SDK documentation](/android/maps/overview/location-component/#active-styling-options).

{{
  </div>
  <div className="col col--4-mm col--12 align-center">
    <AppropriateImage imageId="defaultUserLocation" />
  </div>
</div>
}}

### User location along route progress

{{
<div className="grid grid--gut36 my24">
  <div className="col col--8-mm col--12">
}}
There is a different icon used to show the user's location while the user is progressing along the route. By default, the user location icon during navigation is a white circle containing a blue arrow.

You can read more about custom styling options for the user location GPS icon in the [Maps SDK documentation](/android/maps/overview/location-component/#rendermode).

{{
<CodeLanguageToggle id="code-user-location-along-route-progress" />
<ToggleableCodeBlock

java={`
NavigationMapboxMap map = navigationView.retrieveNavigationMapboxMap();
map.updateLocationLayerRenderMode(RenderMode.NORMAL);
`}

kotlin={`
val map = navigationView.retrieveNavigationMapboxMap()
map?.updateLocationLayerRenderMode(RenderMode.NORMAL)
`}

/>
}}

{{
  </div>
  <div className="col col--4-mm col--12 align-center">
    <AppropriateImage imageId="defaultUserGpsIcon" />
  </div>
</div>
}}


## Customize location engine

You can set up an instance of a `LocationEngine` and pass it to the `MapboxNavigation` object. This is not required &mdash; the SDK will create a default `LocationEngine` with `LocationEngineProvider#getBestLocationEngine` if an engine is not passed before navigation is started.

{{
<CodeLanguageToggle id="nav-location-engine" />
<ToggleableCodeBlock

java={`
LocationEngine locationEngine = LocationEngineProvider.getBestLocationEngine(context);
navigation.setLocationEngine(locationEngine);
`}

kotlin={`
val locationEngine = LocationEngineProvider.getBestLocationEngine(context)
navigation.locationEngine = locationEngine
`}

/>
}}

You can also pass a `LocationEngineRequest` to `MapboxNavigation`, specifying parameters such as update frequency or preferred accuracy. This is also not required &mdash; the SDK will create a default `LocationEngineRequest` with parameters suitable for navigation if a request is not passed before navigation is started.  

{{
<CodeLanguageToggle id="nav-location-request" />
<ToggleableCodeBlock

java={`
LocationEngineRequest locationEngineRequest = new LocationEngineRequest.Builder(DEFAULT_INTERVAL_IN_MILLISECONDS)
    .setPriority(LocationEngineRequest.PRIORITY_HIGH_ACCURACY)
    .setMaxWaitTime(DEFAULT_MAX_WAIT_TIME)
    .build();

navigation.setLocationEngineRequest(locationEngineRequest);
`}

kotlin={`
val locationEngineRequest = LocationEngineRequest.Builder(DEFAULT_INTERVAL_IN_MILLISECONDS)
    .setPriority(LocationEngineRequest.PRIORITY_HIGH_ACCURACY)
    .setMaxWaitTime(DEFAULT_MAX_WAIT_TIME)
    .build()

navigation.setLocationEngineRequest(locationEngineRequest)
`}

/>
}}
