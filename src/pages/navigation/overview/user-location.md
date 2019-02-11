---
title: "User location"
description: Some description
products:
  - Navigation UI
  - Navigation core
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

Navigation applications often use the user's current location as the `origin` when requesting a route. With the Navigation SDK, this is done using the `LocationEngine` class. 

The Navigation SDK will create a default `LocationEngine` with `LocationEngineProvider#getBestLocationEngine` and if an engine is not passed and a default `LocationEngineRequest` with parameters suitable for navigation if a request is not passed before navigation is started. 

For detailed instructions on how to use `LocationEngine`, [see the `LocationEngine` documentation](https://docs.mapbox.com/android/core/overview/#locationengine). 


## Navigation UI options

The logic for getting user location lives in the core Navigation SDK. If you are using the Navigation UI SDK, that data will be styled and displayed in a UI component. Read about default and customization options for the Navigation UI below.

### Default

[Does it just inherit the default from the device / Android Core library? Should this include both the user location indicator on the map and in the `NavigationView`?]

### Customization

[Are there ways to customize the appearance of the user location icon (or anything else...) via the Nav UI? `navigationViewLocationLayerStyle> mapbox_gpsDrawable`? Can you point me to the appropriate place in the API ref docs to learn more?] 


## Further customization with Navigation Core

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