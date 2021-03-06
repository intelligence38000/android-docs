---
title: "Showing device location"
description: "Showing device location with the Mapbox Maps SDK for Android."
prependJs:
  - "import constants from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import AppropriateImage from '../../../components/appropriate-image';"
  - "import { DocNote } from '../../../components/note';"
  - "import { Floater } from '../../../components/floater';"

---

Showing the user's current location as a map annotation is a popular and often critical feature of location-based apps. The Maps SDK's `LocationComponent` makes use of the Maps SDK's [runtime styling capabilities](/android/maps/overview/data-driven-styling/) to display the device location icon within the map itself rather than on top as an Android view. Mapbox map layers and layer styling give you precise control over how you show a device's location on the map.

{{
<DocNote>
    <p>This <code>LocationComponent</code> has replaced the now-deprecated Location Layer Plugin. The <code>LocationComponent</code> is integrated into the Maps SDK for Android so that you don't need to add additional dependencies. It brings the same set of functionality that you were used to with the plugin.</p>
</DocNote>
}}

## Requesting location permissions

You'll need to request the Android-system location permission before using the `LocationComponent`. If you build your Android project targeting API level 23 or higher your application will need to request permissions during runtime. Handling this directly in your activity produces boilerplate code and can often be hard to manage. [Read more about using the Mapbox Core Library for Android's `PermissionsManager`](/android/core/overview/#permissionsmanager) class.

## Customization

The `LocationComponent` can be customized in many different ways. You can set the image drawables, opacities, colors, and more. [See a full list of XML attributes for styling the `LocationComponent` via XML](https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDK/src/main/res-public/values/public.xml#L109-L154). [The `LocationComponentOptions` class](https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDK/src/main/java/com/mapbox/mapboxsdk/location/LocationComponentOptions.java) can be used if you prefer to customize the `LocationComponent` programatically. Create a [LocationComponentOptions](https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDK/src/main/java/com/mapbox/mapboxsdk/location/LocationComponentOptions.java) object and then use whichever `LocationComponentOptions.builder()`'s various methods you'd like. Then use the built `LocationComponentOptions` object as parameter in `LocationComponentActivationOptions#locationComponentOptions()` or by passing it through as a parameter of the `LocationComponent#applyStyle()` method at a later time.

{{
<CodeLanguageToggle id="location-component-customization" />
<ToggleableCodeBlock
 java={`
LocationComponentOptions locationComponentOptions = LocationComponentOptions.builder(this)
	.layerBelow(layerId)
	.foregroundDrawable(R.drawable.drawable_name)
	.bearingTintColor(int color)
	.accuracyAlpha(float)
	.build();

LocationComponentActivationOptions locationComponentActivationOptions = LocationComponentActivationOptions
	.builder(this, style)
	.locationComponentOptions(locationComponentOptions)
	.build();

locationComponent = mapboxMap.getLocationComponent();
locationComponent.activateLocationComponent(locationComponentActivationOptions);
`}
 kotlin={`
val locationComponentOptions = LocationComponentOptions.builder(this)
	.layerBelow(layerId)
	.foregroundDrawable(R.drawable.drawable_name)
	.bearingTintColor(int color)
	.accuracyAlpha(float)
	.build()

val locationComponentActivationOptions = LocationComponentActivationOptions
	.builder(this, style)
	.locationComponentOptions(locationComponentOptions)
	.build()

locationComponent = mapboxMap.locationComponent
locationComponent.activateLocationComponent(locationComponentActivationOptions)
`}
 />
}}

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/location/LocationComponentOptionsActivity.java"
    title="Customizing device location"
    category="example"
    text="Use LocationComponent options to style the device location icon."
    clear={true}
  />
}}

### Active styling options

{{
<AppropriateImage imageId="locationComponentActive" className="block mx-auto pt18 wmax300" />
}}

| XML Option | Explanation |
| --- | --- |
| mapbox_foregroundDrawable | Drawable image which would replace the dark blue circle |
| mapbox_foregroundTintColor | The dark blue circle |
| mapbox_backgroundDrawable | Drawable image which would replace the white circle  |
| mapbox_backgroundTintColor | White circle |
| mapbox_bearingDrawable | Drawable image which would replace the blue arrow point |
| mapbox_bearingTintColor | Blue arrow point |
| mapbox_navigationDrawable | Drawable image used for the navigation state icon  |
| mapbox_accuracyAlpha | The larger light blue circle surrounding the device location icon   |
| mapbox_accuracyColor | Color of the larger light blue circle surrounding the device location icon   |
| mapbox_elevation | The amount of space between the map and the device location icon. The elevation will adjust the size of the shadow as seen underneath the white circle   |
| mapbox_compassAnimationEnabled | Enable or disable smooth animation of compass values for the blue arrow point |
| mapbox_accuracyAnimationEnabled | Enable or disable smooth animation of the larger light blue accuracy circle surrounding the device location icon |

### Stale styling options

{{
<AppropriateImage imageId="locationComponentStale" className="block mx-auto pt18 wmax300" />
}}

| XML Option | Explanation |
| --- | --- |
| mapbox_foregroundDrawableStale | Drawable image which would replace the grey circle |
| mapbox_foregroundStaleTintColor | Grey circle |
| mapbox_backgroundDrawableStale | White circle underneath the grey circle |
| mapbox_backgroundStaleTintColor | Drawable image which would replace the white circle |

## Activating

`MapboxMap#getLocationComponent()` fetches the component and `LocationComponent#activateLocationComponent()` activates it.

The `activateLocationComponent()` method requires a built `LocationComponentActivationOptions` class. The `LocationComponentActivationOptions` class offers a convenient way to set activation options such as whether to use the default `LocationEngine` or [a built `LocationComponentOptions` object](/android/maps/overview/location-component/#customization).


Create a `LocationComponentActivationOptions` class with the builder pattern that is provided to you via the Maps SDK.

{{
<CodeLanguageToggle id="location-component-activation-option-building" />
<ToggleableCodeBlock
 java={`
LocationComponentActivationOptions locationComponentActivationOptions = LocationComponentActivationOptions
  .builder(this, style)
  .locationComponentOptions(locationComponentOptions)
  .useDefaultLocationEngine(true)
  .build();
`}
 kotlin={`
 val locationComponentActivationOptions = LocationComponentActivationOptions
  .builder(this, style)
  .locationComponentOptions(locationComponentOptions)
  .useDefaultLocationEngine(true)
  .build()
`}
 />
}}

Retrieve and activate the `LocationComponent` once the user has granted location permission **and** the map has fully loaded.

{{
<CodeLanguageToggle id="location-component-activation" />
<ToggleableCodeBlock
 java={`
@Override
public void onMapReady(@NonNull MapboxMap mapboxMap) {

	mapboxMap.setStyle(Style.MAPBOX_STREETS, new Style.OnStyleLoaded() {
      @Override
      public void onStyleLoaded(@NonNull Style style) {

        enableLocationComponent();

      }
	});
}

@SuppressWarnings( {"MissingPermission"})
private void enableLocationComponent() {

	// Check if permissions are enabled and if not request
	if (PermissionsManager.areLocationPermissionsGranted(this)) {

		// Get an instance of the component
		LocationComponent locationComponent = mapboxMap.getLocationComponent();

		// Activate with a built LocationComponentActivationOptions object
		locationComponent.activateLocationComponent(LocationComponentActivationOptions.builder(this, style).build());

		// Enable to make component visible
		locationComponent.setLocationComponentEnabled(true);

		// Set the component's camera mode
		locationComponent.setCameraMode(CameraMode.TRACKING);

		// Set the component's render mode
		locationComponent.setRenderMode(RenderMode.COMPASS);

	} else {

		permissionsManager = new PermissionsManager(this);

		permissionsManager.requestLocationPermissions(this);

	}
}

`}
 kotlin={`

override fun onMapReady(mapboxMap: MapboxMap) {

	mapboxMap.setStyle(Style.MAPBOX_STREETS) {

		style -> enableLocationComponent()

	}
}

@SuppressWarnings("MissingPermission")
private fun enableLocationComponent() {

	// Check if permissions are enabled and if not request
	if (PermissionsManager.areLocationPermissionsGranted(this)) {

		// Get an instance of the component
		val locationComponent = mapboxMap?.locationComponent

		// Activate with a built LocationComponentActivationOptions object
		locationComponent?.activateLocationComponent(LocationComponentActivationOptions.builder(this, style).build())

		// Enable to make component visible
		locationComponent?.isLocationComponentEnabled = true

		// Set the component's camera mode
		locationComponent?.cameraMode = CameraMode.TRACKING

		// Set the component's render mode
		locationComponent?.renderMode = RenderMode.COMPASS

	} else {

		permissionsManager = PermissionsManager(this)

		permissionsManager?.requestLocationPermissions(this)

	}
}
`}
 />
}}

{{
  <Floater
    url="https://docs.mapbox.com/android/maps/examples/show-a-users-location/"
    title="Showing device location"
    category="example"
    text="Add the device's location to the map."
    clear={true}
  />
}}

## Visibility

There is a single method to either enable or disable the `LocationComponent`'s visibility after activation. The `setLocationComponentEnabled()` method requires a `true`/`false` boolean parameter. When set to `false`, this method will hide the device location icon and stop map camera animations from occurring.

{{
<CodeLanguageToggle id="location-component-visibility" />
<ToggleableCodeBlock
 java={`
locationComponent.setLocationComponentEnabled(true);
`}
 kotlin={`
locationComponent.isLocationComponentEnabled = true
`}
 />
}}

### Active styling options:

{{
<AppropriateImage imageId="locationComponentActive" className="block mx-auto pt18 wmax300" />
}}

| XML Option | Explanation |
| --- | --- |
| mapbox_foregroundDrawable | Drawable image which would replace the dark blue circle |
| mapbox_foregroundTintColor | The dark blue circle |
| mapbox_backgroundDrawable | Drawable image which would replace the white circle  |
| mapbox_backgroundTintColor | White circle |
| mapbox_bearingDrawable | Drawable image which would replace the blue arrow point |
| mapbox_bearingTintColor | Blue arrow point |
| mapbox_navigationDrawable | Drawable image used for the navigation state icon  |
| mapbox_accuracyAlpha | The larger light blue circle surrounding the device location icon   |
| mapbox_accuracyColor | Color of the larger light blue circle surrounding the device location icon   |
| mapbox_elevation | The amount of space between the map and the device location icon. The elevation will adjust the size of the shadow as seen underneath the white circle   |
| mapbox_compassAnimationEnabled | Enable or disable smooth animation of compass values for the blue arrow point |
| mapbox_accuracyAnimationEnabled | Enable or disable smooth animation of the larger light blue accuracy circle surrounding the device location icon |

### Stale styling options:

{{
<AppropriateImage imageId="locationComponentStale" className="block mx-auto pt18 wmax300" />
}}

| XML Option | Explanation |
| --- | --- |
| mapbox_foregroundDrawableStale | Drawable image which would replace the grey circle |
| mapbox_foregroundStaleTintColor | Grey circle |
| mapbox_backgroundDrawableStale | White circle underneath the grey circle |
| mapbox_backgroundStaleTintColor | Drawable image which would replace the white circle |


## `RenderMode`

The `RenderMode` class contains preset options for the device location image.

{{
<CodeLanguageToggle id="location-component-render-mode" />
<ToggleableCodeBlock
 java={`
locationComponent.setRenderMode(RenderMode.NORMAL);
`}
 kotlin={`
locationComponent?.renderMode = RenderMode.NORMAL
`}
 />
}}

There are three types of `RenderMode` options:

| `RenderMode` | Description |
| --- | --- |
| `NORMAL` | This mode shows the device location, ignoring both compass and GPS bearing (no arrow rendered). {{<AppropriateImage imageId="locationComponentNormalRender" className="block mx-auto pt18" />}} |
| `COMPASS` | This mode shows the device location, as well as an arrow that is considering the compass of the device. {{<AppropriateImage imageId="locationComponentCompassRender" className="block mx-auto pt18" />}} |
| `GPS` | This mode shows the device location with the icon bearing updated from the `Location` updates being provided to the `LocationComponent`. {{<AppropriateImage imageId="locationComponentGpsRender" className="block mx-auto pt18" />}} |

{{
<DocNote>
    <p>The actual device location icon is highly customizable with methods such as <code> LocationComponentOptions#foregroundDrawable()</code> and <code> LocationComponentOptions#backgroundDrawable()</code>.</p>
</DocNote>
}}


## `CameraMode`

The method `LocationComponent#setCameraMode(@CameraMode.Mode int cameraMode)` allows developers to set specific camera tracking instructions as the device location changes.

{{
<CodeLanguageToggle id="location-component-camera-mode" />
<ToggleableCodeBlock
 java={`
locationComponent.setCameraMode(CameraMode.TRACKING);
`}
 kotlin={`
locationComponent?.cameraMode = CameraMode.TRACKING
`}
 />
}}

There are 7 `CameraMode` options available:

| `CameraMode` | Description |
| --- | --- |
| `NONE` | No camera tracking. |
| `NONE_COMPASS` | Camera does not track location, but does track compass bearing. |
| `NONE_GPS` | Camera does not track location, but does track GPS `Location` bearing. |
| `TRACKING` | Camera tracks the device location, no bearing is considered. |
| `TRACKING_COMPASS` | Camera tracks the device location, tracking bearing provided by the device compass. |
| `TRACKING_GPS` | Camera tracks the device location, with bearing provided by a normalized `Location#getBearing()`. |
| `TRACKING_GPS_NORTH` | Camera tracks the device location, with bearing always set to north (0). |


Here are a few examples from [the `LocationModesActivity` in the Maps SDK's test application](https://github.com/mapbox/mapbox-gl-native/tree/master/platform/android/MapboxGLAndroidSDKTestApp/src/main/java/com/mapbox/mapboxsdk/testapp/activity/location):

**CameraMode.NORMAL**

{{
<AppropriateImage
    imageId="locationComponentNormalCamera"
    alt="screenshot of a the normal location layer mode on an Android device"
    className="block mx-auto wmax300"
/>
}}

**CameraMode.COMPASS**

{{
<AppropriateImage
    imageId="locationComponentCompassCamera"
    alt="screenshot of a the compass location layer mode on an Android device"
    className="block mx-auto wmax300"
/>
}}

**CameraMode.GPS**

{{
<AppropriateImage
    imageId="locationComponentGpsCamera"
    alt="screenshot of a the GPS location layer mode on an Android device"
    className="block mx-auto wmax300"
/>
}}


Traditional camera transitions will be canceled when any of the camera modes, besides `CameraMode#NONE`, are engaged. Use `LocationComponent#zoomWhileTracking` and `LocationComponent#tiltWhileTracking` to manipulate the camera in a tracking state. Use these two in combination with traditional camera transitions and `MapboxMap#CancelableCallback` to schedule fluid transitions.

When instantiating the `LocationComponent` for the first time, the map's max/min zoom levels will be set to`LocationComponentOptions#MAX_ZOOM_DEFAULT` and `LocationComponentOptions#MIN_ZOOM_DEFAULT` respectively. Adjust the zoom range with the `LocationComponentOptions#maxZoom()` and `LocationComponentOptions#minZoom()` methods in the `LocationComponentOptions` class.


## Gesture thresholds while camera tracking

The `LocationComponent` is integrated with [the Mapbox Gestures for Android library](https://docs.mapbox.com/android/maps/overview/gestures/). The component will adjust the camera's focal point and increase thresholds to enable camera manipulation, like zooming in and out, without breaking tracking. Enabling this feature is explicitly opt-in because it overwrites custom gestures detection implementation set with `MapboxMap#setGesturesManager(AndroidGesturesManager, boolean, boolean)`.

To enable the feature use `LocationComponentOptions#trackingGesturesManagement(boolean)`.

You can adjust thresholds that need to be exceeded to break the tracking for one pointer gestures (like panning the map, double-tap to zoom in) and multi-pointer gestures (like scale gesture, two-tap to zoom out):
- `LocationComponentOptions#trackingInitialMoveThreshold(float)` adjusts the minimum single pointer movement in pixels required to break camera tracking.
- `LocationComponentOptions#trackingMultiFingerMoveThreshold(float)` adjusts minimum multi pointer movement in pixels required to break camera tracking (for example during scale gesture).
- If either of these thresholds are exceeded and tracking is dismissed, developers can listen to this with a `OnCameraTrackingChangedListener`:

{{
<CodeLanguageToggle id="location-component-gestures" />
<ToggleableCodeBlock
 java={`
LocationComponent locationComponent = mapboxMap.getLocationComponent();

locationComponent.addOnCameraTrackingChangedListener(new OnCameraTrackingChangedListener() {
    @Override
    public void onCameraTrackingDismissed() {
      // Tracking has been dismissed


    }

    @Override
    public void onCameraTrackingChanged(int currentMode) {
      // CameraMode has been updated


    }
});
`}
 kotlin={`
val locationComponent = mapboxMap?.locationComponent

locationComponent.addOnCameraTrackingChangedListener(object : OnCameraTrackingChangedListener {
	override fun onCameraTrackingDismissed() {
	    // Tracking has been dismissed

	}

	override fun onCameraTrackingChanged(currentMode: Int) {
	    // CameraMode has been updated

	}
})
`}
 />
}}
