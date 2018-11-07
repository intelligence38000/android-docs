---
title: "China"
description: "Read official documentation on the Mapbox Android China Plugin which maximizes the Mapbox Maps SDK for Android's performance inside China."
prependJs:
  - |
    import {
      CHINA_PLUGIN_VERSION
    } from '../../../constants';
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';" 
---

Traditional map services are either blocked in China or suffer from slow internet connections. Our mapbox.cn infrastructure allows for unparalleled speed advantages for anyone using our maps in China or through Chinese mobile carriers internationally. This plugin specifically bundles the Mapbox Maps SDK for Android and automatically configures it to ensure the correct endpoints are being called. Accurate endpoints ensure that the mobile device retrieves the correct map tiles, map styles, and other information. Additionally, the plugin allows for annotation shifting, which ensures all your overlays and annotations are accurately depicted on the map.

## Install the China plugin

You'll need to add the appropriate dependencies inside of your `build.gradle` file to start developing an application using the China Plugin. The plugin includes the Mapbox Maps SDK for Android, so there's no need for you to declare both the Maps SDK and the plugin. Version bumps of this plugin tend to follow new stable releases of the Maps SDK for Android, which happen approximately every four weeks. The plugin's dependency below can be found on Bintray.

### Add the dependency

1. Start Android Studio.
2. Open up your application's `build.gradle` file.
3. Make sure that your project's `minSdkVersion` is API 14 or higher.
4. Add the plugin's dependency to your application's `build.gradle` file.
5. Click the **Sync Project with Gradle Files** near the toolbar in Studio.

```groovy
repositories {
  maven { url "https://mapbox.bintray.com/mapbox" }
}

dependencies {
  // China plugin dependency
  implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-china:{{ CHINA_PLUGIN_VERSION }}'
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
The China Plugin for Android has wrapper classes to be used in place of their "typical" counterparts. For example, in the regular Maps SDK for Android, you'd use the `MapView` inside your activities' layouts. When using this plugin, a lint error will appear telling you to use the `ChinaMapView` instead, which wraps the `MapView` object. Under the hood, the `ChinaMapView` class does nothing more but set default values for optimal performance inside China. This includes requesting map tiles from our Chinese servers. In the provided chart below, you'll find a list of the objects which you'd typically use in the Maps SDK for Android and their counterparts found inside of this plugin.

| Mapbox Maps SDK for Android | China Plugin |
| --- | --- |
| `MapView` | `ChinaMapView` |
| `MapboxMapOptions` | `MapboxMapChinaOptions` |

As mentioned above, Android Lint will attempt to warn you when you are using the wrong classes. This does not occur in every instance, however, so we still recommend manually confirming that you are using the right object each time.

## China Map Styles
Mapbox currently offers 3 government-certified map styles for China that match the look of our equivalent Mapbox Streets, Dark, and Light styles. The China styles provide up to 10x faster map loading. You can either manually hardcode the style URL inside your app or use the provided constants found inside this plugin. The table below lists the Java constant, XML string constant, and the actual map style URL which can be hardcoded in your app.

**You will need a special China Mapbox access token if you want to use any of our China map styles.**  
_Please fill out the form at [https://www.mapbox.cn/contact](https://www.mapbox.cn/contact/) to start the process of receiving this special access token._

| Java Constant | XML String | URL |
| --- | --- | --- |
| `ChinaStyle.MAPBOX_STREETS_CHINESE` | `mapbox_style_mapbox_streets_chinese` | `mapbox://styles/mapbox/streets-zh-v1` |
| `ChinaStyle.MAPBOX_LIGHT_CHINESE` | `mapbox_style_mapbox_dark_chinese` | `mapbox://styles/mapbox/light-zh-v1` |
| `ChinaStyle.MAPBOX_DARK_CHINESE` | `mapbox_style_mapbox_light_chinese` | `mapbox://styles/mapbox/dark-zh-v1` |

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
  
  double shiftedLong = jsonObject.getDouble("lon");

  double shiftedLat = jsonObject.getDouble("lat");
  
	// You now have longitude and latitude values, which you can use however you'd like.
  
} catch (JSONException jsonException) {
  jsonException.printStackTrace();
}
`}

kotlin={`
val shiftedCoordinatesJson = shiftForChina.shift(unshiftedLong, unshiftedLat)

try {
	
	val jsonObject = JSONObject(shiftedCoordinatesJson)
		
	val shiftedLong = jsonObject.getDouble("lon")
		
	val shiftedLat = jsonObject.getDouble("lat")
	
	// You now have longitude and latitude values, which you can use however you'd like.
	
} catch (jsonException: JSONException) {
	jsonException.printStackTrace()
}
`}

/>
}}

## Shifting location

Rather than working with raw coordinate values, the `ShiftLocation` class and its `shift` method handle `Location` objects. Showing a device's current location via [the Maps SDK's `LocationComponent`](/android-docs/maps/overview/location-component/) is one of the most common use cases for using the `ShiftLocation` class.

[After setting up your own Mapbox `LocationEngine`](/android-docs/core/overview/#locationengine), you'll eventually override the `onLocationChanged()` method. When a new location update occurs, you'll need to manually feed the unshifted `Location` object into the `ShiftLocation` class' `shift()` method. `shift()` returns a `Location` object, which you can now use however you'd like. If you pass the shifted `Location` object to `forceLocationUpdate()`, the `LocationComponent` will place the device location "puck" in the correct location.

{{
<CodeLanguageToggle id="shifting-location" />
<ToggleableCodeBlock

java={`
// Called when the location has changed.
@Override
public void onLocationChanged(Location location) {
	    
	Location shiftedDeviceLocation = ShiftLocation.shift(location);
	    
	locationComponent.forceLocationUpdate(shiftedLocation);

}

`}

kotlin={`
// Called when the location has changed.
override fun onLocationChanged(location: Location) {
	
	val shiftedDeviceLocation = ShiftLocation.shift(location)
	
	locationComponent?.forceLocationUpdate(shiftedLocation)
	    
}
`}

/>
}}