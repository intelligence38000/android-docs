---
title: "Offline"
description: "The Mapbox Maps SDK for Android supports offline maps, which is great for situation when your Android app has no internet connection. Get started with offline docs here."
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import { WarningNote } from '../../../components/warning-note';"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
  - "import { MAP_SDK_VERSION } from '../../../constants';"
  - "import { WarningNote } from '../../../components/warning-note';"
---

Often, you might find your user base spends most of its time off the grid. The Maps SDK enables you to download and store pre-selected regions for usage when the device goes offline. The result of downloading the map is a fully functional map using your styles, tiles, and other resources inside the downloaded region.

{{
<WarningNote title="Offline Plugin">
    <p>A user's device won't always have a strong enough internet connection to download and view map tiles. You might want to build an offline mode into your Android project to account for this situation. <a href="/android/plugins/overview/offline/">The Mapbox Offline Plugin for Android</a> is a convenient way to send information to <a href="https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDK/src/main/java/com/mapbox/mapboxsdk/offline/OfflineManager.java">the Maps SDK's <code>OfflineManager</code> class</a> and use the manager in a background service to download map tiles for offline use. Once the offline download region is defined and initialized, the plugin handles everything else for you. Because the plugin uses a service, the downloading continues even if when your application is running in the background.</p>
</WarningNote>
}}

## Limitations

An app can download multiple regions for offline use, but the total offline download is capped at a maximum tile count “ceiling” across all downloaded regions. The tile ceiling is set to 6,000 tiles by default but can be raised [for paid plans](https://www.mapbox.com/pricing/). Use our [Tile Count Estimator](https://www.mapbox.com/labs/offline-estimator/) to calculate the number of tiles required for your offline use case. Six thousand tiles cover a region roughly the size of Greater London within the M25 at zoom levels 0–15 or the contiguous United States at zoom levels 0–9. The size of these tiles on disk will vary according to the selected style.

The Maps SDK places no limit on the number of offline regions that may be created. Your Mapbox-powered application will reuse tiles and resources that are required by multiple regions, conserving network traffic and disk space.

The SDK also places no limit on the download speed of offline regions, nor to disk space used by offline resources. The limits will depend on the storage capacity of the mobile device and the speed of the network to which it is connected.

Our [terms of service](https://www.mapbox.com/tos/#[YmcMYmns]) do not allow you or an end user to redistribute offline maps downloaded from Mapbox servers.

## Automatic tile updates

The Maps SDK downloads tiles when any connection is available, including over regular mobile data (2G, 3G, 4G, etc.). Because only individual highly-optimized tiles download, there's no risk of the user incurring an unexpected 100MB download just by opening the map in a region that's already downloaded. That is, of course, unless the user is browsing 100MB worth of tiles.

When the SDK automatically updates offline map tiles, the offline region is not re-download from scratch. The offline tile update process is the same process as with regular map tiles: The map tile's only downloaded if there's a new version of that tile.

## Defining a region

Before a region can be used offline, the resources necessary for that region must be downloaded. Based on the parameters you specify when creating the region, the SDK calculates all resource requirements such as fonts, styles, and vector tiles covering the region. If more than one region in the offline database contains the fonts and styles, these will not be re-downloaded when another region's downloaded.

First, you'll need to get the `offlineManager` instance, define the region to download, and finally create the definition object. It's important to note a few things:

- The offline map style _must_ match the one being used for your `mapView`.
- The definition needs the device's screen density. It's best to get this from the activities resources.
- The bounds used for the download must not go over the 6,000 tile limit.

{{
<CodeLanguageToggle id="define-offline-region" />
<ToggleableCodeBlock

java={`
// Set up the OfflineManager
OfflineManager offlineManager = OfflineManager.getInstance(MainActivity.this);

// Create a bounding box for the offline region
LatLngBounds latLngBounds = new LatLngBounds.Builder()
  .include(new LatLng(37.7897, -119.5073)) // Northeast
  .include(new LatLng(37.6744, -119.6815)) // Southwest
  .build();

// Define the offline region
OfflineTilePyramidRegionDefinition definition = new OfflineTilePyramidRegionDefinition(
  mapboxMap.getStyleUrl(),
  latLngBounds,
  10,
  20,
  MainActivity.this.getResources().getDisplayMetrics().density);
`}

kotlin={`
// Set up the OfflineManager
val offlineManager = OfflineManager.getInstance(this@MainActivity)

// Create a bounding box for the offline region
val latLngBounds = LatLngBounds.Builder()
	.include(LatLng(37.7897, -119.5073)) // Northeast
	.include(LatLng(37.6744, -119.6815)) // Southwest
	.build()

// Define the offline region
val definition = OfflineTilePyramidRegionDefinition(
	mapboxMap.styleUrl,
	latLngBounds,
	10.0,
	20.0,this@MainActivity.getResources().getDisplayMetrics().density)
`}

/>
}}


### Metadata

Providing a metadata object's encouraged with at least a region name so that various regions your user's download will be distinguishable. Besides the region name, you can store any arbitrary binary region information you'd like. The contents are opaque to the SDK implementation and won't affect your offline region download, it only stores and retrieves a byte array.

{{
<CodeLanguageToggle id="metadata" />
<ToggleableCodeBlock

java={`
// Implementation that uses JSON to store Yosemite National Park as the offline region name.
byte[] metadata;
try {
  JSONObject jsonObject = new JSONObject();
  jsonObject.put(JSON_FIELD_REGION_NAME, "Yosemite National Park");
  String json = jsonObject.toString();
  metadata = json.getBytes(JSON_CHARSET);
} catch (Exception exception) {
  Log.e(TAG, "Failed to encode metadata: " + exception.getMessage());
  metadata = null;
}
`}

kotlin={`
// Implementation that uses JSON to store Yosemite National Park as the offline region name.
var metadata: ByteArray?
try {
	val jsonObject = JSONObject()
	jsonObject.put(JSON_FIELD_REGION_NAME, "Yosemite National Park")
	val json = jsonObject.toString()
	metadata = json.toByteArray(charset(JSON_CHARSET))
} catch (exception: Exception) {
    Log.e(TAG, "Failed to encode metadata: " + exception.message)metadata = null
}
`}

/>
}}

Besides creating the metadata, you can also update the information stored, allowing your users, for example, to update the region name. The `offlineManager` object provides a method called `updateMetadata` which takes in both the updated metadata byte array and a callback to be notified when the update is completed, or an error occurs.

## Download a region

Now that the bounds and definition object are created, you can use the offlineManager to create an asynchronous download calling `createOfflineRegion`. You'll need to pass in the definition and metadata objects we created in both the [Defining a region](#defining-a-region) and [metadata](#metadata) sections. This will provide you with two methods, `onCreate` and `onError`. onError occurs if an error starting or while downloading the region occurs. The `onCreate` method provides an `offlineRegion` object which you can use to check the download and even display the progress to your users. If you need to pause a download, you can use the `offlineRegion.setDownloadState()` to handle this.

{{
<CodeLanguageToggle id="region-download" />
<ToggleableCodeBlock

java={`
// Create the region asynchronously
offlineManager.createOfflineRegion(definition, metadata,
  new OfflineManager.CreateOfflineRegionCallback() {
    @Override
    public void onCreate(OfflineRegion offlineRegion) {
      offlineRegion.setDownloadState(OfflineRegion.STATE_ACTIVE);

      // Monitor the download progress using setObserver
      offlineRegion.setObserver(new OfflineRegion.OfflineRegionObserver() {
        @Override
        public void onStatusChanged(OfflineRegionStatus status) {

          // Calculate the download percentage
          double percentage = status.getRequiredResourceCount() >= 0
          ? (100.0 * status.getCompletedResourceCount() / status.getRequiredResourceCount()) :
          0.0;

          if (status.isComplete()) {
            // Download complete
            Log.d(TAG, "Region downloaded successfully.");
          } else if (status.isRequiredResourceCountPrecise()) {
            Log.d(TAG, percentage);
          }
        }

        @Override
        public void onError(OfflineRegionError error) {
          // If an error occurs, print to logcat
          Log.e(TAG, "onError reason: " + error.getReason());
          Log.e(TAG, "onError message: " + error.getMessage());
        }

        @Override
        public void mapboxTileCountLimitExceeded(long limit) {
          // Notify if offline region exceeds maximum tile count
          Log.e(TAG, "Mapbox tile count limit exceeded: " + limit);
        }
      });
    }

  @Override
  public void onError(String error) {
    Log.e(TAG, "Error: " + error);
  }
});
`}

kotlin={`
// Create the region asynchronously
offlineManager.createOfflineRegion(definition, metadata,
object : OfflineManager.CreateOfflineRegionCallback {
	override fun onCreate(offlineRegion: OfflineRegion) {
	    offlineRegion.setDownloadState(OfflineRegion.STATE_ACTIVE)

	    // Monitor the download progress using setObserver
	    offlineRegion.setObserver(object : OfflineRegion.OfflineRegionObserver {
			override fun onStatusChanged(status: OfflineRegionStatus) {

				// Calculate the download percentage
				val percentage = if (status.requiredResourceCount >= 0)
				    100.0 * status.completedResourceCount /status.requiredResourceCount else 0.0

				if (status.isComplete) {
				    // Download complete
				    Log.d(TAG, "Region downloaded successfully.")
				} else if (status.isRequiredResourceCountPrecise) {
				    Log.d(TAG, percentage)
				}
			}

		    override fun onError(error: OfflineRegionError) {
		        // If an error occurs, print to logcat
		        Log.e(TAG, "onError reason: " + error.reason)
		        Log.e(TAG, "onError message: " + error.message)
		    }

		    override fun mapboxTileCountLimitExceeded(limit: Long) {
		        // Notify if offline region exceeds maximum tile count
		        Log.e(TAG, "Mapbox tile count limit exceeded: $limit")
		    }
			})
	}

	override fun onError(error: String) {
	    Log.e(TAG, "Error: $error")
	}
})
`}

/>
}}

## Managing downloaded regions

Once you or your user has downloaded a region, the Maps SDK provides a few options to handle gathering list, positioning the camera inside the downloaded region, and a method for deletion of a region.

### List offline regions

The listing of regions is useful for presenting downloaded information to your user or gathering information inside the code itself. The `offlineManager` offers a `listOfflineRegions` method which provides both a method `onList` and `onError`. Use the `OfflineRegion` array to do all the actions in a specific region.

{{
<CodeLanguageToggle id="list-offline-regions" />
<ToggleableCodeBlock

java={`
// Get the region bounds and zoom and move the camera.
LatLngBounds bounds = ((OfflineTilePyramidRegionDefinition)
  offlineRegions[regionSelected].getDefinition()).getBounds();
double regionZoom = ((OfflineTilePyramidRegionDefinition)
  offlineRegions[regionSelected].getDefinition()).getMinZoom();

// Create new camera position
CameraPosition cameraPosition = new CameraPosition.Builder()
  .target(bounds.getCenter())
  .zoom(regionZoom)
  .build();

// Move camera to new position
mapboxMap.moveCamera(CameraUpdateFactory.newCameraPosition(cameraPosition));
`}

kotlin={`
// Get the region bounds and zoom and move the camera.
val bounds = (offlineRegions[regionSelected].getDefinition() as OfflineTilePyramidRegionDefinition).bounds

val regionZoom = (offlineRegions[regionSelected].getDefinition() as OfflineTilePyramidRegionDefinition).minZoom

// Create new camera position
val cameraPosition = CameraPosition.Builder()
	.target(bounds.center)
	.zoom(regionZoom)
	.build()

// Move camera to new position
mapboxMap.moveCamera(CameraUpdateFactory.newCameraPosition(cameraPosition))
`}

/>
}}


## Delete region

To remove an offline region from the database, you'll need to first receive the list of offline regions as explained in the [earlier section](#list-offline-regions). The `onList` method will provide you with an array of the present offline regions downloaded on the device, this object being the `offlineRegions`. You'll then use this object to select the region to be deleted and call `delete` on it which will provide you with a callback to be notified when the region is successfully deleted or if an error occurs.

Deleting a region will result in also removing the least recently requested resources not required by other regions until the database shrinks below a certain size.

{{
<CodeLanguageToggle id="delete-offline-regions" />
<ToggleableCodeBlock

java={`
offlineRegions[0].delete(new OfflineRegion.OfflineRegionDeleteCallback() {
  @Override
  public void onDelete() {
    // Once the region is deleted, remove the
    // progressBar and display a toast
    progressBar.setVisibility(View.INVISIBLE);
    progressBar.setIndeterminate(false);
    Toast.makeText(MainActivity.this, "Region deleted", Toast.LENGTH_LONG).show();
  }

  @Override
  public void onError(String error) {
    progressBar.setVisibility(View.INVISIBLE);
    progressBar.setIndeterminate(false);
    Log.e(TAG, "Error: " + error);
  }
});
`}

kotlin={`
offlineRegions[0].delete(object : OfflineRegion.OfflineRegionDeleteCallback {
	override fun onDelete() {
	    // Once the region is deleted, remove the
	    // progressBar and display a toast
	    progressBar.setVisibility(View.INVISIBLE)
	    progressBar.setIndeterminate(false)
	    Toast.makeText(this@MainActivity, "Region deleted", Toast.LENGTH_LONG).show()
	}

override fun onError(error: String) {
    progressBar.setVisibility(View.INVISIBLE)
    progressBar.setIndeterminate(false)
    Log.e(TAG, "Error: $error")
}
})
`}

/>
}}

## Offline sideloading
**Sideloading** is a two-part process for making offline regions available to a mobile app. The first step is to package the tiles and resources necessary to create an offline region outside of an SDK, and the second step is to merge the created offline package into the offline database of an SDK.

This document describes how to generate these offline packages and how to make them available to your mobile app.

{{
<Note title="How is sideloading different than downloading maps?"
  imageComponent={<BookImage size="60" />}
>
  <p>Applications built with the <a href="https://docs.mapbox.com/android/maps/overview/">Mapbox Maps SDK for Android</a> can download maps of pre-selected regions for use when the device does not have network connectivity. This process is documented in detail in the <a href="https://www.mapbox.com/help/mobile-offline">Offline maps troubleshooting page</a>.</p>
  <p>This system works well for smaller regions where you don’t have a large number of resources to download. (You can use the <a href="https://www.mapbox.com/help/offline-estimator/">offline tile count estimator</a> to understand the number of tiles in a specific region.) However, because tiles are downloaded individually, this approach can be too slow for larger regions and might result in a poor user experience. In cases like this, offline sideloading can provide a better solution.</p>
</Note>
}}

### Generate the offline package
To generate the offline package that contains the tiles and resources for a specific region, you have two options. You can either use a command line tool, or you can use the macOS graphical interface. The CLI option is appropriate for any operating system, while the macOS option is only available in macOS environments.

Note that the extent of offline capabilities in your mobile app is limited to 6,000 tiles by default. If your requirements are different, contact [Mapbox sales](https://www.mapbox.com/contact/sales/) about moving to an Enterprise plan. For more details on this "tile ceiling", see the [Limitations section](#limitations) of this documentation.

#### Use the command line tool
Using a command line tool is ideal if you want to build your offline packages server-side (for example, in a container) or as part of an automated system like CI in which a graphical interface is either not necessary or not desirable.

**Requirements**

- In order to compile the CLI, you need to set up your development environment as described in the [Building and developing from source](https://github.com/mapbox/mapbox-gl-native/blob/master/INSTALL.md) documentation.

##### CLI build instructions
1. Clone the Maps SDK: `git clone https://github.com/mapbox/mapbox-gl-native.git`
1. Change to the root folder: `cd mapbox-gl-native`
1. Checkout the release commit equivalent to the version of the Maps SDK that you are using: ` git checkout {commit hash}` (all release commits can be found [here](https://github.com/mapbox/mapbox-gl-native/releases))
1. Compile the binary: `make offline`

Once the build is complete, you'll see the message `Build Succeeded` in the terminal. The binary is available under the `build` folder (for example, on a Mac the file will be in `build/macos/Debug/mbgl-offline`).

##### Use the CLI
In the command line, move into to the folder where the `mbgl-offline` file is (`cd build/macos/Debug`), then run:
```
./mbgl-offline --north [north coordinate] --west [west coordinate] --south [south coordinate] --east [east coordinate] --minZoom [minimum zoom] --maxZoom [maximum zoom] --output [output file path] --style [style URL] --token [mapbox token]
```

The tiles that you requested will begin downloading.

**Example command:**
```
./mbgl-offline --north 71.44117085172385 --west -26.015625 --south 28.07198030177986 --east 28.916015625 --minZoom 4 --maxZoom 4 --output ~/europe.db --style mapbox://styles/developer/stylename --token developertoken
```
To see a few examples that you can reference when creating your region, take a look at `/bin/offline.sh`.

##### Optional flags
Use the following optional flags to customize your offline package. To see all available options, use the `--help` flag.

Flag | Description
--- | ---
`--style` | The map style URL.
`--north` | The northern-most coordinate in the bounding box.
`--south` | The southern-most coordinate in the bounding box.
`--east` | The eastern-most coordinate in the bounding box.
`--west` | The western most coordinate in the bounding box.
`--minZoom` | The minimum zoom level you want your region to have.
`--maxZoom` | The maximum zoom level you want your region to have.
`--pixelRatio` | Pixel ratio (or pixel density) is a device-dependent value provided by the OS. To see sample values for popular devices, see the [Material Design device metrics page](https://material.io/tools/devices/).
`--token` | The Mapbox access token to use for downloading tiles.
`--output` | The directory and file name you want your database to be called.
`--help` | See all available flag options.

**Warning:** Take the available memory size into consideration when you choose your bounding coordinates and the `minZoom` and `maxZoom` levels.

#### Use the macOS graphical interface
Using the macOS graphical interface is a good approach if you create offline packages relatively infrequently, if you prefer a visual tool to generate your packages, or both.

This method of generating offline packages is only applicable to macOS users. For users with other operating systems, including Linux, we recommend using the CLI as described in the [Use the command line tool ](#use-the-command-line-tool)  section of this documentation.

**Requirements:**

To generate offline packages using the macOS graphical interface, you need a typical environment for developing native iOS or macOS applications.

##### Generate an offline package
1. Go to the [Mapbox GL Native repository’s release page](https://github.com/mapbox/mapbox-gl-native/releases/) and download the latest release of the Mapbox Maps SDK for macOS.
1. Unzip `Mapbox.GL.app.zip` and open `Mapbox GL.app`.
1. Choose the style using the _View_ menu or the menu in the toolbar. Use **View ‣ Custom Style** to choose a custom style designed in Mapbox Studio.
1. Resize the window and adjust the map so that the extents of the desired offline package are fully visible in the window.
1. Go to **Window ‣ Offline Packs**.
1. Click the **+** button to create a new offline package. Enter a name for this offline package, then click **Add**. Repeat this step for any offline package you want to download.

### Merge the offline package
Once you’ve created a new offline package, copy the file to the device so that the Offline Merging API can merge its contents into the main Maps SDK database. The file can be copied locally using `adb` or by downloading it from a server &mdash; both processes are described below. The Maps SDK loads all tiles and resources from one main database, and provides the Offline Merging API to merge the contents of the new secondary database into the main one.

{{
<WarningNote>
  <p>Prior to v6.6.0 of the Maps SDK for Android, when the Offline Merging API was not available, the workaround for sideloading was to delete the main database file and add your own offline database. While this method is still technically possible, it is no longer recommended because it doesn't allow merging multiple databases and it is prone to crashing.</p>
</WarningNote>
}}

To merge a secondary database into the main Maps SDK database:

1. Move the secondary database onto the device. You have two options for doing so:
    - Physically copy it over USB using `adb`. For example, `adb push my-offline-region.db /path/to/app/files`.
    - Download the file from your server using a library like `OkHttp`.
2. In your code, call `OfflineManager.mergeOfflineRegions(String path, OfflineManager.MergeOfflineRegionsCallback callback)`.
    - `path` provides the secondary database (writable) path. If the app’s process doesn’t have write-access to the provided path, the file will be copied to the temporary, internal directory for the duration of the merge. (The secondary database may need to be upgraded to the latest schema. This is done in-place and requires write-access to the provided path.)
    - `callback` is the completion/error callback. When the merge is completed, or fails, the `OfflineManager.MergeOfflineRegionsCallback` will be invoked on the main thread.

For a complete example, take a look at [`MergeOfflineRegionsActivity`](https://github.com/mapbox/mapbox-gl-native/blob/android-v{{MAP_SDK_VERSION}}/platform/android/MapboxGLAndroidSDKTestApp/src/main/java/com/mapbox/mapboxsdk/testapp/activity/offline/MergeOfflineRegionsActivity.kt) and the [sample database](https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDKTestApp/src/main/assets/offline.db). For further details, see the [`mergeOfflineRegions` documentation](https://docs.mapbox.com/android/api/map-sdk/{{MAP_SDK_VERSION}}/com/mapbox/mapboxsdk/offline/OfflineManager.html#mergeOfflineRegions-java.lang.String-com.mapbox.mapboxsdk.offline.OfflineManager.MergeOfflineRegionsCallback-).

##### Database location on Android
On Android, you can move the location of the main Maps SDK database from internal storage to external storage. To do so, make sure the application has the `WRITE_EXTERNAL_STORAGE` permission inside the `AndroidManifest.xml` and the following flag:
```
<application>
  <meta-data
    android:name="com.mapbox.SetStorageExternal"
    android:value="true" />
    ...
</application>
```
