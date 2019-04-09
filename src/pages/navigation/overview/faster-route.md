---
title: Faster-route detection
description: Faster-route detection in the Mapbox Navigation SDK for Android. Read all about it in this official Mapbox documentation.
products:
  - Navigation SDK
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
contentType: guide
language:
- Java
- Kotlin
---

The Navigation SDK includes a faster-route detection class. This class checks each location update as well as the progress along the current route to determine if a new route should be retrieved.

Fetching faster routes is _disabled_ by default in the Navigation SDK. To enable either the default logic or your own custom logic, you can create a `MapboxNavigationOptions` object and set `MapboxNavigationOptions#enableFasterRouteDetection(boolean);` to true. `MapboxNavigationOptions` is then passed into the constructor of `MapboxNavigation`.

{{<Note title="Faster-route detection and the Navigation UI SDK" imageComponent={<BookImage size="60" />}>}}
This guide does not describe any specific options in the Navigation UI SDK. You need to enable faster-route detection using the core Navigation SDK directly.
{{</Note>}}

## Default faster-route detection

After enabling faster-route detection, the default logic in `FasterRouteDetector` checks for a faster `DirectionsRoute` every two minutes, only if both of the following conditions are true:

- The current route duration remaining is more than 600 seconds
- The current step duration remaining is more than 70 seconds

When a new `DirectionsRoute` is retrieved, it is considered faster if all the following conditions are true:

- The upcoming step is the same as the current upcoming step
- The first step of the new route is more than 70 seconds in duration
- It is at least 10 percent faster than the duration remaining of the current route  

## `FasterRouteListener`

You are able to listen to the retrieval of a faster `DirectionsRoute` with `FasterRouteListener`. This listener will fire if a new route is retrieved and meets the given criteria of `FasterRoute#isFasterRoute`.

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

## Custom logic for fetching faster routes

If you would like to provide your own logic to replace the default logic above, you can do so by subclassing `FasterRoute` and passing your class to `MapboxNavigation` with `MapboxNavigation#setFasterRouteEngine(FasterRoute)`.

### When to check for a faster route

`FasterRoute#shouldCheckFasterRoute(Location, RouteProgress)` will determine when a new `DirectionsResponse` should be retrieved by the `RouteEngine`. This method will be called every time the Navigation SDK gets a `Location` update from the `LocationEngine`.

### What qualifies as a faster route

`FasterRoute#isFasterRoute(DirectionsResponse, RouteProgress)` will be used to determine if the route retrieved is faster than the one that's being navigated. This method will be called every time a response is received from the `RouteEngine`.
