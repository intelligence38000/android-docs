---
title: "Faster-Route Detection"
description: "Faster-route detection in the Mapbox Navigation SDK for Android. Read all about it in this official Mapbox documentation."
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

Similar to off-route detection, a default faster-route detection class is included inside the Navigation SDK. This class checks each location update as well as the progress along the current route to determine if a new route should be retrieved.  

The default logic in `FasterRouteDetector` checks for a faster `DirectionsRoute` every two minutes, only if:
- The current route duration remaining is more than 600 seconds
- The current step duration remaining is more than 70 seconds

A new `DirectionsRoute` retrieved is considered faster if:
- The upcoming step is the same as the current upcoming step
- The first step of the new route is more than 70 seconds in duration
- It is at least 10 percent faster than the duration remaining of the current route  

### Creating custom logic for fetching a faster route

If you would like to provide your own logic to replace the default logic above,
you can do so by subclassing `FasterRoute` and passing your class to `MapboxNavigation`
with `MapboxNavigation##setFasterRouteEngine(FasterRoute)`.
- `FasterRoute#shouldCheckFasterRoute(Location, RouteProgress)` will determine when a new `DirectionsResponse` should be retrieved by the `RouteEngine`
     - This method will be called every time the Navigation SDK gets a `Location` update from the `LocationEngine`
- `FasterRoute#isFasterRoute(DirectionsResponse, RouteProgress)` will be used to determine if the route retrieved is faster than the one that's currently being navigated
     - This method will be called every time a response is received from the `RouteEngine`

Fetching faster routes is _disabled_ by default in the Navigation SDK. To enable either the default logic or your own custom logic, you can create a `MapboxNavigationOptions` object and set `MapboxNavigationOptions#enableFasterRouteDetection(boolean);` to true. `MapboxNavigationOptions` is then passed into the constructor of `MapboxNavigation`.

### Add the `FasterRouteListener`

Finally, you are able to listen to the retrieval of a faster `DirectionsRoute` with
`FasterRouteListener`.  This listener will fire if a new route is retrieved and meets the
given criteria of `FasterRoute#isFasterRoute`.

{{
<CodeLanguageToggle id="building-plugin" />
<ToggleableCodeBlock

java={`
navigation.addFasterRouteListener(new FasterRouteListener() {
  @Override
  public void fasterRouteFound(DirectionsRoute directionsRoute) {
    // Update MapboxNavigation here
    navigation.startNavigation(directionsRoute);
  }
});
`}

kotlin={`
navigation?.addFasterRouteListener { directionsRoute ->
// Update MapboxNavigation here
navigation.startNavigation(directionsRoute)
}    
`}

/>
}}
