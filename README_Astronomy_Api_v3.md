# Astronomy API JavaScript Plugin

This browser plugin calls the IPGeolocation.io Astronomy API v3 and returns location-based Sun and Moon information, including sunrise, sunset, twilight periods, golden and blue hours, moonrise, moonset, Moon phase, altitude, azimuth, and distance.

The API can resolve a place from:

- A location or address
- Latitude and longitude
- An IPv4 or IPv6 address
- The requesting browser's IP address when no location input is supplied

## Requirements

- A modern browser with `fetch`, `URLSearchParams`, and Web Storage support
- An active internet connection
- An IPGeolocation.io API key, unless Request Origin authentication is configured for the website

For client-side applications, use the paid Request Origin feature to avoid exposing an API key in public source code.

## Installation

Load the hosted plugin:

```html
<script src="https://static.ipgeolocation.io/astronomy-api-plugin.v3.0.0.js"></script>
```

## Configuration

Create an `AstronomyAPI` instance with any of these options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | string | `null` | API key used for authentication. It can be omitted with Request Origin authentication. |
| `ipAddress` | string | `""` | IPv4 or IPv6 address to resolve. |
| `location` | string | `""` | Address or place name, such as `"New York, USA"`. |
| `lat` | number/string | `""` | Latitude from -90 to 90. Supply it together with `long`. |
| `long` | number/string | `""` | Longitude from -180 to 180. Supply it together with `lat`. |
| `elevation` | number/string | `""` | Optional elevation in meters. The API accepts up to 10,000 meters. |
| `date` | string | `""` | Date for a single lookup in `YYYY-MM-DD` format. The current date is used by default. |
| `timeZone` | string | `""` | IANA time-zone name, such as `"Europe/London"`.
| `dateStart` | string | `""` | Start date for a time-series lookup in `YYYY-MM-DD` format. |
| `dateEnd` | string | `""` | End date for a time-series lookup in `YYYY-MM-DD` format. The maximum range is 90 days. |
| `lang` | string | `"en"` | Response language. Supported codes include `en`, `de`, `ru`, `ja`, `fr`, `cn`, `es`, `cs`, `it`, `ko`, `fa`, and `pt`. |
| `saveToSessionStorage` | boolean | `false` | Cache successful responses for the browser-tab session. |

When multiple location inputs are provided, the API gives coordinates precedence over location, and location precedence over IP address.

## Single-date lookups

Call `getAstronomy()` for the current date or one specified with `date`.

### By location

```html
<script>
const astronomyAPI = new AstronomyAPI({
    apiKey: 'YOUR_API_KEY',
    location: 'New York, USA',
    elevation: 10,
});

const response = await astronomyAPI.getAstronomy();

if (response.error_message) {
    console.error(response.error_status, response.error_message);
} else {
    console.log(response.location);
    console.log(response.astronomy.sunrise);
    console.log(response.astronomy.morning.golden_hour_begin);
}
</script>
```

### By coordinates

```html
<script>
const astronomyAPI = new AstronomyAPI({
    apiKey: 'YOUR_API_KEY',
    lat: 40.76473,
    long: -74.00084,
    date: '2026-07-24',
});

const response = await astronomyAPI.getAstronomy();
console.log(response.astronomy);
</script>
```

### By IP address

```html
<script>
const astronomyAPI = new AstronomyAPI({
    apiKey: 'YOUR_API_KEY',
    ipAddress: '8.8.8.8',
});

const response = await astronomyAPI.getAstronomy();
console.log(response.ip, response.location, response.astronomy);
</script>
```

### Return event times in another time zone

The location is still used for the astronomical calculation, but event timestamps are converted to the requested time zone.

```html
<script>
const astronomyAPI = new AstronomyAPI({
    apiKey: 'YOUR_API_KEY',
    location: 'New York, USA',
    timeZone: 'Europe/London',
});

const response = await astronomyAPI.getAstronomy();
console.log(response.astronomy.time_zone);
console.log(response.astronomy.sunrise);
</script>
```

## Time-series lookups

Call `getAstronomyTimeSeries()` to query up to 90 days. The response has the same top-level `location` object, while `astronomy` is an array.

```html
<script>
const astronomyAPI = new AstronomyAPI({
    apiKey: 'YOUR_API_KEY',
    lat: 40.76473,
    long: -74.00084,
    dateStart: '2026-07-24',
    dateEnd: '2026-07-26',
});

const response = await astronomyAPI.getAstronomyTimeSeries();

if (!response.error_message) {
    response.astronomy.forEach((day) => {
        console.log(day.date, day.sunrise, day.sunset);
    });
}
</script>
```

## Response format

Astronomy API v3 groups the result into `location` and `astronomy` objects:

```json
{
  "location": {
    "location_string": "New York, USA",
    "country_name": "United States",
    "state_prov": "New York",
    "city": "New York",
    "locality": "Midtown West",
    "latitude": "40.76473",
    "longitude": "-74.00084",
    "elevation": "9"
  },
  "astronomy": {
    "date": "2026-07-24",
    "current_time": "08:03:36.532",
    "mid_night": "00:56",
    "night_end": "03:18",
    "morning": {
      "astronomical_twilight_begin": "03:18",
      "astronomical_twilight_end": "04:08",
      "nautical_twilight_begin": "04:08",
      "nautical_twilight_end": "04:50",
      "civil_twilight_begin": "04:50",
      "civil_twilight_end": "05:23",
      "blue_hour_begin": "04:37",
      "blue_hour_end": "05:04",
      "golden_hour_begin": "05:04",
      "golden_hour_end": "06:05"
    },
    "sunrise": "05:23",
    "sunset": "20:30",
    "evening": {
      "golden_hour_begin": "19:48",
      "golden_hour_end": "20:49",
      "blue_hour_begin": "20:49",
      "blue_hour_end": "21:16",
      "civil_twilight_begin": "20:30",
      "civil_twilight_end": "21:03",
      "nautical_twilight_begin": "21:03",
      "nautical_twilight_end": "21:45",
      "astronomical_twilight_begin": "21:45",
      "astronomical_twilight_end": "22:36"
    },
    "night_begin": "22:36",
    "sun_status": "-",
    "solar_noon": "13:02",
    "day_length": "15:07",
    "sun_altitude": 24.95,
    "sun_distance": 152059278.33,
    "sun_azimuth": 82.93,
    "moon_phase": "LAST_QUARTER",
    "moonrise": "-:-",
    "moonset": "13:04",
    "moon_status": "-",
    "moon_altitude": 50.86,
    "moon_distance": 371690.22,
    "moon_azimuth": 224.27,
    "moon_parallactic_angle": 32.41,
    "moon_illumination_percentage": "-55.99",
    "moon_angle": 263.11
  }
}
```

The exact location fields depend on whether the lookup uses an address, coordinates, or an IP address. IP lookups also return a top-level `ip` field and more geolocation fields.

## Error handling

For compatibility with previous plugin releases, unsuccessful requests are normalized to:

```js
{
    error_status: 400,
    error_message: 'Description returned by the API'
}
```

Network and response-parsing failures use `error_status: 0`.

```html
<script>
const response = await astronomyAPI.getAstronomy();

if (response.error_message) {
    console.error(`Astronomy request failed (${response.error_status})`, response.error_message);
    return;
}

console.log(response.astronomy);
</script>
```

See the [Astronomy API documentation](https://ipgeolocation.io/documentation/astronomy-api.html) for complete field descriptions, validation rules, credit usage, and HTTP error codes.

