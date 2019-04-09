---
title: Offline routing
description: Mapbox offline navigation provides routing functionality from the Navigation SDK for Android in non-connected environments.
products:
  - Navigation SDK
prependJs:
  - "import constants from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
contentType: guide
language:
- Java
- Kotlin
---

{{<Note title="Downloading offline routing packs" imageComponent={<BookImage size="60" />}>}}
Access to offline routing is restricted to Mapbox Enterprise customers. If you're interested in moving to an Enterprise plan, [contact us](https://www.mapbox.com/contact/sales/).
{{</Note>}}

Mapbox offline navigation provides routing functionality from the Navigation SDK in non-connected environments. In areas of no cellular connectivity, or on a device with no SIM card, end users can use turn-by-turn navigation and request new routes. If they go off-route, the system can reroute and keep them headed to their destination without requiring network connectivity. Offline routing moves the routing engine and the routing data from the server onto the end user’s device, so there’s no need to make HTTP API calls for routing information.

For detailed information about the methods discussed in this guide, see the [`MapboxOfflineRouter` documentation](https://docs.mapbox.com/android/api/navigation-sdk/navigation/{{constants.NAVIGATION_VERSION}}/com/mapbox/services/android/navigation/v5/navigation/MapboxOfflineRouter.html).

## Test offline routing
Offline routing is restricted to Enterprise customers, and you need to get an Enterprise API token to download offline routing tiles for arbitrary regions. If you do not have an Enterprise access token but want to try out the feature and begin your integration, you can download routing tiles and generate routes on the _Faroe Islands_. If you don't have an Enterprise API token and try to download offline routing tiles for any region other than the Faroe Islands, you will receive an `HTTP 402` response.

## Offline maps and offline routing
To use offline routing with the Navigation SDK, we recommend that you also download offline map tiles with the Maps SDK for Android. The Maps SDK enables you to create offline maps, access a list of offline maps stored on the device, and remove offline maps that are no longer needed. We recommend downloading offline map tiles for the optimal user experience, but you could instead allow your users to build up a local cache of map tiles passively as they use your app. For more information on how to download offline maps, see the [Offline maps documentation](https://docs.mapbox.com/android/maps/overview/offline/) in the Maps SDK for Android API reference.

## Integrate offline routing in your app
If you have [installed the Navigation SDK's navigation components](https://docs.mapbox.com/android/navigation/overview/#add-the-dependency-1), Android Studio will find the router class after you add the navigation dependency.

You must have permission to save files to use [`MapboxOfflineRouter`](https://docs.mapbox.com/android/api/navigation-sdk/navigation/{{constants.NAVIGATION_VERSION}}/com/mapbox/services/android/navigation/v5/navigation/MapboxOfflineRouter.html). For example:

```
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

Integrating offline routing in your app involves a few steps:

### Retrieve the list of available routing tile versions
Before you download data, first you need to determine which tile version to download using [`MapboxOfflineRouter.fetchAvailableTileVersions`](https://docs.mapbox.com/android/api/navigation-sdk/navigation/{{constants.NAVIGATION_VERSION}}/com/mapbox/services/android/navigation/v5/navigation/MapboxOfflineRouter.html#fetchAvailableTileVersions-java.lang.String-com.mapbox.services.android.navigation.v5.navigation.OnTileVersionsFoundCallback-).


Each routing tile version in the list is returned as a string that you can sort by date. Versions with more recent dates have newer data than older versions do.

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
offlineRouter.fetchAvailableTileVersions(Mapbox.getAccessToken(), object : OnTileVersionsFoundCallback {
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

### Initialize the offline router and download offline routing tiles

{{<Note title="Downloading offline routing packs" imageComponent={<BookImage size="60" />}>}}
If you have already downloaded routing tiles of a specific version, you should keep using that version to avoid having to download an area again. This behavior, though, can vary depending on your use-case. For example, if you have a good connection, want to get the freshest data every day, and only need a small routing tile area, then you should be fine downloading tiles again. But if you have downloaded routing tiles for a large area, like the whole eastern United States, and now want to download tiles for another large area, like the western United States, we suggest you download the second area using the same tile version you used for the first. Tile versions cannot be mixed, as connectivity between them is not guaranteed.
{{</Note>}}

During instantiation, `MapboxOfflineRouter` takes an `offlinePath` parameter, which must be a valid path to a file system location with write permissions. If you see the error `Error occurred downloading tiles: null file found`, this is likely the result of passing an arbitrary string to `MapboxOfflineRouter` as an `offlinePath`, rather than a fully-qualified path to a file system location with write permissions.

Next, you will update your app to use [`MapboxOfflineRouter.downloadTiles`](https://docs.mapbox.com/android/api/navigation-sdk/navigation/{{constants.NAVIGATION_VERSION}}/com/mapbox/services/android/navigation/v5/navigation/MapboxOfflineRouter.html#downloadTiles-com.mapbox.services.android.navigation.v5.navigation.OfflineTiles-com.mapbox.services.android.navigation.v5.navigation.RouteTileDownloadListener-), which allows the app to get the data it needs for offline routing in the desired region.

The `MapboxOfflineRouter.downloadTiles` method takes an [`OfflineTiles`](https://docs.mapbox.com/android/api/navigation-sdk/navigation/{{constants.NAVIGATION_VERSION}}/com/mapbox/services/android/navigation/v5/navigation/OfflineTiles.html) and a [`RouteTileDownloadListener`](https://docs.mapbox.com/android/api/navigation-sdk/navigation/{{constants.NAVIGATION_VERSION}}/com/mapbox/services/android/navigation/v5/navigation/RouteTileDownloadListener.html).

The Mapbox Navigation SDK for Android includes an example of downloading offline routing tiles in the Navigation SDK for Android [example app](https://github.com/mapbox/mapbox-navigation-android/blob/master/app/src/main/java/com/mapbox/services/android/navigation/testapp/activity/OfflineRegionDownloadActivity.kt). You can explore this example to see how to download offline routing tiles in an application.

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

The offline dataset that is downloaded includes data for the following modes of travel: `driving`, `cycling`, and `walking`.

Once the routing tile download is finished, the downloaded routing tiles are unpacked onto local storage.

### Configure `MapboxOfflineRouter` with offline data
`MapboxOfflineRouter` has a `public` method [`MapboxOfflineRouter#configure(String version, OnOfflineTilesConfiguredCallback callback)`](https://docs.mapbox.com/android/api/navigation-sdk/navigation/{{constants.NAVIGATION_VERSION}}/com/mapbox/services/android/navigation/v5/navigation/MapboxOfflineRouter.html#configure-java.lang.String-com.mapbox.services.android.navigation.v5.navigation.OnOfflineTilesConfiguredCallback-). This method indexes all the data present on a device at the time the method is called. This means it must be called on every `MapboxOfflineRouter` object before requesting a route. You must wait for the callback to return before requesting a route.

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

### Create an offline `DirectionsRoute`
Update your app to use the [`MapboxOfflineRouter.findRoute`](https://docs.mapbox.com/android/api/navigation-sdk/navigation/{{constants.NAVIGATION_VERSION}}/com/mapbox/services/android/navigation/v5/navigation/MapboxOfflineRouter.html#findRoute-com.mapbox.services.android.navigation.v5.navigation.OfflineRoute-com.mapbox.services.android.navigation.v5.navigation.OnOfflineRouteFoundCallback-) method to create a `DirectionsRoute`. This method takes a [`OfflineRoute`](https://docs.mapbox.com/android/api/navigation-sdk/navigation/{{constants.NAVIGATION_VERSION}}/com/mapbox/services/android/navigation/v5/navigation/OfflineRoute.html) class and a [`RouteFoundCallback`](https://docs.mapbox.com/android/api/navigation-sdk/navigation/{{constants.NAVIGATION_VERSION}}/com/mapbox/services/android/navigation/v5/navigation/OnOfflineRouteFoundCallback.html). The callback will be called with either a route or an error.

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
When the SDK detects that the user has diverged from the route, the app can use `MapboxOfflineRouter` to find a new route to the original destination. Having routing data on the client device means new routes are generated without having to go back to the server to calculate and retrieve a route. As long as the user is still within the boundaries of the offline routing data, they can trigger a re-route event or request a new route anywhere within the dataset.

#### Example re-route scenario with `MapboxNavigation`
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

#### Example re-route scenario with `NavigationView`
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
The device will need to store both the routing data and the map data needed for visual display. For more information on managing offline download size, see the [Offline maps troubleshooting guide](https://www.mapbox.com/help/mobile-offline/).

### Local storage
The road network density of given geographic areas varies widely, but we have provided a list of benchmark estimates below, created via a bounding box encompassing the region listed. As the data needs to be uncompressed on disk for faster routing, it shows non-compressed estimates. Download sizes will be smaller after compression.

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
