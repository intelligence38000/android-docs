---
title: "Map Matching"
description: "Official documentation on the Mapbox Java SDK Map Matching API."
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

The Mapbox Map Matching API snaps fuzzy, inaccurate traces from a GPS unit or a device (such as a phone) to the OpenStreetMap road and path network using the Mapbox Directions API. The result is a clean path that can be displayed on a map or used for other analysis. The API can receive a list of 2 to 100 coordinate pairs. Make sure to [have a look at the API documentation if you want more information](https://www.mapbox.com/api-documentation/navigation/#map-matching).


## API request

To begin, you'll need to create a new instance of the `MapboxMapMatching` object and use its builder to customize your matching request. The options offered in the builder include whether to return steps and turn-by-turn instructions and the format of the returned geometry.

{{
<CodeLanguageToggle id="map-matching" />
<ToggleableCodeBlock

java={`
MapboxMapMatching client = MapboxMapMatching.builder()
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .profile(PROFILE_DRIVING)
    .coordinates(listOfPoints)
    .annotations(ANNOTATION_SPEED)
    .overview(OVERVIEW_FULL)
    .steps(false)
    .build();
`}

kotlin={`
val client = MapboxMapMatching.builder()
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .profile(PROFILE_DRIVING)
    .coordinates(listOfPoints)
    .annotations(ANNOTATION_SPEED)
    .overview(OVERVIEW_FULL)
    .steps(false)
    .build()
`}

/>
}}

Make sure to use the `DirectionsCriteria` to reference the default Mapbox directions profiles such as driving or walking.

## API response

After creating the `MapboxMapMatching` instance with all your customization parameters, you'll need to handle the API response. Like all API calls made with the Mapbox Java SDK, the response will come inside a Retrofit callback. Inside `onResponse()`, you can access the API's returned response if successful.

{{
<CodeLanguageToggle id="map-matching-response" />
<ToggleableCodeBlock

java={`
client.enqueueCall(new Callback<MapMatchingResponse>() {
	@Override
	public void onResponse(Call<MapMatchingResponse> call, Response<MapMatchingResponse> response) {

		// Handle the response here

	}

	@Override
	public void onFailure(Call<MapMatchingResponse> call, Throwable t) {

	}
});
`}

kotlin={`
client.enqueueCall(object : Callback<MapMatchingResponse> {
	override fun onResponse(call: Call<MapMatchingResponse>, response: Response<MapMatchingResponse>) {


	}

	override fun onFailure(call: Call<MapMatchingResponse>, t: Throwable) {

	}
})
`}
/>
}}

##  Navigation

Visit the [map matching guide](https://docs.mapbox.com/android/navigation/overview/map-matching/) for more information about how to use the Map Matching API with [the Mapbox Navigation SDK for Android](https://docs.mapbox.com/android/navigation/overview/).
