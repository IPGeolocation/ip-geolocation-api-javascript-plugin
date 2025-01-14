# Astronomy API

This README file provides a comprehensive guide for setting up and using this Astronomy JavaScript Plugin. It includes detailed descriptions of configuration options, example usage, and error handling.

## Overview

The Astronomy API provides the location-based rise and set times for the Sun and Moon along with the current position, distance from earth, and azimuth of the Sun and the Moon for a specific date at the queried time.

The Astronomy calculations are much more complex than producing an accurate result from obscure formulas throwing in a few numbers. There is always a tradeoff between the accuracy and computing time. Our Astronomy API focuses more on producing an acceptable results and has an accuracy of around one minute that is good enough for applications like sunrise/sunset timers but is not sufficient for astronomical purposes.

There are three ways to consume the Astronomy API:

- Using any Location Address (preferrably, city address)
- Using Geo Coordinates (latitude & longitude)
- Using any IPv4 or IPv6 address

## Quick Start Guide

To utilize this SDK, an 'IPGeolocation API key' is required. If you do not have one, [sign up here](https://ipgeolocation.io/signup) to obtain a free API key. For front-end use, it is recommended to use the request origin feature (available only in paid plans) to ensure your API key is not exposed publicly. You can add your request origin (your website domain) by logging into you account.

## System Requirements

An active internet connection is required to run this SDK.

## Plugin Configurations

To instantiate the `IPGeolocationAPI`, you can use the following configuration options:

- **apiKey** (`optional: string`): API key used for request authentication. This field is mandatory unless you have added your request origin in the dashboard, in which case it becomes optional.

- **ipAddress** (`optional: string`): Specify an IP address for which you want the astronomical information. If not provided, the client’s IP address is used by default.
- **location** (`optional: string`): Specify the location for which you want the astronomical information.
- **coordinates (lat & long)** (`optional:string`): Specify the location coordinates for which you want the astronomical information.
- **date** (`optional:String`): Specify the date for which you want the astronomical information. You can pass this along with other parameters (ipAddress, location, coordinates)
- **lang** (`optional: string`): Language of the response. Default is `en`. Supported languages include: `ru`, `de`, `ja`, `fr`, `cn`, `es`, `cs`, `it`, `fa`, `ko`.

- **saveToSessionStorage** (`optional:  boolean`): Saves geolocation data to session storage for temporary use.

## Example Code

To access this service, add the following Javascript call (usually within the block of your pages). Note: this service will only work when embedded in web pages - no server-side calls will work.

```html
<script
  language="JavaScript"
  src="https://static.ipgeolocation.io/astronomy-api-plugin.js"
  type="text/javascript"
></script>
```

### Example 1: Get Astronomical Information for a specific location

```html
<script>
      const astronomyAPI = new AstronomyAPI({
          apiKey: "YOUR_API_KEY",
          location:"New York, US"
      });

      const resp = await astronomyAPI.getAstronomy();

      // sample response
      {
    "location": {
      "location": "New York, US",
      "country": "United States",
      "state": "New York",
      "city": "New York",
      "locality": "Clinton",
      "latitude": 40.76473335,
      "longitude": -74.00083980660943
    },
    "date": "2024-11-04",
    "current_time": "08:13:22.978",
    "sunrise": "06:30",
    "sunset": "16:48",
    "sun_status": "-",
    "solar_noon": "11:39",
    "day_length": "10:18",
    "sun_altitude": 16.120293371563754,
    "sun_distance": 148361706.39355108,
    "sun_azimuth": 128.26575101712496,
    "moonrise": "09:49",
    "moonset": "18:29",
    "moon_status": "-",
    "moon_altitude": -14.81836182838389,
    "moon_distance": 396331.25698682835,
    "moon_azimuth": 113.85094239453929,
    "moon_parallactic_angle": -51.40390182984849,
    "moon_phase": "WAXING_CRESCENT",
    "moon_illumination_percentage": "8.43",
    "moon_angle": 33.74826084504092
  }
   // if there is some error while fetching the response from the API, following response will be returned, so hndle it accordingly

    {
        error_status: error_status_code,
        error_message: error_message
    }


    if (!resp.error_message) {
        console.log(resp);
    } else {
        console.log("Something went wrong while fetching data", resp);
    }
</script>
```

### Example 2: Get Astronomical Information for Location Coordinates

```html
<script>
        const astronomyAPI = new AstronomyAPI({
            apiKey: "YOUR_API_KEY",
            location:-27.4748,
            long:153.017,
        });

        const resp = await astronomyAPI.getAstronomy();

        // sample response
    {
    "location": {
      "latitude": -27.4748,
      "longitude": 153.017
    },
    "date": "2024-11-04",
    "current_time": "23:28:59.711",
    "sunrise": "04:54",
    "sunset": "18:08",
    "sun_status": "-",
    "solar_noon": "11:31",
    "day_length": "13:14",
    "sun_altitude": -46.89343713201794,
    "sun_distance": 148361706.39355108,
    "sun_azimuth": 180.89506040990295,
    "moonrise": "06:15",
    "moonset": "20:46",
    "moon_status": "-",
    "moon_altitude": -25.365567944837675,
    "moon_distance": 396297.670873638,
    "moon_azimuth": 214.4609302018781,
    "moon_parallactic_angle": 145.49291581261554,
    "moon_phase": "WAXING_CRESCENT",
    "moon_illumination_percentage": "8.49",
    "moon_angle": 33.87230698192152
  }
     // if there is some error while fetching the response from the API, following response will be returned, so hndle it accordingly

      {
          error_status: error_status_code,
          error_message: error_message
      }


      if (!resp.error_message) {
          console.log(resp);
      } else {
          console.log("Something went wrong while fetching data", resp);
      }
</script>
```

### Example 3: Get Astronomical Information for an IP Address

```html
<script>
        const astronomyAPI = new AstronomyAPI({
            apiKey: "YOUR_API_KEY",
            location:"New York, US"
        });

        const resp = await astronomyAPI.getAstronomy();

        // sample response
  {
    "location": {
      "continent_code": "NA",
      "continent_name": "North America",
      "country_code2": "US",
      "country_code3": "USA",
      "country_name": "United States",
      "country_name_official": "United States of America",
      "is_eu": false,
      "state_prov": "California",
      "state_code": "US-CA",
      "district": "Santa Clara",
      "city": "Mountain View",
      "zipcode": "94043-1351",
      "latitude": 37.4224,
      "longitude": -122.08421
    },
    "date": "2024-11-04",
    "current_time": "05:42:37.429",
    "sunrise": "06:37",
    "sunset": "17:06",
    "sun_status": "-",
    "solar_noon": "11:51",
    "day_length": "10:29",
    "sun_altitude": -11.233664962711332,
    "sun_distance": 148361706.39355108,
    "sun_azimuth": 101.18075504079837,
    "moonrise": "09:56",
    "moonset": "19:01",
    "moon_status": "-",
    "moon_altitude": -44.88852591210425,
    "moon_distance": 396268.3036138962,
    "moon_azimuth": 93.53924174509945,
    "moon_parallactic_angle": -63.45786017771775,
    "moon_phase": "WAXING_CRESCENT",
    "moon_illumination_percentage": "8.54",
    "moon_angle": 33.98061036315428
  }
     // if there is some error while fetching the response from the API, following response will be returned, so hndle it accordingly

      {
          error_status: error_status_code,
          error_message: error_message
      }


      if (!resp.error_message) {
          console.log(resp);
      } else {
          console.log("Something went wrong while fetching data", resp);
      }
</script>
```

### Example 4: Get Astronomical Information for a Specific Date

You can also get Astronomical information for a specific date. For this you have to pass the date parameter along with location or coordinates or ip address. For example:

```html
<script>
        const astronomyAPI = new AstronomyAPI({
            apiKey: "YOUR_API_KEY",
            location:"New York, US"
            date:"2024-11-04"
        });

        const resp = await astronomyAPI.getAstronomy();

        // sample response
      {
    "location": {
      "location": "New York, US",
      "country": "United States",
      "state": "New York",
      "city": "New York",
      "locality": "Clinton",
      "latitude": 40.76473335,
      "longitude": -74.00083980660943
    },
    "date": "2024-11-04",
    "current_time": "08:13:22.978",
    "sunrise": "06:30",
    "sunset": "16:48",
    "sun_status": "-",
    "solar_noon": "11:39",
    "day_length": "10:18",
    "sun_altitude": 16.120293371563754,
    "sun_distance": 148361706.39355108,
    "sun_azimuth": 128.26575101712496,
    "moonrise": "09:49",
    "moonset": "18:29",
    "moon_status": "-",
    "moon_altitude": -14.81836182838389,
    "moon_distance": 396331.25698682835,
    "moon_azimuth": 113.85094239453929,
    "moon_parallactic_angle": -51.40390182984849,
    "moon_phase": "WAXING_CRESCENT",
    "moon_illumination_percentage": "8.43",
    "moon_angle": 33.74826084504092
  }
     // if there is some error while fetching the response from the API, following response will be returned, so hndle it accordingly

      {
          error_status: error_status_code,
          error_message: error_message
      }


      if (!resp.error_message) {
          console.log(resp);
      } else {
          console.log("Something went wrong while fetching data", resp);
      }
</script>
```

## Error Handling

Inspect the `status` field in the response to detect any errors. A missing `status` field typically indicates a successful request, while its presence signals an issue. More information about error codes and messages can be found in the [error codes section](https://ipgeolocation.io/ip-location-api.html#error-codes) of our documentation.

For detailed API documentation and additional features, refer to the official [IPGeolocation API documentation](https://ipgeolocation.io/documentation.html).
