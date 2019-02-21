---
title: "Introduction"
description: "The official overview documentation for the Mapbox Maps SDK for Android. Learn how to customize your Android app's maps, visualize data, and much more."
prependJs:
  - "import OverviewHeader from '@mapbox/dr-ui/overview-header';"
  - "import AppropriateImage from '../../../components/appropriate-image';"
  - "import { Floater } from '../../../components/floater';"
  - "import { MAP_SDK_VERSION } from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import { WarningNote } from '../../../components/warning-note';"

---

{{
    <OverviewHeader
      features={[
        "Map styles",
        "Run-time styling",
        "Data clusters",
        "Camera manipulation",
        "Querying the map",
        "Gestures",
        "Map images"
      ]}
      title="Maps SDK for Android"
      version={MAP_SDK_VERSION}
      changelogLink="https://www.github.com/mapbox/mapbox-gl-native/blob/master/platform/android/CHANGELOG.md"
      ghLink="https://github.com/mapbox/mapbox-gl-native"
      installLink="https://www.mapbox.com/install/android"
      image={<AppropriateImage imageId="overviewMapSdk" alt="Mobile devices displaying applications using the Mapbox Maps SDK for Android." />}
    />
}}

The Mapbox Maps SDK for Android is an open source toolset for displaying maps inside of your Android application.

{{
  <a href='https://play.google.com/store/apps/details?id=com.mapbox.mapboxandroiddemo&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' className="fr-mm block wmax180 mx-auto pl24">
    <AppropriateImage imageId="demoAppPlayStoreBadge" alt='Get it on Google Play' />
  </a>
}}

[Mapbox's demo app on the Google Play Store](https://play.google.com/store/apps/details?id=com.mapbox.mapboxandroiddemo&hl=en) includes many examples of how to use the Mapbox Maps SDK for Android. The demo app and [the examples section of this documentation](https://docs.mapbox.com/android/maps/examples/) are great places to start for understanding the power of the Mapbox Maps SDK for Android.

{{
<WarningNote title="7.0.0 Migration Guide">
    <p>Have you already installed the Maps SDK for Android and are in the process of making changes to your project to account for the Maps SDK 7.0.0 release? If so, <a href="https://github.com/mapbox/mapbox-gl-native/wiki/Android-6.x-to-7.x-migration-guide">click here to read our 6.x -> 7.x migration guide</a>.</p>
</WarningNote>
}}

## Install the Maps SDK

{{
  <Floater
    url="https://www.mapbox.com/install/android/"
    title="Begin installation"
    category="guide"
    text="A step-by-step walkthrough to help you get started with Maps SDK for Android."
  />
}}

Before starting to develop your application with the Maps SDK, you'll need to add the SDK as a dependency. You can find the following dependency given below in the MavenCentral repository. Although this document shows you how to insert the stable version of the Maps SDK inside of your project, you can also use the nightly build (i.e. SNAPSHOT) or the beta version, if one is available. Find more information about how to do this inside the project’s [GitHub repository](https://github.com/mapbox/mapbox-gl-native/tree/master/platform/android/#readme).

If your application is close or exceeds the 65k method count limit, you can mitigate this problem by enabling ProGuard inside your application. ProGuard directives are included in the Android dependencies to preserve the required classes. You can also shrink the file APK file size by making use of APK splitting.

### 1. Add the dependency

1. Start Android Studio.
2. Open up your application's `build.gradle` file.
3. Make sure that your project's `minSdkVersion` is at API 14 or higher.
4. Under dependencies, add a new `implementation` dependency line for the latest `mapbox-android-sdk`.
5. Find the `File` in the toolbar and then clik on `Sync Project with Gradle Files`.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-sdk:{{ MAP_SDK_VERSION }}'
}
```

_Note: You might have mismatching gradle dependencies once you add the Mapbox Maps SDK for Android. Don't forget that you can use `exclude group` like below, to remove certain dependencies:_

```
implementation ('com.mapbox.mapboxsdk:mapbox-android-sdk:{{ MAP_SDK_VERSION }}'){
    exclude group: 'group_name', module: 'module_name'
}
```
Additionally, running `gradle app_module_name_here:dependencies` in your command line will print a list of dependencies. `./gradlew app:dependencies` works if you have a Gradle wrapper. They are helpful for troubleshooting nimble Gradle configurations when various libraries are included in a single project. You can see the dependencies that specific libaries are bringing and where conflicts might be happening.

### 2. Get an access token

If you don't have a Mapbox account, sign up for one [here](https://www.mapbox.com/signup/), and then navigate to your [Account page](https://www.mapbox.com/account/). Copy your **default public token** to your clipboard. After you've added the Maps SDK as a dependency inside of your Android project, open the `R.strings.xml` file, create a new String resource, and paste the access token.

```xml
<string name="mapbox_access_token">MAPBOX_ACCESS_TOKEN</string>
```

Then to pass this into the Maps SDK, you'll want to place the access token inside of your application's `onCreate()` method.

{{
<CodeLanguageToggle id="token-in-application-class" />
<ToggleableCodeBlock

java={`
public class MyApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();

    // Mapbox Access token
    Mapbox.getInstance(getApplicationContext(), MAPBOX_ACCESS_TOKEN);
  }
}
`}

kotlin={`
class MapboxApplication : Application() {

	override fun onCreate() {
        super.onCreate()

    // Mapbox Access token
    Mapbox.getInstance(getApplicationContext(), MAPBOX_ACCESS_TOKEN);
	}
}
`}

/>
}}

The Maps SDK also provides a `setToken()` method in case you want to switch the Mapbox access token at runtime. Certain Mapbox APIs require special Mapbox tokens, such as maps in China. Setting a new token enables use of multiple Mapbox tools in conjunction with one another. This method allows you to set a token immediately before a specific Mapbox tool is used instead of setting the token initially and being required to use the same token for all Mapbox-related requests.

{{
<CodeLanguageToggle id="switch-token" />
<ToggleableCodeBlock

java={`
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
`}

kotlin={`
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN)
`}

/>
}}


### 3. Setup permissions

Starting with the 5.0 version of the Maps SDK, we are making use of the Manifest merge feature to reduce the need to include any Maps SDK required things inside of your application's manifest file. You'll need to add _either_ the Fine **or** Coarse location permission if you plan to display a user's location on the map or get the user's location information. The user location permission should also be checked during runtime using the [PermissionManager](https://docs.mapbox.com/android/core/overview/#permissionsmanager).

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 4. Add a map

Open the Java file of the activity where you'd like to include the map in and add the code below to the file.

{{
<CodeLanguageToggle id="add-a-map" />
<ToggleableCodeBlock

java={`
private MapView mapView;

@Override
protected void onCreate(Bundle savedInstanceState) {
super.onCreate(savedInstanceState);

	Mapbox.getInstance(this, MAPBOX_ACCESS_TOKEN);

	setContentView(R.layout.activity_main);

	mapView = (MapView) findViewById(R.id.mapView);
	mapView.onCreate(savedInstanceState);
	mapView.getMapAsync(new OnMapReadyCallback() {
	@Override
	public void onMapReady(@NonNull MapboxMap mapboxMap) {

		mapboxMap.setStyle(Style.MAPBOX_STREETS, new Style.OnStyleLoaded() {
		@Override
		public void onStyleLoaded(@NonNull Style style) {

	  		// Map is set up and the style has loaded. Now you can add data or make other map adjustments



		}
	});
	}
});
`}

kotlin={`
private var mapView: MapView? = null

override fun onCreate(savedInstanceState: Bundle?) {
super.onCreate(savedInstanceState)

	Mapbox.getInstance(this, MAPBOX_ACCESS_TOKEN)

	setContentView(R.layout.activity_main)

  mapView = findViewById(R.id.mapView)
	mapView?.onCreate(savedInstanceState)
	mapView?.getMapAsync { mapboxMap ->

		mapboxMap.setStyle(Style.MAPBOX_STREETS) {

	    // Map is set up and the style has loaded. Now you can add data or make other map adjustments



		}

	}
}
`}

/>
}}

Open the activity's XML layout file and add the `mapView` within your layout.

```xml
<com.mapbox.mapboxsdk.maps.MapView
  android:id="@+id/mapView"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  />
```

### 5. Lifecycle methods

The `MapView` contains its own lifecycle methods for managing Android's OpenGL lifecycle, which must be called directly from the containing Activity. In order for your app to correctly call the MapView's lifecycle methods, you must override the following lifecycle methods in the Activity that contains the MapView and call the respective MapView method. For example, your onStart() method should look like this:

{{
<CodeLanguageToggle id="on-start" />
<ToggleableCodeBlock

java={`
@Override
protected void onStart() {
	super.onStart();
	mapView.onStart();
}
`}

kotlin={`
override fun onStart() {
	super.onStart()
	mapView?.onStart()
}
`}
/>
}}


Similar to the `onStart()` override above, the following lifecycle methods also need to be overridden and include the matching `MapView` method:

{{
<CodeLanguageToggle id="lifecycle-methods" />
<ToggleableCodeBlock

java={`
onCreate();
onStart();
onResume();
onPause();
onStop();
onSaveInstanceState();
onLowMemory();
onDestroy();
`}

kotlin={`
onCreate();
onStart();
onResume();
onPause();
onStop();
onSaveInstanceState();
onLowMemory();
onDestroy();
`}
/>
}}


If you're using a fragment, call `mapview.onDestroy()` inside the fragment's `onDestroyView()` method rather than inside `onDestroy()`:

{{
<CodeLanguageToggle id="fragment-ondestroyview" />
<ToggleableCodeBlock

java={`
@Override
public void onDestroyView() {
	super.onDestroyView();

		mapView.onDestroy();

}
`}

kotlin={`
fun onDestroyView() {
	super.onDestroyView()

		mapView.onDestroy()

}
`}

/>
}}

## Attribution

<!-- {{
  <Floater
    url="https://www.mapbox.com/help/attribution/"
    title="Attribution guidelines"
    category="help"
    text="Learn more about what kinds of attribution Mapbox require and why."
  />
}} -->

You must include the Mapbox wordmark and attribution notice on any map that uses the Mapbox Maps SDK for Android. We provide an attribution layout that includes all required information and can be customized either in xml or using the `UiSettings` object.

You may adjust the position of the Mapbox wordmark and attribution notice, but they must stay visible on the map. You may also change the background and text color of the attribution notice to best match your design aesthetics, but all information must be legible.

You may not otherwise alter the Mapbox wordmark or text attribution notice. If you wish to move or to remove the Mapbox wordmark, please [contact our sales team](https://www.mapbox.com/contact/sales/) to discuss options available under our Enterprise plans.

## Telemetry opt out
Mapbox Telemetry is a [powerful location analytics platform](https://www.mapbox.com/telemetry/) included in this SDK. By default, anonymized location and usage data is sent to Mapbox whenever the host app causes it to be gathered. The [Mapbox Terms of Service](https://www.mapbox.com/tos/) require your app to provide users with a way to individually opt out of Mapbox Telemetry, which is provided automatically as part of the [attribution](#attribution) control. If you hide the attribution control, you must provide an alternative opt out for your users to use.

## MapView XML attributes

XML attributes can be added inside of the XML `MapView` to further customize map behavior, such as setting the starting camera position, enabling tilt, or adjusting the compass' location on the screen. All `MapView` XML attributes start with `mapbox_` for identification and for removing any potential conflicts with other libraries. Due to the current implementation of Android Studio, you can't autogenerate `MapView` attributes by typing. [View the full list of `MapView` attributes here](https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDK/src/main/res/values/attrs.xml).

Some examples of `MapView` attributes are:

```xml
<com.mapbox.mapboxsdk.maps.MapView
  mapbox:mapbox_cameraTargetLat="-36.84"
  mapbox:mapbox_cameraTargetLng="174.76"
  mapbox:mapbox_cameraZoom="10"
  mapbox:mapbox_cameraBearing="34.33"
  mapbox:mapbox_cameraTilt="50.25"
  mapbox:mapbox_cameraZoomMax="12.41"
  mapbox:mapbox_cameraZoomMin="6"
  mapbox:mapbox_uiRotateGestures="false"/>
```
