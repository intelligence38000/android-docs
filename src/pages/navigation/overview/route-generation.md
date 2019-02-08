---
title: Route generation
description: Some description.
products:
  - Navigation UI
  - Navigation core
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

Text

## Navigation UI

### NavigationViewOptions

`NavigationViewOptions` provides a way to pass variables to a `NavigationView`.
This class can be used with `NavigationLauncher` or when starting navigation
with a custom implementation of `NavigationView`.

You must provide either a valid `DirectionsRoute` object, or both an origin
and destination `Point` objects. If you provide both, only the `DirectionsRoute` will be used.

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
Metric / imperial unit formatting is based on the voice unit type you used for fetching the `DirectionsRoute` with `NavigationRoute`. The `NavigationView` will look at the option from the API request and use this for the UI formatting. The `NavigationRoute` `Builder` takes an Android `Context` so that if you don't specify a voice unit type, the default will be based on the device `Locale` (from `Configuration`).

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

## Navigation core

### Request a route in a specific direction

Consider the direction a user’s device is facing, and request a route starting in a specific direction. To receive a route that starts off in the same direction the user is already traveling, pass in the user’s location bearing value (between 0 and 355 degrees).

If you need to request a route that's continuing along the path that the user is traveling, specify a bearing and a tolerance that determines how far you are willing to deviate from the provided bearing. This is useful for off-route scenarios.

This can be applied to the origin, waypoints, and the destination using `NavigationRoute`:

{{
<CodeLanguageToggle id="location-object" />
<ToggleableCodeBlock

java={`
// An Android Location object
double bearing = Float.valueOf(location.getBearing()).doubleValue();
double tolerance = 90d;
NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin, bearing, tolerance)
    .destination(destination)
    .build();
`}

kotlin={`
// An Android Location object
val bearing = location.bearing.toDouble()
val tolerance = 90.0
NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin, bearing, tolerance)
    .destination(destination)
    .build()
`}

/>
}}

### Specify a side of the road to approach

You can indicate from which side of the road to approach a waypoint by adding `approaches` to the `NavigationRoute` builder. There are three options found in `DirectionsCriteria.ApproachesCriteria`:

- `"unrestricted"` (default): the route can approach waypoints from either side of the road.
- `"curb"`: the route will be returned so that on arrival, the waypoint will be found on the side that corresponds with the `driving_side` of the region in which the returned route is located.
- `null`: if no option is specified, it is translated internally to `""`, which has the same result as setting an approach to `"unrestricted"`.

If provided, the list of approaches must be the same length as the list of waypoints (including the `origin` and the `destination`) and in that particular order i.e. `origin`, waypoints, `destination`.

If a re-route occurs and `approaches` were used to fetch the `DirectionsRoute` that was originally provided to the `NavigationView`, the new route fetched will take the same `approaches` criteria into account.

{{
<CodeLanguageToggle id="nav-approaches" />
<ToggleableCodeBlock

java={`
NavigationRoute.Builder builder = NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin)
    .addWaypoint(pickup)
    .destination(destination);

builder.addApproaches("unrestricted", "curb", "curb");
builder.build();
`}

kotlin={`
val builder = NavigationRoute.builder(context)
  .accessToken(MAPBOX_ACCESS_TOKEN)
  .origin(origin)
  .addWaypoint(pickup)
  .destination(destination!!)

builder.addApproaches("unrestricted", "curb", "curb")
builder.build()
`}

/>
}}

### Include multiple stops

If your navigation involves a bunch of pick-up and drop-off points, you can add up to 25 coordinates to the `NavigationRoute` builder; these are considered stops in between the origin and destination `Points` (in the order that you add them - first waypoint is the first stop):

{{
<CodeLanguageToggle id="route-builder" />
<ToggleableCodeBlock

java={`
NavigationRoute.Builder builder = NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin)
    .destination(destination);

for (Point waypoint : waypoints) {
  builder.addWaypoint(waypoint);
}

builder.build();
`}

kotlin={`
val builder = NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin)
    .destination(destination)

for (waypoint in waypoints) {
    builder.addWaypoint(waypoint)
}

builder.build()
`}

/>
}}