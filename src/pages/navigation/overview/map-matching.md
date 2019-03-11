---
title: Custom routes
description: Use the Mapbox Map Matching API with the Mapbox Navigation SDK or Navigation UI SDK for Android.
products:
  - Navigation SDK
  - Navigation UI SDK
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

In some cases, you may want to have the user stick to a specific route that doesn't fit into the scope covered by the Mapbox Directions API. For example, a parking finder app where you want to guide a user past specific blocks with parking, but also allow people to navigate on it with the Mapbox Navigation SDK for Android. The Mapbox Map Matching API is an appropriate fit for this situation.

## Use a map matching response to generate a route

Map matching is the art of taking coordinates and aligning them along a road network. In the parking example above, you would provide coordinates to the device, the coordinates would be passed to the Mapbox Map Matching API, and then the API would return a route that can be used in the Navigation SDK for Android.

Here is an example of converting a `MapboxMapMatching` response into a `DirectionsRoute`:

{{
<CodeLanguageToggle id="nav-map-matching-response" />
<ToggleableCodeBlock

java={`
MapboxMapMatching.builder()
    .accessToken(Mapbox.getAccessToken())
    .coordinates(points)
    .steps(true)
    .voiceInstructions(true)
    .bannerInstructions(true)
    .profile(DirectionsCriteria.PROFILE_DRIVING)
    .build()
    .enqueueCall(new Callback<MapMatchingResponse>() {

    @Override
    public void onResponse(Call<MapMatchingResponse> call, Response<MapMatchingResponse> response) {
      if (response.isSuccessful()) {
        DirectionsRoute route = response.body().matchings().get(0).toDirectionRoute();
        navigation.startNavigation(route);
      }
    }

    @Override
    public void onFailure(Call<MapMatchingResponse> call, Throwable throwable) {

    }
  });
`}

kotlin={`
MapboxMapMatching.builder()
	.accessToken(Mapbox.getAccessToken()!!)
	.coordinates(points)
	.steps(true)
	.voiceInstructions(true)
	.bannerInstructions(true)
	.profile(DirectionsCriteria.PROFILE_DRIVING)
	.build()
	.enqueueCall(object : Callback<MapMatchingResponse> {

    override fun onResponse(call: Call<MapMatchingResponse>, response: Response<MapMatchingResponse>) {
        if (response.isSuccessful) {
            val route = response.body()!!.matchings()!![0].toDirectionRoute()
            navigation!!.startNavigation(route)
        }
    }

    override fun onFailure(call: Call<MapMatchingResponse>, throwable: Throwable) {

    }
})           
`}

/>
}}

## Navigation UI SDK

When using `MapboxMapMatching` with the Navigation UI SDK's `NavigationView`, you need to make a few changes to your setup to make sure re-routes are successful.  A `RouteListener` must be added to your `NavigationViewOptions` and you must return `false` in the `allowRerouteFrom` callback. This will make sure that the `NavigationView` does not make a Directions API request. Instead, it will wait for the new `DirectionsRoute` provided by your map matching response.

{{
<CodeLanguageToggle id="nav-map-matching-nav-view" />
<ToggleableCodeBlock

java={`
@Override
public boolean allowRerouteFrom(Point offRoutePoint) {

  // Fetch new route with MapboxMapMatching

  // Create new options with map matching response route
  NavigationViewOptions options = NavigationViewOptions.builder()
    .directionsRoute(mapMatchingDirectionsRoute)
    .build();
  navigationView.startNavigation(options);

  // Ignore internal routing, allowing MapboxMapMatching call
  return false;
}
`}

kotlin={`
override fun allowRerouteFrom(offRoutePoint: Point): Boolean {

  // Fetch new route with MapboxMapMatching

  // Create new options with map matching response route
  val options = NavigationViewOptions.builder()
    .directionsRoute(mapMatchingDirectionsRoute)
    .build()

  navigationView.startNavigation(options)

  // Ignore internal routing, allowing MapboxMapMatching call
  return false
}
`}
/>
}}

## Map matching with MapboxNavigation

In the core Navigation SDK, `MapboxMapMatching` requests replace `NavigationRoute` requests. To start navigation initially or to restart navigation after an off-route event has been fired, you can make a map matching request and then convert the `MapMatchingMatching` response to a `DirectionsRoute` with `MapMatchingMatching#toDirectionRoute`.

{{
<CodeLanguageToggle id="nav-map-matching-off-route" />
<ToggleableCodeBlock

java={`
navigation.addOffRouteListener(new OffRouteListener() {
  @Override
  public void userOffRoute(Location location) {
    // Make the Map Matching request here
    // Call MapboxNavigation#startNavigation with successful response
  }
});
`}

kotlin={`
navigation?.addOffRouteListener { location ->

	// Make the Map Matching request here
	// Call MapboxNavigation#startNavigation with successful response

}
`}

/>
}}
