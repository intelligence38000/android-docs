---
title: "Data-driven styling"
description: "Documentation for changing the look and feel of your Mapbox map in real time with the Mapbox Maps SDK for Android."
prependJs:
  - "import { Floater } from '../../../components/floater';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import { WarningNote } from '../../../components/warning-note';"
---

{{
  <Floater
    url="https://wwww.mapbox.com/mapbox-gl-js/style-spec/"
    title="Style Spec Info"
    category="guide"
    text="View a full list of the features in runtime styling not specific to Android."
  />
}}

Use the Maps SDK's data-driven styling capabilities to create and display many types of data. You can dynamically change the look and feel of your map in real time based on the information within a particular dataset. Data-driven styling is largely built on the idea of sources and layers.

{{
<WarningNote title="Annotation Plugin for Android">
    <p>Sources and layers provide nimble options for customizing the look of a Mapbox map and the data displayed on the map. The <a href="/android/plugins/overview/annotation/">Mapbox Annotation Plugin for Android</a> provides a simplified system for interacting with and customizing Mapbox map layers.</p>
</WarningNote>
}}


## Sources

Sources hold the actual data and layers reference sources. That is how to show data on your Mapbox map. There are a handful of different source types supported and choosing the correct one to use depends on your data type. Adding a source won't instantly make data appear on the map because sources don't contain styling details like color or width. Layers refer to a source and give it a visual representation.

Two parameters are required to use a source. A source requires a unique `String` ID and requires some sort of data.

### Vector

`VectorSource` tiles must be in [Mapbox Vector Tile format](https://www.mapbox.com/developers/vector-tiles/). All layers that use a vector source must specify a "source-layer" value. For vector tiles hosted by Mapbox, the URL value should be of the form `mapbox://mapid`.

{{
<CodeLanguageToggle id="vector-layer" />
<ToggleableCodeBlock

java={`
// Adding a vector source layer
VectorSource vectorSource = new VectorSource("vector-source", "mapbox://mapbox.mapbox-terrain-v2");
mapboxMap.getStyle().addSource(vectorSource);
`}

kotlin={`
// Adding a vector source layer
val vectorSource = VectorSource("vector-source", "mapbox://mapbox.mapbox-terrain-v2")
mapboxMap.style?.addSource(vectorSource)
`}

/>
}}


### Raster

`RasterSource` tiles can be added to your map if they are in TileJSON format. If hosted by Mapbox, the URL value should be of the form `mapbox://mapid`.

{{
<CodeLanguageToggle id="raster-layer" />
<ToggleableCodeBlock

java={`
// Adding a raster source layer
RasterSource rasterSource = new RasterSource("raster-source", "mapbox://mapbox.u8yyzaor");
mapboxMap.getStyle().addSource(rasterSource);
`}

kotlin={`
// Adding a raster source layer
val rasterSource = RasterSource("raster-source", "mapbox://mapbox.u8yyzaor")
mapboxMap.style?.addSource(rasterSource)
`}

/>
}}

### GeoJson

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/styles/LineLayerActivity.java"
    title="Add a GeoJSON source"
    category="example"
    text="Create a GeoJSON feature collection dynamically and then add it as a map source."
  />
}}

Adding a `GeoJsonSource` can be done in a few different ways. You can provide a URL to the GeoJSON raw data hosted online, provide a link to a GeoJSON file hosted locally inside of the app's assets folder, or you can build your own GeoJSON `FeatureCollection` directly inside of the code. The snippets of code below show the different ways to add a GeoJSON source to your map.

Add a GeoJSON source from a URL:

{{
<CodeLanguageToggle id="geojson-source" />
<ToggleableCodeBlock

java={`
try {
  URL geoJsonUrl = new URL("https://url-to-geojson-file.geojson");
  GeoJsonSource geoJsonSource = new GeoJsonSource("geojson-source", geoJsonUrl);
  mapboxMap.getStyle().addSource(geoJsonSource);
} catch (MalformedURLException exception) {
  Log.d(TAG, exception);
}
`}

kotlin={`
try {
	val geoJsonUrl = URL("https://url-to-geojson-file.geojson")
	val geoJsonSource = GeoJsonSource("geojson-source", geoJsonUrl)
	mapboxMap.style?.addSource(geoJsonSource)
} catch (exception: MalformedURLException) {
	Log.d(TAG, exception)
}
`}

/>
}}


Load a locally stored GeoJSON file. Either use the `loadJsonFromAsset()` method found below or use your own preferred way of loading in a JSON file:

{{
<CodeLanguageToggle id="load-local-geojson" />
<ToggleableCodeBlock

java={`
private String loadJsonFromAsset(String nameOfLocalFile) throws IOException {
  InputStream is = getAssets().open(nameOfLocalFile);
  int size = is.available();
  byte[] buffer = new byte[size];
  is.read(buffer);
  is.close();
  return new String(buffer, "UTF-8");
}

GeoJsonSource source = new GeoJsonSource("geojson-source", loadJsonFromAsset("local_file.geojson"));
mapboxMap.addSource(source);
`}

kotlin={`

@Throws(IOException::class)
	private fun loadJsonFromAsset(nameOfLocalFile: String): String {
		val assets = assets.open(nameOfLocalFile)
		val size = assets.available()
		val buffer = ByteArray(size)
		assets.read(buffer)
		assets.close()
		return String(buffer, "UTF-8")
}

val source = GeoJsonSource("geojson-source", loadJsonFromAsset("local_file.geojson"))

mapboxMap.addSource(source)
`}

/>
}}


Create a GeoJSON `FeatureCollection` and add it to your map:

{{
<CodeLanguageToggle id="create-feature-collection" />
<ToggleableCodeBlock

java={`
// Create a list to store our line coordinates.

List routeCoordinates = new ArrayList<Point>();
routeCoordinates.add(Point.fromLngLat(-118.394391, 33.397676));
routeCoordinates.add(Point.fromLngLat(-118.370917, 33.391142));

// Create the LineString from the list of coordinates and then make a GeoJSON FeatureCollection so that we can add the line to our map as a layer.

LineString lineString = LineString.fromLngLats(routeCoordinates);

FeatureCollection featureCollection = FeatureCollection.fromFeatures(
new Feature[]{Feature.fromGeometry(lineString)});

GeoJsonSource geoJsonSource = new GeoJsonSource("geojson-source", featureCollection);
mapboxMap.getStyle().addSource(geoJsonSource);
`}

kotlin={`
 // Create a list to store our line coordinates.

val routeCoordinates = ArrayList<Point>()
routeCoordinates.add(Point.fromLngLat(-118.394391, 33.397676))
routeCoordinates.add(Point.fromLngLat(-118.370917, 33.391142))

// Create the LineString from the list of coordinates and then make a GeoJSON FeatureCollection so that we can add the line to our map as a layer.

val lineString = LineString.fromLngLats(routeCoordinates)
val featureCollection = FeatureCollection.fromFeatures(
        arrayOf(Feature.fromGeometry(lineString)))

val geoJsonSource = GeoJsonSource("geojson-source", featureCollection)
mapboxMap.style?.addSource(geoJsonSource)`}
/>
}}

{{
  <Floater
    url="https://www.mapbox.com/help/android-runtime-styling-intro/"
    title="Runtime intro"
    category="tutorial"
    text="Read an explanation and view the code for using runtime styling to change a map's water color."
  />
}}

A benefit of having your data inside a GeoJSON source is that you can update, remove, or add additional `Feature`s inside the source at any time, providing a solution to animating data in your map through the Runtime Styling API. For example, [an Android ValueAnimator](https://developer.android.com/reference/android/animation/ValueAnimator.html) can move a feature by updating its coordinates within the GeoJSON data.

### Image

`ImageSource` allows for a georeferenced raster image to be shown on top of the map. The georeferenced image scales and rotates as the user zooms, tilts, and rotates the map. The geographic location of the raster image content, supplied with `LatLngQuad`, can be non-axis aligned.

{{
<CodeLanguageToggle id="image-source" />
<ToggleableCodeBlock

java={`
// Set the latitude and longitude coordinates of the image's four corners
LatLngQuad quad = new LatLngQuad(
  new LatLng(46.437, -80.425),
  new LatLng(46.437, -71.516),
  new LatLng(37.936, -71.516),
  new LatLng(37.936, -80.425));

mapboxMap.getStyle().addSource(new ImageSource(ID_IMAGE_SOURCE, quad, DRAWABLE_IMAGE_HERE));

// Add layer
RasterLayer layer = new RasterLayer(ID_IMAGE_LAYER, IMAGE_SOURCE_ID);
mapboxMap.getStyle().addLayer(layer);
`}

kotlin={`

// Set the latitude and longitude coordinates of the image's four corners
val quad = LatLngQuad(
        LatLng(46.437, -80.425),
        LatLng(46.437, -71.516),
        LatLng(37.936, -71.516),
        LatLng(37.936, -80.425))

mapboxMap.style?.addSource(ImageSource(ID_IMAGE_SOURCE, quad, DRAWABLE_IMAGE_HERE))

// Add layer
val layer = RasterLayer(ID_IMAGE_LAYER, ID_IMAGE_SOURCE)
mapboxMap.style?.addLayer(layer)
`}

/>
}}


The `setImage()` method is a convenient way to update the `ImageSource`'s image by passing in a drawable.

{{
<CodeLanguageToggle id="set-image" />
<ToggleableCodeBlock

java={`
ImageSource imageSource = (ImageSource) mapboxMap.getSource(ID_IMAGE_SOURCE);
imageSource.setImage(DESIRED_IMAGE);
`}

kotlin={`
val imageSource = mapboxMap.getSource(ID_IMAGE_SOURCE) as ImageSource?
imageSource?.setImage(DESIRED_IMAGE)
`}

/>
}}

### Custom geometry

A `CustomGeometrySource` is helpful in situations when you have data which is dynamically generated or needs to be loaded on demand. A `FeatureCollection` with any type and number of GeoJSON geometries can be used in a `CustomGeometrySource`.

{{
<CodeLanguageToggle id="custom-geometry" />
<ToggleableCodeBlock

java={`
CustomGeometrySource source = new CustomGeometrySource(CUSTOM_SOURCE_ID, GeometryTileProvider);
mapboxMap.getStyle().addSource(source);
`}

kotlin={`
val source = CustomGeometrySource(CUSTOM_SOURCE_ID, GeometryTileProvider)
mapboxMap.style?.addSource(source)
`}

/>
}}

One example of `CustomGeometrySource` usage is to create a black grid on top of the map. This example's code can be found in [the `GridSourceActivity` of the Maps SDK for Android test application](https://github.com/mapbox/mapbox-gl-native/blob/4498917a3b9dbf6cc9728da01f479a027f27f902/platform/android/MapboxGLAndroidSDKTestApp/src/main/java/com/mapbox/mapboxsdk/testapp/activity/style/GridSourceActivity.java).


### Raster DEM

`RasterDemSource` currently supports Mapbox Terrain RGB (mapbox://mapbox.terrain-rgb) and [Mapzen Terrarium](https://mapzen.com/documentation/terrain-tiles/formats/#terrarium) tile formats.

The Mapbox terrain tileset is for adding hill terrain to any Mapbox map. Runtime styling can also be used to change the hillshade appearance.

{{
<CodeLanguageToggle id="raster-dem" />
<ToggleableCodeBlock

java={`
RasterDemSource rasterDemSource = new RasterDemSource("source-id", "mapbox://mapbox.terrain-rgb");
mapboxMap.getStyle().addSource(rasterDemSource);

// Create hillshade layer source to map
HillshadeLayer hillshadeLayer = new HillshadeLayer("hillshade-layer-id", "source-id").withProperties(
  hillshadeHighlightColor(Color.parseColor(HILLSHADE_HIGHLIGHT_COLOR)),
  hillshadeShadowColor(Color.BLACK)
);

// Add hillshade layer to map
mapboxMap.getStyle().addLayer(hillshadeLayer);
`}

kotlin={`
val rasterDemSource = RasterDemSource("source-id", "mapbox://mapbox.terrain-rgb")
mapboxMap.style?.addSource(rasterDemSource)

// Create hillshade layer source to map
val hillshadeLayer = HillshadeLayer("hillshade-layer-id", "source-id").withProperties(
	hillshadeHighlightColor(Color.parseColor(HILLSHADE_HIGHLIGHT_COLOR)),
	hillshadeShadowColor(Color.BLACK)
)

// Add hillshade layer to map
mapboxMap.style?.addLayer(hillshadeLayer)
`}

/>
}}

## Layers

While sources hold the data, layers are used to style and display the information. Several layer types are offered depending on your source geometry. Except for layers of the background type, each layer needs to refer to a source. You can optionally filter features and then define how those features are styled.

Each layer offers a `setProperties` API which can be used to style the layer in many different ways. Note that instead of creating different layers depending on certain cases inside your source data, it's recommended to use data-driven styling to reduce the number of layers that the map needs to render.

<!-- TODO: talk about mapboxMap.getLayers(); -->
<!-- TODO: talk about mapboxMap.addLayerBelow(); -->

### Background

The background layer type is unique in that it doesn't require a source. Background layers can be a solid color or a pattern.

{{
<CodeLanguageToggle id="background-layer" />
<ToggleableCodeBlock

java={`
BackgroundLayer backgroundLayer = new BackgroundLayer("background-layer");
backgroundLayer.setProperties(
  PropertyFactory.backgroundColor(Color.BLUE)
);
`}

kotlin={`
val backgroundLayer = BackgroundLayer("background-layer")
backgroundLayer.setProperties(PropertyFactory.backgroundColor(Color.BLUE))
`}

/>
}}


### Fill

Fill layers have an enclosed shape geometry that can be useful for marking areas on a map. A `FillLayer` is best used with GeoJSON `Polygon` or `MultiPolygon` geometries.  The geometry's similar to a line layer consisting of a series of coordinates in a particular order with the first and last points having the same coordinate. The geometry is "enclosed" when the coordinate list starts and ends with the same coordinates. If the geometry isn't enclosed, the `FillLayer` will render but some vertices and sides might be cut off by the tile boundaries.

{{
<CodeLanguageToggle id="fill-layer" />
<ToggleableCodeBlock

java={`
FillLayer fillLayer = new FillLayer("layer-id", "source-id");
fillLayer.setProperties(
  PropertyFactory.fillColor(Color.GREEN)
);
`}

kotlin={`
val fillLayer = FillLayer("layer-id", "source-id")
fillLayer.setProperties(PropertyFactory.fillColor(Color.GREEN))
`}

/>
}}

To alter the shape of the geometry once you have added it, the layer can remain with no changes needed, only the source it's using should be updated. The layer will always display the latest updates inside its source.




### Line

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/styles/LineLayerActivity.java"
    title="Create and display line layer"
    category="guide"
    text="Build a GeoJSON FeatureCollection with the line geometry and then display it on the map using a line layer."
  />
}}

A series of coordinates can be combined to create a line segment that shows on a map. Between each pair of coordinates, a line segment's created which gets drawn straight and connects the two points.

<!-- NOTE add something visual here building the line layer? -->

Before beginning, you'll want to ensure that the Source your layer will be using has lineStrings as part of its geometry, an example creating this can be seen in the GeoJSON source section. Once the source has been created and added to the map, a lineLayer can be initiated, and properties can be set.

{{
<CodeLanguageToggle id="line-layer" />
<ToggleableCodeBlock

java={`
LineLayer lineLayer = new LineLayer("line-layer", "line-source");

// The layer properties for our line. This is where we make the line dotted, set the
// color, etc.
lineLayer.setProperties(
  PropertyFactory.lineDasharray(new Float[]{0.01f, 2f}),
  PropertyFactory.lineCap(Property.LINE_CAP_ROUND),
  PropertyFactory.lineJoin(Property.LINE_JOIN_ROUND),
  PropertyFactory.lineWidth(5f),
  PropertyFactory.lineColor(Color.parseColor("#e55e5e"))
);

mapboxMap.getStyle().addLayer(lineLayer);
`}

kotlin={`
val lineLayer = LineLayer("line-layer", "line-source")

// The layer properties for our line. This is where we make the line dotted, set the color, etc.
lineLayer.setProperties(
	PropertyFactory.lineDasharray(arrayOf(0.01f, 2f)),
	PropertyFactory.lineCap(Property.LINE_CAP_ROUND),
	PropertyFactory.lineJoin(Property.LINE_JOIN_ROUND),
	PropertyFactory.lineWidth(5f),
	PropertyFactory.lineColor(Color.parseColor("#e55e5e"))
)
mapboxMap.style?.addLayer(lineLayer)
`}

/>
}}


### Symbol

Symbol layers indicate a single location on the map with either an icon or text label. Similar to GL Markers and Marker Views, the symbol layer can represent the same data and offers the most power for in map displaying. To begin with, we will show how to add a marker image to the map and then display it as your symbol layer.

{{
<CodeLanguageToggle id="symbol-layer" />
<ToggleableCodeBlock

java={`
Bitmap icon = BitmapFactory.decodeResource(getResources(), R.drawable.my_marker_icon);
mapboxMap.getStyle().addImage("my-marker-image", icon);

SymbolLayer symbolLayer = new SymbolLayer("layer-id", "source-id");
symbolLayer.setProperties(
  PropertyFactory.iconImage("my-marker-image")
);

mapboxMap.getStyle().addLayer(symbolLayer);
`}

kotlin={`
val icon = BitmapFactory.decodeResource(resources, R.drawable.my_marker_icon)
mapboxMap.style?.addImage("my-marker-image", icon)

val symbolLayer = SymbolLayer("layer-id", "source-id")
symbolLayer.setProperties(PropertyFactory.iconImage("my-marker-image"))

mapboxMap.style?.addLayer(symbolLayer)
`}

/>
}}

Not only can symbol layers mark locations on the map using an image, but they can also display text directly on the map. Text symbol layers are done in a similar process to the image snippet given above, only the properties of the layer change.

{{
<CodeLanguageToggle id="text-symbol-layer" />
<ToggleableCodeBlock

java={`
SymbolLayer selectedMarker = new SymbolLayer("selected-marker-layer", "selected-marker-id")
  .withProperties(
    PropertyFactory.textField("Mapbox"),
    PropertyFactory.textColor(Color.BLACK),
    PropertyFactory.textOpacity(0.5f)
);

mapboxMap.getStyle().addLayer(selectedMarker);
`}

kotlin={`
val selectedMarker = SymbolLayer("selected-marker-layer", "selected-marker-id")
.withProperties(
	PropertyFactory.textField("Mapbox"),
	PropertyFactory.textColor(Color.BLACK),
	PropertyFactory.textOpacity(0.5f)
)
mapboxMap.style?.addLayer(selectedMarker)
`}
/>
}}


<!-- NOTE build an example showing how to display text stored in source property -->

### Raster

Raster layers are typically a collection of images that display on top of the base map tiles. While vector tiles are preferred, satellite imagery or legacy map styles render as a raster layer.

{{
<CodeLanguageToggle id="raster-source" />
<ToggleableCodeBlock

java={`
RasterSource rasterSource = new RasterSource("source-id", "mapbox://mapbox.u8yyzaor");
mapboxMap.getStyle().addSource(rasterSource);

RasterLayer rasterLayer = new RasterLayer("layer-id", "source-id");
mapboxMap.getStyle().addLayer(rasterLayer);
`}

kotlin={`
val rasterSource = RasterSource("source-id", "mapbox://mapbox.u8yyzaor")
mapboxMap.style?.addSource(rasterSource)

val rasterLayer = RasterLayer("layer-id", "source-id")
mapboxMap.style?.addLayer(rasterLayer)
`}
/>
}}


One common use case for a `RasterLayer` is adding a layer of satellite tiles to the map:

{{
<CodeLanguageToggle id="raster-source-satellite" />
<ToggleableCodeBlock

java={`
// Adding a raster source layer
RasterSource satelliteRasterSource = new RasterSource("satellite-raster-source", "mapbox://mapbox.satellite",512);
mapboxMap.getStyle().addSource(satelliteRasterSource);
`}

kotlin={`
val satelliteRasterSource = RasterSource("satellite-raster-source", "mapbox://mapbox.satellite", 512)
mapboxMap.style?.addSource(satelliteRasterSource)
`}
/>
}}

### Circle

Circle layers have a single center coordinate which comes from the source data. It's a geographically accurate projection of a circle on the Earth's surface drawn on the map. A few default properties are provided but can be overridden when the layer's first created.

{{
<CodeLanguageToggle id="circle-layer" />
<ToggleableCodeBlock

java={`
VectorSource vectorSource = new VectorSource("source-id", "mapbox://mapbox.2opop9hr");
mapboxMap.getStyle().addSource(vectorSource);

CircleLayer circleLayer = new CircleLayer("layer-id", "source-id");
circleLayer.setSourceLayer("museum-cusco");
circleLayer.setProperties(
  PropertyFactory.visibility(Property.VISIBLE),
  PropertyFactory.circleRadius(8f),
  PropertyFactory.circleColor(Color.argb(1, 55, 148, 179))
);
mapboxMap.getStyle().addLayer(circleLayer);
`}

kotlin={`
val vectorSource = VectorSource("source-id", "mapbox://mapbox.2opop9hr")
mapboxMap.addSource(vectorSource)

val circleLayer = CircleLayer("layer-id", "source-id")
circleLayer.sourceLayer = "museum-cusco"
circleLayer.setProperties(
        PropertyFactory.visibility(Property.VISIBLE),
        PropertyFactory.circleRadius(8f),
        PropertyFactory.circleColor(Color.argb(1, 55, 148, 179))
)
mapboxMap.style?.addLayer(circleLayer.setProperties)
`}
/>
}}

## Removing sources and layers

A source cannot be removed if it's still used by any layer. The removal will fail and log a console warning. Starting in the `7.0.0` release of the Maps SDK, we changed `remove` methods to return a `boolean` which states whether the removal was successful.

All layers using a particular source must be removed before that source can be removed.

Removing a source:

{{
<CodeLanguageToggle id="removing-a-source" />
<ToggleableCodeBlock

java={`
if (mapboxMap!= null && mapboxMap.getStyle() != null) {
	mapboxMap.getStyle().removeSource("source-id");
}
`}

kotlin={`
mapboxMap?.style?.removeSource("source-id")
`}
/>
}}


Removing a layer:

{{
<CodeLanguageToggle id="removing-a-layer" />
<ToggleableCodeBlock

java={`
if (mapboxMap!= null && mapboxMap.getStyle() != null) {
	mapboxMap.getStyle().removeLayer("layer-id");
}
`}

kotlin={`
mapboxMap?.style?.removeLayer("layer-id")
`}
/>
}}


## Modify properties

Sources and layers aren't immutable and therefore, can be modified anytime during the map render. For example, to alter the fill color of a layer after it's been added to the map, you use the map's `Style` object to get the layer and set the property.

{{
<CodeLanguageToggle id="modify-properties" />
<ToggleableCodeBlock

java={`
FillLayer fillLayer = (FillLayer) mapboxMap.getStyle().getLayer("fill-layer-id");
if (fillLayer != null) {
  fillLayer.setProperties(
    PropertyFactory.fillColor(Color.GREEN)
  );
}
`}

kotlin={`
val fillLayer = mapboxMap.style?.getLayer("fill-layer-id") as FillLayer?
fillLayer?.setProperties(
        PropertyFactory.fillColor(Color.GREEN)
)
`}
/>
}}

In a GeoJSON source, you are able to modify, add, remove, or replace the FeatureCollection like so:

{{
<CodeLanguageToggle id="change-geojson" />
<ToggleableCodeBlock

java={`
GeoJsonSource geoJsonSource = (GeoJsonSource) mapboxMap.getStyle().getSource("geojson-source-id");
if (geoJsonSource != null) {
  geoJsonSource.setGeoJson(featureCollection);
}
`}

kotlin={`
val geoJsonSource = mapboxMap.style?.getSource("geojson-source-id") as GeoJsonSource?
geoJsonSource?.setGeoJson(featureCollection)
`}
/>
}}

## Capturing click events

Layers are not clickable and don't expose any event listeners for you to handle user input. Instead, the [map querying tools](/android/maps/overview/query) can help you detect when a user has interacted with the map. For example, when a `FillLayer`'s `Polygon` has been tapped on.

Alternatively, you can use the [Mapbox Annotation Plugin](/android/plugins/overview/annotation/#manager), which provides `onClick()` and `onLongClick()` listening.
