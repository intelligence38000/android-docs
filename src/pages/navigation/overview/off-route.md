---
title: "Off-route detection"
description: "The Mapbox Navigation SDK for Android offers off-route detection for your Android app's navigation experience. Read this documentation to learn how."
products:
  - Navigation core
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

Upon loading a new route and if the `DirectionsRoute` JSON is valid, route-following will start in the `RouteProgressState#INITIALIZED` state. From there, route-following will attempt to gain confidence that the GPS locations being passed to the device, are actually the location where the user is. To establish this trust, at least a few location updates need to be delivered and they must be consecutively coherent in both time and space. While it is in the process of establishing this trust, the route-following logic will report that it's still in the `RouteProgressState#INITIALIZED` state.

Once trust of the user's current stream of location updates has been established, route-following will attempt to measure the user's progress along the currently loaded route. If the user's location is found to be unreasonably far from the route itself, the state is flipped to the `RouteProgressState#OFFROUTE` state.

If the user's current location is within a reasonable distance from the currently loaded route but not close enough to be considered on-route (`RouteProgressState#TRACKING`), the `RouteProgressState#INITIALIZED` state will be return until user to makes their way to the route. We call this "corralling". Corralling allows a user, in the user's driveway or a store's parking lot for example, to load up a route and not immediately get marked as `RouteProgressState#OFFROUTE`.

If the user continually makes progress away from the route the user will eventually be marked `OFFROUTE`.

The `OffRouteListener` can be used to handle reroute events. Listen for when a user goes off route using the `OffRouteListener`, fetch a new `DirectionsRoute`, and use `MapboxNavigation#startNavigation(DirectionsRoute)` with the fresh route to restart navigation.

{{
<CodeLanguageToggle id="off-route-callback" />
<ToggleableCodeBlock

java={`
navigation.addOffRouteListener(new OffRouteListener() {
  @Override
  public void userOffRoute(Location location) {
    NavigationRoute.builder(this)
      .accessToken(Mapbox.getAccessToken())
      .origin(newOrigin)
      .destination(destination)
      .build().getRoute(new Callback<DirectionsResponse>() {
        @Override
        public void onResponse(Call<DirectionsResponse> call, Response<DirectionsResponse> response) {
          // Update MapboxNavigation here with new route
          // MapboxNavigation#startNavigation
        }

        @Override
        public void onFailure(Call<DirectionsResponse> call, Throwable t) {

        }
       });
  }
});
`}

kotlin={`
navigation?.addOffRouteListener {
  NavigationRoute.builder(this)
  	.accessToken(Mapbox.getAccessToken()!!)
  	.origin(newOrigin)
  	.destination(destination)
  	.build().getRoute(object : Callback<DirectionsResponse> {
    	override fun onResponse(call: Call<DirectionsResponse>, response: Response<DirectionsResponse>) {
    	        // Update MapboxNavigation here with new route
    	        // MapboxNavigation#startNavigation
    	}

    	override fun onFailure(call: Call<DirectionsResponse>, t: Throwable) {

    	}
    })
}
`}
/>
}}

If you would like to provide your own implementation for `OffRoute` detection, you can replace the default `OffRouteDetector` class.
To do this, create your own class that extends from `OffRoute` and set this new class using `MapboxNavigation#setOffRouteEngine(OffRoute)`:

{{
<CodeLanguageToggle id="off-route-custom" />
<ToggleableCodeBlock

java={`
  OffRoute myOffRouteEngine = new OffRoute() {
    @Override
    public boolean isUserOffRoute(Location location, RouteProgress routeProgress, MapboxNavigationOptions options) {
      // User will never be off-route
      return false;
    }
  };
  // MapboxNavigation
  navigation.setOffRouteEngine(myOffRouteEngine);
`}

kotlin={`
  val myOffRouteEngine = object : OffRoute() {
    override fun isUserOffRoute(location: Location, routeProgress: RouteProgress, options: MapboxNavigationOptions): Boolean {
      // User will never be off-route
      return false
    }
  }
  // MapboxNavigation
  navigation.offRouteEngine = myOffRouteEngine
`}
/>
}}
