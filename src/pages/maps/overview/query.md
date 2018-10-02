---
title: "Query map features"
description: "Official documentation about querying map features within the Mapbox Maps SDK for Android. Discover how to retrieve information about a selected place of interest."
prependJs:
  - "import { Floater } from '../../../components/floater';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

The Maps SDK gives you the tools to query the map layers to get a list of GeoJSON features which hold valuable information used for rendering the map. An example usage of this can be to query where the user clicks/taps the map and determine if they selected a POI displaying on the map. You can then move through the provided GeoJSON Feature to get the properties which holds the POI name as a `String`. It's important to consider that querying a map won't always return the information you are looking for, therefore, it is possible to receive a Feature list with 0 items in it.

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/query/QueryFeatureActivity.java"
    title="Query at point"
    category="example"
    text="Query the rendered map to get the properties at a specific location."
  />
}}

Querying the map can be done considering a specific point on the screen or by first constructing a bounding box and receiving all the features found within that region. Aside from layers, it is also possible to query the source for specific information matching your query regardless if the items actually being displayed on the map.

Since the features come from tiled vector data or GeoJSON data that is converted to tiles internally, feature geometries may be split or duplicated across tile boundaries and, as a result, features may appear multiple times in query results. For example, suppose there is a highway running through the bounding rectangle of a query. The results of the query will be those parts of the highway that lie within the map tiles covering the bounding rectangle, even if the highway extends into other tiles, and the portion of the highway within each map tile will be returned as a separate feature. Similarly, a point feature near a tile boundary may appear in multiple tiles due to tile buffering.

## Query rendered features

A common usage for querying the map is to acquire information at a specific position the user is looking at. The point must be viewable inside the user devices viewport and fully rendered before you can access any information. Querying the map only accepts a screen pixel value instead of LatLng so in many cases you'll need to convert beforehand. In the snippet below, the maps clicked on which provides a LatLng we use to query the map and get the properties at that location.

{{
<CodeLanguageToggle id="query-features" />
<ToggleableCodeBlock

java={`
@Override
public void onMapClick(@NonNull LatLng point) {

  // Convert LatLng coordinates to screen pixel and only query the rendered features.
  final PointF pixel = mapboxMap.getProjection().toScreenLocation(point);
  
  List<Feature> features = mapboxMap.queryRenderedFeatures(pixel);

  // Get the first feature within the list if one exist
  if (features.size() > 0) {
    Feature feature = features.get(0);

    // Ensure the feature has properties defined
    if (feature.properties() != null) {
      for (Map.Entry<String, JsonElement> entry : feature.properties().entrySet()) {
        // Log all the properties
        Log.d(TAG, String.format("%s = %s", entry.getKey(), entry.getValue()));
      }
    }
  }
}
`}

kotlin={`
override fun onMapClick(point: LatLng) {

	// Convert LatLng coordinates to screen pixel and only query the rendered features.
	val pixel = mapboxMap!!.projection.toScreenLocation(point)
	val features = mapboxMap!!.queryRenderedFeatures(pixel)

	// Get the first feature within the list if one exist
	if (features.size > 0) {
	val feature = features[0]
	
	// Ensure the feature has properties defined
	if (feature.properties() != null) {
	    for ((key, value) in feature.properties()!!.entrySet()) {
	        // Log all the properties
	        Log.d(TAG, String.format("%s = %s", key, value))
			}
		}
	}
`}

/>
}}

### Query features inside a bounding box

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/query/FeatureCountActivity.java"
    title="Query region"
    category="example"
    text="Query the rendered map to get the features found inside an Android view."
  />
}}

In addition to querying a specific point on the map, it is also possible to pass in a bounding box by passing in a `RectF` object. This can either come from a Android view currently displayed to the user on top of the map, or 4 coordinates that are currently showing within the viewport. The snippet below shows how to take four coordinates, convert them into `PointF` objects, adding them into a new `RectF` and finally, passing the "bounding box" into `queryRenderedFeatures()`.

{{
<CodeLanguageToggle id="query-features" />
<ToggleableCodeBlock

java={`
RectF rectF = new RectF(
  mapboxMap.getProjection().toScreenLocation(<left coordinate>),
  mapboxMap.getProjection().toScreenLocation(<top coordinate>),
  mapboxMap.getProjection().toScreenLocation(<right coordinate>),
  mapboxMap.getProjection().toScreenLocation(<bottom coordinate>)
);
mapboxMap.queryRenderedFeatures(rectF);
`}

kotlin={`
val rectF = RectF(
	mapboxMap.projection.toScreenLocation(<left coordinate>).toFloat(),
	mapboxMap.projection.toScreenLocation(<top coordinate>).toFloat(),
	mapboxMap.projection.toScreenLocation(<right coordinate>).toFloat(),
	mapboxMap.projection.toScreenLocation(<bottom coordinate>).toFloat()
)
mapboxMap.queryRenderedFeatures(rectF)
`}
/>
}}

## Query source features

In contrast to `mapboxMap.queryRenderedFeatures()`, using `querySourceFeatures` returns all features matching the query parameters, whether or not they are rendered by the current style (i.e. visible). The domain of the query includes all currently-loaded vector tiles and GeoJSON source tiles: this function does not check tiles outside the currently visible viewport.

Since features come from tiled vector data or GeoJSON data that is converted to tiles internally, feature geometries may be split or duplicated across tile boundaries just like if you were going to queryRenderedFeatures(). To query a source, you must pass in the query parameters as a set of `Filters` and only the features that satisfy the statement will be added to the returning list of features. For example, in the snippet below, the map style contains a GeoJSON source called population-source which contains a property for each feature defining it's population. When we query we are only wanting features which have a greater population than 100000.

{{
<CodeLanguageToggle id="query-source-features" />
<ToggleableCodeBlock

java={`
GeoJsonSource source = mapboxMap.getSourceAs("population-source");
List<Feature> features = source.querySourceFeatures(Expression.get("population"));
`}

kotlin={`
val source = mapboxMap.getSourceAs<GeoJsonSource>("population-source")
val features = source?.querySourceFeatures(Expression.get("population"))
`}
/>
}}

