---
title: "Static Image"
description: "Official documentation on the Mapbox Java SDK Static API"
sideNavSections:
  - title: "Building the URL"
  - title: "Overlays"
  - title: "Downloading the image"
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

The Mapbox Static API returns static maps and raster tiles from styles in the Mapbox Style Specification. Static maps are standalone images that can be displayed in an `ImageView` without the aid of a mapping library or API. They look like an embedded map without interactivity or controls. Specific to the Java API, it builds the request URL for you.

## Building the URL

To begin with, you'll need to create a new instance of the `MapboxStaticMap` object and use its builder to customize your image request. The options offered in the builder include anything from setting the latitude and longitude to adding markers and other annotations. The image width and height are important parameters for displaying the correct aspect ratio inside of your application's ImageView. Oftentimes, you'll will want to check if your user's device supports retina or not by using `getResources().getDisplayMetrics().density`.

{{
<CodeLanguageToggle id="static-image-request" />
<ToggleableCodeBlock

java={`
MapboxStaticMap staticImage = MapboxStaticMap.builder()
  .accessToken(getString(R.string.access_token))
  .styleId(StaticMapCriteria.LIGHT_STYLE)
  .cameraPoint(Point.fromLngLat(longitude, latitude)) // Image's centerpoint on map
  .cameraZoom(13)
  .width(320) // Image width
  .height(320) // Image height
  .retina(true) // Retina 2x image will be returned
  .build();
`}

kotlin={`
val staticImage = MapboxStaticMap.builder()
	.accessToken(getString(R.string.access_token))
	.styleId(StaticMapCriteria.LIGHT_STYLE)
	.cameraPoint(Point.fromLngLat(longitude, latitude) // Image's center point on map
	.cameraZoom(13)
	.width(320) // Image width
	.height(320) // Image height
	.retina(true) // Retina 2x image will be returned
	.build()) 
`}
/>
}}

Make sure to use the `StaticMapCriteria` to reference the default Mapbox map styles such as Light, Dark, or Streets. The `MapboxStaticMap` image generation will not work correctly if you try to retrieve the styles' strings from the `Style` class that lives in the Mapbox Maps SDK for Android.

## Overlays

An overlay is data that can be applied on top of a static map at request time. These are comma separated and can be either valid GeoJSON, a marker, a custom marker, or polyline. Overlays cannot consist of more than 100 features. The maximum overlay length is 2083 characters. The order of the features dictates their Z-order on the page. The last item in the list will have the highest Z-order (will overlap the other features in the list), and the first item in the list will have the lowest (will appear below other features).

The following methods can be used with the `MapboxStaticMap.builder()` to add overlays to a static map image:

| Method | Description |
| --- | --- |
| `staticMarkerAnnotations` | A list of marker annotations that can be placed on the static map image during the image rendering process.
| `staticPolylineAnnotations ` | A list of polyline annotations that can be placed on the static map image during the image rendering process.
| `geoJson ` | A GeoJSON object that represents a specific annotation which will be placed on the static map. The GeoJSON must be a value.

### Downloading the image

After creating the `MapboxStaticImage` instance with all your customization parameters, you'll need to handle downloading the image directly into your application so it is displayed properly to the user. The Mapbox Java SDK doesn't offer any sort of image downloading/loading APIs but we highly recommend using a third party library such as [Picasso](http://square.github.io/picasso/) or [Glide](https://github.com/bumptech/glide) rather then an asynchronous task. Using Picasso, you can downloading the static map image with only a few lines of code.

{{
<CodeLanguageToggle id="static-image-download" />
<ToggleableCodeBlock

java={`
String imageUrl = staticImage.url().toString();
Picasso.with(this).load(imageUrl).into(imageView);
`}

kotlin={`
val imageUrl = staticImage.url().toString()
Picasso.with(this).load(imageUrl).into(imageView)
`}
/>
}}
