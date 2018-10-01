---
title: "Events"
description: "Documentation about map events within the Mapbox Maps SDK for Android. Read about map clicking, flinging, scrolling, and other Mapbox map events."
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

The Maps SDK provides various ways to listen to map events. The majority of listeners that the SDK offers are listed below. However, you'll occasionally find other listeners specific to their corresponding API inside other overview documents.

## Map click & long click events

Click (tap) events can be set up through the `MapboxMap` object and invoke a callback each time that the event occurs. In both cases, the callback provides a `LatLng` of where the user click occurred on the map. To add an onClick listener to your map, insert the following snippet inside your application's code:

{{
<CodeLanguageToggle id="click-events" />
<ToggleableCodeBlock

java={`

mapboxMap.addOnMapClickListener(new MapboxMap.OnMapClickListener() {
  @Override
  public void onMapClick(@NonNull LatLng point) {
  
    String string = String.format(Locale.US, "User clicked at: %s", point.toString())
    
    Toast.makeText(MainActivity.this, string, Toast.LENGTH_LONG).show();
    
  }
});
`}

kotlin={`

mapboxMap.addOnMapClickListener { latLngPoint ->

	val string = String.format(Locale.US, "User clicked at: %s", latLngPoint.toString())

	Toast.makeText(this@MainActivity, string, Toast.LENGTH_LONG).show()
	
}
`}

/>
}}

### Convert from screen pixel

In occasions when you need to know the corresponding location on the screen where the user gesture occurred, you can convert the LatLng point to screen pixels. The MapboxMap object provides the `Projection` from the map which allows you to convert between `LatLng` coordinates to screen pixel using `mapboxMap.getProjection().toScreenLocation(<LatLng>);`. The reverse is available when you have a screen location in pixels and need to convert it to a corresponding `LatLng` object.

A common use case for converting the values between `LatLng` and pixel coordinates is when you'd like to query a map layer or source to, for example, determine whether or not the users clicked on a POI. You can read more on how to do this in the [Query map features](/android-docs/map-sdk/overview/query/) documentation.

## Camera change events

The map's camera represents the view looking down on the maps flat plane. In almost all cases, you'll be interacting with the camera to adjust the map's starting zoom and target position. The user also can manipulate the camera by performing gestures on the map such as pinch-to-zoom, two-finger scroll to tilt, and single finger moves to adjust the position.

The Map SDK provides a handful of camera change listeners which can notify you of any or specific camera movements. Different camera listeners are given to determine if the camera movement was caused by a user gesture, built-in API animations, or a developer-controlled movement. The snippet below shows the various camera listeners available:

{{
<CodeLanguageToggle id="camera-change-events" />
<ToggleableCodeBlock

java={`

mapboxMap.addOnCameraMoveStartedListener(new MapboxMap.OnCameraMoveStartedListener() {

  private final String[] REASONS = {"REASON_API_GESTURE", "REASON_DEVELOPER_ANIMATION", "REASON_API_ANIMATION"};

  @Override
  public void onCameraMoveStarted(int reason) {
    String string = String.format(Locale.US, "OnCameraMoveStarted: %s", REASONS[reason - 1])
    Toast.makeText(MainActivity.this, string, Toast.LENGTH_LONG).show();
  }
});

mapboxMap.addOnCameraMoveListener(new MapboxMap.OnCameraMoveListener() {
  @Override
  public void onCameraMove() {  
    Toast.makeText(MainActivity.this, "onCameraMove", Toast.LENGTH_LONG).show();
  }
});

mapboxMap.addOnCameraMoveCancelListener(new MapboxMap.OnCameraMoveCanceledListener() {
  @Override
  public void onCameraMoveCanceled() {
    Toast.makeText(MainActivity.this, "onCameraMoveCanceled", Toast.LENGTH_LONG).show();
  }
});

mapboxMap.addOnCameraIdleListener(new MapboxMap.OnCameraIdleListener() {
  @Override
  public void onCameraIdle() {
    Toast.makeText(MainActivity.this, "onCameraIdle", Toast.LENGTH_LONG).show();
  }
});
`}

kotlin={`

mapboxMap.addOnCameraMoveStartedListener(object : 
	MapboxMap.OnCameraMoveStartedListener {
	
	private val REASONS = arrayOf("REASON_API_GESTURE", "REASON_DEVELOPER_ANIMATION", "REASON_API_ANIMATION")
	
	override fun onCameraMoveStarted(reason: Int) {
		val string = String.format(Locale.US, "OnCameraMoveStarted: %s", REASONS[reason - 1])
		
		Toast.makeText(this@MainActivity, string, Toast.LENGTH_LONG).show()
	}
})

mapboxMap.addOnCameraMoveListener { Toast.makeText(this@MainActivity, "onCameraMove", Toast.LENGTH_LONG).show() }

mapboxMap.addOnCameraMoveCancelListener { Toast.makeText(this@MainActivity, "onCameraMoveCanceled", Toast.LENGTH_LONG).show() }

mapboxMap.addOnCameraIdleListener { Toast.makeText(this@MainActivity, "onCameraIdle", Toast.LENGTH_LONG).show() }
`}

/>
}}



## On fling & on scroll events

Besides the camera change listeners, the `MapboxMap` object allows you to listen into when the user scrolls or flings the map. A scroll event occurs when the user drags a single finger across the screen causing the camera position to change. A similar action from the user will cause the `onFling` callback to be invoked, but the user performs the gesture with more momentum. Only one of these events will be fired once when the user performs the particular gesture.

{{
<CodeLanguageToggle id="on-fling-and-scroll-events" />
<ToggleableCodeBlock

java={`

mapboxMap.addOnScrollListener(new MapboxMap.OnScrollListener() {
  @Override
  public void onScroll() {
    Toast.makeText(MainActivity.this, "onScroll", Toast.LENGTH_LONG).show();
  }
});

mapboxMap.addOnFlingListener(new MapboxMap.OnFlingListener() {
  @Override
  public void onFling() {
    Toast.makeText(MainActivity.this, "onFling", Toast.LENGTH_LONG).show();
  }
});
`}

kotlin={`

mapboxMap.addOnScrollListener { 

Toast.makeText(this@MainActivity, "onScroll", Toast.LENGTH_LONG).show() 

}

mapboxMap.addOnFlingListener { 

Toast.makeText(this@MainActivity, "onFling", Toast.LENGTH_LONG).show() 

}
`}

/>
}}


## Marker and info window events

The Maps SDK provides a handy listener for capturing when a user taps on a marker. By default, all markers come with an onMarkerClick event listener for displaying and hiding info windows. You can override this default event listener and set your own with the `setOnMarkerClickListener` method.

To display a toast message with the clicked marker’s title, listen for a click event with `setOnMarkerClickListener` and finally call Toast.makeText(). To prevent displaying a toast message and an info window at the same time, return true at the end:

{{
<CodeLanguageToggle id="marker-events" />
<ToggleableCodeBlock

java={`

mapboxMap.setOnMarkerClickListener(new MapboxMap.OnMarkerClickListener() {
  @Override
  public boolean onMarkerClick(@NonNull Marker marker) {
    Toast.makeText(MainActivity.this, marker.getTitle(), Toast.LENGTH_LONG).show();
    return true;
  }
});
`}

kotlin={`

mapboxMap.setOnMarkerClickListener { marker ->

	Toast.makeText(MainActivity.this, marker.getTitle(), Toast.LENGTH_LONG).show();
	
}
`}

/>
}}


In a similar case, the info window offers a handful of listeners for being notified when an info windows clicked, long clicked, or when a user closes the window.

{{
<CodeLanguageToggle id="info-window-events" />
<ToggleableCodeBlock

java={`

mapboxMap.setOnInfoWindowLongClickListener(OnInfoWindowLongClickListener);
mapboxMap.setOnInfoWindowCloseListener(new MapboxMap.OnInfoWindowCloseListener() {
	@Override
	public void onInfoWindowClose(@NonNull Marker marker) {

	}
});

mapboxMap.setOnInfoWindowClickListener(new MapboxMap.OnInfoWindowClickListener() {
  @Override
  public boolean onInfoWindowClick(@NonNull Marker marker) {
    return false;
  }
});

`}

kotlin={`

mapboxMap.onInfoWindowCloseListener = MapboxMap.OnInfoWindowCloseListener { marker -> val closedMarker = marker }

mapboxMap.onInfoWindowClickListener = MapboxMap.OnInfoWindowClickListener { marker -> 
	// Able to use the marker 
marker.icon 
	false
}
`}

/>
}}



## Map change events

The map view goes through a series of events while building/changing the map. The `OnMapChangedListener` provided can be used to notify you when one or multiple events occur you're interested in. This includes knowing when the map starts and finishes loading the map style or when frames are finished rendering.

Instead of adding the listener through the `MapboxMap` object, the listeners added using the `MapView`, `mapView.addOnMapChangedListener(OnMapChangedListener());`. You can also implement the `MapView.OnMapChangedListener` interface and override the `onMapChanged()` method. When a new map change occurs, the `onMapChanged()` callback is invoked. This provides the constant, as an integer, as the parameter which you can then use to match up with one of the constants listed in the table below.

The lifecycle events below are listed in the order in which they occur during the most basic loading of a `MapView`. 

| MapChange Constants                       | Description |
|-------------------------------------------|--------|
| `REGION_WILL_CHANGE`                        | This event is triggered whenever the currently displayed map region is about to change without an animation. |
| `REGION_DID_CHANGE`                         | This event is triggered whenever the currently displayed map region finished changing without an animation. |
| `WILL_START_LOADING_MAP`                    | This event is triggered when the map is about to start loading a new map style. |
| `WILL_START_RENDERING_MAP`                  | This event is triggered when the map will start rendering the map. |
| `WILL_START_RENDERING_FRAME`                | This event is triggered when the map will start rendering a frame. |
| `DID_FINISH_RENDERING_FRAME`                | This event is triggered when the map finished rendering a frame. |
| `REGION_WILL_CHANGE`                        | This event is triggered whenever the currently displayed map region is about to change without an animation. |
| `REGION_DID_CHANGE`                         | This event is triggered whenever the currently displayed map region finished changing without an animation. |
| `DID_FINISH_LOADING_STYLE`                  | Triggered when a style has finished loading. |
| `DID_FINISH_RENDERING_FRAME`                | This event is triggered when the map finished rendering a frame. |
| `SOURCE_DID_CHANGE`                         | Triggered when a source attribution changes. |
| `WILL_START_RENDERING_FRAME`                | This event is triggered when the map will start rendering a frame. |
| `DID_FINISH_RENDERING_FRAME`                | This event is triggered when the map finished rendering a frame. |
| `DID_FINISH_RENDERING_FRAME_FULLY_RENDERED` | This event is triggered when the map finished rendering the frame fully. |
| `DID_FINISH_RENDERING_MAP_FULLY_RENDERED`   | This event is triggered when the map is fully rendered. |
| `DID_FINISH_LOADING_MAP`                    | This is triggered when the map has successfully loaded a new map style. |
| `WILL_START_RENDERING_FRAME`                | This event is triggered when the map will start rendering a frame. |
| `DID_FINISH_RENDERING_MAP_FULLY_RENDERED`   | This event is triggered when the map is fully rendered. |


Additional change events that are not part of the standard map lifecycle:

| MapChange Constants                       | Description |
|-------------------------------------------|--------|
| `REGION_WILL_CHANGE_ANIMATED`               | This event is triggered whenever the currently displayed map region is about to change with an animation. |
| `REGION_IS_CHANGING`                        | This event is triggered whenever the currently displayed map region is changing. |
| `REGION_DID_CHANGE_ANIMATED`                | This event is triggered whenever the currently displayed map region finished changing with an animation. |
| `DID_FAIL_LOADING_MAP`                      | This event is triggered when the map has failed to load a new map style. |
| `DID_FINISH_RENDERING_MAP`                  | This event is triggered when the map finished rendering the map. |



When the event that you were interested in actually occurs and you no longer need to listen to the map change events, `mapView.removeOnMapChangedListener(mapChangeListener)` can be used to remove the listener.

`DID_FINISH_LOADING_STYLE ` is useful if you're using runtime styling to change the Mapbox map style in real time. Here's how you'd use the constant:

{{
<CodeLanguageToggle id="window-click-listener-events" />
<ToggleableCodeBlock

java={`
@Override
  public void onMapChanged(int change) {
    if (change == MapView.DID_FINISH_LOADING_STYLE) {

      // Here is where you can re-add the source(s) and layer(s)
      // for displaying data on top of the new map style
      
    }
  }
`}

kotlin={`
override fun onMapChanged(change: Int) {
        if (change == MapView.DID_FINISH_LOADING_STYLE) {

            // Here is where you can re-add the source(s) and layer(s)
            // for displaying data on top of the new map style

        }
    }
`}

/>
}}
