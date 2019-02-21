---
title: "Introduction"
description: "Official documentation for the Mapbox Java SDK."
prependJs:
  - "import OverviewHeader from '@mapbox/dr-ui/overview-header';"
  - "import AppropriateImage from '../../../components/appropriate-image';"
  - "import { JAVA_SDK_VERSION } from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

{{
    <OverviewHeader
      features={[
        "Global directions",
        "Travel time matrix for multiple points",
        "Geocoding",
        "Map Matching",
        "Duration-optimized route between multiple points",
        "Static images of maps",
        "Snap traces to road network",
        "Geospatial analysis"
      ]}
      title="Java SDK for Android"
      version={JAVA_SDK_VERSION}
      changelogLink="https://github.com/mapbox/mapbox-java/blob/master/CHANGELOG.md"
      ghLink="https://github.com/mapbox/mapbox-java"
      image={<AppropriateImage imageId="overviewServicesSdk" alt="Mobile devices displaying applications using the Mapbox Java SDK for Android." />}
    />
}}

The Mapbox Java SDK is an open source toolset for building applications that need navigation, directions, geocoding, static map imagery, etc. It conveniently wraps Mapbox APIs and builds off of them with tools which are useful for your applications. This SDK has no dependency on the Android API and can be used in any of your Java projects.

### Support and contributions

- If you are looking for support using this SDK, either reach out through [Stack Overflow](https://stackoverflow.com/questions/tagged/mapbox+android) or through our [contact page](https://www.mapbox.com/contact/).
- If you have found a bug, and can provide steps to reliably reproduce it, open an issue in the /mapbox-java repository on GitHub and apply the bug label.
- If you have a feature request, open an issue in the /mapbox-java repository on GitHub, and apply the enhancement label.
- If you want to contribute, look over our contribution guidelines and open a pull request with your changes.

### API reference

All public methods in all the project modules are well documented and even include a since tag so you can find when an API was first added. A link for all the module javadoc pages can be found in the list below:

Version _above_ 3.0.0:
- [mapbox-sdk-turf](https://docs.mapbox.com/android/api/mapbox-java/libjava-turf/3.0.1/index.html)
- [mapbox-sdk-geojson](https://docs.mapbox.com/android/api/mapbox-java/libjava-geojson/3.0.1/index.html)
- [mapbox-sdk-services](https://docs.mapbox.com/android/api/mapbox-java/libjava-services/3.0.1/index.html)
- [mapbox-sdk-core](https://docs.mapbox.com/android/api/mapbox-java/libjava-core/3.0.1/index.html)

Version _below_ 3.0.0:
- [mapbox-java-core](https://docs.mapbox.com/android/api/mapbox-java/libjava-geojson/2.2.10/index.html)
- [mapbox-java-geojson](https://docs.mapbox.com/android/api/mapbox-java/libjava-geojson/2.2.10/index.html)
- [mapbox-java-services](https://docs.mapbox.com/android/api/mapbox-java/libjava-services/2.2.10/index.html)
- [mapbox-java-services-rx](https://docs.mapbox.com/android/api/mapbox-java/libjava-services-rx/2.2.10/index.html)
- [mapbox-android-services](https://docs.mapbox.com/android/api/mapbox-java/libandroid-services/2.2.10/index.html)
- [mapbox-android-ui](https://docs.mapbox.com/android/api/mapbox-java/libandroid-ui/2.2.10/index.html)

### Access tokens

If you plan to use any of our APIs such as directions, geocoding, navigation, etc. you'll need to have a Mapbox access token which you'll pass in as a parameter. An access token isn't needed if you plan to use the Mapbox Java SDK only for GeoJSON parsing or Turf calculations. Read [this document](https://www.mapbox.com/help/create-api-access-token/) to learn more about access tokens.

### Point object

Throughout the APIs exposed within the Java SDK, you'll notice the common usage of the `Point` object to represent a coordinate. The order in which the coordinate pair are longitude followed by latitude. Creating a new `Point` is fairly straightforward and can be converted from a `LatLng` object if you are using the Mapbox Maps SDK for Android.

The Java SDK will try to detect if your coordinates are outside the accepted range. This range is between -180 to 180 for longitudes and -90 to 90 for latitude. If the coordinates are outside the accepted range, the SDK will log a warning.

> **Note:** if you happen to be using our Maps SDK with the Java SDK, you'll notice that the `LatLng` object has the reverse order; latitude comes before the longitude value.

{{
<CodeLanguageToggle id="location" />
<ToggleableCodeBlock

java={`
Point point = Point.fromLngLat(LONGITUDE, LATITUDE);
`}

kotlin={`
val singlePoint = Point.fromLngLat(LONGITUDE, LATITUDE);
`}
/>
}}


## Installation

To start developing your application using the Mapbox Java SDK, you'll need to first decide which installation method works best for you. The SDK is fully compatible with Android using Gradle and most of the project (besides the Android dependent modules) can also be included in a generic Java project using either Gradle or Maven. All dependencies given below can be found on MavenCentral.

### Gradle

1. Start Android Studio
2. Open up your applications `build.gradle`
3. Make sure your projects `minSdkVersion` is at API 15 or higher
4. Under dependencies add a new build rule for the latest mapbox-android-services
5. Click the Sync Project with Gradle Files near the toolbar in Studio

> **Note:** If your application is close or exceeds the 65k method count limit, you can mitigate this problem by specifying only the specific Mapbox Android Service APIs. See the selectively compiling APIs section below.

```groovy
implementation 'com.mapbox.mapboxsdk:mapbox-sdk-services:{{ JAVA_SDK_VERSION }}'
```

### Maven

If your project's using Maven instead of Gradle, you can add the dependency inside your projects `POM.xml` file.

```xml
<dependency>
    <groupId>com.mapbox.mapboxsdk</groupId>
    <artifactId>mapbox-sdk-services</artifactId>
    <version>{{ JAVA_SDK_VERSION }}</version>
</dependency>
```

### Selectively compiling APIs

In versions of the Mapbox Java SDK before 2.0, you would have to compile the entire package of APIs. This in some cases, could cause Android applications to go over the 65,536 method count limit.

Starting with 2.0, you now have the option to include either the entire package of APIs (using the dependencies listed above) or you can now selectively choose which specific APIs your application needs. For example, if you only need to handle GeoJSON serialization or deserialization inside your application you only need to include the GeoJSON dependency in your project.

The list below shows all the current separated dependencies you can use in your Android application.

If you're using a version _above_ 3.0.0:

```groovy
implementation 'com.mapbox.mapboxsdk:mapbox-sdk-core:{{ JAVA_SDK_VERSION }}'
implementation 'com.mapbox.mapboxsdk:mapbox-sdk-geojson:{{ JAVA_SDK_VERSION }}'
implementation 'com.mapbox.mapboxsdk:mapbox-sdk-services:{{ JAVA_SDK_VERSION }}'
implementation 'com.mapbox.mapboxsdk:mapbox-sdk-turf:{{ JAVA_SDK_VERSION }}'
```

If you're using a version _below_ 3.0.0:

```groovy
implementation 'com.mapbox.mapboxsdk:mapbox-java-core:VERSION_NUMBER'
implementation 'com.mapbox.mapboxsdk:mapbox-java-geojson:VERSION_NUMBER'
implementation 'com.mapbox.mapboxsdk:mapbox-java-services:VERSION_NUMBER'
implementation 'com.mapbox.mapboxsdk:mapbox-java-services-rx:VERSION_NUMBER'
implementation 'com.mapbox.mapboxsdk:mapbox-android-services:VERSION_NUMBER'
implementation 'com.mapbox.mapboxsdk:mapbox-android-telemetry:VERSION_NUMBER'
implementation 'com.mapbox.mapboxsdk:mapbox-android-ui:VERSION_NUMBER'
```

> **Note:** ProGuard directives are included in the Android dependencies to preserve the required classes.
