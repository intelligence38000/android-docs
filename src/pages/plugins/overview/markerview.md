---
title: "MarkerView"
description: "Read docs on the Mapbox MarkerView Plugin for Android. Quickly customize and add Android view-based markers to a Mapbox map."
prependJs:
  - "import constants from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import { WarningNote } from '../../../components/warning-note';"
---

The MarkerView Plugin for Android provides a simplified way to add map markers that are Android views.

{{
<WarningNote title="Alternative option">
Please be aware that Android views are the less performant and less customizable option for adding icons to a map. The Mapbox Maps SDK's SymbolLayer is the recommended way to add icons. <a href="/android/plugins/overview/annotation">View the Mapbox Annotation Plugin for Android</a> for more information about using a SymbolLayer.
</WarningNote>
}}

## Install the MarkerView plugin

To start developing an application using the MarkerView Plugin, you'll need to add the appropriate dependencies inside your `build.gradle` file. This dependency includes the Maps SDK for Android. All dependencies given below can be found on MavenCentral.

If your application is close or exceeds the 65k method count limit, you can mitigate this problem by enabling ProGuard inside your application. ProGuard directives are included in the Android dependencies to preserve the required classes.

### Add the dependency

1. Start Android Studio.
2. Open up your application's `build.gradle`.
3. Make sure that your project's `minSdkVersion` is API 14 or higher.
4. Under dependencies, add a new build rule for the latest `mapbox-android-plugin-markerview`.
5. Click the Sync Project with Gradle Files near the toolbar in Studio.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-markerview-v7:{{constants.MARKERVIEW_PLUGIN_VERSION }}'
}
```

## Initialize the plugin

The plugin includes a manager class for adding and removing markers. The `MarkerViewManager` class requires initialized `MapboxMap` and `MapView` objects to be created. You should create a `MarkerViewManager` object within `onMapReady()` to be sure that the markers can be added to a successfully built map.

{{
<CodeLanguageToggle id="initializing-markerview-plugin" />
<ToggleableCodeBlock

java={`
mapView.getMapAsync(new OnMapReadyCallback() {
	@Override
	public void onMapReady(MapboxMap mapboxMap) {

		MarkerViewManager markerViewManager = new MarkerViewManager(mapView, mapboxMap);

	}
});
`}

kotlin={`
mapView?.getMapAsync { mapboxMap ->

 val markerViewManager = MarkerViewManager(mapView, mapboxMap)

}
`}

/>
}}

## Adding a marker

The plugin is all about Android views, so you'll need to first create whatever view that you want to use for the marker image. Once you've constructed the view, use it to create a `MarkerView` class and then eventually pass the `MarkerView` object to the `MarkerViewManager`.

{{
<CodeLanguageToggle id="adding-markerview" />
<ToggleableCodeBlock

java={`
MarkerView markerView = new MarkerView(new LatLng(LAT,LONG), customView);

markerViewManager.addMarker(markerView);
`}

kotlin={`
val marker = MarkerView(LatLng(LAT.toDouble(),LONG.toDouble()), customView)

marker?.let {
	markerViewManager?.addMarker(it)
}
`}
/>
}}

## Removing a marker

The `MarkerViewManager` can also remove a specific `MarkerView`.

{{
<CodeLanguageToggle id="removing-markerview" />
<ToggleableCodeBlock

java={`
markerViewManager.removeMarker(markerView);
`}

kotlin={`
marker?.let {
	markerViewManager?.removeMarker(it)
}
`}
/>
}}


## Destroying the manager

Don't forget to destroy your `MarkerViewManager` object. The destruction should happen in `onDestroy()` if you're using an activity. It should happen in the `onDestroyView()` method of a fragment.

Activity:
{{
<CodeLanguageToggle id="destroy-in-activity" />
<ToggleableCodeBlock

java={`
@Override
protected void onDestroy() {
	super.onDestroy();

		markerViewManager.onDestroy();

		mapView.onDestroy();
}
`}

kotlin={`
override fun onDestroy() {
	super.onDestroy()

		markerViewManager?.onDestroy()

		mapView.onDestroy()
}
`}

/>
}}

Fragment:

{{
<CodeLanguageToggle id="destroy-in-fragment" />
<ToggleableCodeBlock

java={`
@Override
public void onDestroyView() {
	super.onDestroyView();

		markerViewManager.onDestroy();

		mapView.onDestroy();
}
`}

kotlin={`
override fun onDestroyView() {
super.onDestroyView()

	markerViewManager?.onDestroy()

	mapView.onDestroy()
}
`}

/>
}}
