---
title: "Traffic"
description: "Discover how to display real-time road traffic on your Android map with the Mapbox Android Traffic Plugin. All it requires is two lines of code."
prependJs:
  - "import constants from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"    
---

The Mapbox Traffic Plugin adds a real-time traffic layer to any Mapbox base map. If you want to display a traffic layer inside your application, you only need to include the dependency in your project and initialize the plugin. Various shades of colors show the congestion level for any given part of a road segment. If there's not enough traffic data available for a given road, then the plugin will not show road information.

Like other plugins, a third optional parameter in the traffic plugin's constructor which is useful for specifying the layer in which you want the traffic to display below. If the layer ID's missing in the third parameter, the plugin will try to place the traffic below all symbol layers so that text and icons on the map are still visible on top of the traffic lines. It is always a good idea to pass in a string ID rather than relying on the Plugin to try to place the traffic below a symbol layer since it isn't guaranteed to work properly.

## Install the Traffic Plugin
To start developing an application using the Traffic Plugin, you'll need to add the appropriate dependencies inside your `build.gradle` file. This dependency includes the Maps SDK for Android. You can find all dependencies given on MavenCentral.

If your application is close or exceeds the 65k method count limit, you can mitigate this problem by enabling ProGuard inside your application. ProGuard directives are included in the Android dependencies to preserve the required classes.

### Add the dependency

1. Start Android Studio.
2. Open up your application's `build.gradle`.
3. Make sure that your project's `minSdkVersion` is API 14 or higher.
4. Under dependencies, add a new build rule for the latest `mapbox-android-plugin-traffic`.
5. Click the Sync Project with Gradle Files near the toolbar in Studio.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-traffic-v7:{{constants.TRAFFIC_PLUGIN_VERSION }}'
}
```

## Add traffic
Since the Traffic Plugin requires the `mapboxMap` object, it's necessary to initialize the plugin either inside `onMapReady` (recommended) or in another place you know the `mapboxMap` will not be null. Once initialized, `trafficPlugin.setVisibility()` to true will enable the traffic. You can use `isVisible()` which returns a boolean true if the traffic's visible, otherwise false.

{{
<CodeLanguageToggle id="traffic" />
<ToggleableCodeBlock

java={`
@Override
public void onMapReady(MapboxMap mapboxMap) {
  TrafficPlugin trafficPlugin = new TrafficPlugin(mapView, mapboxMap);
  trafficPlugin.setVisibility(true); // Enable the traffic view
}
`}

kotlin={`
override fun onMapReady(mapboxMap: MapboxMap) {
	val trafficPlugin = TrafficPlugin(mapView, mapboxMap)
	trafficPlugin.setVisibility(true) // Enable the traffic view
}
`}

/>
}}


## Traffic colors
The table below provides information for each color displayed in the traffic layer and what the corresponding congestion level is.

| Color | Hex value | Congestion level |
| --- | --- | --- |
| Green | `#39c66d` | Low |
| Yellow | `#ff8c1a` | Moderate |
| Orange | `#ff0015` | Heavy |
| Red | `#981b25` | Severe |
