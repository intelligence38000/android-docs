---
title: "Off-route detection"
description: Learn how to use and customize off-route detection with the Mapbox Navigation SDK for Android for your Android app's navigation experience.
products:
  - Navigation SDK
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
---

The Navigation SDK provides information about whether a user's device is on the route that was generated. If a user is off-route, you can provide additional instruction to the user and generate a new route.

Off-route detection is not enabled by default in the Navigation SDK, but when you add an `OffRouteListener`, off-route detection will be enabled using default criteria for determining when a user is considered off-route and what to do next.

{{<Note title="Off-route detection and the Navigation UI SDK" imageComponent={<BookImage size="60" />}>}}
This guide does not describe any specific options in the Navigation UI SDK. You need to enable off-route detection using the core Navigation SDK directly.
{{</Note>}}

## `RouteProgressState`

The user's on or off-route status is tracked using `RouteProgressState`. There are three possible states:

- `RouteProgressState#INITIALIZED`
- `RouteProgressState#TRACKING`
- `RouteProgressState#OFFROUTE`

### Initialized

Upon loading a new route and if the `DirectionsRoute` JSON is valid, route-following will start in the `RouteProgressState#INITIALIZED` state. From there, route-following will try to gain confidence that the GPS locations being passed to the device are the user's location. To show this trust, at least a few location updates need to be delivered and they must be consecutively coherent in both time and space. While it is in the process of establishing this trust, the route-following logic will report that it's still in the `RouteProgressState#INITIALIZED` state.

### Tracking

Once the user's location is considered to be on-route, the state will change to `RouteProgressState#TRACKING`.


### Off-route

Once trust of the user's current stream of location updates has been established, route-following will try to measure the user's progress along the loaded route. If the user's location is found to be unreasonably far from the route, the state is flipped to the `RouteProgressState#OFFROUTE` state.

### Corralling

If the user's current location is within a reasonable distance from the loaded route but not close enough to be considered on-route (`RouteProgressState#TRACKING`), the `RouteProgressState#INITIALIZED` state will be returned until user to makes their way to the route. This is called "corralling". Corralling allows a user, in the user's driveway or a store's parking lot for example, to load up a route and not get marked as `RouteProgressState#OFFROUTE` at once.

If the user continually makes progress away from the route the user will eventually be marked `OFFROUTE`.

## `OffRouteListener`

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

## Further customization

If you would like to provide your own implementation for `OffRoute` detection, you can replace the default `OffRouteDetector` class. To do this, create your own class that extends from `OffRoute` and set this new class using `MapboxNavigation#setOffRouteEngine(OffRoute)`:

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
