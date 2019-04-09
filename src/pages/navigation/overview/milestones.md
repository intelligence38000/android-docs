---
title: Maneuver instructions
description: Learn how default and custom milestones are used to trigger text and voice instructions in the core Mapbox Navigation SDK and Navigation UI SDK for Android.
products:
  - Navigation SDK
  - Navigation UI SDK
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
contentType: guide
language:
- Java
- Kotlin
---

Navigation milestones inside the SDK provide a powerful way to give your user instructions or get cues to hide or show custom UI elements at defined locations along their route. Use default milestones to trigger voice and text instructions or create custom milestones that fit your particular app needs.

## Default milestones

There are two default milestones that are used to trigger voice and text instructions: `VoiceInstructionMilestone` and `BannerInstructionMilestone`.

### `BannerInstructionMilestone`

`BannerInstructionMilestone` fires every time textual instructions should be updated, most of the time in the format of a "banner" view on the top of the screen. This milestone provides a `BannerInstructions` object for the given point along the route.  This object contains text and URLs for shield images that can be displayed on screen at the time the milestone fires.

### `VoiceInstructionMilestone`

`VoiceInstructionMilestone` fires every time it's time to announce an instruction along a given `DirectionsRoute`.  This milestone provides
a plain text instruction with `VoiceInstructionMilestone#getInstruction` as well as a SSML version of the same instruction with `VoiceInstructionMilestone#getSsmlAnnouncement`.  
SSML stands for Speech Synthesis Markup Language and is designed to work with [AWS Polly](https://aws.amazon.com/documentation/polly/).  


## Navigation UI SDK

In the Navigation UI SDK, banner and voice instructions are triggered by the default milestones described above. There are default styling rules for banner instructions and default settings for voice instructions. Instructions can be customized to an extent including overriding default behaviors when instructions are triggered and customizing the style of banner instructions. You must create [custom milestones](#custom-milestones) with the core Navigation SDK.

{{<Note imageComponent={<BookImage size="60" />}>}}
For customizing the language used in instructions, see [Localization](/android/navigation/overview/).
{{</Note>}}

### Instruction triggers

Using `NavigationView` in your XML gives you the ability to listen to different updates or events that may occur during navigation.

#### BannerInstructionsListener

`willDisplay(BannerInstructions instructions)` will be triggered when a `BannerInstructions` is about to be displayed. The listener gives you the option to override any values and pass as the return value, which will be the value used for the banner instructions. You can return `null` and the instructions will be ignored.

#### SpeechAnnouncementListener

`willVoice(SpeechAnnouncement announcement)` will be triggered when a voice announcement is about to be voiced. The listener gives you the option to override any values and pass as the return value, which will be the value used for the voice announcement. You can return `null` and the announcement will be ignored.

To use these listeners, add them to your `NavigationViewOptions` before you call `navigationView.startNavigation(NavigationViewOptions options)`:

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


If this is _not_ set, the view will create its own based on inferred parameters from the device's Android configuration. Please also make sure to set our default theme: `R.style.NavigationViewLight` (or create your own) and set it in your `Activity` or `Fragment` before `super.onCreate()`.

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

## Custom instructions

When using the milestone event listener, the callback provides a `String` instruction value. During the milestone creation process, you can add the logic that generates this instruction. Begin by creating a new `Instruction` object which will provide an override method, `buildInstruction`, which provides a `RouteProgress` object for producing the instructions string. With the provided route progress, you can add information such as distance and duration remaining until the next maneuver. Once the `Instruction` is initialized, you will need to give it to the milestone using `setInstruction`. The example below shows how to add the Directions API instruction as the milestone instruction with no modifications.

{{
<CodeLanguageToggle id="custom-instruction" />
<ToggleableCodeBlock

java={`
Instruction myInstruction = new Instruction() {
  @Override
  public String buildInstruction(RouteProgress routeProgress) {
  return routeProgress.currentLegProgress().upComingStep().maneuver().instruction();
  }
};
`}

kotlin={`
val myInstruction = object : Instruction() {
  override fun buildInstruction(routeProgress: RouteProgress): String? {
  return routeProgress.currentLegProgress().upComingStep()?.maneuver().instruction()
  }
}
`}

/>
}}


### Load banner instructions into a `TextView`

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


### Listen for the start or stop of a navigation session

The `onRunning` callback notifies you when the navigation session has started, the user has canceled the session, or the user has arrived at their final destination. From this information, you can decide when to show navigation notifications, know when it's safe to stop requesting user location updates, and more.

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

## Custom milestones

Milestones bring flexibility to your app and how it handles navigation events. You can create a milestone in a few steps. First, choose how often you'd like the milestone to be triggered. Two options are provided:

- `StepMilestone`, which is triggered each step in the route.
- `RouteMilestone`, which will only be triggered once during the entire route.

You can also implement your own behavior for triggers by extending the `Milestone` class. Give the milestone a unique identifier that can be used to determine which milestone triggered the `onMilestoneEvent` callback. Set the triggers using any combination of the properties shown in the table below. It is important to note that trigger properties have different corresponding variable types that need to be accounted for when setting up the milestone. Lastly, build the milestone and pass it into the `MapboxNavigation` instance using `addMilestone()`.

The snippet of code below shows the creation of a `RouteMilestone` with two conditions, both of which need to be true for the milestone to be triggered. Since it is a `RouteMilestone`, the milestone event only occurs once along the route. You can read the trigger statement as: _both the step index must be less than three **and** the current step total distance must be greater than 200 meters for the milestone to be triggered._

{{
<CodeLanguageToggle id="route-milestone" />
<ToggleableCodeBlock

java={`
navigation.addOffRouteListener(new OffRouteListener() {
  @Override
  public void userOffRoute(Location location) {

  navigation.addMilestone(new RouteMilestone.Builder()
    .setIdentifier("begin-route-milestone")
    .setTrigger(
      Trigger.all(
          Trigger.lt(TriggerProperty.STEP_INDEX, 3), Trigger.gt(TriggerProperty.STEP_DISTANCE_TOTAL_METERS, 200))).build()
);
`}

kotlin={`
navigation?.addOffRouteListener {
  navigation?.addMilestone(RouteMilestone.Builder()
    .setIdentifier("begin-route-milestone")
    .setTrigger(Trigger.all(Trigger.lt(TriggerProperty.STEP_INDEX, 3), Trigger.gt(TriggerProperty.STEP_DISTANCE_TOTAL_METERS, 200))).build())
}
`}

/>
}}

### Trigger conditions

<!--copyeditor ignore simple-->
Besides the triggers already mentioned above, the SDK comes equipped to handle pretty much any case you'd like to build. The table below shows all the conditions offered inside the SDK and whether it is a compound statement or a simple statement.

Condition name | Type     | Description
-------------- | -------- | ---------------------------------------------------------------------------------------------------------------
all            | Compound | Logical equivalent to an `AND` statement, all the conditions must be true for the trigger to occur.
any            | Compound | Logical equivalent to an `OR` statement, any of the conditions can be true to cause a trigger.
none           | Compound | Logical equivalent to a `NOR` statement, all statements must equate to false for a trigger to occur.
eq             | Simple   | Equality. The trigger property's current value must equal the exact value defined.
neq            | Simple   | Inequality. The trigger property's current value must not equal the exact value defined.
gt             | Simple   | Greater than. The trigger property's current value must be greater than the defined value.
gte            | Simple   | Greater than or equal. The trigger property's current value must be greater than or equal to the defined value.
lt             | Simple   | Less than. The trigger property's current value must be less than the defined value
lte            | Simple   | Less than or equal. The trigger property's current value must be less than or equal to the defined property.

### Trigger properties

Below are the available trigger properties that can be used along with the conditions above to filter when a milestone should be triggered. Note that instead of the boolean types using the primitive type `true` or `false`, the `TriggerProperty` class uses custom boolean values for the triggers.

Property name                   | Type    | Description
------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------
STEP_INDEX                      | integer | Which step or steps the user must be on the trigger the milestone.
STEP_DISTANCE_TOTAL_METERS      | double  | The length that the current step must be.
STEP_DISTANCE_REMAINING_METERS  | double  | Will trigger the milestone based on the distance remaining.
STEP_DURATION_REMAINING_SECONDS | double  | Will trigger the milestone based on the duration remaining.
STEP_DURATION_TOTAL_SECONDS     | double  | Will trigger the milestone based on the total step duration.
STEP_DISTANCE_TRAVELED_METERS   | double  | Will trigger the milestone based on the distance the user has traveled along the step already.
NEW_STEP                        | boolean | When the user completes a maneuver and begins traversing along a new step.
FIRST_STEP                      | boolean | When the user begins a navigation session and is on the first step.
LAST_STEP                       | boolean | When the user is on the second to last step. Note the final step in direction route will only contain a point representing the final maneuver.
NEXT_STEP_DISTANCE_METERS       | double  | The next step's total distance in meters.
FIRST_LEG                       | boolean | When the user is on the first leg.
LAST_LEG                        | boolean | When the user is on the last leg.

[Open an issue on GitHub](https://github.com/mapbox/mapbox-navigation-android/issues/new) if you feel a trigger property is missing and include the use case.
