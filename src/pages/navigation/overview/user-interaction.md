---
title: User interaction
description: Some description.
products:
  - Navigation UI SDK
---

[WIP]

## NavigationListener

| ❓ | Description |
|---|---|
| `onCancelNavigation()` | Will be triggered when the user clicks on the cancel "X" icon while navigating. |
| `onNavigationFinished()` | Will be triggered when `MapboxNavigation` has finished and the service is completely shutdown. |
| `onNavigationRunning()` | Will be triggered when `MapboxNavigation` has been initialized and the user is navigating the given route. |

## FeedbackListener

| ❓| Description |
|---|---|
| `onFeedbackOpened()` | Will be triggered when the feedback bottomsheet is opened by a user while navigating. |
| `onFeedbackCancelled()` | Will be triggered when the feedback bottomsheet is opened by a user while navigating but then dismissed without clicking on a specific `FeedbackItem` in the list. |
| `onFeedbackSent(FeedbackItem feedbackItem)` | Will be triggered when the feedback bottomsheet is opened by a user while navigating and then the user clicks on a specific `FeedbackItem` in the list. |