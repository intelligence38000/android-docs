# Contributing guidelines

- [Intro to contributing](#intro-to-contributing)
  - [Code of conduct](#code-of-conduct)
- [Content types](#content-types)
  - [Overview guides](#overview-guides)
  - [Examples](#examples)
  - [Help](#help)
- [Images and videos](#images-and-videos)


## Intro to contributing

We welcome contributions to this Android documentation repository. Please follow these steps if you're interested in adding to our documentation:

- [Open a ticket](https://github.com/mapbox/android-docs/issues/new) to kick off a conversation, feel free to tag the `@mapbox/android` team. It's a good idea to explain your plans before you push any code to make sure no one else is working on something similar and to discuss the best approaches to tackle your particular idea.
- Create a new branch off of `mb-pages`. This new branch will contain your additions.
- Make the changes you'd like to see in the documentation. As you make changes, don't forget to test the site locally (described above) to see your changes in action.
- Double check. Triple check. Spell check your writing. If you have code snippets, please make sure they're correct as well.
- Finally, once you're ready to share your additions, open a pull request for the `@mapbox/android` team to review. If/once approved, this pull request will pull your changes into the `master` branch of this repository.


### Code of conduct

Everyone is invited to participate in Mapbox’s open source projects and public discussions: we want to create a welcoming and friendly environment. Harassment of participants or other unethical and unprofessional behavior will not be tolerated in our spaces. The [Contributor Covenant](http://contributor-covenant.org) applies to all projects under the Mapbox organization and we ask that you please read [the full text](http://contributor-covenant.org/version/1/2/0/).

You can learn more about our open source philosophy on [mapbox.com](https://www.mapbox.com/about/open/).


## Content types

The Android documentation consists of four distinct content types: Overview guides, Examples, Help resources, and API references. See below for how to contribute each type of content.


### Overview guides

The Overview section contains **technical narrative guides**. Technical narrative guides provide a combination of technical detail, code snippets, and narrative explanation of product-specific concepts.

There are two files that will need to be added or modified for new technical narrative guides: (1) a new Markdown file and (2) modifications to the `batfish.config.js` file.

#### Step one: Markdown file

1. Create a new Markdown file in either `src/pages/maps/overview` for guides about the Maps SDK or `src/pages/navigation/overview` for the Navigation SDK, etc.
2. Add front matter.
  - `title` (required): Name of example in title case.
  - `description` (required): One to two sentence description of the example. Must end in a period.
  - `prependJs` (optional): Things to import to be used in the Markdown file.
3. Write the content of the guide in the Markdown file (outside of the front matter).
  - _Note: Use JSX inside the Markdown file inside of `{{ }}`. See below for an example._

**Example**:

```md
---
title: "Camera"
description: "Information about map camera behavior in the Mapbox Maps SDK for Android. Updating the camera position. Restricting the camera. It's all covered inside."
prependJs:
  - "import { Floater } from '../../../components/floater';"
---

The Maps SDK's maps are represented as a flat plane using a [Mercator projection](https://en.wikipedia.org/wiki/Mercator_projection). On the east-west-axis, the map seamlessly wraps around on itself an infinite amount of times. Because the bottom and the top of the map could infinitely grow larger and further distort the map towards the poles, the north-south-axis gets cut off around the 90 degrees north and 90 degrees south. With this in mind, the camera object's introduced to represent the user's viewpoint above the map.

...

## Update the camera position

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/camera/AnimateMapCameraActivity.java"
    title="Animate the map camera"
    category="example"
    text="Change the camera target, bearing, zoom, and tilt by animating the camera."
  />
}}

The `MapboxMap` class in the Maps SDK has several methods to change the camera's position. Each camera movement API takes in a `CameraUpdate` (built using `CameraUpdateFactory`) which is how you provide the new camera position information. Camera update factory can build several different `CameraUpdate` objects including a `newLatLngZoom()`, `zoomBy()`, `newLatLngBounds()`, and several more. One particularly interesting `CameraUpdate` is `newCameraPosition()` which is how you'd pass in a built `CameraPosition`.

...
```

#### Step two: batfish.config.js

Any time you add a new overview guide or alter the filename of an overview guide, you will need to modify the `productPageOrder` variable in the `batfish.config.js` file. This is where the table of contents order is determined.

1. Open `batfish.config.js`.
2. Add, alter, or move a string that matches the filename (without the `.md` file extension) of the Overview guide you added/altered _exactly_. These are case-sensitive. The order these appear are the order in which the guides will appear in the table of contents.

#### Code blocks in overview guides

To add a code block for a single language use <code>```</code> followed by the language of the code. For example, here's a Java code block:

<pre>
```java
mapboxMap.addMarker(new MarkerOptions()
  .position(new LatLng(48.85819, 2.29458))
  .title("Eiffel Tower")
```
</pre>

To add a code block that toggles between Java and Kotlin, use a combination of the `CodeLanguageToggle` and `ToggleableCodeBlock` components. First import them into the Markdown file using the following:

```md
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
```

Then, in the body of the Markdown file, include these components using JSXtreme Markdown. Here's an example:

```
{{
<CodeLanguageToggle id="markers-code" />
<ToggleableCodeBlock

java={`
mapboxMap.addMarker(new MarkerOptions()
  .position(new LatLng(48.85819, 2.29458))
  .title("Eiffel Tower")
`}

kotlin={`
hi hello
i am kotlin code
💁‍♀️
`}

/>
}}
```

Language preference (Java vs. Kotlin) will persist throughout /android-docs when navigating between pages.

Make sure the snippet has all of the sections. If not, the locally test side will break when you click on either the Java or Kotlin toggle. Please view [this ticket](https://github.com/mapbox/android-docs/issues/752) if you see a `Uncaught TypeError: Cannot read property 'length' of undefined` error.

#### Mapbox Java SDK

All overview guides for APIs in the Mapbox Java SDK should follow this format:

- Intro section
  - Description of what the API does
  - High-level overview of the wrapper and where to find it
  - Any prerequisites (i.e. "Before using this wrapper....")
- API request (with code sample)
- API response (with code sample)
- Other options as necessary

### Examples

The examples section contains **code examples**. Examples are updated by bumping the either the `examples/maps` or `examples/navigation` submodule, based on the code in the [mapbox/mapbox-android-demo](https://github.com/mapbox/mapbox-android-demo) or the [mapbox/mapbox-navigation-android](https://github.com/mapbox/mapbox-navigation-android) repo. These repos contain working Android projects with apps that integrate the Java or Kotlin examples.

⚠️ **Note**: please refer to this repo's [README.md](https://github.com/mapbox/android-docs/blob/mb-pages/README.md#installation) to make sure you have properly cloned the repo, otherwise the submodule references will not load properly.

#### Update examples

1. Make and commit your changes in the proper demo repo.
2. Move into this repo (`cd android-docs`) and `git submodule update --remote examples/maps` (or `examples/navigation`) to update the submodule. This should typically point to the latest commit in master.
3. `git add examples/maps` (or `examples/navigation`) to stage the submodule update.
4. `git commit -m "bumped examples submodule for <some reason>"`

After commiting the bumped submodule(s), any updates to code snippets for _existing examples_ will automatically update on the related example page. For any _new examples_ that were recently added to the demo app and do not already have a dedicated example page in this repo, you will need to follow the steps below to create a new example page.

#### Add a new example

Code for Android examples comes from public repos that contain completely functional and tested Android apps. There are currently two repos with Android test apps: `/mapbox-android-demo` for the **Maps SDK, Java SDK, Plugins, and Core** and `/mapbox-navigation-android` for the **Navigation SDK**. 

Putting an example up on a web page requires three pieces: (1) a code snippet, (2) a Markdown file, and (3) a visual asset. The `add-examples.js` script will create all but the visual asset for you. 

##### Run the `add-examples` script

_Note: Before running this script, make sure you've updated the submodule using [the steps above](#update-examples)._

Pass one or three arguments when you run this script (`node scripts/add-examples.js {product} {folder} {activity name}`). If no `folder` and `activity name` are provided, the script will run on all activities for that product that exist in the submodule, but are not yet used in any example pages.

- **required:** the `product` (`maps` or `navigation`)
- **optional, but if one is used, both must be used**:
    - the name of the `folder` in the demo app (a string)
    - the `activity` name (SomethingActivity.java)

Here are some examples:

- To run for all maps activities: `node scripts/add-examples.js maps`
- To run for one maps activity: `node scripts/add-examples.js maps dds ChoroplethJsonVectorMixActivity.java`

##### Update the Markdown file

Running the script will result in one or more new Markdown files in the `src/pages/{product}/examples/` folder. This is used to create a new individual example pages at `docs.mapbox.com/android/{product}/examples/{file-name}`.

Ensure that every new Markdown has the following front matter fields (where possible, the script will fill in front matter fields):
- `title`: Name of example in title case. This comes from an XML file in the `/src/main/res/values/` folder for the relevant demo app.
- `description`: One to two sentence description of the example. Must end in a period. This comes from an XML file in the `/src/main/res/values/` folder for the relevant demo app.
- `topic`: Choose from:
    `Getting started`, 
    `Dynamic styling`, 
    `Data visualization`, 
    `3D`, 
    `Add markers and infoWindows to the map`, 
    `User interaction`, 
    `Add features to a map`, 
    `Set a map style`, 
    `Image generation`, 
    `Offline`
- `thumbnail`: This can either be a url to the thumbnail used in the demo app or an image ID from the image config file.
- `prependJs`:
  - **`VideoWithDeviceFrame` or `AppropriateImage`** depending on if your full-size preview is a `png` or an `mp4`. Videos are always preferred so the `add-examples` script imports `VideoWithDeviceFrame` by default. 
    - **Video file**: If you are using a video, you will also need to import the video. By default, the `add-examples` script will add an import line for a video file that is (1) in the `src/videos/` folder and (2) has a name that follows this pattern: `example-{activity-name-with-dashes}.mp4`. _Note: the example pages will not load until you add the videos to the src/videos/ folder &mdash; there will be an error that it can't find the mp4 file you're trying to import._
  - **`ToggleableCodeBlock` component**: Import the component to display your code.
    - **Code toggle**: If the example has both a Kotlin and Java code snippet, you'll also need to import `CodeLanguageToggle`.
  - **Example code**: Import the raw and highlighted code pulled in the file you created in `src/example-code/`. This is done automatically when using the `add-examples` script.

The content in the Markdown file (outside of the front matter) will be displayed as text on the individual example page.

Add your visual preview using JSX inside `{{ }}` to add an `AppropriateImage` or `VideoWithDeviceFrame`. A `VideoWithDeviceFrame` component with the default file name described above is added by the `add-examples` script.

Add any number of `ToggleableCodeBlock` components and set the `java` and `kotlin` props to your imported code.

**Example**:

```md
---
title: Add a hillshade layer
description: Use elevation data to show and customize hills and mountains.
thumbnail: thumbnailAddAHillshadeLayer
topic: Dynamic styling
prependJs:
  - "import AppropriateImage from '../../../components/appropriate-image'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/HillShadeActivity.js'"
---

{{
  <AppropriateImage
    imageId="exampleAddAHillshadeLayer"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock
    java={rawJavaCode}
  />
}}
```


### Help

The Help tab contains links to tutorials and troubleshooting guides that live at https://www.mapbox.com/help/.

The links on this page come from `src/data/related-help-pages.js`. To add new links to help guides, add a new object to the `guides` array for the appropriate guide type (tutorials, troubleshooting, etc). The object should follow the pattern of this example:

```json
{
  title: 'First steps with the Mapbox Maps SDK for Android',
  description:
    'Walk through installing the Mapbox Maps SDK for Android, getting a map on the screen, and changing the map style',
  path: 'https://www.mapbox.com/help/first-steps-android-sdk/',
  products: ['maps']
}
```


## Images and videos

### Images

Add images using [appropriate-images](https://github.com/mapbox/appropriate-images) and [appropriate-images-react](https://github.com/mapbox/appropriate-images-react).

General rules:

- Never add raw images directly to the site.
- Never add images directly to `src/img/dist/`.
- Never load images on the site from anywhere *except* `src/img/dist/`.

Follow this process to add a new image:

1. **Add the raw image.** Add the raw image to `src/img/src/` (no subdirectories).

*Note: SVGs belong in `src/svg/`, not in `src/img/`, and have their own processing pipeline.*

2. **Add the new image to the image config**. Specify the sizes you need for each image in `conf/image-config.js`. Check out [the documentation about this file](https://github.com/mapbox/appropriate-images#image-configuration). Here's a sample image configuration item:

```js
industryRealEstateBanner: {
  basename: 'industry-real-estate-header.jpg',
  sizes: [{ width: 500, height: 800 }, { width: 1400 }]
},
```

*Note: `width` is required. `height` is not. `width` and `height` should never exceed the natural dimensions of the image. If `height` is not provided, the natural aspect ratio of the image will be preserved. If `height` is provided, the image will be cropped. By default, it will be center-cropped.*

3. **Run the script.** Run `bin/appropriate-images.js` in terminal, either specifying the image(s) you just added (to save time), or optimizing `--all`. For example, to add only the image in the example above, you would use:

```
bin/appropriate-images.js industryRealEstateBanner
```

*Note: You'll see that the generated images in `src/img/dist/` have filenames corresponding to the sizes you've defined.*

### Videos

Guidelines for videos:

- Must be in the `src/video/` folder.
- Must be in MP4 format.
- Should be recorded from an attached Android device (preferrably on a Pixel 2).
- Must have audio removed.
