---
title: "Camera"
description: "Information about map camera behavior in the Mapbox Maps SDK for Android. Updating the camera position. Restricting the camera. It's all covered inside."
prependJs:
  - "import { Floater } from '../../../components/floater';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

The Maps SDK's maps are represented as a flat plane using a [Mercator projection](https://en.wikipedia.org/wiki/Mercator_projection). On the east-west-axis, the map seamlessly wraps around on itself an infinite amount of times. Because the bottom and the top of the map could infinitely grow larger and further distort the map towards the poles, the north-south-axis gets cut off around the 90 degrees north and 90 degrees south. With this in mind, the camera object's introduced to represent the user's viewpoint above the map.

By default, the camera can be tilted, rotated, zoomed, and/or moved either by the user or developer. It's important to know that the camera object will not make any changes to markers, layer's sources, or other annotations that you've added without you directly influencing this behavior.

A few camera event listeners are provided in the Maps SDK to notify when, for example, the camera's adjusted. You can read more about these listeners inside the [Events documentation](https://www.mapbox.com/android-docs/map-sdk/overview/events/#camera-change-events).

## Camera position

The Maps SDK includes a `CameraPosition` class which comprises of the camera's target, angle, zoom, and tilt. These APIs shape the user's perspective of the map tile(s).

A `CameraPosition` object can change a single property of the camera object such as the zoom, or it can change multiple properties at the same time. For example, you could write code to have the camera change its target, zoom out, **and** tilt _all at the same time_:

{{
<CodeLanguageToggle id="camera-position" />
<ToggleableCodeBlock

java={`
CameraPosition position = new CameraPosition.Builder()
          .target(new LatLng(51.50550, -0.07520)) // Sets the new camera position
          .zoom(10) // Sets the zoom to level 10
          .tilt(20) // Set the camera tilt to 20 degrees
          .build(); // Builds the CameraPosition object from the builder
`}

kotlin={`
val position = new CameraPosition.Builder()
          .target(new LatLng(51.50550, -0.07520)) // Sets the new camera position
          .zoom(10) // Sets the zoom to level 10
          .tilt(20) // Set the camera tilt to 20 degrees
          .build(); // Builds the CameraPosition object from the builder
`}

/>
}}

Read all about [mapView XML attributes](https://www.mapbox.com/android-docs/map-sdk/overview/#mapview-xml-attributes) to learn about setting the camera's initial position. It's best to either set the initial camera position in XML or through `MapboxMapOptions` to prevent unnecessary downloading of map tiles using up your user's data.

### Target

The target is a single latitude and longitude coordinate that the camera centers itself on. Changing the camera's target will move the camera to the inputted coordinates. The target is a `LatLng` object. The target coordinate is always _at the center of the viewport_.

### Tilt

Tilt is the camera's angle from the nadir (directly facing the Earth) and uses unit degrees. The camera's minimum (default) tilt is 0 degrees, and the maximum tilt is 60. Tilt levels use six decimal point of precision, which enables you to restrict/set/lock a map's bearing with extreme precision.

The map camera tilt can also adjust by placing two fingertips on the map and moving both fingers up and down in parallel at the same time or

### Bearing

Bearing represents the direction that the camera is pointing in and measured in degrees _clockwise from north_.

The camera's default bearing is 0 degrees (i.e. "true north") causing the map compass to hide until the camera bearing becomes a non-zero value. [The `mapbox_uiCompass` boolean XML attribute](https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDK/src/main/res/values/attrs.xml#L45) allows adjustment of the compass' visibility. Bearing levels use six decimal point precision, which enables you to restrict/set/lock a map's bearing with extreme precision. In addition to programmatically adjusting the camera bearing, the user can place two fingertips on the map and rotate their fingers.

### Zoom

Zoom controls the scale of the map and consumes any value between 0 and 22. At zoom level 0, the viewport shows continents and other world features. A middle value of 11 will show city level details, and at a higher zoom level, the map will begin to show buildings and points of interest. The camera can zoom in the following ways:

- Pinch motion two fingers _to zoom in and out_.
- Quickly tap twice on the map with a single finger _to zoom in_.
- Quickly tap twice on the map with a single finger and hold your finger down on the screen after the second tap. Then slide the finger up _to zoom out_ and down _to zoom out_.

Check out [this Mapbox blogpost](https://www.mapbox.com/blog/designing-maps-for-mobile-devices/) about the art/science of maps and visual information to ensure your map style shows the right data at the correct camera positions.

## Update the camera position

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/camera/AnimateMapCameraActivity.java"
    title="Animate the map camera"
    category="example"
    text="Change the camera target, bearing, zoom, and tilt by animating the camera."
  />
}}

The `MapboxMap` class in the Maps SDK has several methods to change the camera's position. Each camera movement API takes in a `CameraUpdate` (built using `CameraUpdateFactory`) which is how you provide the new camera position information. Camera update factory can build several different `CameraUpdate` objects including a `newLatLngZoom()`, `zoomBy()`, `newLatLngBounds()`, and several more. One particularly interesting `CameraUpdate` is `newCameraPosition()` which is how you'd pass in a built `CameraPosition`.

Aside from consuming a Camera Update object, a cancelable callback can be added to know when the animation finishes or if the user cancels the camera move by performing a gesture on the map. The ease and animate APIs have an optional duration parameter (in milliseconds) that lets you control the camera's animation duration.

| API | Description |
| --- | --- |
| `moveCamera()` | Repositions the camera according to the instructions defined in the update and moves the camera instantaneous. It's recommended to avoid this API in favor of either the ease or animate camera APIs which will provide more context to your users where on the map the camera is positioning itself. |
| `easeCamera()` | Gradually move the camera by the default duration, the zoom will not be affected unless specified within CameraUpdate. If you plan to have the map camera track the current user as they move this is the correct API to use since one of the parameters can be set to false, Disabling the animation interpolator and resulting in a linear ease animation. |
| `animateCamera()` | Animate the camera to a new location defined within CameraUpdate using a transition animation that evokes powered flight. |


## Get the current camera position

The `MapboxMap` class' `getCameraPosition()` method makes it easy for your code to understand what is going on with your map's camera and what the user's currently viewing. The method returns a `CameraPosition` object, and once you have the object, you can easily get and use the camera's target, tilt, zoom, and bearing values. For example, `mapboxMap.getCameraPosition().zoom` is how you would get the camera's zoom value.

## Center the camera within a map area

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/camera/BoundingBoxCameraActivity.java"
    title="Center the camera"
    category="example"
    text="Adjust the camera position to fit a bounding box within the viewport."
  />
}}

Similar to how a camera can be restricted to a region (see below), the camera can also center within a map area. First you'll need a defined `LatLngBounds` object which includes at least two coordinates. You'll then be able to update the camera position using the available `newLatLngBounds()` API which takes your bounding box and adjust the viewport so the specified region will be within view. Besides the bounding box being passed into the camera update factory, you will also need to provide an integer value defining the padding between the edge of the screen and the actual bounded region. You also have the option to provide different padding values for each side of the box.

{{
<CodeLanguageToggle id="lat-lng-bounds" />
<ToggleableCodeBlock

java={`
LatLngBounds latLngBounds = new LatLngBounds.Builder()
                    .include(first marker position)
                    .include(second marker position)
                    .build();

mapboxMap.animateCamera(CameraUpdateFactory.newLatLngBounds(latLngBounds, 10));          
`}

kotlin={`
val latLngBounds = LatLngBounds.Builder()
                .include(first marker position)
                .include(second marker position)
                .build()
mapboxMap.animateCamera(CameraUpdateFactory.newLatLngBounds(latLngBounds, 10));

`}

/>
}}

## Restricting the user's panning to a given area

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/camera/RestrictCameraActivity.java"
    title="Restrict Camera movement"
    category="example"
    text="Limit the map movement to within a region using a bounding box."
  />
}}

The `setLatLngBoundsForCameraTarget` method in the `MapboxMap` class can limit the map camera to any area of the world that you'd like. If you feed the `LatLngBounds` object a minimum of two `LatLng` objects/coordinates, a _invisible_ square will automatically be created restricting the camera to the region.


## Camera and device location

If you'd like to learn more about camera control and its role in your project's user interface experience, make sure to read about [the camera options that the Mapbox Location Layer Plugin for Android provides](https://www.mapbox.com/android-docs/plugins/overview/location-layer/#showing-the-user-location-with-rendermode
).