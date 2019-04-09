---
title: Map camera
description: Fine grain control over the map camera during your Android app navigation experience with the Mapbox Navigation SDK for Android. Click to learn how.
products:
  - Navigation SDK
  - Navigation UI SDK
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
contentType: guide
---

The Navigation SDK provides control over the map camera throughout the navigation app experience. This guide provides instructions on how to set the map camera using `NavigationView` and `MapboxNavigation`. You can find more details on how the map camera works in the [Maps SDK for Android documentation](/android/maps/overview/camera/).

## Navigation UI SDK

Using the Navigation UI SDK, you can specify the initial camera position and update the camera position as the user progresses along the route or when the user interacts with the UI.

### Set the initial camera position

You can initialize the `NavigationView` with a `CameraPosition` of your choice. This way, the `MapView` does not need to zoom in to the initial `Location` of the device from the world view.

{{
<CodeLanguageToggle id="initialize-camera-position" />
<ToggleableCodeBlock

java={`
CameraPosition initialPosition = new CameraPosition.Builder()
      .target(new LatLng(ORIGIN.latitude(), ORIGIN.longitude()))
      .zoom(INITIAL_ZOOM)
      .build();

navigationView.initialize(this, initialPosition);
`}

kotlin={`
val initialPosition = CameraPosition.Builder()
      .target(LatLng(ORIGIN.latitude(), ORIGIN.longitude()))
      .zoom(INITIAL_ZOOM)
      .build()

navigationView.initialize(this, initialPosition)
`}
/>
}}

### Update the camera position

Driven by `DynamicCamera` engine, the `NavigationCamera` holds all the logic needed to drive a `MapboxMap` camera that reacts and adjusts to the current progress along a `DirectionsRoute`.

To create an instance of `NavigationCamera`, you need a `MapboxMap`, `MapboxNavigation`, and `LocationComponent` object:

{{
<CodeLanguageToggle id="nav-map-camera" />
<ToggleableCodeBlock

java={`
NavigationCamera camera = new NavigationCamera(mapboxMap, mapboxNavigation, locationComponent);
}
`}

kotlin={`
val camera = NavigationCamera(mapboxMap, mapboxNavigation, locationComponent)
`}
/>
}}


Calling `NavigationCamera#start(DirectionsRoute route)` will begin an animation to the start of the `DirectionsRoute` you provided:

{{
<CodeLanguageToggle id="camera-start" />
<ToggleableCodeBlock

java={`
camera.start(directionsRoute);
}
`}

kotlin={`
camera.start(directionsRoute)
`}
/>
}}

The `NavigationCamera` has two tracking modes: `NAVIGATION_TRACKING_MODE_GPS` and `NAVIGATION_TRACKING_MODE_NORTH`. They offer two different behaviors. `MODE_GPS` follows the `Location` updates from the device based on the values provided by `DynamicCamera`. `MODE_NORTH` does the same, but with a bearing that is always zero, so the camera will always be pointed north. To adjust these, use:

{{
<CodeLanguageToggle id="camera-tracking-mode" />
<ToggleableCodeBlock

java={`
camera.updateCameraTrackingMode(NavigationCamera.NAVIGATION_TRACKING_MODE_NORTH);
}
`}

kotlin={`
camera.updateCameraTrackingMode(NavigationCamera.NAVIGATION_TRACKING_MODE_NORTH)
`}
/>
}}

`NavigationCamera#showRouteOverview(int[] padding)` will also adjust the camera to the bounds of the `DirectionsRoute` being traveled along with the given padding which is passed.  

`NavigationCamera#resetCameraPositonWith(NAVIGATION_TRACKING_MODE_GPS)` will reset the camera to the last known position update and will resume tracking of future updates with the mode you pass - in this case, tracking will resume with GPS tracking.  


## Custom camera engine

The Navigation SDK provides a `SimpleCamera` by default. You're also able to create your own `CameraEngine` and give it to the Navigation SDK like so: `MapboxNavigation#setCameraEngine(CameraEngine cameraEngine)`.

{{<Note title="Example" imageComponent={<BookImage size="60" />}>}}
The `DynamicCamera` provided by the `libandroid-navigation-ui` library (described above) is an example of a custom `CameraEngine`. In [`DynamicCamera`](/android/navigation/overview/navigation-ui/#navigationcamera), calculations are being made based on the user's location along the given route.
{{</Note>}}

`MapboxNavigation` creates a `SimpleCamera` by default that you can access with the `MapboxNavigation#getCameraEngine()` method. `SimpleCamera` extends from `Camera` and is required to provide values for bearing, tilt, zoom, and a target `Point` given a `RouteInformation`.

A `RouteInformation` object can be created from a `DirectionsRoute`, `Location`, or `RouteProgress`. Depending on which objects are provided, `SimpleCamera` will return a value for each camera method:

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


For example, if `RouteInformation` has a `DirectionsRoute`, the `SimpleCamera` will return the `List` of `Point`s based on the route geometry for `Camera#overview(RouteInformation routeInformation)`:

{{
<CodeLanguageToggle id="route-bearing" />
<ToggleableCodeBlock

java={`
public List<Point> overview(RouteInformation routeInformation) {
  ...
  if (invalidCoordinates) {
    buildRouteCoordinatesFromRouteData(routeInformation);
  }
  return routeCoordinates;
}
`}

kotlin={`
fun overview(routeInformation: RouteInformation): List<Point>? {
  if (invalidCoordinates) {
      buildRouteCoordinatesFromRouteData(routeInformation)
  }
  return routeCoordinates
}
`}

/>
}}

You can then use the returned `List` to update the `MapboxMap` camera.  In this case, you can use the list to build a `LatLngBounds` that the camera will move to include:

{{
<CodeLanguageToggle id="route-camera" />
<ToggleableCodeBlock

java={`
Camera cameraEngine = navigation.getCameraEngine();

List<Point> routePoints = cameraEngine.overview(routeInformation);

LatLngBounds routeBounds = ...

CameraUpdateFactory.newLatLngBounds(routeBounds, padding[0], padding[1], padding[2], padding[3]);

mapboxMap.easeCamera(CameraUpdateFactory.newCameraPosition(position));
`}

kotlin={`
val cameraEngine = navigation.getCameraEngine()

val routePoints = cameraEngine.overview(routeInformation)

val routeBounds: LatLngBounds

CameraUpdateFactory.newLatLngBounds(routeBounds, padding[0], padding[1], padding[2], padding[3])

mapboxMap.easeCamera(CameraUpdateFactory.newCameraPosition(position))
`}

/>
}}
