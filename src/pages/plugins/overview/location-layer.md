---
title: "Location"
description: "Offical documentation about the Mapbox Android Location Layer Plugin. Show the Android device's location on a Mapbox Map in just a few quick steps."
prependJs:
  - "import constants from '../../../constants';"
  - "import AppropriateImage from '../../../components/appropriate-image';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import { WarningNote } from '../../../components/warning-note';"
---



{{
<WarningNote title="The Mapbox Location Layer Plugin for Android has been deprecated">
    <p>Device location work is continuing in the <code>LocationComponent</code> class which is in the Mapbox Maps SDK for Android. We highly recommend that you use the Maps SDK's <code>LocationComponent</code> instead of this Location Layer Plugin. See the <a href="/android/maps/overview/location-component/">Maps SDK <code>LocationComponent</code> documentation</a>.</p>
</WarningNote>
}}

## Install the Location Layer Plugin
To start developing an application using the Location Layer Plugin, you'll need to add the appropriate dependencies inside your `build.gradle` file. This dependency includes the Maps SDK for Android. All dependencies given below can be found on MavenCentral.

If your application is close or exceeds the 65k method count limit, you can mitigate this problem by enabling ProGuard inside your application. ProGuard directives are included in the Android dependencies to preserve the required classes.

### Add the dependency

1. Start Android Studio.
2. Open up your application's `build.gradle`.
3. Make sure that your project's `minSdkVersion` is API 14 or higher.
4. Under dependencies, add a new build rule for the latest `mapbox-android-plugin-locationlayer`.
5. Click the Sync Project with Gradle Files near the toolbar in Studio.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-locationlayer:{{constants.LOCATION_LAYER_PLUGIN_VERSION }}'
}
```

### Setup permissions
Before using the location layer plugin, you'll need to include either the coarse _or_ fine location permission inside your applications manifest.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.myapp" >
  ...
  <!-- Coarse location -->
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>

  <!-- Or fine location -->
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
  ...
</manifest>
```

If your application's targeting Android 6.0 (API 23) or higher, you'll want to use the new permissions model which request permissions at runtime rather than during the installation process. It's important to request the permission either during the application startup or when the location layer gets initialized. [PermissionsManager](/android/maps/overview/#telemetry-opt-out) is a utility offered as part of the Mapbox Java SDK package inside of the Maps SDK. It streamlines the permission request process.

### Lifecycles
It's important to include the location layer `onStart()` and `onStop()` lifecycle events in their respective activity methods. This prevents memory leaks from occurring and reduces battery consumption. The plugin has support for the new `LifecycleObserver` APIs, by adding the plugin as a lifecycle observer in your activity, you won't need to handle the lifecycles manually.

## Add the location layer
You'll need to pass in both a `MapView` and `MapboxMap` object to initialize the Location Layer Plugin. Depending on whether or not you'd like the plugin to track the user's location automatically or not, you can either use a default `LocationEngine`, pass in your own or `null`.

{{
<CodeLanguageToggle id="add-location-layer" />
<ToggleableCodeBlock

java={`
// Use the default engine
LocationLayerPlugin locationLayerPlugin = new LocationLayerPlugin(mapView, mapboxMap);

// Pass in your own
LocationLayerPlugin locationLayerPlugin = new LocationLayerPlugin(mapView, mapboxMap, locationEngine);
`}

kotlin={`
// Use the default engine
val locationLayerPlugin = LocationLayerPlugin(mapView!!, mapboxMap)

// Pass in your own
val locationLayerPlugin = LocationLayerPlugin(mapView, mapboxMap, locationEngine)
`}
/>
}}

If a `null` location engine is provided, you are responsible for updating the location position manually using `LocationLayerPlugin#forceLocationUpdate(@Nullable Location location)`.

### Enabling or disabling the LocationLayerPlugin

There is a single method to either enable or disable the plugin:

- `LocationLayerPlugin#setLocationLayerEnabled(boolean isEnabled)`
- When disabled, this method will hide the icon showing the user location and cease map camera animations from occurring.
- The plugin is enabled by default.

### Showing the user location with RenderMode

`LocationLayerPlugin#setLocationLayerEnabled()` has now been replaced with `LocationLayerPlugin#setRenderMode(@RenderMode.Mode int renderMode)`.  This new method is not in charge of enabling or disabling the plugin.  If you change the render mode while the plugin is disabled, nothing will happen with regard to how the location is rendered.

There are three types of `RenderMode`:

| `RenderMode` | Description |
| --- | --- |
| `NORMAL` | This mode shows the user location, ignoring both compass and GPS bearing (no arrow rendered). |
| `COMPASS` | This mode shows the user location, as well as an arrow that is considering the compass of the device.  |
| `GPS` | This mode shows the user location with the icon bearing updated from the `Location` updates being provided to the plugin. |

**RenderMode.NORMAL**

{{
<AppropriateImage imageId="locationComponentNormalRender" className="block mx-auto pt18" />
}}

**RenderMode.COMPASS**

{{
<AppropriateImage imageId="locationComponentCompassRender" className="block mx-auto pt18" />
}}

**RenderMode.GPS**

{{
<AppropriateImage imageId="locationComponentGpsRender" className="block mx-auto pt18" />
}}

**Note:** the `Drawable` icon for `RenderMode.GPS` is highly customizable with methods such as `LocationLayerOptions#foregroundDrawable()` and `LocationLayerOptions#backgroundDrawable()`.

### Following the device location with CameraMode

The method `LocationLayerPlugin#setCameraMode(@CameraMode.Mode int cameraMode)` allows developers to track `Location` updates with the `MapboxMap` camera.
There are currently 7 modes available:
<br>

| `CameraMode` | Description |
| --- | --- |
| `NONE` | No camera tracking. |
| `NONE_COMPASS` | Camera does not track location, but does track compass bearing. |
| `NONE_GPS` | Camera does not track location, but does track GPS `Location` bearing. |
| `TRACKING` | Camera tracks the user location, no bearing is considered. |
| `TRACKING_COMPASS` | Camera tracks the user location, tracking bearing provided by the device compass. |
| `TRACKING_GPS` | Camera tracks the user location, with bearing provided by a normalized `Location#getBearing()`. |
| `TRACKING_GPS_NORTH` | Camera tracks the user location, with bearing always set to north (0). |

Here are a few examples from [the `LocationLayerModesActivity` in the plugin's test application](https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDKTestApp/src/main/java/com/mapbox/mapboxsdk/testapp/activity/location/LocationModesActivity.java):

**CameraMode.NORMAL**

{{
<AppropriateImage imageId="locationComponentNormalCamera" className="block mx-auto pt18" />
}}

**CameraMode.COMPASS**

{{
<AppropriateImage imageId="locationComponentCompassCamera" className="block mx-auto pt18" />
}}

**CameraMode.GPS**

{{
<AppropriateImage imageId="locationComponentGpsCamera" className="block mx-auto pt18" />
}}

Traditional camera transitions will be canceled when any of the camera modes, besides `CameraMode#NONE`, are engaged. Use `LocationLayerPlugin#zoomWhileTracking` and `LocationLayerPlugin#tiltWhileTracking` to manipulate the camera in a tracking state. Use these two in combination with `MapboxMap#CancelableCallback` to schedule fluid transitions.

When instantiating the location layer plugin for the first time, the map's max/min zoom levels will be set to`LocationLayerOptions#MAX_ZOOM_DEFAULT` and `LocationLayerOptions#MIN_ZOOM_DEFAULT` respectively. Adjust the zoom range with the `maxZoom()` and `minZoom()` methods in the `LocationLayerOptions` class.


### Gesture thresholds to dismiss camera tracking

The plugin is integrated with the Mapbox Gestures library. You have the option to adjust thresholds for tracking a user’s interaction with the map, and subsequently, breaking camera tracking if the threshold is exceeded:

- `LocationLayerOptions#trackingInitialMoveThreshold(float)` adjusts the minimum single pointer movement in pixels required to break camera tracking.
- `LocationLayerOptions#trackingMultiFingerMoveThreshold(float)` adjusts minimum multi pointer movement in pixels required to break camera tracking (for example during scale gesture).
- If either of these thresholds are exceeded and tracking is dismissed, developers can listen to this with a `OnCameraTrackingChangedListener`:

{{
<CodeLanguageToggle id="camera-tracking" />
<ToggleableCodeBlock

java={`
locationLayerPlugin.addOnCameraTrackingChangedListener(new OnCameraTrackingChangedListener() {
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
locationLayerPlugin.addOnCameraTrackingChangedListener(object : OnCameraTrackingChangedListener {
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

## Usage with navigation
Once a navigation session's started using the [Mapbox Navigation SDK](/android/navigation/overview/), a few adjustments will need to be made to the plugin to improve its performance and behavior.

If you plan to use the snapped location provided by the Navigation SDK, you'll need to use `locationLayerPlugin.setLocationEngine()` to `null` to prevent location coordinates that aren't snapped to update the icon's location. Instead, you'll need to add `forceLocationUpdate()` inside of the Navigation SDK's `onProgressChange()` callback, which _does_ provide the snapped location.

For more specific information and code snippets about displaying a user's location during the navigation experience, see the [Mapbox tutorial for building a navigation app for Android](https://www.mapbox.com/help/android-navigation-sdk/#display-user-location).

## Customization
The plugin allows for several customizations such as drawables, opacities, and more by passing in a style or a [LocationLayerOptions](https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDK/src/main/java/com/mapbox/mapboxsdk/location/LocationComponentOptions.java) object either while constructing the plugin or by using the provided `applyStyle()` API.

For example, if you'd like to change the location layer icon from the default blue to a red, you first generate a new icon drawable showing the change. Then add the drawable to your project and then create a new style with the `parentLayout` being `LocationLayer`. [Here is a list of all of the attributes that can be customized](/android/maps/overview/location-component/#active-styling-options).
