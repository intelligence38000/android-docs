---
title: "Optimization"
description: "Official documentation on the Mapbox Java SDK Optimization API."
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
contentType: guide
language:
- Java
- Kotlin
---

The Mapbox Optimization API returns a duration-optimized route between the input coordinates. This is also known as solving the [Traveling Salesperson Problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem). A typical use case for this API is planning the route for deliveries in a city. An optimized route can be retrieved for car driving, bicycling, walking, or hiking.

You'll find the wrapper for the Mapbox Optimization API included in the `mapbox-sdk-services` module. The `MapboxOptimization` class is used to return a duration-optimized route between the input coordinates.

Before using this wrapper:

- Read the [Mapbox Optimization API documentation](https://www.mapbox.com/api-documentation/navigation/#optimization).
- Make sure that you have included the correct permissions inside of your `AndroidManifest.xml` file if you plan to use this API inside of an Android application.

## Optimization request

Before making the Optimization API request, you must build the `MapboxOptimization` object passing in three _required_ parameters:

1. **A valid Mapbox [access token](https://www.mapbox.com/help/define-access-token/)**.
2. **A `<List>` of `Point` objects**. These are the waypoints in the optimized route. The minimum amount of `Point` objects in the list is 2, and the maximum is 12.
3. **A directions profile**. The API needs to know whether you want a route which is optimized for driving, cycling, or walking.

Here's an example `MapboxOptimization` object:

{{
<CodeLanguageToggle id="optimization-request" />
<ToggleableCodeBlock

java={`
private List<Point> coordinates;

...

MapboxOptimization optimizedClient = MapboxOptimization.builder()
  .coordinates(coordinates)
  .profile(DirectionsCriteria.PROFILE_DRIVING)
  .accessToken(MAPBOX_ACCESS_TOKEN)
  .build();
`}

kotlin={`

private val coordinates: List<Point>? = null

...

val optimizedClient = MapboxOptimization.builder()
	.coordinates(coordinates)
	.profile(DirectionsCriteria.PROFILE_DRIVING)
	.accessToken(MAPBOX_ACCESS_TOKEN)
	.build()  
`}
/>
}}

You can read about optional parameters in the [Optimization API documentation](https://www.mapbox.com/api-documentation/navigation/#optimization).

## Optimization response

Once you have built your `MapboxOptimization` object with all the parameters that you'd like to use in the request, you'll need to send the request using `enqueueCall()` asynchronously. Once the request receives a response, it will tell the callback where you can handle the response appropriately.

{{
<CodeLanguageToggle id="optimization-response" />
<ToggleableCodeBlock

java={`
optimizedClient.enqueueCall(new Callback<OptimizationResponse>() {
  @Override
  public void onResponse(Call<OptimizationResponse> call, Response<OptimizationResponse> response) {

  if (!response.isSuccessful()) {      
    Log.d(TAG, "optimization call not successful");
    return;
  } else {
    if (response.body().trips().isEmpty()) {
    Log.d(TAG, "optimization call successful but no routes");
      return;
    }
  }

    DirectionsRoute optimizedRoute = response.body().trips().get(0);

  }

  @Override
  public void onFailure(Call<OptimizationResponse> call, Throwable throwable) {
    Log.d(TAG, "Error: " + throwable.getMessage());
  }
});
`}

kotlin={`
optimizedClient?.enqueueCall(object : Callback<OptimizationResponse> {
	override fun onResponse(call: Call<OptimizationResponse>, response: Response<OptimizationResponse>) {
		if (!response.isSuccessful) {
			Log.d(TAG, "optimization call not successful")
			return
		} else {
			if (response.body()!!.trips()!!.isEmpty()) {
			Log.d(TAG, "optimization call successful but no routes")
			return
		}
	}

	val optimizedRoute = response.body()!!.trips()!![0]

	}

	override fun onFailure(call: Call<OptimizationResponse>, throwable: Throwable) {
		Log.d(TAG, "Error: " + throwable.message)
	}
})

`}
/>
}}

In case your user leaves the activity or application before the callback's notified, you should use `cancelCall()` within your `onDestroy()` lifecycle method:

{{
<CodeLanguageToggle id="optimization-on-destroy" />
<ToggleableCodeBlock

java={`
@Override
  protected void onDestroy() {
    super.onDestroy();

    if (optimizedClient != null) {
      optimizedClient.cancelCall();
    }
    mapView.onDestroy();
}
`}

kotlin={`
@Override
  protected void onDestroy() {
    super.onDestroy();

    optimizedClient?.cancelCall()

    mapView?.onDestroy()
}
`}
/>
}}
