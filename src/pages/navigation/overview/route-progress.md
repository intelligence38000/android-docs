---
title: "Route progress"
description: "Read these docs and learn how to use a user's progress information along a route with the Mapbox Navigation SDK for Android."
products:
  - Navigation UI
  - Navigation core
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
---

Tracking a user's progress along a route is key to providing helpful and timely navigation instructions. The `RouteProgress` class contains all the user's progress information along the route, including leg and steps. This object is provided inside `ProgressChangeListener`, allowing you to get distance measurements, the percentage of route complete, current step index, and much more.

## Listening to progress change

Like tracking user location changes, the `ProgressChangeListener` is invoked every time the user's location changes and provides an updated `RouteProgress` object. The Navigation UI SDK uses this listener by default, but if you are not using the Navigation UI SDK, it is strongly encouraged that you also use this listener. The `ProgressChangeListener` can typically be used to refresh most of your application's user interface when a change occurs. For example, if you are displaying the user's current progress until the user needs to do the next maneuver. Every time this listener's invoked, you can update your view with the new information from `RouteProgress`.

In addition to receiving information about the route progress, the callback also provides you with the user's current location, which can provide their current speed, bearing, etc. If you have the snap to route enabled, the location object will be updated to give the snapped coordinates.

{{
<CodeLanguageToggle id="on-progress-changed" />
<ToggleableCodeBlock

java={`
navigation.addProgressChangeListener(new ProgressChangeListener() {
  @Override
  public void onProgressChange(Location location, RouteProgress routeProgress) {

  }
});
`}

kotlin={`
override fun onProgressChange(location: Location, routeProgress: RouteProgress) {

}
`}

/>
}}

## Information about progress

There are three classes that contain information on route progress at different levels of granularity. <!-- ❓ Clarify the differences / relationships between routes, legs, and steps here. -->

### RouteProgress

This class contains all progress information at any given time during a navigation session. This progress includes information for the current route, leg and step the user is traversing along. With every new valid location update, a new route progress will be generated using the latest information.

| RouteProgress APIs          | Description           |
|-----------------------------|-----------------------|
| directionsRoute             | The route acquired from the directions API and being used for navigation. |
| distanceTraveled            | The total distance the user has traveled along the route.   |
| legIndex                    | The route's current leg index that the user's on.      |
| currentLeg                  | The route's current leg as a `routeLeg` object.    |
| distanceRemaining           | Provides the distance remaining in meters till the user reaches the end of the route. |
| durationRemaining           | The estimated duration remaining till the user arrives at their destination. |
| fractionTraveled            | A `float` value between 0 and 1 giving the total percentage the user has completed in the navigation session, based on distance.
| currentLegProgress          | returns the `LegProgress` object with information specific to the current route leg. You can also access step information through this object. |
| remainingWaypoints          | Number of waypoints remaining on the current route.    |
| currentStepPoints           | List of `Point`s representing the current step geometry.  |
| upcomingStepPoints          | List of `Point`s representing the upcoming step geometry.    |
| voiceInstruction            | The current `VoiceInstruction` for the given segment along the route.    |
| currentState                | `RouteStateProgress` represents the current state of route initialization and location tracking along the route.    |

### RouteLegProgress

This is a progress object specific to the current leg the user is on. If there is only one leg in the directions route, much of this information will be identical to the parent RouteProgress.


| RouteLegProgress APIs       | Description           |
|-----------------------------|-----------------------|
| currentStepProgress         | returns the `stepProgress` object with information specific to the current route step. |
| stepIndex                   | The route's current step index the user's on.      |
| distanceTraveled            | Total distance the user has traveled along the current leg. |
| durationRemaining           | The estimated duration remaining till the user reaches the last maneuver in current route leg. |
| fractionTraveled            | A `float` value between 0 and 1 giving the total percentage the user has traveled along the current route leg, based on distance. |
| distanceRemaining           | The total distance the user has traveled along the current leg.   |
| previousStep                | Get the previous step the user traversed along, if the user is still on the first step, this will return null. |
| currentStep                 | Returns the current step the user is traversing along.  Should be used to provide voice / banner instructions. |
| upComingStep                | Get the next/upcoming step immediately after the current step. If the user is on the last step on the last leg, this will return null since a next step doesn't exist. |
| currentLegAnnotation        | Provides the current annotation data that the `Location` updates are traveling along.  Note: the `DirectionsRoute` must be requested with `ANNOTATION_DISTANCE` to enable this within the RouteProgress - we now do this by default in `NavigationRoute`. |

### RouteStepProgress

This is a progress object specific to the current step the user is on.

| RouteStepProgress APIs           | Description           |
| --------------------------- |---------------------|
| distanceTraveled            | Total distance the user has traveled along the current step. |
| durationRemaining           | The estimated duration remaining till the user reaches the next step maneuver. |
| fractionTraveled            | A `float` value between 0 and 1 giving the total percentage the user has traveled along the current step. |
| distanceRemaining           | The total distance the user has traveled along the current step.   |
| currentIntersection         | An intersection is considered a current intersection once passed through and will remain so until a different intersection is passed through.   |
| upcomingIntersection        | The intersection being traveled towards on the route. Will be null if the upcoming step is null (last step of the leg). |


## Navigation UI

Using `NavigationView` in your XML gives you the ability to listen to different updates or events that may occur during navigation. Both the `ProgressChangeListener` ([see above](#listening-to-progress-change)) and `MilestoneEventListener` (see the [`Instructions`](/android/navigation/overview/instructions/) and [`Custom events`](/android/navigation/overview/milestones/) guides) from our core SDK are able to be added, as well as three others: `NavigationListener`, `RouteListener`, and `FeedbackListener`.

{{<Note imageComponent={<BookImage width="60" height="60" />}>}}
These listeners are only available if you are adding `NavigationView` to your `Activity` or `Fragment` layout XML via `NavigationViewOptions`. You are not able to add them to `NavigationLauncherOptions`.
{{</Note>}}

### RouteListener

| ❓ | Description |
|---|---|
| `allowRerouteFrom(Point offRoutePoint)` | Will trigger in an off-route scenario. <ul><li>Given the `Point` the user has gone off-route, this listener can return true or false.</li><li>Returning true will allow the SDK to proceed with the re-route process and fetch a new route with this given off-route `Point`.</li><li>Returning false will stop the re-route process and the user will continue without a new route in the direction they are traveling.</li></ul> |
| `onOffRoute(Point offRoutePoint)` | Will trigger only if `RouteListener#allowRerouteFrom(Point)` returns true. (This serves as the official off-route event and will continue the process to fetch a new route with the given off-route `Point`.)
| `onRerouteAlong(DirectionsRoute directionsRoute)` | Will trigger when a new `DirectionsRoute` has been retrieved post off-route. (This is the new route the user will be following until another off route event is triggered.)
| `onFailedReroute(String errorMessage)` | Will trigger if the request for a new `DirectionsRoute` fails. (Provides the error message from the directions API used to retrieve the `DirectionsRoute`.) | 
