---
title: User interaction
description: Understand how to listen for user interaction with the Mapbox Navigation UI SDK for Android.
products:
  - Navigation UI SDK
---

There are several UI elements included in the Navigation UI SDK by default. Below are the default behaviors for each kind of user interaction related to the navigation view and the feedback component.

## NavigationListener

| Callback | Description |
|---|---|
| `onCancelNavigation()` | Will be triggered when the user clicks on the cancel "X" icon while navigating. |
| `onNavigationFinished()` | Will be triggered when `MapboxNavigation` has finished and the service is completely shutdown. |
| `onNavigationRunning()` | Will be triggered when `MapboxNavigation` has been initialized and the user is navigating the given route. |

## FeedbackListener

| Callback | Description |
|---|---|
| `onFeedbackOpened()` | Will be triggered when the feedback bottomsheet is opened by a user while navigating. |
| `onFeedbackCancelled()` | Will be triggered when the feedback bottomsheet is opened by a user while navigating but then dismissed without clicking on a specific `FeedbackItem` in the list. |
| `onFeedbackSent(FeedbackItem feedbackItem)` | Will be triggered when the feedback bottomsheet is opened by a user while navigating and then the user clicks on a specific `FeedbackItem` in the list. |