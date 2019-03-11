---
title: Map and app design
description: Customize the look of your application made with the Mapbox Navigation UI SDK including adding map styles, styling the route line, and styling non-map UI elements.
products:
  - Navigation UI SDK
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import AppropriateImage from '../../../components/appropriate-image';"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
---

Use the Navigation UI SDK to design an application that provides a unique experience for your users or fits your brand. The Navigation UI SDK offers a wide range of options for customizing the look of your application including navigation instructions, route lines, and the map style.

## Day and Night mode

If you're using `NavigationLauncher` or `NavigationView` within your own `Activity` or `Fragment` the view will update based on
whatever the current mode is in the `Activity`. The current night mode is determined by [`AppCompatDelegate#getDefaultNightMode()`](https://developer.android.com/reference/android/support/v7/app/AppCompatDelegate.html#getDefaultNightMode()).

## Style the map route

You can use `NavigationMapRoute` to draw the route line on your map. Instantiate it with a `MapView` and `MapboxMap`, then add a `DirectionsRoute` from our Directions API. The `DirectionsRoute` will automatically be added (even in off-route scenarios) if you instantiate with `MapboxNavigation`. You can also style the route with a given style:

{{
<CodeLanguageToggle id="nav-map-route" />
<ToggleableCodeBlock

java={`
NavigationMapRoute mapRoute = new NavigationMapRoute(navigation, mapView, mapboxMap, styleRes);
}
`}

kotlin={`
val mapRoute = NavigationMapRoute(navigation, mapView, mapboxMap, styleRes)
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

## Style the `NavigationView`

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

{{<Note imageComponent={<BookImage size="60" />}>}}
Each style must provide a value for every custom attribute or have a parent style (`NavigationViewLight` or `NavigationViewDark`) or the `View` will not properly inflate. Our default Mapbox style will be used if you do not provide a style for either of the light or dark theme attributes.
{{</Note>}}

An example of how to create your own style can be found by looking at one of our default styles like `R.style.NavigationViewLight`:

```xml
<style name="MyCustomTheme" parent="NavigationViewLight">
   <item name="navigationViewPrimary">@color/mapbox_navigation_route_alternative_congestion_red</item>
   <item name="navigationViewSecondary">@color/mapbox_navigation_route_layer_blue</item>
    <!-- Map style URL -->
    <item name="navigationViewMapStyle">@string/navigation_guidance_day_v3</item>
</style>
```

Here are a two more examples of custom themes. `CustomNavigationMapRoute` is for the route line shown and is used in `CustomNavigationViewLight` which allows you to customize the remaining `NavigationView` colors, as well as the map style. Both have comments outlining where the given color should show on the screen:

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

Please reference the diagram below to see where these attribute names align within the actual UI:

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
