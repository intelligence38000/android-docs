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

Navigation applications often use the user's current location as the `origin` when requesting a route. With the Navigation SDK, this is done using the `LocationEngine` class. For detailed instructions on how to use this class, [see the `LocationEngine` documentation](https://docs.mapbox.com/android/core/overview/#locationengine). 

**Adding user location to your application works the same for both _Navigation UI_ and _Navigation core_.** You can set up an instance of a `LocationEngine` and pass it to the `MapboxNavigation` object. This is not required &mdash; the SDK will create a default `LocationEngine` with `LocationEngineProvider#getBestLocationEngine` if an engine is not passed before navigation is started.  

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