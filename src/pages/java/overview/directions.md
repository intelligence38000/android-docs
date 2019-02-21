---
title: "Directions"
description: "Official documentation on the Mapbox Java SDK Directions API"
prependJs:
  - "import { Floater } from '../../../components/floater';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import { JAVA_SDK_VERSION } from '../../../constants';"

---

The Mapbox Directions API delivers routes for navigating the world. Driving, walking, and cycling directions are all possible for you to request, retrieve, and use in your Android project. The Mapbox Java SDK's `MapboxDirections` class eases interaction with the [Mapbox Directions API](https://www.mapbox.com/api-documentation/navigation/#directions).

The Directions API does not return estimated times of arrival (ETA). Please see [the Mapbox Matrix API](/android/java/overview/directions-matrix/) if you would like ETAs for your Android project. Conversely, the Matrix API _does not_ provide directions routes and distances, which the Directions API _does_ provide.

For more extensive information about this API, see the [Mapbox Directions API documentation](https://www.mapbox.com/api-documentation/navigation/#directions).

Along with the API documentation, you can also view [the Directions API example in the Mapbox Android demo app](https://github.com/mapbox/mapbox-android-demo/blob/eadaf3a81c01f1390753dbe24b560f77d117ec27/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/mas/DirectionsActivity.java) to see a complete example of how to use the API.

## Installation

The Directions API can be used completely on its own to get routes and other directional information. You should also know that [the Mapbox Navigation SDK for Android](https://docs.mapbox.com/android/navigation/overview/) is built "on top of" the Directions API. The Navigation SDK enables users to more easily interact with and use the information inside of the Directions API response. _Use the Mapbox Java Services dependency if you want to use the Mapbox Directions API without using the entire Mapbox Navigation SDK._

```groovy
implementation 'com.mapbox.mapboxsdk:mapbox-sdk-services:{{ JAVA_SDK_VERSION }}'
```

## Building a request

The Mapbox Directions API requires you to build a URL with various parameters to request the information that you want. This URL has required and optional parameters. The `MapboxDirections.Builder()` class helps you set these various parameters.

The three required parameters are:

- an origin `Point` object
- a destination `Point` object
- a routing profile

A [`Point` object](/android/java/overview/#point-object) is part of the Java SDK's set of GeoJSON classes.
{{
<CodeLanguageToggle id="directions-api-request" />
<ToggleableCodeBlock

java={`
MapboxDirections client = MapboxDirections.builder()
	.origin(origin)
	.destination(destination)
	.overview(DirectionsCriteria.OVERVIEW_FULL)
	.profile(DirectionsCriteria.PROFILE_DRIVING)
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.build();
`}

kotlin={`
val client = MapboxDirections.builder()
	.origin(origin)
	.destination(destination)
	.overview(DirectionsCriteria.OVERVIEW_FULL)
	.profile(DirectionsCriteria.PROFILE_DRIVING)
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.build()
`}
/>
}}

**Profiles**:

- *Traffic*: For automotive routing. This profile factors in current and historic traffic conditions to avoid slowdowns. Traffic information is available in [these supported geographies](https://www.mapbox.com/api-documentation/pages/traffic-countries.html).
- *Driving*: For automotive routing. This profile shows the fastest routes by preferring high-speed roads like highways.
- *Walking*: For pedestrian and hiking routing. This profile shows the shortest path by using sidewalks and trails.
- *Cycling*: For bicycle routing. This profile shows routes that are short and safer for cyclists by avoiding highways and preferring streets with bike lanes.


For additional information on all of the available optional parameters, see the [Directions API documentation](https://www.mapbox.com/api-documentation/navigation/#directions).

Directions API requests for driving, walking, and cycling routes can specify up to 25 total waypoints along the route.

Requests using the traffic profile can specify up to 3 waypoints.

- Traffic coverage for the traffic profile is available in supported geographies. Requests to this profile revert to driving profile results for areas without traffic coverage.
- Maximum 60 requests per minute.
- Computing route alternatives is not supported on the traffic profile.


## Handling the response

You can access the Directions API's response inside of the `onResponse` callback. The callback is a Retrofit callback, similar to all of the Mapbox Java SDK's other API calls.

The response object will include:

- an array of waypoint objects. Each waypoint is an input coordinate snapped to the road and path network. The waypoints appear in the array in the order of the input coordinates. (`DirectionsWaypoint` is the Java class). For more information about the waypoint object, see the [Directions API documentation](https://www.mapbox.com/api-documentation/navigation/#waypoint-object).

- An array of route objects ordered by descending recommendation rank. The response object may contain at most 2 routes. (`DirectionsRoute` is the Java class). For more information about the route object, see the [Directions API documentation](https://www.mapbox.com/api-documentation/navigation/#route-object).

{{
<CodeLanguageToggle id="directions-api-response" />
<ToggleableCodeBlock

java={`
client.enqueueCall(new Callback<DirectionsResponse>() {
	@Override public void onResponse(Call<DirectionsResponse> call, Response<DirectionsResponse> response) {

       if (response.body() == null) {
          Log.e("No routes found, make sure you set the right user and access token.");
          return;
        } else if (response.body().routes().size() < 1) {
          Log.e("No routes found");
          return;
        }

        // Retrieve the directions route from the API response
        currentRoute = response.body().routes().get(0);

	}

@Override public void onFailure(Call<DirectionsResponse> call, Throwable throwable) {

	     Timber.e("Error: " + throwable.getMessage());

	}
});
`}

kotlin={`
client?.enqueueCall(object : Callback<DirectionsResponse> {
            override fun onResponse(call: Call<DirectionsResponse>, response: Response<DirectionsResponse>) {

       if (response.body() == null) {
       	Log.e("No routes found, make sure you set the right user and access token.")
       return
       } else if (response.body()!!.routes().size < 1) {
       	Log.e("No routes found")
       	return
       }

       // Get the directions route
       val response = response

       val currentRoute = response.body()!!.routes()[0]

}

       override fun onFailure(call: Call<DirectionsResponse>, throwable: Throwable) {

       Log.e("Error: " + throwable.message)

})


`}
/>
}}

{{
  <Floater
    url="https://www.mapbox.com/api-playground/#/directions?_k=p7cct3"
    title="Directions API"
    category="playground"
    text="Explore and learn more about the Mapbox Directions API"
  />
}}


Rather than re-iterating what's already been written, we encourage you to dive into [the full documentation on the Mapbox Directions API](https://www.mapbox.com/api-documentation/navigation/#directions). The Java SDK's Services dependency has equivalent Java classes for the various objects and information in the full Directions API response. Each object has a `.Builder()` class as well. For example:

{{
<CodeLanguageToggle id="RouteLeg" />
<ToggleableCodeBlock

java={`
RouteLeg routeLeg = RouteLeg.builder()
	.annotation(LegAnnotation)
	.summary(summaryString)
	.build();
`}

kotlin={`
val routeLeg = RouteLeg.builder()
	.annotation(LegAnnotation)
	.summary(summaryString)
	.build()
`}
/>
}}

{{
<CodeLanguageToggle id="VoiceInstructions" />
<ToggleableCodeBlock

java={`
VoiceInstructions voiceInstructions = VoiceInstructions.builder()
	.distanceAlongGeometry(Double distanceAlongGeometry)
	.build();
`}

kotlin={`
val voiceInstructions = VoiceInstructions.builder()
	.distanceAlongGeometry(Double distanceAlongGeometry)
	.build()
`}
/>
}}

Once you have a successful Directions API response (`response.body()`), as discussed above, you will be able to parse through the information to access the specific information that you want.

## Drawing the route

You might want to draw the directions route on a map if you're using the Java SDK's Directions API. Using the route's geometry to create a `LineString` is the key to making this happen.
{{
<CodeLanguageToggle id="drawing-the-route" />
<ToggleableCodeBlock

java={`
Feature directionsRouteFeature = Feature.fromGeometry(LineString.fromPolyline(currentRoute.geometry(), PRECISION_6));
`}

kotlin={`
val directionsRouteFeature = Feature.fromGeometry(LineString.fromPolyline(currentRoute.geometry(), PRECISION_6))
`}
/>
}}

Once you've created a `Feature` for which the geometry is a `LineString`, you can then use it with the `FeatureCollection`, `GeoJsonSource`, and `LineLayer` objects.

This is called *data-driven styling*. For more information about how data-driven styling can be used in a map, see [the data-driven styling guide](/android/maps/overview/data-driven-styling/).

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/javaservices/DirectionsActivity.java"
    title="Directions"
    category="example"
    text="Request and receive a Directions API route between two locations."
  />
}}
