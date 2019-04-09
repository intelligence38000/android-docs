---
title: "Turf for Java"
description: "Official documentation on the Mapbox Java SDK Turf library."
prependJs:
  - "import constants from '../../../constants';"
  - "import { Floater } from '../../../components/floater';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
contentType: guide
language:
- Java
- Kotlin
---

Turf is a modular geospatial engine written in JavaScript. The Turf for Java library allows Android-based projects to use Turf algorithms as well. You can do Turf algorithms completely on device and don't require any type of call/response to any API or internet database.

This page walks you through the powerful ways you can use Turf, setting up Turf inside of your project, and the appropriate times to use Turf.

Read the [official Turf.js library documentation](http://turfjs.org/) for a full list of Turf methods created across platforms. It takes time to port over JavaScript Turf methods into Java, test them, and make sure proper usage. This is why, when using this Java library, you might find a Turf method that has not been ported yet.

## Installation

Mapbox uses Turf heavily inside of our SDKs for Android, which means that if you are, for example, using one of our map plugins or our Navigation SDK, you already have access to this library. So, this dependency would be available to you transitively in your app.

To start developing an application using Turf for Java, you'll need to add the appropriate dependencies inside of your app by either placing it inside of your Maven's `POM` file or inside of Gradle's `build.gradle` file. You can find the dependency on MavenCentral.

### Add the dependency

#### Gradle

1. Start IntelliJ or Android Studio.
2. Open up your application's `build.gradle`.
4. Under dependencies, add a new build rule for the latest `mapbox-sdk-turf`.
5. Click on `Sync Project with Gradle Files` near the toolbar in the IDE.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-sdk-turf:{{constants.JAVA_SDK_VERSION }}'
}
```

#### Maven

If your project's using Maven instead of Gradle, you can add the dependency inside your projects `POM.xml` file.

```xml
<dependency>
    <groupId>com.mapbox.mapboxsdk</groupId>
    <artifactId>mapbox-sdk-turf</artifactId>
    <version>{{constants.JAVA_SDK_VERSION }}</version>
</dependency>
```

## Porting to Java

While the Java port follows the same algorithms, naming schemes, and testing, there are a few things specific to Java when using Turf inside your Java project. If you are looking for documentation on a specific Turf method, see the official [Turf.js documentation](http://turfjs.org/).

#### Working with GeoJSON

{{
  <Floater
    url="https://www.mapbox.com/help/define-geojson/"
    title="About GeoJSON"
    category="Info"
    text="Learn more about GeoJSON, the file format for geolocation data"
  />
}}

All Turf methods deal with spatial data that follows the GeoJSON spec. If you are not familiar with GeoJSON, it is a powerful format for encoding a variety of geographic data structures. The Turf Java library makes use of this and includes GeoJSON as a dependency inside this library. This means if you want to, for example, take the distance between two Lat/Lng points, you'd first need to have a representation of those coordinates as a GeoJSON `Point` object.

For example, you could use the following code to measure the straight distance (in feet) between the London Tower Bridge and the London Eye:

{{
<CodeLanguageToggle id="turf-example" />
<ToggleableCodeBlock

java={`
// Create a GeoJSON point representation of the locations.
private static final Point TOWER_BRIDGE = Point.fromLngLat(-0.07515, 51.50551);
private static final Point LONDON_EYE = Point.fromLngLat(-0.12043, 51.50348);

// Run the points through the Turf Measurement method and receive the distance.
TurfMeasurement.distance(TOWER_BRIDGE, LONDON_EYE, TurfConstants.UNIT_FEET);
`}

kotlin={`
companion object {
// Create a GeoJSON point representation of the locations.
private val TOWER_BRIDGE = Point.fromLngLat(-0.07515, 51.50551)
private val LONDON_EYE = Point.fromLngLat(-0.12043, 51.50348)
}

// Run the points through the Turf Measurement method and receive the distance.
TurfMeasurement.distance(TOWER_BRIDGE, LONDON_EYE, TurfConstants.UNIT_FEET)
`}

/>
}}

#### Class and method naming scheme

The Java port of Turf uses categories that represent the class name. For example, the "Measurement" category in the Turf.js API documentation will be the `TurfMeasurement` class in the Java port. This will include all the methods that fall underneath the category.

## Available methods

The project has an ongoing list of methods being ported. [GitHub issues](https://github.com/mapbox/mapbox-java/issues) are always welcome when your project is in need of a method which has not yet been ported. The chart below displays the available methods:

| Turf Java class | Description | Available methods |
| --- | --- | --- |
| `TurfAssertions` | Contains a set of methods used to enforce expectations of a certain type. It can also offer methods to calculate various shapes from given points. | `geojsonType` <br> `featureOf` <br> `collectionOf` |
| `TurfClassification` | Methods found in this class are meant to consume a set of information and classify it according to a shared quality or characteristic. | `nearestPoint` |
| `TurfConstants` | This is a Java-specific class that contains Java constants such as units. | |
| `TurfConversion` | This class is made up of methods that take in an object, convert it, and then return the object in the desired units or object. | `lengthToDegrees` <br> `degreesToRadians` <br> `radiansToDegrees` <br> `radiansToLength` <br> `lengthToRadians` <br> `convertLength` |
| `TurfException` | This is a runtime exception that is thrown when the parameters of a method aren't adequate, the GeoJSON object is missing information, or an arithmetic issue occurs. | |
| `TurfJoins` | Contains methods that can determine if points lie within a polygon or not. | `inside` <br> `pointsWithinPolygon`
| `TurfMeasurement` | Contains an assortment of methods used to calculate measurements such as bearing, destination, midpoint, etc. | `bearing` <br> `destination` <br> `distance` <br> `length` <br> `midpoint` <br> `along` <br> `bbox` |
| `TurfMeta` | Contains methods that are useful for getting all the coordinates from a specific GeoJSON geometry. | `coordAll` <br> `getCoord` |
| `TurfMisc` | Contains all the miscellaneous methods that Turf can perform. | `lineSlice`<br> `lineSliceAlong` <br> `nearestPointOnLine` |
| `TurfTransformation` | Methods in this class consume one GeoJSON object and output a new object with the defined parameters provided. | `circle` |
