---
title: "Styling the map"
description: "Learn how to use the Mapbox Maps SDK for Android to change your map style to a custom style or a pre-made style made by the talented Mapbox cartography team."
---

The Maps SDK for Android allows full customization when it comes to displaying your map. This means you can brand the map with the colors, icons, and fonts that match your apps UI. The customization can either be done using [Mapbox Studio](https://www.mapbox.com/help/studio-manual/) or during runtime using the [Runtime Styling APIs](https://www.mapbox.com/android-docs/map-sdk/overview/runtime-styling/).

## Changing the default style

As powerful as styling the map can be, to get started using the Maps SDK, it offers six professional styles that will look great in your app:

1. **Mapbox Streets:** Mapbox Streets is a comprehensive, general-purpose map that emphasizes legible styling of road and transit networks.
2. **Outdoor:** Mapbox Outdoors is a general-purpose map with curated datasets and specialized styling tailored to hiking, biking, and the most adventurous use cases.
3. **Light and Dark:** Mapbox Light and Mapbox Dark are subtle, full-featured maps designed to provide geographic context while highlighting the data on your analytics dashboard, data visualization, or data overlay.
4. **Satellite:** is our full global base map that is perfect as a blank canvas or an overlay for your own data.
5. **Satellite Streets:** combines our Mapbox Satellite with vector data from Mapbox Streets. The comprehensive set of road, label, and POI information brings clarity and context to the crisp detail in our high-resolution satellite imagery.
6. **Traffic:** Visually show realtime traffic using either the provided day or night traffic styles.

## Custom Mapbox Studio style

To use a custom style, paste your style URL into your MapView's mapbox:mapbox_styleUrl attribute in your activity's layout file. If you would like to change the map style later on, call `MapboxMap.setStyleUrl()` with the new style and your map will update.

## Style-related events

Changing the map's style in real time (known as "runtime styling"), triggers a map event. Read [the map change event documentation](https://www.mapbox.com/android-docs/maps/overview/events/#map-change-events) for more information about the events and how to display data on your map _after_ a map style has finished loaded.
