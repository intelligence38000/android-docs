---
title: "Navigation turn-by-turn UI"
description: "Customize the design of your Android app's turn-by-turn navigation experience. How? The Mapbox Navigation SDK for Android. Click for docs and info."
prependJs:
	- import {
    NAVIGATION_VERSION
  } from '../../../constants';
	- "import AppropriateImage from '../../../components/appropriate-image";
	- "import CodeLanguageToggle from '../../../components/code-language-toggle';"
	- "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

Mapbox Navigation gives you all of the tools that you need to add turn-by-turn navigation to your apps.

Get up and running in a few minutes with our drop-in turn-by-turn navigation, or build a more custom turn-by-turn navigation app with our UI components.

## Install the Navigation UI SDK

You'll need to add the SDK as a dependency before developing your app with the Navigation UI components. This dependency is different from the one used to compile the core Navigation SDK, but it will still include everything from the core library. Note that while we show how to insert the stable version of the SDK inside of your project, you can also use the nightly build/snapshot or the beta version if one is available. You can find the dependency given below in the MavenCentral repository.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-navigation-ui:{{ NAVIGATION_VERSION }}'

}
```
#### Gradle 3.0
```groovy
dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-navigation-ui:{{ NAVIGATION_VERSION }}'
  
}
```

## Launch the Navigation UI

With either a `DirectionsRoute` from `NavigationRoute` or two `Point` objects (origin and destination), you can launch the UI with `NavigationLauncher` from within your `Activity`:

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

## NavigationViewOptions

`NavigationViewOptions` provides a way to pass variables to a `NavigationView`.
This class can be used with `NavigationLauncher` or when starting navigation
with a custom implementation of `NavigationView`.

You must provide either a valid `DirectionsRoute` object, or both an origin
and destination `Point` objects.
If you provide both, only the `DirectionsRoute` will be used.

{{
<CodeLanguageToggle id="nav-view-options" />
<ToggleableCodeBlock

java={`
NavigationViewOptions options = NavigationViewOptions.builder()
  .directionsRoute(route)
  .shouldSimulateRoute(simulateRoute)
  .build();
`}

kotlin={`
 val options = NavigationViewOptions.builder()
	.directionsRoute(route)
	.shouldSimulateRoute(simulateRoute)
	.build()
`}
/>
}}

#### Unit Type (Metric / Imperial)
Metric / imperial unit formatting is based on the voice unit type you used for fetching
the `DirectionsRoute` with `NavigationRoute`.  The `NavigationView` will look at the option
from the API request and use this for the UI formatting.  The `NavigationRoute` `Builder` takes
an Android `Context` so that if you don't specify a voice unit type, the default will be
based on the device `Locale` (from `Configuration`).

{{
<CodeLanguageToggle id="unit-type" />
<ToggleableCodeBlock

java={`
// this being Context
NavigationRoute.builder(this)
	.accessToken(Mapbox.getAccessToken())
	.origin(origin)
	.destination(destination)
	.voiceUnits(DirectionsCriteria.METRIC)
	.build()
`}

kotlin={`
// this being Context
NavigationRoute.builder(this)
	.accessToken(Mapbox.getAccessToken()!!)
	.origin(origin)
	.destination(destination)
	.voiceUnits(DirectionsCriteria.METRIC)
	.build()
`}
/>
}}

## NavigationView Activity Example

You can also inflate the entire navigation UI in your `Activity` or `Fragment`
rather than using `NavigationLauncher`.

To use this implementation, there is some setup you have to do to ensure the `View` works properly:

#### Step 1
The `NavigationView` has lifecycle methods to ensure the `View` properly handles Android configuration changes or user interactions. You must also call `navigationView.initialize(OnNavigationReadyCallback callback);` when `NavigationView` is inflated and `NavigationView#onCreate()` has been called.  

Calling `initialize()` will ultimately call `onNavigationReady()` once all components for the `View` have been properly initialized.

{{
<CodeLanguageToggle id="nav-view-activity" />
<ToggleableCodeBlock

java={`
@Override
protected void onCreate(@Nullable Bundle savedInstanceState) {
  setTheme(R.style.Theme_AppCompat_NoActionBar);
  super.onCreate(savedInstanceState);
  setContentView(R.layout.activity_navigation);
  navigationView = findViewById(R.id.navigationView);
  navigationView.onCreate(savedInstanceState);
  navigationView.initialize(this);
}

@Override
public void onStart() {
  super.onStart();
  navigationView.onStart();
}

@Override
public void onResume() {
  super.onResume();
  navigationView.onResume();
}

@Override
public void onLowMemory() {
  super.onLowMemory();
  navigationView.onLowMemory();
}

@Override
public void onBackPressed() {
  // If the navigation view didn't need to do anything, call super
  if (!navigationView.onBackPressed()) {
    super.onBackPressed();
  }
}

@Override
protected void onSaveInstanceState(Bundle outState) {
  navigationView.onSaveInstanceState(outState);
  super.onSaveInstanceState(outState);
}

@Override
protected void onRestoreInstanceState(Bundle savedInstanceState) {
  super.onRestoreInstanceState(savedInstanceState);
  navigationView.onRestoreInstanceState(savedInstanceState);
}

@Override
public void onPause() {
  super.onPause();
  navigationView.onPause();
}

@Override
public void onStop() {
  super.onStop();
  navigationView.onStop();
}

@Override
protected void onDestroy() {
  super.onDestroy();
  navigationView.onDestroy();
}
`}

kotlin={`
override fun onCreate(savedInstanceState: Bundle?) {
setTheme(R.style.Theme_AppCompat_NoActionBar)
super.onCreate(savedInstanceState)
	setContentView(R.layout.activity_navigation)
	navigationView = findViewById(R.id.navigationView)
	navigationView!!.onCreate(savedInstanceState)
	navigationView!!.initialize(this)
}

public override fun onStart() {
	super.onStart()
	navigationView!!.onStart()
}

public override fun onResume() {
	super.onResume()
	navigationView!!.onResume()
}

override fun onLowMemory() {
	super.onLowMemory()
	navigationView!!.onLowMemory()
}

override fun onBackPressed() {
	// If the navigation view didn't need to do anything, call super
	if (!navigationView!!.onBackPressed()) {
	    super.onBackPressed()
	}
}

override fun onSaveInstanceState(outState: Bundle) {
	navigationView!!.onSaveInstanceState(outState)
	super.onSaveInstanceState(outState)
}

override fun onRestoreInstanceState(savedInstanceState: Bundle) {
	super.onRestoreInstanceState(savedInstanceState)
	navigationView!!.onRestoreInstanceState(savedInstanceState)
}

public override fun onPause() {
	super.onPause()
	navigationView!!.onPause()
}

public override fun onStop() {
	super.onStop()
	navigationView!!.onStop()
}

override fun onDestroy() {
	super.onDestroy()
	navigationView!!.onDestroy()
}
`}
/>
}}

#### Step 2
Your `Activity` or `Fragment` must implement `NavigationViewListener`. This interface includes callbacks for the start and end of the turn-by-turn UI. `onNavigationReady()` is your cue to start navigation with `NavigationView#startNavigation(NavigationViewOptions options)`.  

`NavigationViewOptions` holds all of the custom data and settings that you can provide to the `NavigationView`.

`onNavigationFinished()` is your cue if the navigation session has ended or a user has cancelled the UI.

{{
<CodeLanguageToggle id="nav-listener" />
<ToggleableCodeBlock

java={`
@Override
public void onNavigationReady() {
  NavigationViewOptions options = NavigationViewOptions.builder()
    .origin(origin)
    .destination(destination)
    .awsPoolId(awsPoolId)
    .shouldSimulateRoute(simulateRoute)
    .build();

  navigationView.startNavigation(options);
}

@Override
public void onNavigationFinished() {
  finish();
}
`}

kotlin={`


`}
/>
}}

## NavigationView Fragment Example

{{
<CodeLanguageToggle id="fragment-example" />
<ToggleableCodeBlock

java={`
@Nullable
@Override
public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                         @Nullable Bundle savedInstanceState) {
  return inflater.inflate(R.layout.navigation_view_fragment_layout, container);
}

@Override
public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
  super.onViewCreated(view, savedInstanceState);
  navigationView = view.findViewById(R.id.navigation_view_fragment);
  navigationView.onCreate(savedInstanceState);
  navigationView.initialize(this);
}

@Override
public void onStart() {
  super.onStart();
  navigationView.onStart();
}

@Override
public void onResume() {
  super.onResume();
  navigationView.onResume();
}

@Override
public void onSaveInstanceState(@NonNull Bundle outState) {
  navigationView.onSaveInstanceState(outState);
  super.onSaveInstanceState(outState);
}

@Override
public void onViewStateRestored(@Nullable Bundle savedInstanceState) {
  super.onViewStateRestored(savedInstanceState);
  if (savedInstanceState != null) {
    navigationView.onRestoreInstanceState(savedInstanceState);
  }
}

@Override
public void onPause() {
  super.onPause();
  navigationView.onPause();
}

@Override
public void onStop() {
  super.onStop();
  navigationView.onStop();
}

@Override
public void onLowMemory() {
  super.onLowMemory();
  navigationView.onLowMemory();
}

@Override
public void onDestroyView() {
  super.onDestroyView();
  navigationView.onDestroy();
}

@Override
public void onNavigationReady() {
  Point origin = Point.fromLngLat(ORIGIN_LONGITUDE, ORIGIN_LATITUDE);
  Point destination = Point.fromLngLat(DESTINATION_LONGITUDE, DESTINATION_LATITUDE);
  NavigationViewOptions options = NavigationViewOptions.builder()
    .origin(origin)
    .destination(destination)
    .shouldSimulateRoute(true)
    .navigationListener(this)
    .build();
  navigationView.startNavigation(options);
}

@Override
public void onCancelNavigation() {
  if (getActivity() != null) {
    getActivity().finish();
  }
}

@Override
public void onNavigationFinished() {
  if (getActivity() != null) {
    getActivity().finish();
  }
}

@Override
public void onNavigationRunning() {
  // no-op
}
`}

kotlin={`
companion object {
	private val ORIGIN_LONGITUDE = -77.04012393951416
	private val ORIGIN_LATITUDE = 38.9111117447887
	private val DESTINATION_LONGITUDE = -77.03847169876099
	private val DESTINATION_LATITUDE = 38.91113678979344
}

override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
savedInstanceState: Bundle?): View? { 
	return inflater.inflate(R.layout.navigation_view_fragment_layout, container)
}

override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
	super.onViewCreated(view, savedInstanceState)
	navigationView = view.findViewById(R.id.navigation_view_fragment)
	navigationView?.onCreate(savedInstanceState)
	navigationView?.initialize(this)
}

override fun onStart() {
	super.onStart()
	navigationView?.onStart()
}

override fun onResume() {
	super.onResume()
	navigationView?.onResume()
}

override fun onSaveInstanceState(outState: Bundle) {
	navigationView?.onSaveInstanceState(outState)
	super.onSaveInstanceState(outState)
}

override fun onViewStateRestored(savedInstanceState: Bundle?) {
	super.onViewStateRestored(savedInstanceState)
	if (savedInstanceState != null) {
	    navigationView?.onRestoreInstanceState(savedInstanceState)
	}
}

override fun onPause() {
	super.onPause()
	navigationView?.onPause()
}

override fun onStop() {
	super.onStop()
	navigationView?.onStop()
}

override fun onLowMemory() {
	super.onLowMemory()
	navigationView?.onLowMemory()
}

override fun onDestroyView() {
    super.onDestroyView()
    navigationView?.onDestroy()
}

override fun onNavigationReady(isRunning: Boolean) {
	val origin = Point.fromLngLat(ORIGIN_LONGITUDE, ORIGIN_LATITUDE)
	val destination = Point.fromLngLat(DESTINATION_LONGITUDE, DESTINATION_LATITUDE)
	val options = NavigationViewOptions.builder()
	        .directionsRoute(directionsRoute)
	        .shouldSimulateRoute(true)
	        .navigationListener(this)
	        .build()
	
	navigationView?.startNavigation(options)
}

override fun onCancelNavigation() {
	if (activity != null) {
	    activity?.finish()
	}
}

override fun onNavigationFinished() {
	if (activity != null) {
	    activity?.finish()
	}
}

override fun onNavigationRunning() {
	// no-op
}
`}
/>
}}

## Listening to the NavigationView
Using `NavigationView` in your XML also gives you the ability to listen to different
updates or events that may occur during navigation. Both the `ProgressChangeListener` and `MilestoneEventListener` from our
core SDK are able to be added, as well as three others: `NavigationListener`, `RouteListener`, and `FeedbackListener`.  

#### `NavigationListener`
- `onCancelNavigation()`: Will be triggered when the user clicks on the cancel "X" icon while navigating.
- `onNavigationFinished()`: Will be triggered when `MapboxNavigation` has finished and the service is completely shutdown.
- `onNavigationRunning()`: Will be triggered when `MapboxNavigation` has been initialized and the user is navigating the given route.

#### `RouteListener`
- `allowRerouteFrom(Point offRoutePoint)`: Will trigger in an off-route scenario.  
   - Given the `Point` the user has gone off-route, this listener can return true or false.
   - Returning true will allow the SDK to proceed with the re-route process and fetch a new route with this given off-route `Point`.
   - Returning false will stop the re-route process and the user will continue without a new route in the direction they are traveling.
- `onOffRoute(Point offRoutePoint)`: Will trigger only if `RouteListener#allowRerouteFrom(Point)` returns true.
   - This serves as the official off-route event and will continue the process to fetch a new route with the given off-route `Point`.
- `onRerouteAlong(DirectionsRoute directionsRoute)`: Will trigger when a new `DirectionsRoute` has been retrieved post off-route.
   - This is the new route the user will be following until another off route event is triggered.
- `onFailedReroute(String errorMessage)`: Will trigger if the request for a new `DirectionsRoute` fails.
   - Provides the error message from the directions API used to retrieve the `DirectionsRoute`.

#### `FeedbackListener`
- `onFeedbackOpened()`: Will be triggered when the feedback bottomsheet is opened by a user while navigating.
- `onFeedbackCancelled()`: Will be triggered when the feedback bottomsheet is opened by a user while navigating but then dismissed without clicking on a specific `FeedbackItem` in the list.
- `onFeedbackSent(FeedbackItem feedbackItem)`: Will be triggered when the feedback bottomsheet is opened by a user while navigating and then the user clicks on a specific `FeedbackItem` in the list.

#### `BannerInstructionsListener`
- `willDisplay(BannerInstructions instructions)`: Will be triggered when a `BannerInstructions` is about to be displayed. The listener gives you the option to override any values and pass as the return value, which will be the value used for the banner instructions. You can return `null` and the instructions will be ignored.

#### `SpeechAnnouncementListener`
- `willVoice(SpeechAnnouncement announcement)`: Will be triggered when a voice announcement is about to be voiced. The listener gives you the option to override any values and pass as the return value, which will be the value used for the voice announcement. You can return `null` and the announcement will be ignored.

To add these listeners, you can add them to your `NavigationViewOptions` before
you call `navigationView.startNavigation(NavigationViewOptions options)`:

{{
<CodeLanguageToggle id="nav-view-options-listeners" />
<ToggleableCodeBlock

java={`
NavigationViewOptions options = NavigationViewOptions.builder()
	.navigationListener(this)
	.routeListener(this)
	.feedbackListener(this)
	.build();
`}

kotlin={`
val options = NavigationViewOptions.builder()
	.navigationListener(this)
	.routeListener(this)
	.feedbackListener(this)
	.build()
`}
/>
}}

**Please note** these listeners are only available if you are adding `NavigationView`
to your `Activity` or `Fragment` layout XML via `NavigationViewOptions`.  You are not able
to add them to `NavigationLauncherOptions`.

## Styling the NavigationView
You can also style the `NavigationView` colors. This includes the style of the map and/or route. To do this, provide a light and dark style in the XML where you have put your `NavigationView`:

```xml
<com.mapbox.services.android.navigation.ui.v5.NavigationView
        android:id="@+id/navigationView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:navigationLightTheme="@style/NavigationViewLight"
        app:navigationDarkTheme="@style/NavigationViewDark"
        ...
        />
```

**Please note**: each style must provide a value for every custom attribute or have a parent style `NavigationViewLight` / `NavigationViewDark` - otherwise the `View` will not properly inflate. Our default Mapbox style will be used if you do not provide a style for either of the light or dark theme attributes.

An example of how to create your own style can be found by looking at one of our default
styles like `R.style.NavigationViewLight`:

```xml
<style name="MyCustomTheme" parent="NavigationViewLight">
   <item name="navigationViewPrimary">@color/mapbox_navigation_route_alternative_congestion_red</item>
   <item name="navigationViewSecondary">@color/mapbox_navigation_route_layer_blue</item>
    <!-- Map style URL -->
    <item name="navigationViewMapStyle">@string/navigation_guidance_day_v2</item>
</style>
```

Here are a two more examples of custom themes. `CustomNavigationMapRoute` is for the route line shown and is
used in `CustomNavigationViewLight` which allows you to customize the remaining `NavigationView` colors,
as well as the map style. Both have comments outlining where the given color should show on the screen:

```xml
<resources>
<style name="CustomNavigationMapRoute" parent="@style/NavigationMapRoute">

    <!-- Main color for the route line -->
    <item name="routeColor">#4882C6</item>
    <!-- Outline color for the route line -->
    <item name="routeShieldColor">#2C5F99</item>

    <!-- Color for moderate traffic along the route line -->
    <item name="routeModerateCongestionColor">#FFAB65</item>
    <!-- Color for severe traffic along the route line -->
    <item name="routeSevereCongestionColor">#E85552</item>

    <!-- Scales -->
    <item name="routeScale">1.0</item>
</style>

<style name="CustomNavigationViewLight" parent="@style/NavigationViewLight">
    <!-- The main turn banner view at the top of the screen -->

    <!-- Background color of the banner -->
    <item name="navigationViewBannerBackground">#FFFFFF</item>
    <!-- Color for the primary label that displays the turn name -->
    <item name="navigationViewBannerPrimaryText">#37516F</item>
    <!-- Color for the secondary label that occasionally appears underneath the primary label -->
    <item name="navigationViewBannerSecondaryText">#E637516F</item>
    <!-- Primary color for the turn arrow icons-->
    <item name="navigationViewBannerManeuverPrimary">#37516F</item>
    <!-- Secondary color for the turn arrow icons (e.g. the line segment that forks off) -->
    <item name="navigationViewBannerManeuverSecondary">#4D37516F</item>

    <!-- Alternate background color for the dropdown list of upcoming steps -->
    <item name="navigationViewListBackground">#FAFAFA</item>


    <!-- The summary view along the bottom of the screen -->

    <!-- Background color of the summary view -->
    <item name="navigationViewPrimary">#FFFFFF</item>
    <!-- Tint color for icons in the summary view -->
    <item name="navigationViewSecondary">#28353D</item>
    <!-- Accent color for elements such as the recenter button -->
    <item name="navigationViewAccent">#4882C6</item>
    <!-- Color for the main duration label in the summary view -->
    <item name="navigationViewPrimaryText">#424242</item>
    <!-- Color for the secondary distance and ETA label in the summary view -->
    <item name="navigationViewSecondaryText">#424242</item>


    <!-- Custom colors for progress bars displayed during navigation -->
    <item name="navigationViewProgress">#4B75A4</item>
    <item name="navigationViewProgressBackground">#39587B</item>

    <!-- Custom colors for the route line and traffic -->
    <item name="navigationViewRouteStyle">@style/CustomNavigationMapRoute</item>

    <!-- Map style -->
    <item name="navigationViewMapStyle">mapbox://styles/mapbox/navigation-guidance-day-v2</item>
</style>
</resources>
```

Please reference the diagram below to see where these attribute names align within the
actual UI:

{{
<AppropriateImage imageId="navigationViewColorDiagram" className="block mx-auto pt18 wmax300" />
}}


| Letter | Resource name |
| --- | --- |
| A | navigationViewPrimary |
| B | navigationViewSecondary |
| C | navigationViewSecondaryText |
| D | navigationViewPrimaryText |
| E | navigationViewSecondary |
| F | navigationViewSecondary |
| G | navigationViewAccent |
| H | navigationViewLocationLayerStyle> mapbox_gpsDrawable |
| I | navigationViewRouteStyle > upcomingManeuverArrowBorderColor |
| J | navigationViewRouteStyle > upcomingManeuverArrowColor |
| K | navigationViewRouteStyle > routeColor |
| L | navigationViewRouteStyle > routeSevereCongestionColor |
| M | navigationViewRouteStyle > routeShieldColor |
| N | navigationViewMapStyle |
| O | navigationViewRouteOverviewDrawable|
| P | navigationViewBannerSecondaryText |
| Q | navigationViewBannerPrimaryText |
| R | navigationViewBannerBackground |
| S | navigationViewBannerManeuverPrimary |

## Day and Night mode

If you're using `NavigationLauncher`, we will automatically set `AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_AUTO)` _only_ if your device is currently following the system setting.

If you're using `NavigationView` within your own `Activity` the view will update based on whatever the current mode is in the `Activity`.

## InstructionView

You also have the option to add the custom `View`s used in the turn-by-turn UI to your XML.
The top `View` that displays the maneuver image, instruction text, and sound button is called `InstructionView`.

```xml
<com.mapbox.services.android.navigation.ui.v5.instruction.InstructionView
        android:id="@+id/instructionView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
```

Once inflated in your `Activity`, the `InstructionView` can be updated with a `RouteProgress` object inside a `ProgressChangeListener`.  

Prior to the first time you call `InstructionView#updateDistanceWith(RouteProgress)`, you can pass in a `DirectionsCriteria` (IMPERIAL or METRIC)
and `Locale` to determine how the `InstructionView` will format the distance data. If you only pass a `Locale`, the view will default
the `DirectionsCriteria` based on this `Locale`. If neither are provided, we will get the device `Locale` and use this for both.

{{
<CodeLanguageToggle id="instruction-view" />
<ToggleableCodeBlock

java={`
instructionView.setLocale(Locale.getDefault());
instructionView.setUnitType(DirectionsCriteria.METRIC);

@Override
public void onProgressChange(Location location, RouteProgress routeProgress) {
	instructionView.updateDistanceWith(routeProgress);
}
`}

kotlin={`
instructionView?.setLocale(Locale.getDefault())
instructionView?.setUnitType(DirectionsCriteria.METRIC)

override fun onProgressChange(location: Location, routeProgress: RouteProgress) {
instructionView?.updateDistanceWith(routeProgress)
}
`}
/>
}}


Please make sure to set our default theme: `R.style.NavigationViewLight` (or create your own) and set it in your `Activity` or `Fragment` before `super.onCreate()`. The custom `View`s will now look for the attributes in the default theme to set text and background colors:

{{
<CodeLanguageToggle id="set-nav-view" />
<ToggleableCodeBlock

java={`
@Override
protected void onCreate(Bundle savedInstanceState) {
  setTheme(R.style.NavigationViewLight);
  super.onCreate(savedInstanceState);
  setContentView(R.layout.activity_navigation);
  ...
}
`}

kotlin={`
override fun onCreate(savedInstanceState: Bundle?) {
setTheme(R.style.NavigationViewLight)
super.onCreate(savedInstanceState)
setContentView(R.layout.activity_navigation)
}
`}
/>
}}

## NavigationMapRoute

You can use `NavigationMapRoute` to draw the route line on your map. Instantiate it with a
`MapView` and `MapboxMap`, then add a `DirectionsRoute` from our Directions API. The `DirectionsRoute` will automatically be added (even in off-route scenarios) if you instantiate with `MapboxNavigation`. You can also style the route with a given style:

{{
<CodeLanguageToggle id="nav-map-route" />
<ToggleableCodeBlock

java={`
NavigationMapRoute mapRoute = new NavigationMapRoute(MapboxNavigation navigation, MapView mapView,MapboxMap mapboxMap, int styleRes);
}
`}

kotlin={`


`}
/>
}}

The given style will determine route color, congestion colors, and the route scale:

```xml
<style name="NavigationMapRoute">
    <!-- Colors -->
    <item name="routeColor">@color/mapbox_navigation_route_layer_blue</item>
    <item name="routeModerateCongestionColor">@color/mapbox_navigation_route_layer_congestion_yellow</item>
    <item name="routeSevereCongestionColor">@color/mapbox_navigation_route_layer_congestion_red</item>
    <item name="routeShieldColor">@color/mapbox_navigation_route_shield_layer_color</item>

    <!-- Scales -->
    <item name="routeScale">1.0</item>
</style>
```

## NavigationCamera

Driven by `DynamicCamera` engine, the `NavigationCamera` holds all of the logic needed to drive a `MapboxMap` camera
that reacts and adjusts to the current progress along a `DirectionsRoute`.

To create an instance of `NavigationCamera`, you need a `MapboxMap` and `MapboxNavigation` object, and an instance of the Location Layer Plugin:

{{
<CodeLanguageToggle id="nav-map-camera" />
<ToggleableCodeBlock

java={`
NavigationCamera camera = new NavigationCamera(mapboxMap, navigation,locationLayerPlugin);
}
`}

kotlin={`
val camera = NavigationCamera(mapboxMap!!, navigation!!, locationLayerPlugin!!)
`}
/>
}}


Calling `NavigationCamera#start(DirectionsRoute route)` will begin an animation to the start of the
`DirectionsRoute` you provided:

{{
<CodeLanguageToggle id="camera-start" />
<ToggleableCodeBlock

java={`
camera.start(directionsRoute);
}
`}

kotlin={`
camera.start(directionsRoute)
`}
/>
}}

At the end of this animation or if the user interacts with the screen while it is running and
subsequently cancels the animation, a `ProgressChangeListener` is added to `MapboxNavigation` so
the camera can begin to listen to updates from the SDK.

The `NavigationCamera` also adds a `MapboxMap.OnScrollListener` when it is initialized, so if a user scrolls the map,
camera tracking will stop. This can be checked with `NavigationCamera#isTrackingEnabled()`.

`NavigationCamera#resetCameraPositon()` will reset the camera to the last known position update and will
resume tracking of future updates.
