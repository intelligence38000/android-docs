---
title: "Tilequery"
description: "Official documentation on the Mapbox Java SDK Tilequery API."
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import { Floater } from '../../../components/floater';"

---

The Mapbox Tilequery API allows you to retrieve data about specific features from a vector tileset, based on a given latitude and longitude. The API makes it possible to query for features within a radius, do point in polygon queries, query for features in multiple composite layers, and augment data from the Mapbox Geocoding API with custom data.

For more information about this API, see the [Mapbox Tilequery API documentation](https://www.mapbox.com/api-documentation/maps/#tilequery).

## Building the query URL

To begin with, you'll need to create a new instance of the `MapboxTilequery` object and use its builder to customize your query. The options offered in the builder includes choices such as the query coordinate, the type of GeoJSON geometry you're searching for, and the search area radius.

{{
<CodeLanguageToggle id="tilequery-request" />
<ToggleableCodeBlock

java={`
MapboxTilequery tilequery = MapboxTilequery.builder()
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.mapIds(mapId)
	.query(Point.fromLngLat(LONGITUDE,LATITUDE))
	.radius(radiusInMeters)
	.limit(maxNumOfFeaturesReturned)
	.geometry(geoJsonShape)
	.dedupe(boolean)
	.layers(singleOrListOfMapLayerIds)
	.build();
`}

kotlin={`
val tilequery = MapboxTilequery.builder()
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.mapIds(mapId)
	.query(Point.fromLngLat(LONGITUDE,LATITUDE))
	.radius(radiusInMeters)
	.limit(maxNumOfFeaturesReturned)
	.geometry(geoJsonShape)
	.dedupe(boolean)
	.layers(singleOrListOfMapLayerIds)
	.build()
`}
/>
}}

{{
  <Floater
    url="https://www.mapbox.com/help/tilequery-api-playground/"
    title="Tilequery Playground"
    category="playground"
    text="Explore how to use the Tilequery API to retrieve features from vector tiles."
    clear={true}
  />
}}

## Query response

You can access the Tilequery API's response inside of the `onResponse` callback.
The `onResponse` callback is built with [Retrofit](https://square.github.io/retrofit/), just like the Java SDK's other services' callbacks. The response will include a `List<Feature>` if the query you built has any `Feature`s in it. However, there's no guarantee that the response will have any `Feature` objects in it.  

{{
<CodeLanguageToggle id="tilequery-response" />
<ToggleableCodeBlock

java={`
tilequery.enqueueCall(new Callback<FeatureCollection>() {
	@Override public void onResponse(Call<FeatureCollection> call, Response<FeatureCollection> response) {

		List<Feature> featureCollection = response.body().features();

	}

	@Override public void onFailure(Call<FeatureCollection> call, Throwable throwable) {

		Log.d("Request failed: %s", throwable.getMessage());

	}
});
`}

kotlin={`
tilequery.enqueueCall(object : Callback<FeatureCollection> {
	override fun onResponse(call: Call<FeatureCollection>, response: Response<FeatureCollection>) {

		val featureCollection = response.body()?.features()

	}

	override fun onFailure(call: Call<FeatureCollection>, throwable: Throwable){

		Timber.d("Request failed: %s", throwable.message)

	}
})
`}
/>
}}

Each `Feature` in the response has a `distance`, `geometry`, and `layer` property associated with it:

{{
<CodeLanguageToggle id="tilequery-feature" />
<ToggleableCodeBlock

java={`
tilequery.enqueueCall(new Callback<FeatureCollection>() {
	@Override public void onResponse(Call<FeatureCollection> call, Response<FeatureCollection> response) {

		// The FeatureCollection that is inside the API response

		List<Feature> featureCollection = response.body().features();

		// Distance that the Feature is from the original Tilequery Point coordinate
		String distance = featureCollection.get(0).getProperty("tilequery").getAsJsonObject().get("distance").toString();

		// The Feature's GeoJSON geometry type     
        String geometryType = featureCollection.get(0).getProperty("tilequery").getAsJsonObject().get("geometry").toString();

        // The id of the map layer which the Feature is a part of        
        String layerId = featureCollection.get(0).getProperty("tilequery").getAsJsonObject().get("layer").toString();
	}

	@Override public void onFailure(Call<FeatureCollection> call, Throwable throwable) {

		Log.d("Request failed: %s", throwable.getMessage());

	}
});
`}

kotlin={`
tilequery.enqueueCall(object : Callback<FeatureCollection> {
	override fun onResponse(call: Call<FeatureCollection>, response: Response<FeatureCollection>) {

		// The FeatureCollection that is inside the API response

		val featureCollection = response.body()?.features()

		// Distance that the Feature is from the original Tilequery Point coordinate

		val distance = featureCollection!![0].getProperty("tilequery").asJsonObject.get("distance").toString()

    // The Feature's GeoJSON geometry type
    val geometryType = featureCollection[0].getProperty("tilequery").asJsonObject.get("geometry").toString()

    // The id of the map layer which the Feature is a part of
    val layerId = featureCollection[0].getProperty("tilequery").asJsonObject.get("layer").toString()()

	}

	override fun onFailure(call: Call<FeatureCollection>, throwable: Throwable){

		Timber.d("Request failed: %s", throwable.message)

	}
})
`}
/>
}}
