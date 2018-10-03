---
title: "Route Progress Object"
description: "Read these docs and learn how to use a user's progress information along a route with the Mapbox Navigation SDK for Android."
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

The `RouteProgress` class contains all the user's progress information along the route, including leg and steps. This object's provided inside `ProgressChangeListener`, allowing you to get distance measurements, the percentage of route complete, current step index, and much more.

## On progress change

Like tracking user location changes, this listener's invoked every time the user's location changes but provides an updated RouteProgress object. It is strongly encouraged to use this listener since you can typically refresh most of your application's user interface. An example of this will be if you are displaying the user's current progress until the user needs to do the next maneuver. Every time this listener's invoked, you can update your view with the new information from `RouteProgress`.

Besides receiving information about the route progress, the callback also provides you with the user's current location which can provide their current speed, bearing, etc. If you have the snap to route enabled, the location object will be updated to give the snapped coordinates.

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

| RouteProgress APIs          | Description           |
| --------------------------- |:---------------------:|
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

| RouteLegProgress APIs       | Description           |
| --------------------------- |:---------------------:|
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

| StepProgress APIs           | Description           |
| --------------------------- |:---------------------:|
| distanceTraveled            | Total distance the user has traveled along the current step. |
| durationRemaining           | The estimated duration remaining till the user reaches the next step maneuver. |
| fractionTraveled            | A `float` value between 0 and 1 giving the total percentage the user has traveled along the current step. |
| distanceRemaining           | The total distance the user has traveled along the current step.   |
| currentIntersection         | An intersection is considered a current intersection once passed through and will remain so until a different intersection is passed through.   |
| upcomingIntersection        | The intersection being traveled towards on the route. Will be null if the upcoming step is null (last step of the leg). |
