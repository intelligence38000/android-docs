---
title: "Introduction"
description: "Official documentation and overview of the Mapbox Navigation SDK for Android."
prependJs:
  - "import OverviewHeader from '@mapbox/dr-ui/overview-header';"
  - "import AppropriateImage from '../../../components/appropriate-image';"
  - "import { NAVIGATION_VERSION } from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
---

{{
  <div className="mb24">
    <OverviewHeader
      features={[
        "Off-route detection",
        "Timed instructions",
        "Snap-to-route",
        "Route progress information",
        "Traffic routing"
      ]}
      title="Navigation SDK for Android"
      version={NAVIGATION_VERSION}
      changelogLink="https://github.com/mapbox/mapbox-navigation-android/blob/master/CHANGELOG.md"
      ghLink="https://github.com/mapbox/mapbox-navigation-android"
      image={<AppropriateImage imageId="overviewNavigationSdk" alt="Mobile devices displaying applications using the Mapbox Navigation SDK for Android." />}
    />
  </div>
}}

The Navigation SDK for Android allows you to build a complete in-app navigation experience. With the Navigation SDK you get the power of the [Mapbox Directions API](https://docs.mapbox.com/api/navigation/#directions) along with a collection of features that are critical when building navigation applications for Android, including:

- Detecting the direction a device is facing and start the route accordingly
- Providing voice instruction announcements
- Displaying real-time user progress to their destination
- Detecting when a user goes off-route
- Specifying which side of the road to approach a waypoint

## Products

There are two products for integrating navigation into your Android application, the core Navigation SDK and Navigation UI SDK:

- The **Navigation SDK** is where the logic lives for generating routes, tracking progress, receiving instructions, and more. You can use this directly via the `MapboxNavigation` class or through the Navigation UI. 
- The **Navigation UI SDK** is built on top of the core Navigation SDK (meaning the Navigation SDK is included when you add the Navigation UI SDK as a dependency). It consumes data from the core Navigation SDK and arranges it in default UI components that have various customization options. You can use this directly via the `NavigationView` and `NavigationLauncher` classes without touching the core `MapboxNavigation` class directly in your application's code. 
- The core **Navigation SDK** and the **Navigation UI SDK** can be used together if you want to use a mixture of the Mapbox-provided UI components and your own custom UI fed data from the core Navigation SDK.


## Installation

You'll need to add the Navigation SDK or Navigation UI SDK as a dependency before developing your app. Note that while we show how to insert the stable version of the SDK inside your project, you can also use the nightly build/SNAPSHOT or the beta version if one is available. Find more information about how to do this inside [the Navigation SDK's GitHub repository](https://github.com/mapbox/mapbox-navigation-android/#using-snapshots).

### Navigation SDK

Learn how to install the core Navigation SDK and request your first route using `NavigationRoute`.

#### Add the dependency

{{
  <div className="mt18 mb24">
    <Note 
    title="Add the core Navigation SDK only when not using the Navigation UI SDK"
    imageComponent={<BookImage width="60" height="60" />}>
}}
If you're using the Navigation UI SDK, you **don't** have to declare the Mapbox Navigation SDK as well. If you only declare the Navigation UI SDK in your project's Gradle file, the Mapbox Navigation SDK will automatically be included.
{{</Note></div>}}

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
  implementation 'com.mapbox.mapboxsdk:mapbox-android-navigation:{{ NAVIGATION_VERSION }}'
}
```

#### Get an access token

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

#### Set up permissions

The Navigation SDK makes use of the Android manifest merge feature to reduce the need to include any Navigation SDK requirements inside your application's manifest file. You'll need to include either the Fine or Coarse location permission for navigation to work properly. The user location permission should also be checked during runtime using the PermissionManager if your app targets the Android API 23 or higher.

For best navigation results, we strongly recommend using the fine location permission, which gives a more precise fix on the user's current location.

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

#### Request a route

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


### Navigation UI SDK

The Navigation UI SDK is the fastest way to get a navigation UI in your application. 

#### Add the dependency

This dependency is different from the one used to compile the core Mapbox Navigation SDK, but it will still include everything from the core Mapbox Navigation SDK. _If you're using the Navigation UI SDK, you **don't** have to declare the Mapbox Navigation SDK as well. If you only declare the Navigation UI SDK in your project's Gradle file, the Mapbox Navigation SDK will automatically be included._

```groovy
repositories {
  mavenCentral()
  maven { url 'https://mapbox.bintray.com/mapbox' }
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-navigation-ui:{{ NAVIGATION_VERSION }}'
}
```

#### Launch the Navigation UI

With either a `DirectionsRoute` from `NavigationRoute` (see [Request a route](#request-a-route) above) or two `Point` objects (origin and destination), you can launch the UI with `NavigationLauncher` from within your `Activity`:

{{
<CodeLanguageToggle id="launch-nav-ui" />
<ToggleableCodeBlock

java={`
// Route fetched from NavigationRoute
DirectionsRoute route = ...

boolean simulateRoute = true;

// Create a NavigationLauncherOptions object to package everything together
NavigationLauncherOptions options = NavigationLauncherOptions.builder()
  .directionsRoute(route)
  .shouldSimulateRoute(simulateRoute)
  .build();

// Call this method with Context from within an Activity
NavigationLauncher.startNavigation(this, options);
`}

kotlin={`
// Route fetched from NavigationRoute
val route: DirectionsRoute

val simulateRoute = true

// Create a NavigationLauncherOptions object to package everything together
val options = NavigationLauncherOptions.builder()
  .directionsRoute(route)
  .shouldSimulateRoute(simulateRoute)
  .build()

// Call this method with Context from within an Activity
NavigationLauncher.startNavigation(this, options)`}
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
    navigation.onDestroy();
}
`}

kotlin={`
override fun onDestroy() {
    super.onDestroy()
    // End the navigation session
    navigation.onDestroy()
}
`}

/>
}}

## Testing and development

There are a few methods that can be helpful when developing and testing your application.

### Replay a DirectionsRoute

The Navigation SDK includes a `ReplayRouteLocationEngine`, which allows you to replay a given `DirectionsRoute` (mainly for testing, so you don't always have to code in a car). After retrieving a `DirectionsRoute`, you can create a replay engine and pass it to `MapboxNavigation`:

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

### Simulate a route


