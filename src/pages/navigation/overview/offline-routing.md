---
title: "Offline Routing"
description: "Mapbox offline navigation provides routing functionality from the Navigation SDK for Android in non-connected environments."
prependJs:
  - "import { NAVIGATION_VERSION } from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
---

{{ <Note title="Downloading offline routing packs" imageComponent={<BookImage width="60" height="60" />}>

<p>Offline routing pack downloads are restricted to Mapbox Enterprise customers. If you're interested in moving to an Enterprise plan, <a href="https://www.mapbox.com/contact/sales/">contact us!</a></p>
</Note>
}}
Mapbox offline navigation provides routing functionality from the Navigation SDK in non-connected environments. In areas of no cellular connectivity, or on a device with no SIM card, end users can use turn-by-turn navigation and request new routes. If they go off-route, the system can reroute and keep them headed to their destination without requiring network connectivity. Offline routing moves the routing engine and the routing data from the server onto the end user’s device, so there’s no need to make HTTP API calls for routing information.

In order to implement offline routing in your own app, you will need to:
1. Add the offline dependency to your app.
1. Update your app to use `MapboxOfflineRouter.downloadTiles`, which allows the app to download the data needed for offline routing.
1. Initialize `MapboxOfflineRouter`.
1. Update your app to use `MapboxOfflineRouter.findRoute` to get a `DirectionsRoute`.

These steps, along with example code, are described in this guide. For detailed information about the methods discussed in this guide, see the [`MapboxOfflineRouter` documentation](https://docs.mapbox.com/android/api/navigation-sdk/navigation/{{NAVIGATION_VERSION}}/com/mapbox/services/android/navigation/v5/navigation/MapboxOfflineRouter.html).

## Download the routing data
Before you download data, first you will need to determine which tile version to download using `MapboxOfflineRouter.fetchAvailableTileVersions`:

#### Example use
{{
<CodeLanguageToggle id="determine-tile-version" />
<ToggleableCodeBlock

java={`
offlineRouter.fetchAvailableTileVersions(Mapbox.getAccessToken(), new OnTileVersionsFoundCallback() {
  @Override
  public void onVersionsFound(List<String> availableVersions) {
    // Choose an available version for downloading tiles
  }

  @Override
  public void onError(@NonNull OfflineError error) {
    Toast.makeText(getApplicationContext(), "Unable to get versions", Toast.LENGTH_LONG).show();
  }
});
`}

kotlin={`
offlineRouter.fetchAvailableTileVersions(Mapbox.getAccessToken(), object : OnTileVersionsFoundCallback() {
  fun onVersionsFound(availableVersions: List<String>) {
    // Choose an available version for downloading tiles
  }

  fun onError(error: OfflineError) {
    Toast.makeText(applicationContext, "Unable to get versions", Toast.LENGTH_LONG).show()
  }
})
`}

/>
}}

Next, you will update your app to use `MapboxOfflineRouter.downloadTiles` to get the data needed for routing in the desired region. The `MapboxOfflineRouter.downloadTiles` method takes an `OfflineTiles` and a `RouteTileDownloadListener`.

#### Example use
{{
<CodeLanguageToggle id="download-routing-data" />
<ToggleableCodeBlock

java={`
OfflineTiles builder = OfflineTiles.builder()
    .accessToken(Mapbox.getAccessToken())
    .version(versionString)
    .boundingBox(boundingBox);

MapboxOfflineRouter offlineRouter = MapboxOfflineRouter(offlinePath)

offlineRouter.downloadTiles(builder.build(), new RouteTileDownloadListener() {

  @Override
  public void onError(@NonNull OfflineError error) {
    // Will trigger if an error occurs during the download
  }

  @Override
  public void onProgressUpdate(int percent) {
    // Will update with percent progress of the download
  }

  @Override
  public void onCompletion() {
    // Download has completed
  }
});
`}

kotlin={`
val builder = OfflineTiles.builder()
    .accessToken(Mapbox.getAccessToken())
    .version(versionString)
    .boundingBox(boundingBox)

val offlineRouter = MapboxOfflineRouter(offlinePath)

offlineRouter.downloadTiles(builder.build(), this)

offlineRouter.downloadTiles(builder.build(), object : RouteTileDownloadListener {

    override fun onError(error: OfflineError) {
      // Will trigger if an error occurs during the download
    }

    override fun onProgressUpdate(percent: Int) {
      // Will update with percent progress of the download
    }

    override fun onCompletion() {
      // Download has completed
    }
})
`}

/>
}}

The offline dataset that is downloaded includes data for the following modes of travel: driving, cycling, and walking.

## Configure MapboxOfflineRouter with offline data
`MapboxOfflineRouter` has a `public` method `MapboxOfflineRouter#configure(String version, OnOfflineTilesConfiguredCallback callback)`. This method indexes all of the data present on a device at the time the method is called. This means it must be called on every `MapboxOfflineRouter` object before requesting a route. You must wait for the callback to return before requesting a route.

#### Example use
{{
<CodeLanguageToggle id="configure-offline-router" />
<ToggleableCodeBlock

java={`
MapboxOfflineRouter offlineRouter = new MapboxOfflineRouter(offlinePath);
offlineRouter.configure(versionString, new OnOfflineTilesConfiguredCallback() {

  @Override
  public void onConfigured(int numberOfTiles) {
    // Fetch offline route
  }

  @Override
  public void onConfigurationError(@NonNull OfflineError error) {
    // Report error
  }
});
`}

kotlin={`
val offlineRouter = MapboxOfflineRouter(offlinePath)
offlineRouter.configure(version, object : OnOfflineTilesConfiguredCallback {

  override fun onConfigured(numberOfTiles: Int) {
    Timber.d("Offline tiles configured: $numberOfTiles")
    // Fetch offline route
  }

  override fun onConfigurationError(error: OfflineError) {
    Timber.d("Offline tiles configuration error: {$\{error.message}\}")
  }
})
`}

/>
}}

## Find an offline DirectionsRoute
Update your app to use the `MapboxOfflineRouter.findRoute` method to create a `DirectionsRoute`. This method takes a `OfflineRoute` class and a `RouteFoundCallback`. The callback will be called with either a route or an error.

#### Example use
{{
<CodeLanguageToggle id="find-offline-route" />
<ToggleableCodeBlock

java={`
NavigationRoute.Builder onlineRouteBuilder = NavigationRoute.builder(this)
  .origin(origin)
  .destination(destination)
  .accessToken(accessToken);

OfflineRoute offlineRoute = OfflineRoute.builder(onlineRouteBuilder).build();
offlineRouter.findRoute(offlineRoute, new OnOfflineRouteFoundCallback() {
  @Override
  public void onRouteFound(@NonNull DirectionsRoute route) {
    // Start navigation with route
  }

  @Override
  public void onError(@NonNull OfflineError error) {
    // Handle route error
  }
});
`}

kotlin={`
val onlineRouteBuilder = NavigationRoute.builder(this)
  .origin(origin)
  .destination(destination)
  .accessToken(accessToken)
val offlineRoute = OfflineRoute.builder(onlineRouteBuilder).build()
offlineRouter.findRoute(offlineRoute, object : OnOfflineRouteFoundCallback {
  override fun onRouteFound(route: DirectionsRoute) {
    // Start navigation with route
  }

  override fun onError(error: OfflineError) {
    // Handle route error
  }
})
`}

/>
}}

## Rerouting
When the SDK detects that the user has diverged from the route, `MapboxOfflineRouter` can be used to find a new route to their original destination. Having routing data on the client device means new routes are generated without having to go back to the server to calculate and retrieve a route. As long as the user is still within the boundaries of the offline routing data they can trigger a re-route event or request a new route anywhere within the dataset.

#### Example re-route scenario with MapboxNavigation
{{
<CodeLanguageToggle id="offline-reroute-mapbox-navigation" />
<ToggleableCodeBlock

java={`
navigation.addOffRouteListener(new OffRouteListener() {
  @Override
  public void userOffRoute(Location location) {
    ...
    OfflineRoute offlineRoute = OfflineRoute.builder(onlineRouteBuilder).build();
    offlineRouter.findRoute(offlineRoute, new OnOfflineRouteFoundCallback() {
      @Override
      public void onRouteFound(@NonNull DirectionsRoute route) {
        // Call MapboxNavigation#startNavigation with successful response
      }

      @Override
      public void onError(@NonNull OfflineError error) {
        // Handle route error
      }
    });
  }
});
`}

kotlin={`
navigation.addOffRouteListener { location ->
  ...
  val offlineRoute = OfflineRoute.builder(onlineRouteBuilder).build()
  offlineRouter.findRoute(offlineRoute, object : OnOfflineRouteFoundCallback {
    override fun onRouteFound(route: DirectionsRoute) {
      // Call MapboxNavigation#startNavigation with successful response
    }

    override fun onError(error: OfflineError) {
      // Handle route error
    }
  })
}
`}
/>
}}

#### Example re-route scenario with NavigationView
{{
<CodeLanguageToggle id="offline-reroute-navigation-view" />
<ToggleableCodeBlock

java={`
@Override
public boolean allowRerouteFrom(Point offRoutePoint) {

  // Fetch new route with MapboxOfflineRouter

  // Create new options with offline route
  NavigationViewOptions options = NavigationViewOptions.builder()
    .directionsRoute(offlineDirectionsRoute)
    .build();
  navigationView.startNavigation(options);

  // Ignore internal routing, allowing offline route
  return false;
}
`}

kotlin={`
override fun allowRerouteFrom(offRoutePoint: Point): Boolean {

	// Fetch new route with MapboxOfflineRouter

	// Create new options with offline route
	val options = NavigationViewOptions.builder()
		.directionsRoute(offlineDirectionsRoute)
		.build()

	navigationView.startNavigation(options)

	 // Ignore internal routing, allowing offline route
	return false
}
`}
/>
}}


## Estimated local storage and memory benchmarks
In addition to the storage required by the routing data, the device will also need to to store the map data needed for visual display. For more information on managing offline download size, see the [Offline maps troubleshooting guide](https://www.mapbox.com/help/mobile-offline/).

### Local storage
The road network density of given geographic areas varies widely, but we have provided a list of benchmark estimates below, created via a bounding box encompassing the region listed. As the data needs to be uncompressed on disk for faster routing, non-compressed estimates are shown. Download sizes will be smaller after compression.

Example region size |	Routing data	| Map data (z1-7,12)
--- | --- | ---
Washington, DC |	41MB |	120B
San Francisco (city and county) |	57MB |	20MB
California |	377MB |	400MB
New York (state) |	475MB |	300MB
USA (minus HI and AK) |	3.8GB |	5GB
United Kingdom | 663MB |	290MB

### Memory
For a typical route calculation in a geographic area, the amount of memory needed will vary depending on the complexity of route generation in that area. The following estimates were created using data from some of the largest cities to give a worst-case value.

Region size |	RAM needed
--- | ---
San Francisco (city and county) |	100MB
California |	150MB
USA (minus HI and AK) |	250MB
