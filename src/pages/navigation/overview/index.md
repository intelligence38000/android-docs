---
title: "Introduction"
description: "Official documentation and overview of the Mapbox Navigation SDK for Android."
prependJs:
  - "import OverviewHeader from '@mapbox/dr-ui/overview-header';"
  - "import AppropriateImage from '../../../components/appropriate-image';"
  - "import constants from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

{{
    <OverviewHeader
      features={[
        "Off-route Detection",
        "Timed Instructions",
        "Snap-to-Route",
        "Route Progress Information",
        "Traffic Routing"
      ]}
      title="Navigation SDK for Android"
      version={constants.NAVIGATION_VERSION}
      changelogLink="https://github.com/mapbox/mapbox-navigation-android/blob/master/CHANGELOG.md"
      ghLink="https://github.com/mapbox/mapbox-navigation-android"
      image={<AppropriateImage imageId="overviewNavigationSdk" alt="Mobile devices displaying applications using the Mapbox Navigation SDK for Android." />}
    />
}}

The Navigation SDK for Android allows you to build a complete in-app navigation experience. With the Navigation SDK you get the power of the [Mapbox Directions API](https://www.mapbox.com/api-documentation/navigation/#directions) along with a collection of features that are critical when building navigation applications for Android, including:

- Detecting the direction a device is facing and start the route accordingly
- Providing voice instruction announcements
- Displaying real-time user progress to their destination
- Detecting when a user goes off-route
- Specifying which side of the road to approach a waypoint


## Install the Navigation SDK

You'll need to add the Navigation SDK as a dependency before developing your app with the Navigation SDK. Note that while we show how to insert the stable version of the SDK inside your project, you can also use the nightly build/SNAPSHOT or the beta version if one is available. Find more information about how to do this inside [the Navigation SDK's GitHub repository](https://github.com/mapbox/mapbox-navigation-android/#using-snapshots).

###  1. Add the dependency

1. Start Android Studio
2. Open up your app's `build.gradle` file
3. Make sure that your project's `minSdkVersion` is at API 14 or higher
4. Under dependencies, add a new build rule for the latest `mapbox-android-navigation`
5. Click the `Sync Project with Gradle Files` near the toolbar in Studio.

```groovy
repositories {
  mavenCentral()
  maven { url 'https://mapbox.bintray.com/mapbox' }
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-navigation:{{constants.NAVIGATION_VERSION }}'
}
```

### 2. Get an access token

If you don't have a Mapbox account: [sign up](https://www.mapbox.com/signup/), navigate to your [Account page](https://www.mapbox.com/account/), and copy your **default public token** to your clipboard. After you've added the Navigation SDK as a dependency inside your Android project, open the `string.xml` file, create a new string, and paste the access token. Then, pass this into the Navigation SDK.

{{
<CodeLanguageToggle id="access-token" />
<ToggleableCodeBlock

java={`
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);

  MapboxNavigation navigation = new MapboxNavigation(context, MAPBOX_ACCESS_TOKEN);

  ...

}
`}

kotlin={`
override fun onCreate(savedInstanceState: Bundle?) {
	super.onCreate(savedInstanceState)

	val navigation = MapboxNavigation(context, MAPBOX_ACCESS_TOKEN)

	...
}
`}

/>
}}


### 3. Setup permissions

The Navigation SDK makes use of the Android manifest merge feature to reduce the need to include any Navigation SDK requirements inside your application's manifest file. You'll need to include either the Fine or Coarse location permission for navigation to work properly. The user location permission should also be checked during runtime using the PermissionManager if your app targets the Android API 23 or higher.

For best navigation results, we strongly recommend using the fine location permission, which gives a more precise fix on the user's current location.

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 4. Request a route

Now that you have created a way for the `MapboxNavigation` object to get the user's location, you can create a route using `NavigationRoute`. Pass in an origin, destination, and a callback to handle the response. Inside the `onResponse`, you can draw the directions route on a map or show time and distance using the full directions response.

{{
<CodeLanguageToggle id="route-request" />
<ToggleableCodeBlock

java={`
// From Mapbox to The White House
Point origin = Point.fromLngLat(-77.03613, 38.90992);
Point destination = Point.fromLngLat(-77.0365, 38.8977);

NavigationRoute.builder(context)
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.origin(origin)
	.destination(destination)
	.build()
	.getRoute(new Callback<DirectionsResponse>() {
		@Override
		public void onResponse(Call<DirectionsResponse> call, Response<DirectionsResponse> response) {

		}

		@Override
		public void onFailure(Call<DirectionsResponse> call, Throwable t) {

		}
	});
`}

kotlin={`
// From Mapbox to The White House
val origin = Point.fromLngLat(-77.03613, 38.90992)
val destination = Point.fromLngLat(-77.0365, 38.8977)

NavigationRoute.builder(context)
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.origin(origin)
	.destination(destination)
	.build()
	.getRoute(object : Callback<DirectionsResponse> {
		override fun onResponse(call: Call<DirectionsResponse>, response: 		Response<DirectionsResponse>) {

		}

		override fun onFailure(call: Call<DirectionsResponse>, t: Throwable) {

		}
	})
`}

/>
}}

## Get the user’s location

Navigation applications often use the user's current location as the `origin` when requesting a route. With the Navigation SDK, this is done using the `LocationEngine` class. For detailed instructions on how to use this class, [see the `LocationEngine` documentation](https://docs.mapbox.com/android/core/overview/#locationengine).

You can set up an instance of a `LocationEngine` and pass it to the `MapboxNavigation` object. This is not required - the SDK will create a default `LocationEngine` with `LocationEngineProvider#getBestLocationEngine` if an engine is not passed before navigation is started.  

{{
<CodeLanguageToggle id="nav-location-engine" />
<ToggleableCodeBlock

java={`
LocationEngine locationEngine = LocationEngineProvider.getBestLocationEngine(context);
navigation.setLocationEngine(locationEngine);
`}

kotlin={`
val locationEngine = LocationEngineProvider.getBestLocationEngine(context)
navigation.locationEngine = locationEngine
`}

/>
}}

You can also pass a `LocationEngineRequest` to `MapboxNavigation`, specifying parameters such as update frequency or preferred accuracy. This is also not required - the SDK will create a default `LocationEngineRequest` with parameters suitable for navigation if a request is not passed before navigation is started.  

{{
<CodeLanguageToggle id="nav-location-request" />
<ToggleableCodeBlock

java={`
LocationEngineRequest locationEngineRequest = new LocationEngineRequest.Builder(DEFAULT_INTERVAL_IN_MILLISECONDS)
		.setPriority(LocationEngineRequest.PRIORITY_HIGH_ACCURACY)
		.setMaxWaitTime(DEFAULT_MAX_WAIT_TIME)
    .build();

navigation.setLocationEngineRequest(locationEngineRequest);
`}

kotlin={`
val locationEngineRequest = LocationEngineRequest.Builder(DEFAULT_INTERVAL_IN_MILLISECONDS)
		.setPriority(LocationEngineRequest.PRIORITY_HIGH_ACCURACY)
		.setMaxWaitTime(DEFAULT_MAX_WAIT_TIME)
    .build()

navigation.setLocationEngineRequest(locationEngineRequest)
`}

/>
}}

## Replaying a DirectionsRoute

The SDK includes a `ReplayRouteLocationEngine`, which allows you to replay a given `DirectionsRoute` (mainly for testing, so you don't always have to code in a car). After retrieving a `DirectionsRoute`, you can create a replay engine and pass it to `MapboxNavigation`:

{{
<CodeLanguageToggle id="nav-replay-engine" />
<ToggleableCodeBlock

java={`
MapboxNavigation navigation = ...
DirectionsRoute routeToReplay = ...

ReplayRouteLocationEngine replayEngine = new ReplayRouteLocationEngine();
replayEngine.assign(routeToReplay);

navigation.setLocationEngine(replayEngine);
navigation.startNavigation(routeToReplay);
`}

kotlin={`
val navigation = ...
val routeToReplay = ...

ReplayRouteLocationEngine replayEngine = ReplayRouteLocationEngine()
replayEngine.assign(routeToReplay)

navigation.locationEngine = replayEngine
navigation.startNavigation(routeToReplay)
`}

/>
}}

## Localize text and voice instructions

Turn instructions are announced in the user interface language when turn instructions are available in that language. If instructions are not available in the user interface language, they are announced in English. To have instructions announced in a language other than the user interface language, set the `NavigationRoute.Builder#language` property when calculating the route with which to start navigation.

Turn instructions are primarily designed to be announced by either the Mapbox Voice API (powered by [Amazon Polly](https://docs.aws.amazon.com/polly/latest/dg/SupportedLanguage.html)) or [TextToSpeech](https://developer.android.com/reference/android/speech/tts/TextToSpeech). By default, this SDK uses the Mapbox Voice API, which requires an Internet connection at various points along the route. If the Voice API lacks support for the turn instruction language or there is no Internet connection, TextToSpeech announces the instructions instead.

By default, distances are given in the predominant measurement system of the system region, which may not necessarily be the same region in which the user is traveling. To override the measurement system used in spoken instructions, set the `MapboxNavigationOptions.Builder#voiceUnits` property when calculating the route with which to start navigation.

{{
<CodeLanguageToggle id="override-measurements" />
<ToggleableCodeBlock

java={`
// Override measurement system in spoken instructions
NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin, bearing, tolerance)
    .destination(destination)
    .voiceUnits(DirectionsCriteria.IMPERIAL)
    .build();
`}

kotlin={`
// Override measurement system in spoken instructions
NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin, bearing, tolerance)
    .destination(destination)
    .voiceUnits(DirectionsCriteria.IMPERIAL)
    .build()
`}

/>
}}

The upcoming road or ramp destination is named according to the local or national language. In some regions, the name may be given in multiple languages.

### Supported languages

The table below lists the languages that are supported for user interface elements and for spoken instructions.

| Language   | User interface | [Spoken instructions][apidoc] | Remarks
|------------|:--------------:|:-----------------------------:|--------
| Bengali    | ✅             | —
| Burmese    | ✅             | ✅ | Depends on the device; may require third-party text-to-speech
| Chinese    | -              | ✅ Mandarin | Depends on the device; may require third-party text-to-speech
| Czech      | ✅             | -
| Danish     | ✅             | ✅
| English    | ✅             | ✅
| Esperanto  | —              | ✅
| Finnish    | —              | ✅ | Depends on the device; may require third-party text-to-speech
| French     | ✅             | ✅
| German     | ✅             | ✅
| Hebrew     | ✅             | ✅ | Depends on the device; may require third-party text-to-speech
| Indonesian | —              | ✅ | Depends on the device; may require third-party text-to-speech
| Italian    | ✅             | ✅
| Korean     | ✅             | ✅
| Norwegian  | —              | ✅
| Polish     | —              | ✅
| Portuguese | ✅             | ✅
| Romanian   | —              | ✅
| Russian    | ✅             | ✅
| Spanish    | ✅             | ✅
| Swedish    | ✅             | ✅
| Turkish    | —              | ✅
| Ukrainian  | ✅              | ✅ | Depends on the device; may require third-party text-to-speech
| Vietnamese | ✅              | ✅ | Depends on the device; may require third-party text-to-speech

**Please note:** For languages marked with `Depends on the device; may require third-party text-to-speech`, instructions are provided by the SDK, but we cannot guarantee the given device will have the appropriate `TextToSpeech` speech engine installed to pronounce these instructions correctly.

### Contributing to localization

See the [contributing guide](https://github.com/mapbox/mapbox-navigation-ios/blob/master/CONTRIBUTING.md#adding-or-updating-a-localization) for instructions on adding a new localization or improving an existing localization.

[apidoc]: https://www.mapbox.com/api-documentation/navigation/#instructions-languages

## Customize route requests

### Request routes in a specific direction

Consider the direction a user’s device is facing, and request a route starting in a specific direction. To receive a route that starts off in the same direction the user is already traveling, pass in the user’s location bearing value (between 0 and 355 degrees).

If you need to request a route that's continuing along the path that the user is traveling, specify a bearing and a tolerance that determines how far you are willing to deviate from the provided bearing. This is useful for off-route scenarios.

This can be applied to the origin, waypoints, and the destination using `NavigationRoute`:

{{
<CodeLanguageToggle id="location-object" />
<ToggleableCodeBlock

java={`
// An Android Location object
double bearing = Float.valueOf(location.getBearing()).doubleValue();
double tolerance = 90d;
NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin, bearing, tolerance)
    .destination(destination)
    .build();
`}

kotlin={`
// An Android Location object
val bearing = location.bearing.toDouble()
val tolerance = 90.0
NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin, bearing, tolerance)
    .destination(destination)
    .build()
`}

/>
}}

### Specify which side of the road to approach

You can indicate from which side of the road to approach a waypoint by adding `approaches` to the `NavigationRoute` builder. There are three options found in `DirectionsCriteria.ApproachesCriteria`:

- `"unrestricted"` (default): the route can approach waypoints from either side of the road.
- `"curb"`: the route will be returned so that on arrival, the waypoint will be found on the side that corresponds with the `driving_side` of the region in which the returned route is located.
- `null`: if no option is specified, it is translated internally to `""`, which has the same result as setting an approach to `"unrestricted"`.

If provided, the list of approaches must be the same length as the list of waypoints (including the `origin` and the `destination`) and in that particular order i.e. `origin`, waypoints, `destination`.

If a re-route occurs and `approaches` were used to fetch the `DirectionsRoute` that was originally provided to the `NavigationView`, the new route fetched will take the same `approaches` criteria into account.

{{
<CodeLanguageToggle id="nav-approaches" />
<ToggleableCodeBlock

java={`
NavigationRoute.Builder builder = NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin)
    .addWaypoint(pickup)
    .destination(destination);

builder.addApproaches("unrestricted", "curb", "curb");
builder.build();
`}

kotlin={`
val builder = NavigationRoute.builder(context)
  .accessToken(MAPBOX_ACCESS_TOKEN)
  .origin(origin)
  .addWaypoint(pickup)
  .destination(destination!!)

builder.addApproaches("unrestricted", "curb", "curb")
builder.build()
`}

/>
}}

### Include multiple stops

If your navigation involves a bunch of pick-up and drop-off points, you can add up to 25 coordinates to the `NavigationRoute` builder; these are considered stops in between the origin and destination `Points` (in the order that you add them - first waypoint is the first stop):

{{
<CodeLanguageToggle id="route-builder" />
<ToggleableCodeBlock

java={`
NavigationRoute.Builder builder = NavigationRoute.builder(context)
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.origin(origin)
	.destination(destination);

for (Point waypoint : waypoints) {
  builder.addWaypoint(waypoint);
}

builder.build();
`}

kotlin={`
val builder = NavigationRoute.builder(context)
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.origin(origin)
	.destination(destination)

for (waypoint in waypoints) {
	builder.addWaypoint(waypoint)
}

builder.build()
`}

/>
}}

## Customize the navigation experience

### Change default behaviors

You will find most of the navigation APIs inside the `MapboxNavigation` class such as starting and ending the navigation session or attaching listeners. Assign and initialize a new instance of `MapboxNavigation` inside your navigation activity. When initializing, you'll need to pass in a `Context` and your Mapbox access token. Read the access token section in this getting started document to learn how to get a free access token.

{{
<CodeLanguageToggle id="nav-object" />
<ToggleableCodeBlock

java={`
MapboxNavigation navigation = new MapboxNavigation(context, MAPBOX_ACCESS_TOKEN);
`}

kotlin={`
val navigation = MapboxNavigation(context, MAPBOX_ACCESS_TOKEN)
`}

/>
}}

You can also optionally pass in a `MapboxNavigationOptions` object if you’d like to change the default behavior of the navigation SDK. Note that many of the options offered must be set before the `MapboxNavigation` object is initialized.

### Control notifications and location updates

The `onRunning` callback's helpful for being notified when the navigation session has started, the user has canceled the session, or the user has arrived at their final destination. From this information, you can decide when to show navigation notifications, know when it's safe to stop requesting user location updates, and much more.

{{
<CodeLanguageToggle id="nav-navigation-running" />
<ToggleableCodeBlock

java={`
navigation.addNavigationEventListener(new NavigationEventListener() {
  @Override
  public void onRunning(boolean running) {

  }
});
`}

kotlin={`
navigation?.addNavigationEventListener { running ->

}
`}

/>
}}

## Prevent memory leaks

Inside your application's activity, you'll want to override the onDestroy lifecycle method, end the navigation session (if running) and use the `MabpoxNavigation#onDestroy` method. Doing this prevents any memory leaks and ensures proper shutdown of the service.

{{
<CodeLanguageToggle id="nav-stop-navigation" />
<ToggleableCodeBlock

java={`
@Override
protected void onDestroy() {
  super.onDestroy();

	// End the navigation session
	navigation.stopNavigation();
	navigation.onDestroy();
}
`}

kotlin={`
override fun onDestroy() {
  super.onDestroy()

	// End the navigation session
	navigation.stopNavigation()
	navigation.onDestroy()
}
`}

/>
}}
