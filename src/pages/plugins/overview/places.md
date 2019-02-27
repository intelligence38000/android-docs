---
title: "Places"
description: "Read docs on the Mapbox Places Plugin for Android. Easily search destinations, explore what's nearby, or find favorite restaurants, coffee shops, or stores."
prependJs:
  - "import constants from '../../../constants';"
  - "import AppropriateImage from '../../../components/appropriate-image';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"   
---

The **Places plugin for Android** lets users search for a destination, explore what's nearby, or find their favorite restaurants, coffee shops, or stores. The Places Plugin is built on top of our [Mapbox Geocoding API](https://www.mapbox.com/api-documentation/search/#geocoding) and offers UI components that can be integrated inside your app with a few lines of code.

{{
<AppropriateImage imageId="placesSplash" className="block mx-auto pt18" />
}}

## Install the Places plugin

To start developing an application using the Places Plugin, you'll need to add the appropriate dependencies inside your `build.gradle` file. This dependency includes the Maps SDK for Android and the [Mapbox Java SDK's Geocoding API](/android/java/overview/geocoder/). All dependencies given below can be found on MavenCentral.

If your application is close or exceeds the 65k method count limit, you can mitigate this problem by enabling ProGuard inside your application. ProGuard directives are included in the Android dependencies to preserve the required classes.

### Add the dependency

1. Start Android Studio.
2. Open up your application's `build.gradle`.
3. Make sure that your project's `minSdkVersion` is API 14 or higher.
4. Under dependencies, add a new build rule for the latest `mapbox-android-plugin-places.
5. Click the Sync Project with Gradle Files near the toolbar in Studio.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-places-v7:{{constants.PLACES_PLUGIN_VERSION }}'
}
```

## Add Autocomplete

The **Autocomplete** UI component offers users the ability to search addresses or places and receive information including the latitude and longitude, phone number, categories, and an abundance of other info. As the user types, place predictions display immediately to the user along with any previously searched places.

There are two ways to use the Autocomplete service:

- Launch as an activity for result
- Display as a fragment

### Launch as an activity for result

If a separate search activity makes sense in your application, you can use the `PlaceAutocomplete` class to build your intent and then launch the included search activity using `startActivityForResult`. Using this intent builder, you pass in the required access token along with a [`placeOptions`]() object.

{{
<CodeLanguageToggle id="initialize-autocomplete" />
<ToggleableCodeBlock

java={`
Intent intent = new PlaceAutocomplete.IntentBuilder()
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.placeOptions(placeOptions)
	.build(this);
startActivityForResult(intent, REQUEST_CODE_AUTOCOMPLETE);
`}

kotlin={`
val intent = PlaceAutocomplete.IntentBuilder()
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.placeOptions(placeOptions)
	.build(this)
startActivityForResult(intent, REQUEST_CODE_AUTOCOMPLETE)
`}

/>
}}


When the user finishes selecting a place inside the autocomplete activity, `finish()` will be called. To receive the CarmenFeature which describes the place the user selected, override the `onActivityResult` method, check that the request and result codes are correct, and use the `PlaceAutocomplete` static method `getPlace` passing in the intent.

{{
<CodeLanguageToggle id="finish" />
<ToggleableCodeBlock

java={`
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
  super.onActivityResult(requestCode, resultCode, data);
  if (resultCode == Activity.RESULT_OK && requestCode == REQUEST_CODE_AUTOCOMPLETE) {
    CarmenFeature feature = PlaceAutocomplete.getPlace(data);
    Toast.makeText(this, feature.text(), Toast.LENGTH_LONG).show();
  }
}
`}

kotlin={`
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
	super.onActivityResult(requestCode, resultCode, data)
		if (resultCode == Activity.RESULT_OK && requestCode == REQUEST_CODE_AUTOCOMPLETE) {
	    val feature = PlaceAutocomplete.getPlace(data)
	    Toast.makeText(this, feature.text(), Toast.LENGTH_LONG).show()
		}
}
`}

/>
}}

### Display as a fragment

If you need more control over the UI and would like to place the Autocomplete component inside an activity container, you can use the provided `PlaceAutocompleteFragment` to include the search UI. This class extends the [Support Library Fragment](https://developer.android.com/reference/android/support/v4/app/Fragment.html) implementation, which means the `SupportFragmentManager` should be used. In the code snippet provided below, we first check to ensure no more than one `autocompleteFragment` instance is always being used. If there isn't an instance of `autocompleteFragment`, we create a new one and add it to the container. If there is, we simply display the `autocompleteFragment` to the user using the `TAG`.

{{
<CodeLanguageToggle id="display-fragment" />
<ToggleableCodeBlock

java={`
PlaceAutocompleteFragment autocompleteFragment;

if (savedInstanceState == null) {
	autocompleteFragment = PlaceAutocompleteFragment.newInstance("<access_token>");

final FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
transaction.add(R.id.fragment_container, autocompleteFragment,TAG);
transaction.commit();

} else {
  autocompleteFragment = (PlaceAutocompleteFragment)
  getSupportFragmentManager().findFragmentByTag(TAG);
}

`}

kotlin={`
val autocompleteFragment: PlaceAutocompleteFragment

if (savedInstanceState == null) {

autocompleteFragment = PlaceAutocompleteFragment.newInstance("<access_token>")
val transaction = supportFragmentManager.beginTransaction()
transaction.add(R.id.fragment_container, autocompleteFragment, TAG)
transaction.commit()

} else {
	autocompleteFragment = supportFragmentManager.findFragmentByTag(TAG) as PlaceAutocompleteFragment
}
`}

/>
}}

To listen for when the user selects a place or cancels out of the `autocompleteFragment`, you can set a `PlaceSelectionListener` on the fragment and the callback will be invoked when the event occurs.

{{
<CodeLanguageToggle id="listener" />
<ToggleableCodeBlock

java={`
autocompleteFragment.setOnPlaceSelectedListener(new PlaceSelectionListener() {
  @Override
  public void onPlaceSelected(CarmenFeature carmenFeature) {
    Toast.makeText(AutocompleteFragmentActivity.this,
      carmenFeature.text(), Toast.LENGTH_LONG).show();
    finish();
  }

  @Override
  public void onCancel() {
    finish();
  }
});
`}

kotlin={`
 autocompleteFragment.setOnPlaceSelectedListener(object : PlaceSelectionListener {
	override fun onPlaceSelected(carmenFeature: CarmenFeature) {
	    Toast.makeText(this@AutocompleteFragmentActivity,
	            carmenFeature.text(), Toast.LENGTH_LONG).show()
	    finish()
	}

	override fun onCancel() {
	    finish()
	}
})         
`}

/>
}}

## Customize Autocomplete results

Create a **PlaceOptions** object to customize the Autocomplete search results and the UI component.


Once your `PlaceOptions` object's created you'll need to pass it in either by using the `PlaceAutocompleteFragment.newInstance(<access token>, placeOptions);` if you are using the fragment or `new PlaceAutocomplete.IntentBuilder().placeOptions(placeOptions)` otherwise.


### Customize search results

You can narrow the search results based on the following parameters:

| API | Description |
| --- | --- |
| `proximity` | Bias local results based on a provided GeoJSON Point. This oftentimes increases accuracy in the returned results. |
| `limit` | Limit the number of results returned. The default is 10. |
| `bbox` | Limit results to a bounding box. |
| `geocodingTypes` | This optionally can be set to filter the results returned inside the suggestions. |
| `country` | Limit results to one or more countries. |
| `injectedPlaces` | Optionally inject Carmen Features into the suggestion view so users can access points of interest quickly without typing a single character. Typical places include, the users home, work, or favorite POI. |


### Customize the UI component

There are two modes to further change the Autocomplete component UI to fit your app better:

- **Full screen mode**: will place all the search history, results, and injected places into a view which has a width equal to the app width.
- **Card view mode**: the place  search history, results, and injected places in an Android Support Library CardView.

| API | Description |
| --- | --- |
| `backgroundColor` | Set the autocomplete's layout background color. |
| `toolbarColor` | Set the autocomplete's layout toolbar color. This only applies if the mode is set to full screen. |


### Add suggestions
When users are searching for places inside your app, oftentimes, they have a few places that are frequently visited and thus searched. Make things simpler for them by adding specific place suggestions such as their home, work, or favorite restaurant. This feature can also be used to insert store locations, or popular places your app is advertising.

To get started, you'll need to first acquire or create the `CarmenFeature` which describes this place. an example of creating a `CarmenFeature`s given below which only includes the necessary information for our app, neglecting the large amount of additional information we could provide to describe the location.

{{
<CodeLanguageToggle id="carmen-feature" />
<ToggleableCodeBlock

java={`
CarmenFeature work = CarmenFeature.builder().text("Directions to Work")
  .geometry(Point.fromLngLat(1.0, 2.0))
  .placeName("300 Massachusetts Ave NW")
  .id("directions-work")
  .properties(new JsonObject())
  .build();
`}

kotlin={`
val work = CarmenFeature.builder().text("Directions to Work")
	.geometry(Point.fromLngLat(1.0, 2.0))
	.placeName("300 Massachusetts Ave NW")
	.id("directions-work")
	.properties(JsonObject())
	.build()
`}

/>
}}



Once this is done, you will need to pass this feature into the `PlaceOptions` object using either the `addInjectedFeature()` or `injectedPlaces()` methods.

## Clear search history

Typically found inside any application which offers search history like the places plugin does by default, they will also need to occasionally clear the search history. It's recommended to add a setting in your apps preferences to do just this. If the user request clearing of the search history, you can use the static method provided inside the `PlaceAutocomplete` class called `clearRecentHistory()` which will immediately clear all the data from the saved database.

{{
<CodeLanguageToggle id="clear-history" />
<ToggleableCodeBlock

java={`
PlaceAutocomplete.clearRecentHistory(this);
`}

kotlin={`
PlaceAutocomplete.clearRecentHistory(this);
`}

/>
}}

## Place Picker

{{
<AppropriateImage imageId="placePickerScreenshot" className="block mx-auto wmax360 pt18" />
}}

The Autocomplete UI component described above, searches for a place based on an address or name. The **Place Picker** UI component retrieves information about a selected map location. With the Place Picker, you can launch an activity for result and provide your users a way to pick a location on the map. The result returned is a `CarmenFeature`, which can be used to get information such as the coordinate, place name, address, phone number, and more.

To begin, create the Place Picker `IntentBuilder`, which builds an intent ready to be launched by the `startActivityForResult` method.

{{
<CodeLanguageToggle id="build-intent" />
<ToggleableCodeBlock

java={`
private static final int PLACE_SELECTION_REQUEST_CODE = 56789

...

Intent intent = new PlacePicker.IntentBuilder()
  .accessToken(Mapbox.getAccessToken())
  .placeOptions(
		PlacePickerOptions.builder()
			.statingCameraPosition(
				new CameraPosition.Builder()
		        .target(new LatLng(40.7544, -73.9862))
		        .zoom(16)
		      	.build())
    	.build())
.build(this);
startActivityForResult(intent, PLACE_SELECTION_REQUEST_CODE);
`}

kotlin={`
companion object {
	private val PLACE_SELECTION_REQUEST_CODE = 56789
}
...

val intent = PlacePicker.IntentBuilder()
	.accessToken(Mapbox.getAccessToken()!!)
	.placeOptions(
	PlacePickerOptions.builder()
	.statingCameraPosition(
		CameraPosition.Builder()
			.target(LatLng(40.7544, -73.9862))
			.zoom(16.0)
			.build())
		.build())
	.build(this)
startActivityForResult(intent, PLACE_SELECTION_REQUEST_CODE)
`}

/>
}}


Override the `onActivityResult()` method and extract information from the `CarmenFeature`:

{{
<CodeLanguageToggle id="onactivity" />
<ToggleableCodeBlock

java={`
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) { super.onActivityResult(requestCode, resultCode, data);

	if (requestCode == REQUEST_CODE && resultCode == RESULT_OK){

	// Retrieve the information from the selected location's CarmenFeature

	CarmenFeature carmenFeature = PlacePicker.getPlace(data);
	}
}
`}

kotlin={`
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) { super.onActivityResult(requestCode, resultCode, data)

	if (requestCode == REQUEST_CODE && resultCode == Activity.RESULT_OK) {

	// Retrieve the information from the selected location's CarmenFeature

	val carmenFeature = PlacePicker.getPlace(data)

   }
}
`}

/>
}}
### PlaceOptions for Place Picker

In addition to some of the options listed in the `PlaceOptions` documentation above, the Place Picker includes options for setting the initial map camera position. This is useful when you want the map location to initiate at the user's current location.
