---
title: "Camera Engine"
description: "Fine grain control over the map camera during your Android app navigation experience with the Mapbox Navigation SDK for Android. Click to learn how."
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

Before you begin reading this document, you might want to begin with [the general overview and basics of the map's camera](https://mapbox.com/android-docs/maps/overview/camera/).

`MapboxNavigation` creates a `SimpleCamera` by default that you can access with the
`MapboxNavigation#getCameraEngine()` method.

`SimpleCamera` extends from `Camera` and is required to provide values for bearing,
tilt, zoom, and a target `Point` given a `RouteInformation`.

A `RouteInformation` object can be created from a `DirectionsRoute`, `Location`, or `RouteProgress`.
Depending on which objects are provided, `SimpleCamera` will return a value for each camera method:

{{
<CodeLanguageToggle id="route-info" />
<ToggleableCodeBlock

java={`
RouteInformation.create(route, location, routeProgress); 
`}

kotlin={`
RouteInformation.create(route, location, routeProgress)
`}

/>
}}


For example, if `RouteInformation` has a `Location`, the `SimpleCamera` will return the
`LocationBearing` for the camera bearing. This bearing value represents the GPS system's understanding of where the user is going:

{{
<CodeLanguageToggle id="route-bearing" />
<ToggleableCodeBlock

java={`
@Override
  public double bearing(RouteInformation routeInformation) {
    if (routeInformation.location() != null) {
      return routeInformation.location().getBearing();
    }
    return 0;
  }
`}

kotlin={`


`}

/>
}}

You can then use the returned `bearing` to update the `MapboxMap` camera:

{{
<CodeLanguageToggle id="route-camera" />
<ToggleableCodeBlock

java={`
double bearing = cameraEngine.bearing(routeInformation);
CameraPosition position = new CameraPosition.Builder()
  .bearing(bearing)
  .build();
mapboxMap.easeCamera(CameraUpdateFactory.newCameraPosition(position));
`}

kotlin={`


`}

/>
}}

## Creating a custom `Camera`
The Navigation SDK provides a `SimpleCamera` by default. You're also able to create your
own `CameraEngine` and give it to the Navigation SDK like so: `MapboxNavigation#setCameraEngine(CameraEngine cameraEngine)`.

An example of this would be the `DynamicCamera` provided by the `libandroid-navigation-ui`
library. In [`DynamicCamera`](/android-docs/navigation/overview/navigation-ui/#navigationcamera), calculations are being made based on the user's location along the given route.
