---
title: "China"
description: "Read official documentation on the Mapbox China Plugin for Android, which maximizes the Mapbox Maps SDK for Android's performance inside China."
prependJs:
  - "import constants from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

Traditional map services are either blocked in China or suffer from slow internet connections. Our mapbox.cn infrastructure allows for unparalleled speed advantages for anyone using our maps in China or through Chinese mobile carriers internationally. The Mapbox China Plugin for Android is built on top of the Mapbox Maps SDK for Android. The plugin automatically configures the Maps SDK to ensure that the correct Mapbox API endpoints are being called. Accurate endpoints ensure that a mobile device retrieves the correct map tiles, map styles, and other location information. Additionally, the plugin handles shifting of various GeoJSON geometries (polygons, lines, points, etc.), which ensures that data is accurately placed on the map.

## Install the China Plugin

You'll need to add the appropriate dependencies inside of your `build.gradle` file to start developing an application using the China Plugin. The plugin _does not_ include the Mapbox Maps SDK for Android, so you'll need to declare both the Maps SDK and the plugin. Releases of the China Plugin tend to follow new stable releases of the Maps SDK for Android, which happen approximately every four weeks.

### Add the dependency

1. Start Android Studio.
2. Open up your application's `build.gradle` file.
3. Make sure that your project's `minSdkVersion` is API 14 or higher.
4. Add the plugin's dependency to your application's `build.gradle` file.
5. Add the dependency for the Mapbox Maps SDK, to your application's `build.gradle` file. [More info about installing the Maps SDK](/android/maps/overview).
5. Click the **Sync Project with Gradle Files** near the toolbar in Studio.

```groovy
repositories {
  mavenCentral()
  maven { url "https://mapbox.bintray.com/mapbox" }
}

dependencies {

	// China plugin dependency
	implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-china:{{constants.CHINA_PLUGIN_VERSION }}'

	// Mapbox Maps SDK dependency
	implementation 'com.mapbox.mapboxsdk:mapbox-android-sdk:{{constants.MAP_SDK_VERSION }}'

}
```

## Shrink dependency size
Android offers solutions to reduce the release size of your APK. The first is to use [ProGuard](https://developer.android.com/studio/build/shrink-code), which removes unused classes and methods from both your app and its dependencies (including this plugin). ProGuard is included inside Android and we highly recommend following the [official documentation](https://developer.android.com/studio/build/shrink-code) to get ProGuard setup.

Another option is to drop the architectures you do not need to support for your app users. The Mapbox SDK ships with four architectures:

- `arm64-v8a`
- `armeabi-v7a`
- `x86`
- `x86_64`

All of these files add up to the resulting APK size. If, for example, your app doesn't need `x86` support, you could drop `x86` and `x86_64` to save some space. This is done using ABI Splitting, a feature that lets you build an APK file for each CPU, only containing the relevant native libraries. This process is described in the [Android Studio Project Site](http://tools.android.com/tech-docs/new-build-system/user-guide/apk-splits#TOC-ABIs-Splits). Aside from the Mapbox Maps SDK native libraries, the shift module native code will also be dropped and optionally split up if you set your project up to do so.

## Using the correct objects
The plugin has wrapper classes to be used in place of their "typical" counterparts. For example, in the Maps SDK for Android, you'd use the `MapView` inside your activities' layouts. When using this plugin, a lint error will appear telling you to use the `ChinaMapView` instead, which wraps the `MapView` object. The `ChinaMapView` class does nothing more but set default values for optimal performance inside China. This includes requesting map tiles from our Chinese servers.

In the chart below, you'll find a list of the objects you'd typically use in the Maps SDK for Android and their counterparts found inside of this plugin.

| Mapbox Maps SDK for Android | China Plugin |
| --- | --- |
| `MapView` | `ChinaMapView` |
| `SupportMapFragment` | `ChinaSupportMapFragment` |

As mentioned above, Android Lint will attempt to warn you when you are using the wrong classes. This does not occur in every instance, however, so we still recommend manually confirming that you are using the right object each time.

## China Map Styles
Mapbox currently offers three government-certified map styles for China that match the look of our equivalent Mapbox Streets, Dark, and Light styles. The China styles provide up to 10x faster map loading. You can either manually hardcode the style URL inside your app or use the provided constants found inside this plugin. The table below lists the Java constant and the actual map style URL which can be hardcoded in your app.

**You will need a special China Mapbox access token if you want to use any of our China map styles.**
_[Contact our sales team](https://www.mapbox.com/contact/sales/) to start the process of receiving this special access token._

| Java constant | URL |
| --- | --- |
| `ChinaStyle.MAPBOX_STREETS_CHINESE` | `mapbox://styles/mapbox/streets-zh-v1` |
| `ChinaStyle.MAPBOX_LIGHT_CHINESE` | `mapbox://styles/mapbox/light-zh-v1` |
| `ChinaStyle.MAPBOX_DARK_CHINESE` | `mapbox://styles/mapbox/dark-zh-v1` |

When using the constants found in this SDK, you'll always be using the latest version of the map style when the plugin gets updated. Conversely, hardcoding allows you to have more control over the map style version and determine when your apps map style gets an update.


## Shifting raw coordinates

We shift the base map for our default styles in order to comply with the Chinese government's mapping requirements. This means you are required to also shift any annotations that you place on top of your map so that they will match the shifted base map coordinate system. The plugin's shifting function will convert WGS-84 coordinates into GCJ-02 standards. We recommend reading [this wiki entry](https://en.wikipedia.org/wiki/Restrictions_on_geographic_data_in_China#The_China_GPS_shift_problem) and [this article](http://www.travelandleisure.com/articles/digital-maps-skewed-china) to better understand why shifting is required.

The plugin has a `ShiftForChina` class with the `String shift(double lon, double lat)` method. You can pass _unshifted_ longitude and latitude coordinates to the `shift()` method. The method returns a `String` that represents a JSONObject. Use this `String` of shifted coordinates to add data to your map.

{{
<CodeLanguageToggle id="shifting-coordinates" />
<ToggleableCodeBlock

java={`
String shiftedCoordinatesJson = shiftForChina.shift(unshiftedLong, unshiftedLat);

try {

  JSONObject jsonObject = new JSONObject(shiftedCoordinatesJson);

  double shiftedLongitude = jsonObject.getDouble("lon");

  double shiftedLatitude = jsonObject.getDouble("lat");

	// You now have longitude and latitude values, which you can use however you'd like.

} catch (JSONException jsonException) {
  jsonException.printStackTrace();
}
`}

kotlin={`
val shiftedCoordinatesJson = shiftForChina.shift(unshiftedLong, unshiftedLat)

try {

	val jsonObject = JSONObject(shiftedCoordinatesJson)

	val shiftedLongitude = jsonObject.getDouble("lon")

	val shiftedLatitude = jsonObject.getDouble("lat")

	// You now have longitude and latitude values, which you can use however you'd like.

} catch (jsonException: JSONException) {
	jsonException.printStackTrace()
}
`}

/>
}}

## Shifting GeoJSON data

The plugin's `ChinaMapView` class will automatically shift GeoJSON coordinates so that data is accurately displayed on China map tiles. The [Mapbox Java SDK](/android/java/overview/) includes a `CoordinateShifter` interface which is implemented by the plugin's `ChinaCoordinateShifter` class. The `ChinaCoordinateShifter` class helps apply specific coordinate shifting within the Java SDK's `Point` GeoJSON class, which then gets applied to all of the other types of GeoJSON geometries.

If your data is _already_ shifted into GCJ-02 coordinates before it is fed to the map, then make sure to use the `ChinaMapView`'s `disableGeoJsonShifting()` method before any data is given to the map. You don't want pre-shifted data to be shifted again as the map ingests it.

{{
<CodeLanguageToggle id="disable-shifting" />
<ToggleableCodeBlock

java={`
chinaMapView.disableGeoJsonShifting();
`}

kotlin={`
chinaMapView?.disableGeoJsonShifting()
`}
/>
}}

Use the `enableGeoJsonShifting(CoordinateShifter coordinateShifter)` method if you need to enable coordinate shifting. Pass in an object of a class which implements the `CoordinateShifter` interface. This could be Mapbox's `ChinaCoordinateShifter` class or a class you've created yourself. A common scenario for enabling shifting could be when shifting is disabled via `disableGeoJsonShifting()` because pre-shifted data is first added to the map. Shifting is then enabled via `enableGeoJsonShifting()` before a user is able to interact with the map to add data by tapping on the map to add a marker.

{{
<CodeLanguageToggle id="enable-shifting" />
<ToggleableCodeBlock

java={`
chinaMapView.enableGeoJsonShifting(new ChinaCoordinateShifter());
`}

kotlin={`
chinaMapView?.enableGeoJsonShifting(ChinaCoordinateShifter())
`}
/>
}}


## Shifting device location

Rather than working with raw coordinate values, the `ShiftLocation` class and its `shift` method handle `Location` objects. Showing a device's current location via [the Maps SDK's `LocationComponent`](/android/maps/overview/location-component/) is one of the most common use cases for using the `ShiftLocation` class.

[After setting up your own Mapbox `LocationEngine`](/android/core/overview/#locationengine), you'll eventually override the `onSuccess()` and `onFailure()` methods. When a new location update occurs, you'll need to manually feed the unshifted `Location` object into the `ShiftLocation` class' `shift()` method. `shift()` returns a `Location` object, which you can now use however you'd like. If you pass the shifted `Location` object to `forceLocationUpdate()`, the `LocationComponent` will place the device location "puck" in the correct location.

{{
<CodeLanguageToggle id="shifting-location" />
<ToggleableCodeBlock

java={`
// Called when the location has changed.
@Override
public void onSuccess(LocationEngineResult result) {

	Location shiftedDeviceLocation = ShiftLocation.shift(result.getLastLocation())

	locationComponent.forceLocationUpdate(shiftedDeviceLocation)

}

@Override
public void onFailure(@NonNull Exception exception) {
	// Handle failure with whatever UI you'd like

}
`}

kotlin={`
// Called when the location has changed.
override fun onSuccess(result: LocationEngineResult) {

	val shiftedDeviceLocation = ShiftLocation.shift(result?.lastLocation)

	locationComponent?.forceLocationUpdate(shiftedDeviceLocation)

}

override fun onFailure(exception: Exception) {
	// Handle failure with whatever UI you'd like

}
`}

/>
}}
