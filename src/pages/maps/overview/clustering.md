---
title: "Data clustering"
description: "Learn how to use the Mapbox Maps SDK for Android to show clustered data on the map."
prependJs:
  - import AppropriateImage from '../../../components/appropriate-image';
  - "import { Floater } from '../../../components/floater';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

Often times, too much data is shown on a map at a single time. Markers overlap with each other. The map looks and feels cluttered. Users can't get a quick understanding of what the data is supposed to say. 

Showing clustered data is entirely possible by using the data-driven styling capabilites of the Mapbox Maps SDK for Android.

Adjusting the amount of data shown on the map to the map's camera zoom level, is a great way to provide users with a cleaner UI experience and less overwhelming location data experience. 
	

## CircleLayer

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/dds/CircleLayerClusteringActivity.java"
    title="CircleLayer clustering"
    category="example"
    text="Use GeoJSON data and layers to show data with circle clusters"
  />
}}

Using `CircleLayer`s is one way of two recommended ways to show data clustering. Different circle colors can represent the various data ranges. For example, blue circles might be clusters with 100+ data points, red circles with 50+, and green circles with 10+. Once the map is zoomed in enough, only individual data points would be visible.


{{
<AppropriateImage imageId="CircleLayerCluster" className="block mx-auto pt18" />
}}

## SymbolLayer

The `SymbolLayer` is a bit more complicated but essentially the same as the `CircleLayer` implementation above. Depending on the shape/size of the `SymbolLayer` icons that you use, you might have to use the`PropertyFactory`'s `iconTranslate` method to make sure that the data count `SymbolLayer` number text is lined up directly on top of the `SymbolLayer` cluster icons. Different icons could represent the various data ranges. For example, one image could be clusters with 100+ data points, a second image with 50+, and third image with 10+. Once the map is zoomed in enough, only individual data points would be visible

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/dds/ImageClusteringActivity.java"
    title="SymbolLayer clustering"
    category="example"
    text="Use GeoJSON data and layers to show data with various images as the cluster icons"
  />
}}

{{
<AppropriateImage imageId="SymbolLayerCluster" className="block mx-auto pt18" />
}}

To accomplish this:
	
1. Use a GeoJSON data source and add it to the Mapbox map as a `GeoJsonSource`.
	
	{{
<CodeLanguageToggle id="symbol-layer" />
<ToggleableCodeBlock

java={`
try {

	mapboxMap.getStyle().addSource(
		new GeoJsonSource("GEOJSON_SOURCE_ID",
		  new URL("URL_POINTING_TO_GEOJSON_FILE"),
		  new GeoJsonOptions()
		    .withCluster(true)
		    .withClusterMaxZoom(MAX_ZOOM)
		    .withClusterRadius(DESIRED_CLUSTER_RADIUS)
		)
	);
	
} catch (MalformedURLException malformedUrlException) {

	Log.e(TAG, "Check the URL " + malformedUrlException.getMessage());
	
}
`}

kotlin={`
try {

	mapboxMap.style?.addSource(
		GeoJsonSource("GEOJSON_SOURCE_ID",
		  URL("URL_POINTING_TO_GEOJSON_FILE"),
		  GeoJsonOptions()
		    .withCluster(true)
		    .withClusterMaxZoom(MAX_ZOOM)
		    .withClusterRadius(DESIRED_CLUSTER_RADIUS)
		)
	);
	
} catch (malformedUrlException: MalformedURLException) {
	
	Log.e(TAG, "Check the URL " + malformedUrlException.message)
	
}
`}

/>
}}

	
2. Create a `SymbolLayer` with icons that represent the individual data points for when points are not clustered. These icons will only be visible when the map's camera is close enough to the map. Remember, the higher the map zoom value, the more zoomed in the camera is. A zoom level of 12 is closer to the map than a zoom value of 4.
3. Create as many additional `SymbolLayer`s or `CircleLayer`s as you want for the various data ranges. You might have red circles represent data clusters that have 10-30 data points and then blue circles that have 50 or more data points. Data-driven styling and `Expression` filtering will determine which cluster layers are shown at which zoom level.
4. Create a `SymbolLayer` for the hidden data amount text. That is, the number that appears and tells a user how many more data points are "hidden" behind the cluster icon/circle and can be viewed if the map is zoomed in on. Don't forget to use runtime styling to adjust the text size, text color, and other text properties:

{{
<CodeLanguageToggle id="set-properties" />
<ToggleableCodeBlock

java={`
SymbolLayer count = new SymbolLayer("SYMBOL_LAYER_COUNT_LAYER_ID", "GEOJSON_SOURCE_ID");
    count.setProperties(
      textField(Expression.toString(get("point_count"))),
      textSize(TEXT_SIZE),
      textColor(TEXT_COLOR),
      textIgnorePlacement(true),
      textAllowOverlap(true)
    );
mapboxMap.getStyle().addLayer(count);
`}

kotlin={`
val count = SymbolLayer("SYMBOL_LAYER_COUNT_LAYER_ID", "GEOJSON_SOURCE_ID")
	count.setProperties(
		textField(Expression.toString(get("point_count"))),
		textSize(TEXT_SIZE),
		textColor(TEXT_COLOR),
		textIgnorePlacement(true),
		textAllowOverlap(true)
    )
mapboxMap.style?.addLayer(count)
`}

/>
}}