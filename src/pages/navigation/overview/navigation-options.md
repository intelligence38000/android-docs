---
title: "Custom Navigation Options"
description: "Mapbox documentation about navigation options within the Mapbox Navigation SDK for Android such as custom notifications and even more."
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---
## Configuring `MapboxNavigtionOptions`

The `MapboxNavigtionOptions` object allows you to configure certain aspects of the navigation experience. For example, if you wanted
to turn on debug logging, you would be able to do so with `MapboxNavigtionOptions#isDebugLoggingEnabled(boolean debugLoggingEnabled)`:

{{
<CodeLanguageToggle id="debug-logging-enabled" />
<ToggleableCodeBlock

java={`
MapboxNavigationOptions options = MapboxNavigationOptions.builder()
	.isDebugLoggingEnabled(true)
	.build();

MapboxNavigation mapboxNavigation = new MapboxNavigation(this, accessToken, options);
`}

kotlin={`
val options = MapboxNavigationOptions.builder()
	.isDebugLoggingEnabled(true)
	.build()

val mapboxNavigation = MapboxNavigation(this, accessToken, options)
`}
/>
}}

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
<CodeLanguageToggle id="custom-nav-notification-builder" />
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
class CustomNavigationNotification(context: Context) : NavigationNotification {

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

The method `NavigationNotification#updateNotification(RouteProgress routeProgress)` will be called every time that the Navigation SDK creates a new `RouteProgress` update. This is your opportunity to change anything in your notification that you'd like to update. Use a `NotificationManager` and your notification ID to notify the manager.
