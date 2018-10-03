---
title: "Directions Matrix"
description: "Official documentation on the Mapbox Java SDK Matrix API"
sideNavSections:
  - title: "Building and making requests"
  - title: "API response"
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

The Mapbox Matrix API returns all travel times between many points. The Matrix API will always return the duration on the fastest route. Durations between points may not be symmetric (for example A to B may have a different duration than B to A), as the routes may differ by direction due to one-way streets or turn restrictions. The Matrix API returns durations in seconds. It does not return route geometries or distances. Make sure to have a look at the API documentation if you want [more information](https://www.mapbox.com/api-documentation/#matrix).

This API allows you to build tools that efficiently check the reachability of coordinates from each other, filter points by travel time, or run your own algorithms for solving optimization problems.

The standard limit for request are a maximum 60 requests per minute and maximum 25 input coordinates. For example you can request a symmetric 25x25 matrix, an asymmetric 1x24 matrix with distinct coordinates or a 12x24 where sources and destinations share some coordinates. For higher volumes [contact us](https://www.mapbox.com/contact/sales).

Before using this wrapper:

- We recommend reading over [Mapbox Matrix API documentation](https://www.mapbox.com/api-documentation/#matrix). The API documentation contains all available parameters including some that are not listed in this guide.
- Make sure you have included the correct permissions inside of your `AndroidManifest.xml` file if you plan to use this API inside of an Android application.

## API request

Before requesting and receiving the Matrix response, you'll need to use the `MapboxMatrix` builder to set the request parameters. The most basic request passes in a `List` of `Point` objects, sets the directions profile, and provides an access token.

```java

```
{{
<CodeLanguageToggle id="matrix-request" />
<ToggleableCodeBlock

java={`
MapboxMatrix directionsMatrixClient = MapboxMatrix.builder()
	.accessToken(ACCESS_TOKEN)
	.profile(DirectionsCriteria.PROFILE_DRIVING)
	.coordinates(listOfPoints)
	.build();
`}

kotlin={`
val directionsMatrixClient = MapboxMatrix.builder()
	.accessToken(ACCESS_TOKEN)
	.profile(DirectionsCriteria.PROFILE_DRIVING)
	.coordinates(listOfPoints)
	.build()
`}

/>
}}


## API response

Like all API calls inside of the Mapbox Java SDK, the response will come inside a Retrofit callback. Inside `onResponse()`, you can access the API's returned response if successful.

{{
<CodeLanguageToggle id="matrix-response" />
<ToggleableCodeBlock

java={`
client.enqueueCall(new Callback<MatrixResponse>() {
  @Override
  public void onResponse(Call<MatrixResponse> call,
    Response<MatrixResponse> response) {
    
    }
  }

  @Override
  public void onFailure(Call<MatrixResponse> call, Throwable throwable) {
    
  }
});
`}

kotlin={`
directionsMatrixClient.enqueueCall(object : Callback<MatrixResponse> {
	override fun onResponse(call: Call<MatrixResponse>, response: Response<MatrixResponse>) {

	
	}
	
	override fun onFailure(call: Call<MatrixResponse>, throwable: Throwable) {
	
	}
})        
`}
/>
}}

