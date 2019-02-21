---
title: Custom events
description: "Trusted documentation about milestones within the Mapbox Navigation SDK for Android. Know when to instruct your users and/or when to hide or show custom UI."
products:
  - Navigation UI
  - Navigation core
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

Navigation milestones inside the SDK provide a powerful way to give your user instructions or get cues to hide or show custom UI elements at defined locations along their route. You can create custom milestones that fit your particular app needs.

The `onRunning` callback's helpful for being notified when the navigation session has started, the user has canceled the session, or the user has arrived at their final destination. From this information, you can decide when to show navigation notifications, know when it's safe to stop requesting user location updates, and much more.

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


## Building a custom milestone

Milestones bring flexibility to your app and how it handles navigation events. Creating a milestone is done in just a few steps. First, choose how frequently you'd like the milestone to be triggered. Two options are currently provided:

- `StepMilestone`, which is triggered each step in the route
-  `RouteMilestone`, which will only be triggered once during the entire route. 
  
You can also implement your own behavior for triggers by extending the `Milestone` class. Give the milestone a unique identifier which can be used to determine which milestone triggered the `onMilestoneEvent` callback. Set the triggers using any combination of the properties shown in the table below. It is important to note that trigger properties have different corresponding variable types that need to be accounted for when setting up the milestone. Lastly, build the milestone and pass it into the `MapboxNavigation` instance using `addMilestone()`.

The snippet of code below shows the creation of a `RouteMilestone` with two conditions, both of which need to be true for the milestone to be triggered. Since it is a `RouteMilestone`, the milestone event only occurs once. The trigger statement can be read as: both the step index must be less than 3 and the current step total distance must be greater than 200 meters for the milestone to be triggered.

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

Besides the triggers already mentioned above, the SDK comes equipped to handle pretty much any case you'd like to build. The table below shows all the conditions currently offered inside the SDK and whether it is a compound statement or a simple statement.

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
FIRST_STEP                      | boolean | When the user begins a navigation session and is currently on the first step.
LAST_STEP                       | boolean | When the user is on the second to last step. Note the final step in direction route will only contain a point representing the final maneuver.
NEXT_STEP_DISTANCE_METERS       | double  | The next step's total distance in meters.
FIRST_LEG                       | boolean | When the user is on the first leg.
LAST_LEG                        | boolean | When the user is on the last leg.

We are actively adding more and more trigger properties every day while we continue building out the milestones API. Please [open an issue on GitHub](https://github.com/mapbox/mapbox-navigation-android/issues/new) if you feel a trigger property is missing and include the use-case.

## Custom instructions

When using the milestone event listener that the callback provides a `String` instruction value. During the milestone creation process, you can add the logic that generates this instruction. Begin by creating a new `Instruction` object which will provide an override method, `buildInstruction`, which provides a `RouteProgress` object for producing the instructions string. With the provided route progress, you can add information such as distance and duration remaining until the next maneuver. Once the `Instruction` is initialized, you will need to give it to the milestone using `setInstruction`. The example below shows how to add the directions API instruction with no modifications as the milestone instruction.

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

