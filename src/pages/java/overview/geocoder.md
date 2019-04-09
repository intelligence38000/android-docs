---
title: "Geocoder"
description: "Official documentation on the Mapbox Java SDK Geocoding API."
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
contentType: guide
---

The Mapbox Geocoding API does two things: forward geocoding and reverse geocoding. **Forward geocoding** lets you convert location text into geographic coordinates, and **reverse geocoding** turns geographic coordinates into place names.

You'll find the wrapper for the Mapbox Geocoding API in the mapbox-java-services module. `MapboxGeocoding` is used to request both forward and reverse geocoding information. **Forward geocoding** will take a `String`, such as a street address or point of interest, and transform it into a `Point` object. **Reverse geocoding** does the opposite, taking in a `Point` object and transforming it into an address. The amount of detail provided in the response varies. For example, one response might contain a full address while another response will only contain the city and country.

Before using this wrapper:

- Read the [Mapbox Geocoding API documentation](https://www.mapbox.com/api-documentation/search/#geocoding). The API documentation contains all available parameters including some that are not listed in this guide.
- Make sure you have included the correct permissions inside of your `AndroidManifest.xml` file if you plan to use this API inside of an Android application.

## Geocoding request

Before making a geocoding request, you must build the `MapboxGeocoding` object by passing in two required parameters; a valid Mapbox [access token](https://www.mapbox.com/help/define-access-token/) and a location query (typically an address or description). Many other parameters are available to help bias and manipulate the response that you receive.

_**Note:** If you are using our geocoder to find locations around the user's location, you can use `proximity()` passing in their location as a `Point` object to bias results to around their location._

{{
<CodeLanguageToggle id="geocoding-request" />
<ToggleableCodeBlock

java={`
MapboxGeocoding mapboxGeocoding = MapboxGeocoding.builder()
  .accessToken(MAPBOX_ACCESS_TOKEN)
  .query("1600 Pennsylvania Ave NW")
  .build();
`}

kotlin={`
val mapboxGeocoding = MapboxGeocoding.builder()
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.query("1600 Pennsylvania Ave NW")
	.build()
`}

/>
}}

## Geocoding response

Once you have built your `MapboxGeocoding` object with all the parameters that you'd like to use in the request, you'll need to asynchronously send the request using `enqueueCall()`. Once the request receives a response, it will tell the callback where you can handle the response appropriately.

_**Note:** You should use `mapboxGeocoding.cancelCall()` within your `onDestroy()` lifecycle method in case your user leaves the activity or application before the callback is notified._

{{
<CodeLanguageToggle id="geocoding-response" />
<ToggleableCodeBlock

java={`
mapboxGeocoding.enqueueCall(new Callback<GeocodingResponse>() {
	@Override
	public void onResponse(Call<GeocodingResponse> call, Response<GeocodingResponse> response) {

		List<CarmenFeature> results = response.body().features();

		if (results.size() > 0) {

		  // Log the first results Point.
		  Point firstResultPoint = results.get(0).center();
		  Log.d(TAG, "onResponse: " + firstResultPoint.toString());

		} else {

		  // No result for your request were found.
		  Log.d(TAG, "onResponse: No result found");

		}
	}

	@Override
	public void onFailure(Call<GeocodingResponse> call, Throwable throwable) {
		throwable.printStackTrace();
	}
});
`}

kotlin={`
mapboxGeocoding.enqueueCall(object : Callback<GeocodingResponse> {
	override fun onResponse(call: Call<GeocodingResponse>, response: Response<GeocodingResponse>) {

		val results = response.body()!!.features()

		if (results.size > 0) {

		    // Log the first results Point.
		    val firstResultPoint = results[0].center()
		    Log.d(FragmentActivity.TAG, "onResponse: " + firstResultPoint!!.toString())

		} else {

		    // No result for your request were found.
		    Log.d(FragmentActivity.TAG, "onResponse: No result found")

		}
	}

	override fun onFailure(call: Call<GeocodingResponse>, throwable: Throwable) {
		throwable.printStackTrace()
	}
})
`}

/>
}}


## Reverse geocoding

The process of turning coordinates into a `String` address is called reverse geocoding. Instead of supplying the builder with a `String` address you'd pass in coordinates instead. Handling the response is like forward geocoding. While the geocoder gives one coordinate, the response will often give you multiple valid ways to describe the specific location. For example, one might be the street name while another result will be the country. The ordering of the list usually goes from most relevant to least.

You can narrow the response like forward geocoding by biasing the result using the available parameters provided in the builder.

{{
<CodeLanguageToggle id="reverse-geocoding" />
<ToggleableCodeBlock

java={`
MapboxGeocoding reverseGeocode = MapboxGeocoding.builder()
        .accessToken(MAPBOX_ACCESS_TOKEN)
        .query(Point.fromLngLat(-77.03655, 38.89770))
        .geocodingTypes(GeocodingCriteria.TYPE_ADDRESS)
        .build();

// The result of this reverse geocode will give you "Pennsylvania Ave NW"
`}

kotlin={`
val reverseGeocode = MapboxGeocoding.builder()
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.query(Point.fromLngLat(-77.03655, 38.89770))
	.geocodingTypes(GeocodingCriteria.TYPE_ADDRESS)
	.build()

// The result of this reverse geocode will give you "Pennsylvania Ave NW"
`}

/>
}}

## Batch geocoding

<!-- enterprise -->

Batch requests have the same parameters as normal requests, but can include more than one query by separating queries with the `;` character. The mode parameter also needs to use `MODE_PLACES_PERMANENT`. You can do up to 50 forward or reverse geocoding queries in a single request. The response is an array of individual geocoder responses formatted the same as individual results. Each query in a batch request counts individually against your account's rate limits.

{{
<CodeLanguageToggle id="batch-geocoding" />
<ToggleableCodeBlock

java={`
MapboxGeocoding client = MapboxGeocoding.builder()
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.mode(GeocodingCriteria.MODE_PLACES_PERMANENT)
	.query("20001;20009;22209")
	.baseUrl(mockUrl.toString())
	.build();
`}

kotlin={`
val client = MapboxGeocoding.builder()
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.mode(GeocodingCriteria.MODE_PLACES_PERMANENT)
	.query("20001;20009;22209")
	.baseUrl(mockUrl.toString())
	.build()
`}

/>
}}

_**Note**: Batch geocoding is only available with an [Enterprise plan](https://www.mapbox.com/pricing/). On all other plan levels, one geocode is permitted per request. For more information about batch geocoding please [contact us](https://www.mapbox.com/contact/sales)._
