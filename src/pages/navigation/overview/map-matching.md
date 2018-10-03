---
title: "Map Matching with Navigation"
description: "Using Map Matching with the Navigation SDK"
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

In some cases, you may want to have the user stick to a very specific route that doesn't fit into the scope covered by the Mapbox Directions API. For example, a company would like to use its own custom truck routing API, but also allow people to navigate on it with the Mapbox Navigation SDK for Android. The Mapbox Map Matching API is an appropriate fit for this situation.

Map Matching is the art of taking coordinates and aligning them along a road network. In the truck example above, a truck routing API would deliver coordinates to the device, the coordinates would be passed to the Mapbox Map Matching API, and then the API would return a route that can be used in the Navigation SDK for Android.

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


There are several rules you must adhere to when using the Map Matching API with the Navigation SDK for Android:

### Map Matching with MapboxNavigation

In the `libandroid-navigation` module of the Navigation SDK for Android, `MapboxMapMatching` requests will replace your `NavigationRoute` requests.

To start navigation initially or to restart navigation after an off-route event has been fired, you can make
a map matching request and then convert the `MapMatchingMatching` response to a `DirectionsRoute` with `MapMatchingMatching#toDirectionRoute`.

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


### Map Matching with NavigationView

When using `MapboxMapMatching` with the `NavigationView`, you need to make a few changes to your
setup to ensure re-routes are successful.  A `RouteListener` must be added to your `NavigationViewOptions`
and you must return `false` in the `allowRerouteFrom` callback. This will ensure that the `NavigationView`
does not make a Directions API request. Instead, it will wait for the new `DirectionsRoute` provided by your
map matching response.

{{
<CodeLanguageToggle id="nav-map-matching-nav-view" />
<ToggleableCodeBlock

java={`
@Override
public boolean allowRerouteFrom(Point offRoutePoint) {
  return false;
  
  // Fetch new route with MapboxMapMatching

  // Create new options with map matching response route
  NavigationViewOptions options = NavigationViewOptions.builder()
    .directionsRoute(mapMatchingDirectionsRoute)
    .build();
  navigationView.startNavigation(options);
}
`}

kotlin={`
override fun allowRerouteFrom(offRoutePoint: Point): Boolean {
return false

	// Fetch new route with MapboxMapMatching
	
	// Create new options with map matching response route
	val options = NavigationViewOptions.builder()
		.directionsRoute(mapMatchingDirectionsRoute)
		.build()
	
	navigationView.startNavigation(options)
}
`}

/>
}}
