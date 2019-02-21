---
title: Instructions
description: Learn how instructions work in the core Mapbox Navigation SDK and Navigation UI SDK for Android.
products:
  - Navigation SDK
  - Navigation UI SDK
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
---

Navigation instructions and cues are shown and hidden using milestones set in the core Navigation SDK. ❓ Milestones are...❓.

{{<Note title="Building custom milestones" imageComponent={<BookImage size="60" />}>}}
This guide covers default milestones used to display UI instructions and trigger voice instructions. For information on building custom milestones, see [Custom events](/android/navigation/overview/custom-events/).
{{</Note>}}


## Milestone event listener

All milestones use the `onMilestoneEvent` callback to alert when they get triggered. If you want to make use of the milestones API, you will want to attach a `MilestoneEventListener` inside your app. When all the milestone trigger conditions are true, the callback is invoked and provides you with the latest routeProgress along with the milestone's corresponding `String` instruction and the `Milestone` itself that was triggered. You can use your text-to-speech engine of choice and have it consume the instruction.

{{
<CodeLanguageToggle id="on-milestone-event" />
<ToggleableCodeBlock

java={`
@Override
public void onMilestoneEvent(RouteProgress routeProgress, String instruction, Milestone milestone) {
  exampleInstructionPlayer.play(instruction);
}
`}

kotlin={`
override fun onMilestoneEvent(routeProgress: RouteProgress, instruction: String, milestone: Milestone) {
    exampleInstructionPlayer.play(instruction)
}
`}

/>
}}

## Default milestones

There are two default milestones that are used to trigger voice and text instructions: `VoiceInstructionMilestone` and `BannerInstructionMilestone`.

### VoiceInstructionMilestone

`VoiceInstructionMilestone` fires every time it's time to announce an instruction along a given `DirectionsRoute`.  This milestone provides
a plain text instruction with `VoiceInstructionMilestone#getInstruction` as well as a SSML version of the same instruction with `VoiceInstructionMilestone#getSsmlAnnouncement`.  
SSML stands for Speech Synthesis Markup Language and is designed to work with [AWS Polly](https://aws.amazon.com/documentation/polly/).  

### BannerInstructionMilestone

`BannerInstructionMilestone` fires every time textual instructions should be updated, most of the time in the format of a "banner" view on the top of the screen. This milestone provides a `BannerInstructions` object for the given point along the route.  This object contains text and URLs for shield images that can be displayed on screen at the time the milestone fires.  


## Navigation UI SDK

In the Navigation UI SDK, banner and voice instructions are triggered by the default milestones described above. There are default styling rules for banner instructions and default settings for voice instructions. Instructions can be customized to an extent including overriding default behaviors when instructions are triggered and customizing the style of banner instructions. Creating [custom milestones](/android/navigation/overview/milestones/) must be done with the core Navigation SDK.

{{<Note imageComponent={<BookImage size="60" />}>}}
For customizing the language used in instructions, see [Localization](/android/navigation/overview/).
{{</Note>}}

### Instruction triggers

Using `NavigationView` in your XML gives you the ability to listen to different updates or events that may occur during navigation.

#### BannerInstructionsListener

`willDisplay(BannerInstructions instructions)` will be triggered when a `BannerInstructions` is about to be displayed. The listener gives you the option to override any values and pass as the return value, which will be the value used for the banner instructions. You can return `null` and the instructions will be ignored.

#### SpeechAnnouncementListener

`willVoice(SpeechAnnouncement announcement)` will be triggered when a voice announcement is about to be voiced. The listener gives you the option to override any values and pass as the return value, which will be the value used for the voice announcement. You can return `null` and the announcement will be ignored.

To add these listeners, you can add them to your `NavigationViewOptions` before
you call `navigationView.startNavigation(NavigationViewOptions options)`:

{{
<CodeLanguageToggle id="nav-view-options-listeners" />
<ToggleableCodeBlock

java={`
NavigationViewOptions options = NavigationViewOptions.builder()
  .navigationListener(this)
  .routeListener(this)
  .feedbackListener(this)
  .build();
`}

kotlin={`
val options = NavigationViewOptions.builder()
  .navigationListener(this)
  .routeListener(this)
  .feedbackListener(this)
  .build()
`}
/>
}}

### Instruction styling

You also have the option to add the custom `View`s used in the turn-by-turn UI to your XML. The top `View` that displays the maneuver image, instruction text, and sound button is called `InstructionView`.

```xml
<com.mapbox.services.android.navigation.ui.v5.instruction.InstructionView
    android:id="@+id/instructionView"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"/>
```

Once inflated in your `Activity`, the `InstructionView` can be updated with `RouteProgress` and `Milestone` objects inside a `ProgressChangeListener` and `MilestoneEventListener` respectively.

{{
<CodeLanguageToggle id="instruction-view" />
<ToggleableCodeBlock

java={`
@Override
public void onProgressChange(Location location, RouteProgress routeProgress) {
    instructionView.updateDistanceWith(routeProgress);
}

@Override
public void onMilestoneEvent(RouteProgress routeProgress, String instruction, Milestone milestone) {
  instructionView.updateBannerInstructionsWith(milestone);
}
`}

kotlin={`
override fun onProgressChange(location: Location, routeProgress: RouteProgress) {
    instructionView.updateDistanceWith(routeProgress)
}

override fun onMilestoneEvent(routeProgress: RouteProgress, instruction: String, milestone: Milestone) {
  instructionView.updateBannerInstructionsWith(milestone)
}
`}
/>
}}

Prior to the first time you want to update the `InstructionView`, you can control the distance formatting with `InstructionView#setDistanceFormatter(DistanceFormatter distanceFormatter)`.

This will determine how distances are displayed in the view:

{{
<CodeLanguageToggle id="set-distance" />
<ToggleableCodeBlock

java={`
String unitType = DirectionsCriteria.METRIC;

String language = Locale.US.getLanguage();

int roundingIncrement = NavigationConstants.ROUNDING_INCREMENT_TWENTY_FIVE;

DistanceFormatter distanceFormatter = new DistanceFormatter(getContext(), language, unitType, roundingIncrement);

instructionView.setDistanceFormatter(distanceFormatter);
}
`}

kotlin={`
val unitType = DirectionsCriteria.METRIC

val language = Locale.US.language

val roundingIncrement = NavigationConstants.ROUNDING_INCREMENT_TWENTY_FIVE

val distanceFormatter = DistanceFormatter(getContext(), language, unitType, roundingIncrement)

instructionView.setDistanceFormatter(distanceFormatter)
`}
/>
}}

{{<Note imageComponent={<BookImage size="60" />}>}}
It is fine if this is _not_ set, the view will create its own based on inferred parameters from the device's Android configuration. Please also make sure to set our default theme: `R.style.NavigationViewLight` (or create your own) and set it in your `Activity` or `Fragment` before `super.onCreate()`.
{{</Note>}}

The custom `View`s will now look for the attributes in the default theme to set text and background colors:

{{
<CodeLanguageToggle id="set-nav-view" />
<ToggleableCodeBlock

java={`
@Override
protected void onCreate(Bundle savedInstanceState) {
  setTheme(R.style.NavigationViewLight);
  super.onCreate(savedInstanceState);
  setContentView(R.layout.activity_navigation);
  ...
}
`}

kotlin={`
override fun onCreate(savedInstanceState: Bundle?) {
    setTheme(R.style.NavigationViewLight)
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_navigation)
}
`}
/>
}}

## Additional customization

###  Loading banner instructions into a `TextView`

If you would like to use your own `TextView` and load a given `BannerText` instruction, you can do so with the `InstructionLoader`. The loader takes care of organizing text, loading road shields, and abbreviating text (if it doesn't fit in the `TextView`). Paired with our `MilestoneEventListener`, you can load instruction updates into your `TextView`:

{{
<CodeLanguageToggle id="textview-instruction-loader" />
<ToggleableCodeBlock

java={`
@Override
public void onMilestoneEvent(RouteProgress routeProgress, String instruction, Milestone milestone) {
  if (milestone instanceof BannerInstructionMilestone) {
    BannerText primaryInstruction = ((BannerInstructionMilestone) milestone).getBannerInstructions().primary();
    InstructionLoader loader = new InstructionLoader(textView, primaryInstruction);
    loader.loadInstruction();
  }
}
}
`}

kotlin={`
override fun onMilestoneEvent(routeProgress: RouteProgress, instruction: String, milestone: Milestone) {
  if (milestone is BannerInstructionMilestone) {
    val primaryInstruction = milestone.bannerInstructions.primary()
    val loader = InstructionLoader(textView, primaryInstruction)
    loader.loadInstruction()
  }
}
`}
/>
}}


### Custom milestones

You can create your own custom milestones using the core Navigation SDK. Read more in [Custom events](/android/navigation/overview/milestones/).

<!-- The `onRunning` callback's helpful for being notified when the navigation session has started, the user has canceled the session, or the user has arrived at their final destination. From this information, you can decide when to show navigation notifications, know when it's safe to stop requesting user location updates, and much more.

{{
<CodeLanguageToggle id="nav-navigation-running" />
<ToggleableCodeBlock

java={`
navigation.addNavigationEventListener(new NavigationEventListener() {
  @Override
  public void onRunning(boolean running) {

  }
});
`}

kotlin={`
navigation?.addNavigationEventListener { running ->

}
`}
/>
}}


 -->