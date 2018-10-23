---
title: "Annotation"
description: "Mapbox Android Annotation Plugin"
prependJs:
  - "import {
      ANNOTATION_PLUGIN_VERSION
    } from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import { Floater } from '../../../components/floater';"

---

The Mapbox Annotation Plugin simplifies the way to set and adjust the visual properties of annotations on a Mapbox map. The Mapbox Maps SDK for Android provides developers with fine-grain control over the appearance and location of map annotations. In this context, "annotations" means circles, polygons, lines, text, and icons. Using runtime and data-driven styling to create annotations can require a deep understanding of the Maps SDK. This plugin obfuscates much of the required boilerplate code.

_Note: A `SymbolLayer` is the layer that is responsible for both map text and icons._

## Install the Annotation Plugin

To start developing an application using the Annotation Plugin, you'll need to add the appropriate dependencies inside of your `build.gradle`. The Annotation Plugin dependency includes the Mapbox Maps SDK for Android. All dependencies given below can be found on MavenCentral.

If your application is close or exceeds the 65k method count limit, you can mitigate this problem by enabling ProGuard inside your application. ProGuard directives are included in the Android dependencies to preserve the required classes.

### Add the dependency

1. Start Android Studio.
2. Open up your application's `build.gradle`.
3. Make sure that your project's `minSdkVersion` is API 14 or higher.
4. Under dependencies, add a new build rule for the latest `mapbox-android-plugin-annotation`.
5. Click the **Sync Project with Gradle Files** near the toolbar in Studio.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-annoation:{{ ANNOTATION_PLUGIN_VERSION }}'
}
```

## Initialize the plugin

The plugin includes manager classes for the various map layers available in the Mapbox Maps SDK for Android. The manager classes are explained below and their constructors only require a `MapboxMap` object. You should initialize a manager class within the `onMapReady()` method to be sure that the annotations are added to a `MapboxMap` that's completely ready.

{{
<CodeLanguageToggle id="initializing-class" />
<ToggleableCodeBlock

java={`
mapView.getMapAsync(new OnMapReadyCallback() {
    @Override
    public void onMapReady(MapboxMap mapboxMap) {
  	
  	// Use a layer manager here
  	
  		
    }
});
`}

kotlin={`
mapView?.getMapAsync { mapboxMap ->
 
 // Use a layer manager here
     
}
`}

/>
}} 


## Manager

The circle, line, fill, and symbol map layers have accompanying manager classes. Each manager class has methods for setting layer properties that are less related to the visual styling. For example, `SymbolManager` adjusts the position of the `SymbolLayer`'s icon or text with methods such as `setFillTranslate()` or `setFillTranslateAnchor()`.

You can also set `onClick` and `onLongClick` listeners to the type of annotations that you're adding to the map.


| Layer type | Manager class
| --- | --- |
| Circle | [CircleManager](https://github.com/mapbox/mapbox-plugins-android/blob/master/plugin-annotation/src/main/java/com/mapbox/mapboxsdk/plugins/annotation/CircleManager.java) |
| Line| [LineManager](https://github.com/mapbox/mapbox-plugins-android/blob/master/plugin-annotation/src/main/java/com/mapbox/mapboxsdk/plugins/annotation/LineManager.java) |
| Fill | [FillManager](https://github.com/mapbox/mapbox-plugins-android/blob/master/plugin-annotation/src/main/java/com/mapbox/mapboxsdk/plugins/annotation/FillManager.java) |
| Symbol | [SymbolManager](https://github.com/mapbox/mapbox-plugins-android/blob/master/plugin-annotation/src/main/java/com/mapbox/mapboxsdk/plugins/annotation/SymbolManager.java) |

<br>
For example, here's how a `SymbolManager` would be used:

{{
<CodeLanguageToggle id="manager-class" />
<ToggleableCodeBlock

java={`
// create symbol manager object
SymbolManager symbolManager = new SymbolManager(mapboxMap);

// add click listeners if desired
symbolManager.addClickListener(symbol -> 

);
	
symbolManager.addLongClickListener(symbol -> {
		
});

// set non-data-driven properties, such as:
symbolManager.setIconAllowOverlap(true);
symbolManager.setIconTranslate(new Float[]{-4f,5f});
symbolManager.setIconRotationAlignment(ICON_ROTATION_ALIGNMENT_VIEWPORT);
`}

kotlin={`
// create symbol manager object
val symbolManager = SymbolManager(mapboxMap)

// add click listeners if desired
symbolManager?.addClickListener { symbol ->
    
}

symbolManager?.addLongClickListener { symbol ->
    
}

// set non-data-driven properties, such as:
symbolManager?.iconAllowOverlap = true
symbolManager?.iconTranslate = arrayOf(-4f, 5f)
symbolManager?.iconRotationAlignment = ICON_ROTATION_ALIGNMENT_VIEWPORT
`}

/>
}} 

{{
  <Floater
    url="https://github.com/mapbox/mapbox-plugins-android/tree/master/app/src/main/java/com/mapbox/mapboxsdk/plugins/testapp/activity/annotation"
    title="Manager class usage"
    category="example"
    text="See more usage of various manager classes"
  />
}}

## Options

The circle, line, fill, and symbol map layers _also_ have accompanying options classes. The options classes follow the builder pattern, which allows you to set various layer properties that are more related to visual styling. For example, `FillOptions` adjusts the look of `SymbolLayer` icon or text with methods such as `withFillColor()`, `withFillOpacity()`, and `withFillPattern()`.

| Layer type | Option class
| --- | --- |
| Circle | [CircleOptions](https://github.com/mapbox/mapbox-plugins-android/blob/master/plugin-annotation/src/main/java/com/mapbox/mapboxsdk/plugins/annotation/CircleOptions.java)
| Line| [LineOptions](https://github.com/mapbox/mapbox-plugins-android/blob/master/plugin-annotation/src/main/java/com/mapbox/mapboxsdk/plugins/annotation/LineOptions.java)
| Fill | [FillOptions](https://github.com/mapbox/mapbox-plugins-android/blob/master/plugin-annotation/src/main/java/com/mapbox/mapboxsdk/plugins/annotation/FillOptions.java)
| Symbol | [SymbolOptions](https://github.com/mapbox/mapbox-plugins-android/blob/master/plugin-annotation/src/main/java/com/mapbox/mapboxsdk/plugins/annotation/SymbolOptions.java)

{{
<CodeLanguageToggle id="options-class" />
<ToggleableCodeBlock

java={`
// create a fixed fill
List<LatLng> innerLatLngs = new ArrayList<>();
innerLatLngs.add(new LatLng(-10.733102, -3.363937));
innerLatLngs.add(new LatLng(-19.716317, 1.754703));
innerLatLngs.add(new LatLng(-21.085074, -15.747196));

List<List<LatLng>> latLngs = new ArrayList<>();
latLngs.add(innerLatLngs);
      
FillOptions fillOptions = new FillOptions()
	.withLatLngs(latLngs)
	.withFillColor(PropertyFactory.colorToRgbaString(Color.RED));
fillManager.create(fillOptions);

// random add fills across the globe
List<FillOptions> fillOptionsList = new ArrayList<>();

for (int i = 0; i < 20; i++) {
	int color = Color.argb(255, random.nextInt(256), random.nextInt(256), random.nextInt(256));
	fillOptionsList.add(new FillOptions()
	  .withLatLngs(createRandomLatLngs())
	  .withFillColor(PropertyFactory.colorToRgbaString(color))
	);
}

fillManager.create(fillOptionsList);
`}

kotlin={`
// create a fixed fill
val innerLatLngs = ArrayList<LatLng>()
innerLatLngs.add(LatLng(-10.733102, -3.363937))
innerLatLngs.add(LatLng(-19.716317, 1.754703))
innerLatLngs.add(LatLng(-21.085074, -15.747196))

val latLngs = ArrayList<List<LatLng>>()
latLngs.add(innerLatLngs)

val fillOptions = FillOptions()
	.withLatLngs(latLngs)
	.withFillColor(PropertyFactory.colorToRgbaString(Color.RED))
fillManager?.create(fillOptions)

// random add fills across the globe
val fillOptionsList = ArrayList<FillOptions>()
for (i in 0..19) {
	val color = Color.argb(255, random.nextInt(256), random.nextInt(256), random.nextInt(256))
	fillOptionsList.add(FillOptions()
		.withLatLngs(createRandomLatLngs())
		.withFillColor(PropertyFactory.colorToRgbaString(color))
	)
}

fillManager?.create(fillOptionsList)
`}

/>
}}

{{
  <Floater
    url="https://github.com/mapbox/mapbox-plugins-android/tree/master/app/src/main/java/com/mapbox/mapboxsdk/plugins/testapp/activity/annotation"
    title="Manager class usage"
    category="example"
    text="See more usage of various option classes"
  />
}}

As you saw above, the `FillManager#create()` method takes in a single `FillOptions` object as a parameter. A `List<>` of `FillOptions` is also a valid parameter for the `create()` method. This is the same for all of the manager classes. `LineManager` will require a `LineOptions` class and so on.


