---
title: "Navigation turn-by-turn UI"
description: "Customize the design of your Android app's turn-by-turn navigation experience. How? The Mapbox Navigation SDK for Android. Click for docs and info."
products:
  - Navigation UI
  - Navigation core
prependJs:
  - "import { NAVIGATION_VERSION } from '../../../constants';"
  - "import AppropriateImage from '../../../components/appropriate-image';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

<!-- The Mapbox Navigation UI SDK gives you all of the tools that you need to add turn-by-turn navigation to your apps.

Get up and running in a few minutes with our drop-in turn-by-turn navigation, or build a more custom turn-by-turn navigation app with our UI components. -->




<!-- ## NavigationView Activity Example

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
	navigationView.onCreate(savedInstanceState)
	navigationView.initialize(this)
}

public override fun onStart() {
	super.onStart()
	navigationView.onStart()
}

public override fun onResume() {
	super.onResume()
	navigationView.onResume()
}

override fun onLowMemory() {
	super.onLowMemory()
	navigationView.onLowMemory()
}

override fun onBackPressed() {
	// If the navigation view didn't need to do anything, call super
	if (!navigationView.onBackPressed()) {
	    super.onBackPressed()
	}
}

override fun onSaveInstanceState(outState: Bundle) {
	navigationView!!.onSaveInstanceState(outState)
	super.onSaveInstanceState(outState)
}

override fun onRestoreInstanceState(savedInstanceState: Bundle) {
	super.onRestoreInstanceState(savedInstanceState)
	navigationView.onRestoreInstanceState(savedInstanceState)
}

public override fun onPause() {
	super.onPause()
	navigationView.onPause()
}

public override fun onStop() {
	super.onStop()
	navigationView.onStop()
}

override fun onDestroy() {
	super.onDestroy()
	navigationView.onDestroy()
}
`}
/>
}} -->

<!-- #### Step 2
Your `Activity` or `Fragment` must implement `OnNavigationReadyCallback`. This interface includes the callback for when the turn-by-turn UI is ready to start - `onNavigationReady(boolean isRunning)` is your cue to start navigation with `NavigationView#startNavigation(NavigationViewOptions options)`.

The `boolean isRunning` will always be true upon the first initialization of the `NavigationView`. If will be true if the `NavigationView` was previously initialized and navigation has already started - for example, upon second initialization of an `Activity` or `Fragment` like from a configuration change.

`NavigationViewOptions` holds all of the custom data, settings, and listeners that you can provide to the `NavigationView`.

{{
<CodeLanguageToggle id="nav-listener" />
<ToggleableCodeBlock

java={`
@Override
public void onNavigationReady(boolean isRunning) {
  NavigationViewOptions options = NavigationViewOptions.builder()
    .directionsRoute(directionsRoute)
    .shouldSimulateRoute(simulateRoute)
    .build();

  navigationView.startNavigation(options);
}
`}

kotlin={`
fun onNavigationReady(isRunning: Boolean) {
  val options = NavigationViewOptions.builder()
  	.directionsRoute(directionsRoute)
  	.shouldSimulateRoute(simulateRoute)
  	.build()

  navigationView.startNavigation(options)
}

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
public void onNavigationReady(boolean isRunning) {
  Point origin = Point.fromLngLat(ORIGIN_LONGITUDE, ORIGIN_LATITUDE);
  Point destination = Point.fromLngLat(DESTINATION_LONGITUDE, DESTINATION_LATITUDE);
  NavigationViewOptions options = NavigationViewOptions.builder()
    .directionsRoute(directionsRoute)
    .shouldSimulateRoute(true)
    .navigationListener(this)
    .build();
  navigationView.startNavigation(options);
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
	navigationView.onCreate(savedInstanceState)
	navigationView.initialize(this)
}

override fun onStart() {
	super.onStart()
	navigationView.onStart()
}

override fun onResume() {
	super.onResume()
	navigationView.onResume()
}

override fun onSaveInstanceState(outState: Bundle) {
	navigationView?.onSaveInstanceState(outState)
	super.onSaveInstanceState(outState)
}

override fun onViewStateRestored(savedInstanceState: Bundle?) {
	super.onViewStateRestored(savedInstanceState)
	if (savedInstanceState != null) {
	    navigationView.onRestoreInstanceState(savedInstanceState)
	}
}

override fun onPause() {
	super.onPause()
	navigationView.onPause()
}

override fun onStop() {
	super.onStop()
	navigationView.onStop()
}

override fun onLowMemory() {
	super.onLowMemory()
	navigationView.onLowMemory()
}

override fun onDestroyView() {
    super.onDestroyView()
    navigationView.onDestroy()
}

override fun onNavigationReady(isRunning: Boolean) {
val origin = Point.fromLngLat(ORIGIN_LONGITUDE, ORIGIN_LATITUDE)

val destination = Point.fromLngLat(DESTINATION_LONGITUDE, DESTINATION_LATITUDE)

val options = NavigationViewOptions.builder()
	.directionsRoute(directionsRoute)
	.shouldSimulateRoute(true)
	.navigationListener(this)
	.build()

navigationView.startNavigation(options)
}
`}
/>
}} -->




