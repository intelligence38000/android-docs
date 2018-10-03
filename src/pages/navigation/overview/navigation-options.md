---
title: "Navigation Options"
description: "Mapbox documentation about navigation options within the Mapbox Navigation SDK for Android. Custom notifications, off-route thresholds, and even more."
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

The Navigation SDK for Android has default constants used during navigation, such as the duration or distance an event must occur. However, you might find yourself wanting to adjust these values to your liking in some situations. The `MapboxNavigtionOptions` object allows for tweaking all of the default values for maneuver zone thresholds, tolerance for offline, etc. The `MapboxNavigation` object constructor optionally takes in an instance of the `MapboxNavigtionOptions` object and uses the values set inside of the options class until `MapboxNavigation`'s destroyed.

The `MapboxNavigationOptions` class uses a `builder()` to set any required default values.
You can then adjust any variables needed in the class before passing your options to `MapboxNavigation`.

{{
<CodeLanguageToggle id="nav-options" />
<ToggleableCodeBlock

java={`
MapboxNavigationOptions options = MapboxNavigationOptions.builder()
  .maneuverZoneRadius(70)
  .build();

navigation = new MapboxNavigation(this, Mapbox.getAccessToken(), options);
`}

kotlin={`
val options = MapboxNavigationOptions.builder()
	.maneuverZoneRadius(70.0)
	.build()
navigation = MapboxNavigation(this, ACCESS_TOKEN, options)
`}

/>
}}

Here is additional information on _some_ of the APIs that are exposed inside of the options object and that allow tweaking of the navigation behavior.

## Adjusting step completion thresholds

Two heuristics are considered when the user has completed the current step and is on the next step. The first value that's adjustable is the `ManeuverZoneRadius` which the user must enter to count as completing a step. _The value to set should be in unit meters_. The other determining factor is the `MaxTurnCompletionOffset`. Adjusting this value to a smaller acceptable degree angle narrows the scope. Increasing the value also increases the scope.

## Off-route threshold

Part of the off-route detection involves measuring the distance between the user's exact location and the snapped-to-route location. The user is potentially considered off route if the distance is greater then the set `MaximumDistanceOffRoute`. This threshold can also be adjusted using the `MapboxNavigationOptions` object. You can also adjust the seconds before a re-route occurs by using the `setSecondsBeforeReroute()` API. The default is three seconds.

## Creating a custom notification

You can also pass in a custom notification when creating `MapboxNavigtionOptions`. This notificiation will show once navigation begins.

{{
<CodeLanguageToggle id="custom-nav-notification" />
<ToggleableCodeBlock

java={`
CustomNavigationNotification customNavigationNotification = new CustomNavigationNotification(this);
MapboxNavigationOptions options = MapboxNavigationOptions.builder()
	.navigationNotification(customNavigationNotification)
	.build();
`}

kotlin={`
val customNavigationNotification = CustomNavigationNotification(this)
val options = MapboxNavigationOptions.builder()
	.navigationNotification(customNavigationNotification)
	.build()
`}

/>
}}

Your notification must implement `NavigationNotification`:

{{
<CodeLanguageToggle id="custom-nav-notification" />
<ToggleableCodeBlock

java={`
public class CustomNavigationNotification implements NavigationNotification {

  private static final int CUSTOM_NOTIFICATION_ID = 91234821;

  private Notification customNotification;
  private NotificationCompat.Builder customNotificationBuilder;
  private NotificationManager notificationManager;
  private int numberOfUpdates;

  public CustomNavigationNotification(Context context) {
    // Get the notification manager to update your notification
    notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

    // Store the builder to update later
    customNotificationBuilder = new NotificationCompat.Builder(context, NAVIGATION_NOTIFICATION_CHANNEL)
      .setSmallIcon(R.drawable.ic_navigation)
      .setContentTitle("Custom Navigation Notification")
      .setContentText("Display your own content here!");

    // Build the notification
    customNotification = customNotificationBuilder.build();
  }

  @Override
  public Notification getNotification() {
    return customNotification;
  }

  @Override
  public int getNotificationId() {
    return CUSTOM_NOTIFICATION_ID;
  }

  @Override
  public void updateNotification(RouteProgress routeProgress) {
    // Update the builder with a new number of updates
    customNotificationBuilder.setContentText("Number of updates: " + numberOfUpdates++);

    // Notify the notification manager
    notificationManager.notify(CUSTOM_NOTIFICATION_ID, customNotificationBuilder.build());
  }
}
`}

kotlin={`
companion object {

        private val CUSTOM_NOTIFICATION_ID = 91234821
        private val STOP_NAVIGATION_ACTION = "stop_navigation_action"
}

private val customNotification: Notification
    private val customNotificationBuilder: NotificationCompat.Builder
    private val notificationManager: NotificationManager
    private var stopNavigationReceiver: BroadcastReceiver? = null
    private var numberOfUpdates: Int = 0

    init {
        notificationManager = applicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        customNotificationBuilder = NotificationCompat.Builder(applicationContext, NAVIGATION_NOTIFICATION_CHANNEL)
                .setSmallIcon(R.drawable.ic_navigation)
                .setContentTitle("Custom Navigation Notification")
                .setContentText("Display your own content here!")
                .setContentIntent(createPendingStopIntent(applicationContext))

        customNotification = customNotificationBuilder.build()
    }

    override fun getNotification(): Notification {
        return customNotification
    }

    override fun getNotificationId(): Int {
        return CUSTOM_NOTIFICATION_ID
    }

    override fun updateNotification(routeProgress: RouteProgress) {
        // Update the builder with a new number of updates
        customNotificationBuilder.setContentText("Number of updates: " + numberOfUpdates++)

        notificationManager.notify(CUSTOM_NOTIFICATION_ID, customNotificationBuilder.build())
    }

    override fun onNavigationStopped(context: Context) {
        context.unregisterReceiver(stopNavigationReceiver)
        notificationManager.cancel(CUSTOM_NOTIFICATION_ID)
    }

    fun register(stopNavigationReceiver: BroadcastReceiver, applicationContext: Context) {
        this.stopNavigationReceiver = stopNavigationReceiver
        applicationContext.registerReceiver(stopNavigationReceiver, IntentFilter(STOP_NAVIGATION_ACTION))
    }

    private fun createPendingStopIntent(context: Context): PendingIntent {
        val stopNavigationIntent = Intent(STOP_NAVIGATION_ACTION)
        return PendingIntent.getBroadcast(context, 0, stopNavigationIntent, 0)
    }
`}

/>
}}


The method `NavigationNotification#updateNotification(RouteProgress routeProgress)` will be called
every time that the Navigation SDK creates a new `RouteProgress` update. This is your opportunity
to change anything in your notification that you'd like to update. Use a `NotificationManager` and
your notification ID to notify the manager.

## Adjusting location validation thresholds

`MapboxNavigationOptions` also gives you the ability to adjust the thresholds that determine valid or invalid
`Location` updates that come from the device:

- `locationAcceptableAccuracyInMetersThreshold`:  This variable is used to determine if a `Location` update is considered acceptable or not based on `Location#getAccuracy()`. The accuracy is measured in meters. The remaining checks do not execute if the location accuracy is below this threshold. For example, the update will be considered _valid_ if an update is received with an accuracy of `20` and
the threshold is set to `100`, which is the default.
