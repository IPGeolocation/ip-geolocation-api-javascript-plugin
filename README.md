# IP Geolocation API JavaScript Plugin

This README provides a comprehensive guide for setting up and using the IP Geolocation API JavaScript plugin (v3). It includes detailed descriptions of configuration options, example usage, and error handling, making it a useful resource for developers integrating geolocation and IP security functionality into their applications.

## Introduction

The [IPGeolocation API](https://ipgeolocation.io) provides comprehensive geolocation data, including country codes, city names, zip codes, latitude, longitude, EU membership status, calling codes, top-level domains, languages spoken, national flags, currency details, timezone information, security features (VPN, proxy, Tor, relay, etc.), ASN details, network information, abuse contact data, and much more. For more detailed information about the available fields, please visit our [documentation](https://ipgeolocation.io/documentation/ip-location-api.html).

This plugin allows developers to integrate and utilize IP geolocation and IP security data within their web projects. Developers can use this plugin for various purposes, such as:

1. **Language and Currency Customization**: Automatically display content in the user's language and currency based on their geographic location.
2. **Geographic Redirection**: Redirect visitors to region-specific site versions to enhance user experience and compliance with local regulations.
3. **Digital Rights Management**: Restrict or grant access to content based on the user's location to comply with legal restrictions.
4. **Analytics Enhancement**: Use geolocation data to analyze web traffic and user behavior, enhancing site and content strategies.
5. **Form Automation**: Pre-fill forms with country, state, city, zip code, and currency information, speeding up the checkout and registration processes.
6. **Access Control**: Block or restrict access from specific countries to comply with export controls or to reduce fraud and abuse.
7. **Geo-targeting**: Tailor marketing strategies to increase engagement and conversion by aligning with the user's locale.
8. **Security Enforcement**: Detect and mitigate malicious activities by identifying traffic from suspicious locations or those using VPNs, proxies, Tor, relays, and known attackers.
9. **Timezone Synchronization**: Display times and dates in the local timezone for events, posts, or deadlines, ensuring clarity and consistency for global users.

## Quick Start Guide

To use this plugin, an **IPGeolocation API key** is required. If you do not have one, [sign up here](https://ipgeolocation.io/signup) to obtain a free API key. For front-end use, it is recommended to use the request origin feature (available on paid plans) to ensure your API key is not exposed publicly. You can whitelist your request origin (your website domain) by logging into the [dashboard](https://app.ipgeolocation.io/login).

## System Requirements

An active internet connection is required for this plugin to perform geolocation queries.

## Installation

Add the following `<script>` tag (usually within the `<head>` block of your pages) to load the plugin. Note: this service is intended for client-side use in web pages.

```html
<script
  language="JavaScript"
  src="https://static.ipgeolocation.io/ipgeolocation-api-plugin.v3.0.3.js"
  type="text/javascript"
></script>
```

---

## IPGeolocationAPI

### Configurations

By default, the plugin waits up to 2 minutes for an API response and accepts responses up to 16 MiB. If you need a different limit, set `timeoutMs` (milliseconds) or `maxResponseBytes` (bytes) when you create the client. The plugin stops at redirects.

#### IPGeolocationAPI: Authentication & Input
| Option      | Type   | Description                                                                                  |
|-------------|--------|----------------------------------------------------------------------------------------------|
| `apiKey`    | string | Your API key. Required unless request origin is whitelisted (available only on paid plans).  |
| `ipAddress` | string | IPv4, IPv6, or domain name to query. If omitted, the plugin auto-detects the user's IP.      |

#### IPGeolocationAPI: Basic Response Customization
| Option     | Type   | Description                                                                           |
|------------|--------|---------------------------------------------------------------------------------------|
| `fields`   | string | Comma-separated list of fields to include in the response. Available on all plans.    |
| `excludes` | string | Comma-separated list of fields to exclude from the response. Available on all plans.  |
| `lang`     | string | Language code for translated fields (default: `en`). Requires a paid plan. Supported values: `de`, `ru`, `ja`, `fr`, `cn`, `es`, `cs`, `it`, `ko`, `fa`, `pt`, `ar`. |

#### IPGeolocationAPI: include Options and Plan Availability
| Option                        | Type    | Description                                                          | Free | Paid |
|-------------------------------|---------|----------------------------------------------------------------------|:----:|:----:|
| `includeHostname`             | boolean | Include hostname from IPGeolocation's IP-Hostname database.          |  ✖   |  ✔   |
| `includeLiveHostname`         | boolean | Use live DNS sources to resolve hostname.                            |  ✖   |  ✔   |
| `includeHostnameFallbackLive` | boolean | Try database first, fall back to live sources if not found.          |  ✖   |  ✔   |
| `includeUserAgent`            | boolean | Include parsed client browser and device info.                       |  ✖   |  ✔   |
| `includeGeoAccuracy`          | boolean | Add `accuracy_radius`, `confidence`, and `locality` to `location`.  |  ✖   |  ✔   |
| `includeDmaCode`              | boolean | Add `dma_code` to the `location` object (US IPs only).              |  ✖   |  ✔   |
| `includeAbuse`                | boolean | Include IP abuse contact information.                                |  ✖   |  ✔   |
| `includeSecurity`             | boolean | Include VPN, proxy, Tor, relay, and threat detection.                |  ✖   |  ✔   |
| `includeAll`                  | boolean | Include all optional modules in a single request (`include=*`).      |  ✖   |  ✔   |


> **Note:** Only one of `includeHostname`, `includeLiveHostname`, or `includeHostnameFallbackLive` should be set to `true` at a time. If multiple are passed, the API selects one based on precedence: `liveHostname` → `hostname` → `hostnameFallbackLive`.

### Method

#### `getGeolocation()`

Fetches geolocation data for the configured IP address. Returns a `Promise` that resolves to the API response object.

```javascript
const resp = await ipGeoAPI.getGeolocation();
```

On error, the response object will contain:

```json
{
  "error_status": 401,
  "error_message": "..."
}
```

---

## Examples of IPGeolocationAPI

### Example 1: Basic Lookup (API Key Only)

```html
<script>
(async () => {
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
    });

    const resp = await ipGeoAPI.getGeolocation();

    if (!resp.error_message) {
        console.log(resp);
    } else {
        console.log("Something went wrong while fetching data", resp);
    }

    // Sample response of Free plan
    /*
    {
        "ip": "8.8.8.8",
        "location": {
            "continent_code": "NA",
            "continent_name": "North America",
            "country_code2": "US",
            "country_code3": "USA",
            "country_name": "United States",
            "country_name_official": "United States of America",
            "country_capital": "Washington, D.C.",
            "state_prov": "California",
            "state_code": "US-CA",
            "district": "Santa Clara",
            "city": "Mountain View",
            "zipcode": "94043-1351",
            "latitude": "37.42240",
            "longitude": "-122.08421",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
            "geoname_id": "6301403",
            "country_emoji": "🇺🇸"
        },
        "country_metadata": {
            "calling_code": "+1",
            "tld": ".us",
            "languages": ["en-US", "es-US", "haw", "fr"]
        },
        "currency": {
            "code": "USD",
            "name": "US Dollar",
            "symbol": "$"
        },
        "asn": {
            "as_number": "AS15169",
            "organization": "Google LLC",
            "country": "US"
        },
        "time_zone": {
            "name": "America/Los_Angeles",
            "offset": -8,
            "offset_with_dst": -7,
            "current_time": "2026-03-26 10:00:00.000-0700",
            "current_time_unix": 1743001200.000,
            "current_tz_abbreviation": "PDT",
            "current_tz_full_name": "Pacific Daylight Time",
            "standard_tz_abbreviation": "PST",
            "standard_tz_full_name": "Pacific Standard Time",
            "is_dst": true,
            "dst_savings": 1,
            "dst_exists": true,
            "dst_tz_abbreviation": "PDT",
            "dst_tz_full_name": "Pacific Daylight Time",
            "dst_start": {
                "utc_time": "2026-03-08 TIME 10:00",
                "duration": "+1.00H",
                "gap": true,
                "date_time_after": "2026-03-08 TIME 03:00",
                "date_time_before": "2026-03-08 TIME 02:00",
                "overlap": false
            },
            "dst_end": {
                "utc_time": "2026-11-01 TIME 09:00",
                "duration": "-1.00H",
                "gap": false,
                "date_time_after": "2026-11-01 TIME 01:00",
                "date_time_before": "2026-11-01 TIME 02:00",
                "overlap": true
            }
        }
    }
    */

    // Sample response of Paid plan (includes additional objects)
    /*
    {
        "ip": "8.8.8.8",
        "hostname": "dns.google",
        "location": {
            "continent_code": "NA",
            "continent_name": "North America",
            "country_code2": "US",
            "country_code3": "USA",
            "country_name": "United States",
            "country_name_official": "United States of America",
            "country_capital": "Washington, D.C.",
            "state_prov": "California",
            "state_code": "US-CA",
            "district": "Santa Clara",
            "city": "Mountain View",
            "zipcode": "94043-1351",
            "latitude": "37.42240",
            "longitude": "-122.08421",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
            "geoname_id": "6301403",
            "country_emoji": "🇺🇸"
        },
        "country_metadata": {
            "calling_code": "+1",
            "tld": ".us",
            "languages": ["en-US", "es-US", "haw", "fr"]
        },
        "network": {
            "connection_type": "wired",
            "route": "8.8.8.0/24",
            "is_anycast": true
        },
        "currency": {
            "code": "USD",
            "name": "US Dollar",
            "symbol": "$"
        },
        "asn": {
            "as_number": "AS15169",
            "organization": "Google LLC",
            "country": "US",
            "type": "HOSTING",
            "domain": "about.google",
            "date_allocated": "2000-03-30",
            "rir": "ARIN"
        },
        "company": {
            "name": "Google LLC",
            "type": "HOSTING",
            "domain": "google.com"
        },
        "time_zone": {
            "name": "America/Los_Angeles",
            "offset": -8,
            "offset_with_dst": -7,
            "current_time": "2026-03-26 10:00:00.000-0700",
            "current_time_unix": 1743001200.000,
            "current_tz_abbreviation": "PDT",
            "current_tz_full_name": "Pacific Daylight Time",
            "standard_tz_abbreviation": "PST",
            "standard_tz_full_name": "Pacific Standard Time",
            "is_dst": true,
            "dst_savings": 1,
            "dst_exists": true,
            "dst_tz_abbreviation": "PDT",
            "dst_tz_full_name": "Pacific Daylight Time",
            "dst_start": {
                "utc_time": "2026-03-08 TIME 10:00",
                "duration": "+1.00H",
                "gap": true,
                "date_time_after": "2026-03-08 TIME 03:00",
                "date_time_before": "2026-03-08 TIME 02:00",
                "overlap": false
            },
            "dst_end": {
                "utc_time": "2026-11-01 TIME 09:00",
                "duration": "-1.00H",
                "gap": false,
                "date_time_after": "2026-11-01 TIME 01:00",
                "date_time_before": "2026-11-01 TIME 02:00",
                "overlap": true
            }
        }
    }
    */
})();
</script>
```

---

### Example 2: Get Only Required Fields

Use the `fields` option to limit the response to only the data you need.

```html
<script>
(async () => {
    // Get the location object only
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location",
    });
    const resp = await ipGeoAPI.getGeolocation();

    // Sample response
    /*
    {
        "ip": "1.1.1.1",
        "location": {
            "continent_code": "OC",
            "continent_name": "Oceania",
            "country_code2": "AU",
            "country_code3": "AUS",
            "country_name": "Australia",
            "country_name_official": "Commonwealth of Australia",
            "country_capital": "Canberra",
            "state_prov": "Queensland",
            "state_code": "AU-QLD",
            "district": "Brisbane",
            "city": "South Brisbane",
            "zipcode": "4101",
            "latitude": "-27.47306",
            "longitude": "153.01421",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/au_64.png",
            "geoname_id": "10113228",
            "country_emoji": "🇦🇺"
        }
    }
    */

    // Get specific nested fields (country name and city only)
    const nestedFieldsAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location.country_name,location.city",
    });
    const nestedFieldsResponse = await nestedFieldsAPI.getGeolocation();

    // Sample response
    /*
    {
        "ip": "1.1.1.1",
        "location": {
            "country_name": "Australia",
            "city": "South Brisbane"
        }
    }
    */

    // Get location and currency objects
    const locationCurrencyAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location,currency",
    });
    const locationCurrencyResponse = await locationCurrencyAPI.getGeolocation();

    // Sample response
    /*
    {
        "ip": "8.8.8.8",
        "location": {
            "continent_code": "NA",
            "continent_name": "North America",
            "country_code2": "US",
            "country_code3": "USA",
            "country_name": "United States",
            "country_name_official": "United States of America",
            "country_capital": "Washington, D.C.",
            "state_prov": "California",
            "state_code": "US-CA",
            "district": "Santa Clara",
            "city": "Mountain View",
            "zipcode": "94043-1351",
            "latitude": "37.42240",
            "longitude": "-122.08421",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
            "geoname_id": "6301403",
            "country_emoji": "🇺🇸"
        },
        "currency": {
            "code": "USD",
            "name": "US Dollar",
            "symbol": "$"
        }
    }
    */
})();
</script>
```

---

### Example 3: Exclude Unnecessary Fields

Use the `excludes` option to strip out fields you don't need. You can exclude entire objects or individual nested fields.

```html
<script>
(async () => {
    // Exclude continent_code from location, the full currency object, and the full company object
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        excludes: "location.continent_code,currency,company",
    });
    const resp = await ipGeoAPI.getGeolocation();

    // Sample response (Paid plan)
    /*
    {
        "ip": "8.8.8.8",
        "location": {
            "continent_name": "North America",
            "country_code2": "US",
            "country_code3": "USA",
            "country_name": "United States",
            "country_name_official": "United States of America",
            "country_capital": "Washington, D.C.",
            "state_prov": "California",
            "state_code": "US-CA",
            "district": "Santa Clara",
            "city": "Mountain View",
            "zipcode": "94043-1351",
            "latitude": "37.42240",
            "longitude": "-122.08421",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
            "geoname_id": "6301403",
            "country_emoji": "🇺🇸"
        },
        "country_metadata": {
            "calling_code": "+1",
            "tld": ".us",
            "languages": ["en-US", "es-US", "haw", "fr"]
        },
        "network": {
            "connection_type": "wired",
            "route": "8.8.8.0/24",
            "is_anycast": true
        },
        "asn": {
            "as_number": "AS15169",
            "organization": "Google LLC",
            "country": "US",
            "type": "HOSTING",
            "domain": "about.google",
            "date_allocated": "2000-03-30",
            "rir": "ARIN"
        }
    }
    */

    // Combine fields and excludes: get only the location object, minus continent fields
    const filteredLocationAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location",
        excludes: "location.continent_code,location.continent_name",
    });
    const filteredLocationResponse = await filteredLocationAPI.getGeolocation();

    // Sample response
    /*
    {
        "ip": "8.8.8.8",
        "location": {
            "country_code2": "US",
            "country_code3": "USA",
            "country_name": "United States",
            "country_name_official": "United States of America",
            "country_capital": "Washington, D.C.",
            "state_prov": "California",
            "state_code": "US-CA",
            "district": "Santa Clara",
            "city": "Mountain View",
            "zipcode": "94043-1351",
            "latitude": "37.42240",
            "longitude": "-122.08421",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
            "geoname_id": "6301403",
            "country_emoji": "🇺🇸"
        }
    }
    */
})();
</script>
```

---

### Example 4: IP Security Information

IP security data is available on paid plans and is not included in the response by default. Pass `includeSecurity: true` to add the `security` object to the response.

```html
<script>
(async () => {
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location.city,location.country_name",
        includeSecurity: true,
    });
    const resp = await ipGeoAPI.getGeolocation();

    // Sample response (Paid plan)
    /*
    {
        "ip": "2.56.188.34",
        "location": {
            "country_name": "United States",
            "city": "Dallas"
        },
        "security": {
            "threat_score": 80,
            "is_tor": false,
            "is_proxy": true,
            "proxy_provider_names": ["Zyte Proxy"],
            "proxy_confidence_score": 80,
            "proxy_last_seen": "2025-12-12",
            "is_residential_proxy": true,
            "is_vpn": true,
            "vpn_provider_names": ["Nord VPN"],
            "vpn_confidence_score": 80,
            "vpn_last_seen": "2026-01-19",
            "is_relay": false,
            "relay_provider_name": "",
            "is_anonymous": true,
            "is_known_attacker": true,
            "is_bot": false,
            "is_spam": false,
            "is_cloud_provider": true,
            "cloud_provider_name": "Packethub S.A."
        }
    }
    */
})();
</script>
```

---

### Example 5: Hostname Lookup

Hostname lookup is available on paid plans and is not returned by default. Use one of `includeHostname`, `includeLiveHostname`, or `includeHostnameFallbackLive`.

```html
<script>
(async () => {
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        includeLiveHostname: true,
    });
    const resp = await ipGeoAPI.getGeolocation();

    // Sample response (Paid plan)
    /*
    {
        "ip": "8.8.8.8",
        "hostname": "dns.google",
        "location": {
            "continent_code": "NA",
            "continent_name": "North America",
            "country_code2": "US",
            "country_code3": "USA",
            "country_name": "United States",
            "country_name_official": "United States of America",
            "country_capital": "Washington, D.C.",
            "state_prov": "California",
            "state_code": "US-CA",
            "district": "Santa Clara",
            "city": "Mountain View",
            "zipcode": "94043-1351",
            "latitude": "37.42240",
            "longitude": "-122.08421",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
            "geoname_id": "6301403",
            "country_emoji": "🇺🇸"
        }
    }
    */
})();
</script>
```

The three hostname options behave as follows:

- `includeHostname`: Returns hostname from IPGeolocation's local IP-Hostname database. Fastest option.
- `includeLiveHostname`: Performs a live DNS lookup. More accurate but adds latency.
- `includeHostnameFallbackLive`: Checks the local database first; performs a live lookup only if no hostname is found. Best balance of speed and accuracy.

If a hostname cannot be resolved, the `hostname` field returns the queried IP address.

---

### Example 6: User-Agent Information

User-agent parsing is available on paid plans and is not included by default. Pass `includeUserAgent: true` to add the `user_agent` object to the response.

```html
<script>
(async () => {
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location.country_code2,location.city",
        includeUserAgent: true,
    });
    const resp = await ipGeoAPI.getGeolocation();

    // Sample response (Paid plan)
    /*
    {
        "ip": "8.8.8.8",
        "location": {
            "city": "Mountain View",
            "country_code2": "US"
        },
        "user_agent": {
            "user_agent_string": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9",
            "name": "Safari",
            "type": "Browser",
            "version": "9.0.2",
            "version_major": "9",
            "device": {
                "name": "Apple Macintosh",
                "type": "Desktop",
                "brand": "Apple",
                "cpu": "Intel"
            },
            "engine": {
                "name": "AppleWebKit",
                "type": "Browser",
                "version": "601.3.9",
                "version_major": "601"
            },
            "operating_system": {
                "name": "Mac OS",
                "type": "Desktop",
                "version": "10.11.2",
                "version_major": "10.11",
                "build": "??"
            }
        }
    }
    */
})();
</script>
```

---

### Example 7: Geo Accuracy Information

Pass `includeGeoAccuracy: true` to add three additional fields to the `location` object: `accuracy_radius`, `confidence`, and `locality`. Available on paid plans.

```html
<script>
(async () => {
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        includeGeoAccuracy: true,
    });
    const resp = await ipGeoAPI.getGeolocation();

    // Sample response with additional fields in the location object (Paid plan)
    /*
    {
        "ip": "91.128.103.196",
        "location": {
            "continent_code": "EU",
            "continent_name": "Europe",
            "country_code2": "SE",
            "country_code3": "SWE",
            "country_name": "Sweden",
            "country_name_official": "Kingdom of Sweden",
            "country_capital": "Stockholm",
            "state_prov": "Stockholms län",
            "state_code": "SE-AB",
            "district": "Stockholm",
            "city": "Stockholm",
            "locality": "Stockholm",
            "accuracy_radius": "9.148",
            "confidence": "high",
            "zipcode": "164 40",
            "latitude": "59.40510",
            "longitude": "17.95510",
            "is_eu": true,
            "country_flag": "https://ipgeolocation.io/static/flags/se_64.png",
            "geoname_id": "9972319",
            "country_emoji": "🇸🇪"
        }
    }
    */
})();
</script>
```

---

### Example 8: DMA Code

The DMA (Designated Market Area) code is a US-only field used for marketing and regional targeting. Pass `includeDmaCode: true` to include it. Available on paid plans.

```html
<script>
(async () => {
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location",
        includeDmaCode: true,
    });
    const resp = await ipGeoAPI.getGeolocation();

    // Sample response (Paid plan response of US IP)
    /*
    {
        "ip": "107.161.145.197",
        "location": {
            "continent_code": "NA",
            "continent_name": "North America",
            "country_code2": "US",
            "country_code3": "USA",
            "country_name": "United States",
            "country_name_official": "United States of America",
            "country_capital": "Washington, D.C.",
            "state_prov": "Pennsylvania",
            "state_code": "US-PA",
            "district": "Philadelphia County",
            "city": "Philadelphia",
            "dma_code": "504",
            "zipcode": "19102",
            "latitude": "39.95258",
            "longitude": "-75.16522",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
            "geoname_id": "9849057",
            "country_emoji": "🇺🇸"
        }
    }
    */
})();
</script>
```

> **Note:** `dma_code` will be non-empty only for IPs located in the United States.

---

### Example 9: Abuse Contact Information

Abuse contact data is available on paid plans and not included by default. Pass `includeAbuse: true` to add the `abuse` object to the response.

```html
<script>
(async () => {
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location.city,location.country_name",
        includeAbuse: true,
    });
    const resp = await ipGeoAPI.getGeolocation();

    // Sample response (Paid plan)
    /*
    {
        "ip": "91.128.103.196",
        "location": {
            "city": "Stockholm",
            "country_name": "Sweden"
        },
        "abuse": {
            "route": "91.128.0.0/14",
            "country": "SE",
            "name": "Swipnet Staff",
            "organization": "",
            "kind": "group",
            "address": "Tele2 AB/Swedish IP Network\nIP Registry\nTorshamnsgatan 17 164 40 Kista SWEDEN",
            "emails": ["abuse@tele2.com"],
            "phone_numbers": ["+46 8 5626 42 10"]
        }
    }
    */
})();
</script>
```

---

### Example 10: Include All Optional Modules

Pass `includeAll: true` to request all available optional modules (`security`, `abuse`, `user_agent`, `hostname`, `geo_accuracy`, `dma_code`) in a single call. Equivalent to `include=*` in the API.

```html
<script>
(async () => {
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        includeAll: true,
    });
    const resp = await ipGeoAPI.getGeolocation();
})();
</script>
```

> **Note on credits:** Using `includeAll` costs **4 API credits** per request: 1 for the base lookup, 2 for the `security` module, and 1 for the `abuse` module.

---

### Example 11: Session Storage Caching

Pass `saveToSessionStorage: true` to cache successful responses in session storage. Cached responses are reused only for the same endpoint, request options and API key. API keys are hashed before identifying cache entries. If browser storage is unavailable, requests continue without caching. Requests with an API key also skip caching when the browser’s Web Crypto API is unavailable.

```html
<script>
(async () => {
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        saveToSessionStorage: true,
    });

    const resp = await ipGeoAPI.getGeolocation(); // fetches from API and caches
    const resp2 = await ipGeoAPI.getGeolocation(); // returns cached response
})();
</script>
```

---

## IPSecurityAPI

The `IPSecurityAPI` class provides direct access to the dedicated IP Security endpoint (`/v3/security`), returning threat flags and risk signals for any IPv4 or IPv6 address. Use this class when you only need security data and don't require geolocation fields.

> **Note on credits:** Each successful security lookup costs **2 API credits**. For more details, refer to the [Credits & Usage documentation](https://ipgeolocation.io/documentation/credits-usage.html).

### Configuration Options

| Option | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | `null` | API key for request authentication. Required unless you have whitelisted your request origin in the dashboard. |
| `ipAddress` | `string` | `''` | IP address to look up. If not provided, the requesting client's IP is used automatically. |
| `fields` | `string` | `''` | Comma-separated list of fields to include in the `security` object. |
| `excludes` | `string` | `''` | Comma-separated list of fields to exclude from the `security` object. |
| `saveToSessionStorage` | `boolean` | `false` | Caches successful responses for the same request options and API key within the session, using the caching rules above. |

### Method

#### `getSecurity()`

Fetches security data for the configured IP address. Returns a `Promise` that resolves to the API response object.

```javascript
const resp = await ipSecurityAPI.getSecurity();
```

On error, the response object will contain:

```json
{
  "error_status": 401,
  "error_message": "..."
}
```

---

## Examples of IPSecurityAPI

### Example 1: Basic Security Lookup

```html
<script>
(async () => {
    const ipSecurityAPI = new IPSecurityAPI({
        apiKey: "YOUR_API_KEY",
        ipAddress: "2.56.188.34",
    });

    const resp = await ipSecurityAPI.getSecurity();

    if (!resp.error_message) {
        console.log(resp);
    } else {
        console.log("Something went wrong", resp);
    }

    // Sample response
    /*
    {
        "ip": "2.56.188.34",
        "security": {
            "threat_score": 80,
            "is_tor": false,
            "is_proxy": true,
            "proxy_provider_names": ["Zyte Proxy"],
            "proxy_confidence_score": 80,
            "proxy_last_seen": "2025-12-12",
            "is_residential_proxy": true,
            "is_vpn": true,
            "vpn_provider_names": ["Nord VPN"],
            "vpn_confidence_score": 80,
            "vpn_last_seen": "2026-01-19",
            "is_relay": false,
            "relay_provider_name": "",
            "is_anonymous": true,
            "is_known_attacker": true,
            "is_bot": false,
            "is_spam": false,
            "is_cloud_provider": true,
            "cloud_provider_name": "Packethub S.A."
        }
    }
    */
})();
</script>
```

---

### Example 2: Return Only Specific Security Fields

Use the `fields` option to return only the security properties you need.

```html
<script>
(async () => {
    const ipSecurityAPI = new IPSecurityAPI({
        apiKey: "YOUR_API_KEY",
        ipAddress: "2.56.188.34",
        fields: "security.threat_score,security.is_vpn,security.is_proxy",
    });

    const resp = await ipSecurityAPI.getSecurity();

    // Sample response
    /*
    {
        "ip": "2.56.188.34",
        "security": {
            "threat_score": 80,
            "is_proxy": true,
            "is_vpn": true
        }
    }
    */
})();
</script>
```

---

### Example 3: Exclude Specific Security Fields

Use the `excludes` option to remove fields you don't need from the full `security` object.

```html
<script>
(async () => {
    const ipSecurityAPI = new IPSecurityAPI({
        apiKey: "YOUR_API_KEY",
        ipAddress: "2.56.188.34",
        excludes: "security.is_tor,security.is_cloud_provider",
    });

    const resp = await ipSecurityAPI.getSecurity();

    // Sample response where is_tor and is_cloud_provider are omitted
    /*
    {
        "ip": "2.56.188.34",
        "security": {
            "threat_score": 80,
            "is_proxy": true,
            "proxy_provider_names": ["Zyte Proxy"],
            "proxy_confidence_score": 80,
            "proxy_last_seen": "2025-12-12",
            "is_residential_proxy": true,
            "is_vpn": true,
            "vpn_provider_names": ["Nord VPN"],
            "vpn_confidence_score": 80,
            "vpn_last_seen": "2026-01-19",
            "is_relay": false,
            "relay_provider_name": "",
            "is_anonymous": true,
            "is_known_attacker": true,
            "is_bot": false,
            "is_spam": false,
            "cloud_provider_name": "Packethub S.A."
        }
    }
    */
})();
</script>
```

---

### Example 4: Lookup Caller IP

If no `ipAddress` is provided, the API automatically detects and assesses the requesting client's IP.

```html
<script>
(async () => {
    const ipSecurityAPI = new IPSecurityAPI({
        apiKey: "YOUR_API_KEY",
    });

    const resp = await ipSecurityAPI.getSecurity();
    // Returns security data for the browser's public IP address
})();
</script>
```

---

## Error Handling

The plugin hides your API key when you print a client with `JSON.stringify()` or when an error message repeats it. You can still read the key from `client.apiKey`.

When a request fails, the response object contains `error_status` and `error_message`. HTTP failures retain their status code, including when the response body is not JSON. Network failures and invalid successful-response bodies use `error_status: 0`. Check for `error_message` before accessing response data.

```html
<script>
(async () => {
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        includeSecurity: true,
    });

    const resp = await ipGeoAPI.getGeolocation();

    if (!resp.error_message) {
        console.log(resp);
    } else {
        console.log("Error:", resp.error_status, resp.error_message);
    }

    // Example error response when using a free plan key with a paid feature
    /*
    {
        "error_status": 401,
        "error_message": "IP-hostname lookup, IP-security lookup and user-agent parsing are not supported on your free subscription. These features are available to all paid subscriptions only."
    }
    */
})();
</script>
```

Common HTTP status codes returned by the API:

| Status Code | Meaning |
|---|---|
| `400` | Bad Request: invalid IP, malformed parameters, or empty payload. |
| `401` | Unauthorized: missing or invalid API key, feature not available on your plan, or subscription issue. |
| `404` | Not Found: IP not found in the database or wrong endpoint called. |
| `423` | Locked: the IP is a bogon or private address. |
| `429` | Too Many Requests: API usage limit reached. |

For the full list of error codes and their descriptions, refer to the [error codes section](https://ipgeolocation.io/documentation/ip-location-api.html#error-codes) of the official documentation.

---

## API Credits Reference

| Operation | Credits Charged |
|---|---|
| Base geolocation lookup (`/v3/ipgeo`) | 1 credit |
| Adding `includeSecurity` | +2 credits (3 total) |
| Adding `includeAbuse` | +1 credit (2 total) |
| `includeAll` (`include=*`) | 4 credits total |
| IP Security lookup (`/v3/security`) | 2 credits |

The exact credits charged for any request are returned in the `X-Credits-Charged` response header. For full billing details, refer to the [Credits & Usage documentation](https://ipgeolocation.io/documentation/credits-usage.html).

---

## API SDKs

IPGeolocation also offers SDKs for server-side integration in multiple languages:

- [Java SDK](https://ipgeolocation.io/documentation/ip-geolocation-api-java-sdk.html)
- [Python SDK](https://ipgeolocation.io/documentation/ip-geolocation-api-python-sdk.html)
- [Go SDK](https://ipgeolocation.io/documentation/ip-geolocation-api-go-sdk.html)
- [Ruby SDK](https://ipgeolocation.io/documentation/ip-geolocation-api-ruby-sdk.html)
- [C# / .NET SDK](https://ipgeolocation.io/documentation/ip-geolocation-api-c-sharp-dotnet-sdk.html)
- [PHP SDK](https://ipgeolocation.io/documentation/ip-geolocation-api-php-sdk.html)
- [TypeScript SDK](https://ipgeolocation.io/documentation/ip-geolocation-api-typescript-sdk.html)
- [JavaScript SDK](https://ipgeolocation.io/documentation/ip-geolocation-api-javascript-sdk.html)
- [jQuery SDK](https://ipgeolocation.io/documentation/ip-geolocation-api-jquery-sdk.html)

For more details and additional features, refer to the official [IPGeolocation API documentation](https://ipgeolocation.io/documentation.html).