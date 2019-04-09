---
title: "Localization"
description: "Mapbox Android Localization Plugin."
prependJs:
  - "import constants from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"   

contentType: guide
---

The Mapbox Localization Plugin is an excellent option for adjusting your Android project's map experience according to the individual user's preferences. The plugin:

- Automatically detects the set language on the Android device and changes map text to that language. The plugin can change map text based on the Android device's language preference, but it also provides methods to programmatically change the text to a language independent of what the user set their device's language to. For example, if a user sets their phone to French but, they meet a Spanish-only speaking person, your app could provide a way for the French speaker to switch the map to Spanish temporarily. The map can then be switched back to French once their interaction is over.
- Adjusts the map camera to an area of the world that is associated with the device's set language. For example, say that the user set their device to German. The plugin can detect this so that when the map begins, the map camera's target is focused on Germany.

## Install the Localization Plugin

To start developing an application using the Localization Plugin, you'll need to add the appropriate dependencies inside of your `build.gradle`. The Localization Plugin dependency includes the Mapbox Maps SDK for Android. You can find all dependencies given below on MavenCentral.

If your application is close or exceeds the 65k method count limit, you can mitigate this problem by enabling ProGuard inside your application. ProGuard directives are included in the Android dependencies to preserve the required classes.

### Add the dependency

1. Start Android Studio.
2. Open up your application's `build.gradle`.
3. Make sure that your project's `minSdkVersion` is API 14 or higher.
4. Under dependencies, add a new build rule for the latest `mapbox-android-plugin-localization`.
5. Click the Sync Project with Gradle Files near the toolbar in Studio.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-localization-v7:{{constants.LOCALIZATION_PLUGIN_VERSION }}'
}
```

## Initialize the plugin

The plugin's constructor requires a `MapView` and `MapboxMap` object. You should initialize the plugin within the `onMapReady()` method to be sure that the plugin is receiving a `mapboxMap` that's completely ready.

{{
<CodeLanguageToggle id="initialize-localization" />
<ToggleableCodeBlock

java={`
mapView.getMapAsync(new OnMapReadyCallback() {
    @Override
    public void onMapReady(MapboxMap mapboxMap) {

  	LocalizationPlugin localizationPlugin = new LocalizationPlugin(mapView, mapboxMap);

}
});
`}

kotlin={`
mapView?.getMapAsync { mapboxMap ->

val localizationPlugin = LocalizationPlugin(mapView!!, mapboxMap)

}
`}

/>
}}


## Use `MapLocale`

The `MapLocale` class powers much of the Localization Plugin and increases its flexibility. The class doesn't extend the Android system's `Locale` class, but rather, interacts with the `Locale` class in the form of a key/value `HashMap`. The plugin supports all the same default locales found inside the `Locale` class.

More generally, the `MapLocale` class handles the retrieval of map languages and bounding boxes for regions that your app might interact with. The `MapLocale` object can be used to get the matching Locale's map language. This is useful for translating the map language into one found in the `Languages` interface.

A handful of `MapLocale` objects are already constructed and offered through this class as static variables. If a country is missing and you'd like to add it, you can use one of the `MapLocale` constructors to build a valid map locale. Once this is done, you need to add it to the Locale cache using `MapLocale.addMapLocale(Locale, MapLocale)` where the first parameter is the `Locale` object which matches up with your newly created `MapLocale`.


##  Match map with device language

As described above, the plugin's main benefit is its ability to detect the device's language and change the map text to use that language. The quickest way to do this is using the `matchMapLanguageWithDeviceDefault()` method.

Calling this method should happen within a try/catch statement because `matchMapLanguageWithDeviceDefault()` can throw a `NullPointerException`. This `NullPointerException` is thrown when the device's `Locale` has no matching `MapLocale` object. You need to create an instance of `MapLocale` and add it to the `MapLocale` cache (`LOCAL_SET`) using the `addMapLocale()` method.

{{
<CodeLanguageToggle id="match-language" />
<ToggleableCodeBlock

java={`
mapView.getMapAsync(new OnMapReadyCallback() {
  @Override
  public void onMapReady(MapboxMap mapboxMap) {

	LocalizationPlugin localizationPlugin = new LocalizationPlugin(mapView, mapboxMap);

	try {
      localizationPlugin.matchMapLanguageWithDeviceDefault();          
    } catch (RuntimeException exception) {
      Log.d(TAG, exception.toString());
    }
  }
});
`}

kotlin={`
mapView!!.getMapAsync { mapboxMap ->
	val localizationPlugin = LocalizationPlugin(mapView!!, mapboxMap)

	try {
	    localizationPlugin.matchMapLanguageWithDeviceDefault()
	} catch (exception: RuntimeException) {
	    Log.d(TAG, exception.toString())
	}
}
`}

/>
}}


## Set map language

The plugin overloads the `setMapLanguage()` method with three different parameter options.

| Method | Description |
| --- | --- |
| `setMapLanguage(String language)` | A string that is the language tag for the Mapbox-support language that you want to change the map too. You can find a list of supported language tags&nbsp; in the [`MapLocale` class](https://github.com/mapbox/mapbox-plugins-android/blob/e29c18d25098eb023a831796ff807e30d8207c36/plugin-localization/src/main/java/com/mapbox/mapboxsdk/plugins/localization/MapLocale.java#L39-L87).|
| `setMapLanguage(@NonNull Locale locale)` | The `Locale` object that is part of the Android platform. If you'd like to set the map language to a specific locale, you can pass it in as a parameter and `MapLocale` will try matching the information with one of the `MapLocale`s found in its map. A null point exception will be thrown if one isn't found. To prevent this, make sure that the `locale` you are trying to use, has a complementary `MapLocale` for it. |
| `setMapLanguage(@NonNull MapLocale mapLocale)` | The `MapLocale` object that is part of the plugin. For example, `localizationPlugin.setMapLanguage(MapLocale.GERMAN)`. |

## Adjust the map camera

A `LatLngBounds` bounding box isn't required to create a `MapLocale` instance. But, the plugin's `setCameraToLocaleCountry()` method can be used if the `MapLocale` has a `LatLngBounds` bounding box. For example, here is the plugin's bounding box for Germany:

{{
<CodeLanguageToggle id="adjust-camera" />
<ToggleableCodeBlock

java={`
private static final LatLngBounds GERMANY_BBOX = new LatLngBounds.Builder()
.include(new LatLng(55.055637, 5.865639))
.include(new LatLng(47.275776, 15.039889)).build();
`}

kotlin={`
val GERMANY_BBOX = LatLngBounds.Builder()
	.include(LatLng(55.055637, 5.865639))
	.include(LatLng(47.275776, 15.039889)).build()
`}

/>
}}


It is used in creating the Germany `MapLocale`:

{{
<CodeLanguageToggle id="germany-locale" />
<ToggleableCodeBlock

java={`
public static final MapLocale GERMANY = new MapLocale("name_de", GERMANY_BBOX);
`}

kotlin={`
val GERMANY = MapLocale("name_de", GERMANY_BBOX)
`}

/>
}}

Setting the camera:

{{
<CodeLanguageToggle id="setting-camera" />
<ToggleableCodeBlock

java={`
try {
	localizationPlugin.setCameraToLocaleCountry(GERMANY);
} catch (RuntimeException exception) {
	Log.d(TAG, exception.toString());
}
`}

kotlin={`
try {
	localizationPlugin.setCameraToLocaleCountry(GERMANY)
} catch (exception: RuntimeException) {
	Log.d(TAG, exception.toString())
}
`}

/>
}}

Calling the `setCameraToLocaleCountry()` method should happen within a try/catch statement because `setCameraToLocaleCountry()` can throw a `NullPointerException`. This `NullPointerException` is thrown when the `MapLocale` object was expecting to have a `LatLngBounds` bounding box but received `null` instead.
