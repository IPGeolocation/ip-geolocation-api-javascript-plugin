# IP Geolocation API JavaScript Plugin

This README file provides a comprehensive guide for setting up and using the IP Geolocation API JavaScript SDK. It includes detailed descriptions of configuration options, example usage, and error handling, making it a useful resource for developers integrating geolocation functionality into their applications.

## Introduction

The [IPGeolocation API](https://ipgeolocation.io) provides comprehensive geolocation data, including country codes, city names, zip codes, latitude, longitude, EU membership status, calling codes, top-level domains, languages spoken, national flags, currency details, timezone information, security features (VPN, proxy, Tor, etc.), ISP details, connection types and much more. For more detailed information about the available fields, please visit our [documentation](https://ipgeolocation.io/ip-location-api.html#documentation-overview).

This SDK allows developers to integrate and utilize IP geolocation data within their web projects. Developers can use this SDK for various purposes, such as:

1. **Language and Currency Customization**: Automatically display content in the user's language and currency based on their geographic location.
2. **Geographic Redirection**: Redirect visitors to region-specific site versions to enhance user experience and compliance with local regulations.
3. **Digital Rights Management**: Restrict or grant access to content based on the user's location to comply with legal restrictions.
4. **Analytics Enhancement**: Use geolocation data to analyze web traffic and user behavior, enhancing site and content strategies.
5. **Form Automation**: Pre-fill forms with country, state, city, zip code, and currency information, speeding up the checkout and registration processes.
6. **Access Control**: Block or restrict access from specific countries to comply with export controls or to reduce fraud and abuse.
7. **Geo-targeting**: Tailor marketing strategies to increase engagement and conversion by aligning with the user’s locale.
8. **Security Enforcement**: Detect and mitigate malicious activities by identifying traffic from suspicious locations or those using VPNs, proxies, tors, and known attackers.
9. **Timezone Synchronization**: Display times and dates in the local timezone for events, posts, or deadlines, ensuring clarity and consistency for global users.

The JavaScript IP Geolocation web service API enables direct programming of front-end web pages to deliver dynamic geo-localized content.

## Quick Start Guide

To utilize this SDK, an 'IPGeolocation API key' is required. If you do not have one, [sign up here](https://ipgeolocation.io/signup) to obtain a free API key. For front-end use, it is recommended to use the request origin feature (available only in paid plans) to ensure your API key is not exposed publicly. You can whitelist your request origin (your website domain) by logging into the [dashboard](https://app.ipgeolocation.io/login).

## System Requirements

An active internet connection is required for this SDK to perform geolocation queries.

## SDK Configuration

To instantiate the `IPGeolocationAPI`, you can use the following configuration options:

- **apiKey** (`optional: string`): API key used for request authentication. This field is mandatory unless you have added your request origin in the dashboard, in which case it becomes optional.

- **ipAddress** (`optional: string`): Specify an IP address to query. If not provided, the visitor’s IP address is used by default.

- **fields** (`optional: string`): Comma-separated list of fields to include in the response. Defaults to all fields if not specified.

- **excludes** (`optional: string`): Comma-separated list of fields to exclude from the response.

- **lang** (`optional: string`): Language of the response. The default is `en`. Supported languages include: `ru`, `de`, `ja`, `fr`, `cn`, `es`, `cs`, `it`, `fa`, `ko`. Translations are only supported on paid accounts. 

- **includeHostname** (`optional:  boolean`): Includes hostname lookup from the IPGeolocation's IP-Hostname database (Paid feature).

- **includeLiveHostname** (`optional:  boolean`): Enables live hostname lookup (Paid feature).

- **includeHostnameFallbackLive** (`optional:  boolean`): Combines hostname lookup from the IP-Hostname database and live sources if no hostname is found in the IPGeolocation database (Paid feature).

- **includeSecurity** (`optional:  boolean`): Adds IP-Security information to the response (Paid feature).

- **includeUserAgent** (`optional:  boolean`): Includes information about the client’s user agent (Paid feature).

- **saveToSessionStorage** (`optional:  boolean`): Saves geolocation data to session storage for temporary use.

- **saveToLocalStorage** (`optional:  boolean`): Saves geolocation data to local storage for long-term use.

- **ttl** (`optional`): Valid for only saving data to local storage. Time-to-live for data stored in local storage, specified in hours (e.g., `3` for 3 hours). The default is 24 hours.

Please note that only one of these three options (`includeHostname`, `includeLiveHostname`, or `includeHostnameFallbackLive`) should be passed at a time. Depending on your requirements, you can use either or both storage options to `cache` the response.

## Example Code

To access this service, add the following Javascript call (usually within the <head> block of your pages). Note: this service will only work when embedded in web pages - no server-side calls will work.

```html
<script
  language="JavaScript"
  src="https://static.ipgeolocation.io/ipgeolocation-api-plugin.js"
  type="text/javascript"
></script>
```

### Example 1: No field is passed or only apiKey is passed
```javascript
<script>
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
    });

    // fetch the geolocation infromation from the API and use it as you want
    const resp = await ipGeoAPI.getGeolocation();

    // sample response
    {
        "ip": "8.8.8.8",
        "hostname": "dns.google",
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
        "calling_code": "+1",
        "country_tld": ".us",
        "languages": "en-US,es-US,haw,fr",
        "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
        "geoname_id": "6301403",
        "isp": "Google LLC",
        "connection_type": "",
        "organization": "Google LLC",
        "country_emoji": "🇺🇸",
        "asn": "AS15169",
        "currency": {
            "code": "USD",
            "name": "US Dollar",
            "symbol": "$"
        },
        "time_zone": {
            "name": "America/Los_Angeles",
            "offset": -8,
            "offset_with_dst": -7,
            "current_time": "2024-09-19 00:19:04.376-0700",
            "current_time_unix": 1726730344.376,
            "is_dst": true,
            "dst_savings": 1,
            "dst_exists": true,
            "dst_start": {
            "utc_time": "2024-03-10 TIME 10",
            "duration": "+1H",
            "gap": true,
            "dateTimeAfter": "2024-03-10 TIME 03",
            "dateTimeBefore": "2024-03-10 TIME 02",
            "overlap": false
            },
            "dst_end": {
            "utc_time": "2024-11-03 TIME 09",
            "duration": "-1H",
            "gap": false,
            "dateTimeAfter": "2024-11-03 TIME 01",
            "dateTimeBefore": "2024-11-03 TIME 02",
            "overlap": true
            }
        }
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



</scritp>
```

### Example  2: Get Only the required fields
You can filter the API response by specifying names of the fields that you want instead of getting the full response. Here are a few examples to get only the required fields:
``` javascript
<script>

// to get the geolocation information only

    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "geo",
    });
    const resp = await ipGeoAPI.getGeolocation();

    //sample response
    {
        "ip": "8.8.8.8",
        "continent_code": "NA",
        "continent_name": "North America",
        "country_code2": "US",
        "country_code3": "USA",
        "country_name": "United States",
        "country_name_official": "United States of America",
        "state_prov": "California",
        "state_code": "US-CA",
        "district": "Santa Clara",
        "city": "Mountain View",
        "zipcode": "94043-1351",
        "latitude": "37.42240",
        "longitude": "-122.08421",
        "is_eu": false
    }


    // you can also specify multiple fields separated by comma, for example to get the country and city information only

        const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "country_name, city",
    });
    const resp = await ipGeoAPI.getGeolocation();

    // sample response
    {
        "ip": "8.8.8.8",
        "country_name": "United States",
        "city": "Mountain View"
    }
    
    // to get geolocation, currency and timzone information

        const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "geo,currency,time_zone",
    });

    // fetch the geolocation infromation from the API and use it as you want
    const resp = await ipGeoAPI.getGeolocation();

    // sample response
        {
            "ip": "8.8.8.8",
            "continent_code": "NA",
            "continent_name": "North America",
            "country_code2": "US",
            "country_code3": "USA",
            "country_name": "United States",
            "country_name_official": "United States of America",
            "state_prov": "California",
            "state_code": "US-CA",
            "district": "Santa Clara",
            "city": "Mountain View",
            "zipcode": "94043-1351",
            "latitude": "37.42240",
            "longitude": "-122.08421",
            "is_eu": false

        "currency": {
            "code": "USD",
            "name": "US Dollar",
            "symbol": "$"
        },
        "time_zone": {
            "name": "America/Los_Angeles",
            "offset": -8,
            "offset_with_dst": -7,
            "current_time": "2024-09-19 00:19:04.376-0700",
            "current_time_unix": 1726730344.376,
            "is_dst": true,
            "dst_savings": 1,
            "dst_exists": true,
            "dst_start": {
            "utc_time": "2024-03-10 TIME 10",
            "duration": "+1H",
            "gap": true,
            "dateTimeAfter": "2024-03-10 TIME 03",
            "dateTimeBefore": "2024-03-10 TIME 02",
            "overlap": false
            },
            "dst_end": {
            "utc_time": "2024-11-03 TIME 09",
            "duration": "-1H",
            "gap": false,
            "dateTimeAfter": "2024-11-03 TIME 01",
            "dateTimeBefore": "2024-11-03 TIME 02",
            "overlap": true
            }
        }
    }
</script>
```
### Example 3: Remove the Unnecessary Fields
you can also filter the API response by specifying the names of fields (except IP address) that you want to remove from the API response. Here are a few examples to exclude the unnecessary fields
``` javascript
<script>
    // Exclude Continent Code, Currency and, Time zone Objects
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        excludes: "continent_code,currency,time_zone",
    });
    const resp = await ipGeoAPI.getGeolocation();
    //sample response
    {
        "ip": "8.8.8.8",
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
        "calling_code": "+1",
        "country_tld": ".us",
        "languages": "en-US,es-US,haw,fr",
        "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
        "geoname_id": "6301403",
        "isp": "Google LLC",
        "connection_type": "",
        "organization": "Google LLC",
        "country_emoji": "🇺🇸",
        "asn": "AS15169"
    }

    // Get the Geo Field and Exclude Continent Information
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "geo",
        excludes: "continent_code,continent_name",
    });
    const resp = await ipGeoAPI.getGeolocation();
    //sample response

    {
        "ip": "8.8.8.8",
        "country_code2": "US",
        "country_code3": "USA",
        "country_name": "United States",
        "country_name_official": "United States of America",
        "state_prov": "California",
        "state_code": "US-CA",
        "district": "Santa Clara",
        "city": "Mountain View",
        "zipcode": "94043-1351",
        "latitude": "37.42240",
        "longitude": "-122.08421"
    }


</script>
```
### Example 4: IP-Security Information for an IP Address
IP Geolocation API also provides `IP-Security` information on all the `paid subscriptions`, but doesn't respond it by default. To get `IP-Security` information along with the geolocation information, you must pass the `include:security` while initializing the `IPGeolocationAPI`.
```javascript
<script>
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "geo",
        excludes: "continent_code,continent_name",
        include: "security"
    });
    const resp = await ipGeoAPI.getGeolocation();
    //sample response
    {
        "ip": "8.8.8.8",
        "country_code2": "US",
        "country_code3": "USA",
        "country_name": "United States",
        "country_name_official": "United States of America",
        "state_prov": "California",
        "state_code": "US-CA",
        "district": "Santa Clara",
        "city": "Mountain View",
        "zipcode": "94043-1351",
        "latitude": "37.42240",
        "longitude": "-122.08421",
        "is_eu": false,
        "security": {
            "threat_score": 80,
            "is_tor": false,
            "is_proxy": true,
            "proxy_type": "VPN",
            "is_anonymous": true,
            "is_known_attacker": true,
            "is_spam": false,
            "is_bot": false,
            "is_cloud_provider": true
        }
    }
</script>
```

### Example 5: Hostname Lookup for an IP Address
IPGeolocation API also provide `hostname` lookup for an IP address on all the `paid subscriptions`, but doesn't respond it by default. To get the `hostname` for an IP address, you can pass one of the three values `hostname`, `liveHostname`, `hostnameFallbackLive` as shown below.

```javascript 
<script>

    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "geo",
        excludes: "continent_code,continent_name",
        include: "liveHostname"
    });
    const resp = await ipGeoAPI.getGeolocation();
    //sample response
    {
        "ip": "8.8.8.8",
        "hostname": "dns.google",
        "country_code2": "US",
        "country_code3": "USA",
        "country_name": "United States",
        "country_name_official": "United States of America",
        "state_prov": "California",
        "state_code": "US-CA",
        "district": "Santa Clara",
        "city": "Mountain View",
        "zipcode": "94043-1351",
        "latitude": "37.42240",
        "longitude": "-122.08421",
        "is_eu": false
    }
</script>

```

### Example : User-Agent Information for a Device
IP Geolocation API also provides `User-Agent` information on all the `paid subscriptions`, but doesn't respond it by default. To get `User-Agent` information along with the geolocation information, you must pass the `include:useragent` while initializing the `IPGeolocationAPI`.
```javascript 
<script>

    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "geo",
        excludes: "continent_code,continent_name",
        include: "useragent"
    });
    const resp = await ipGeoAPI.getGeolocation();
    //sample response
    {
        "ip": "8.8.8.8",
        "country_code2": "US",
        "country_code3": "USA",
        "country_name": "United States",
        "country_name_official": "United States of America",
        "state_prov": "California",
        "state_code": "US-CA",
        "district": "Santa Clara",
        "city": "Mountain View",
        "zipcode": "94043-1351",
        "latitude": "37.42240",
        "longitude": "-122.08421",
        "is_eu": false,
        "user_agent": {
            "userAgentString": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
            "name": "Chrome",
            "type": "Browser",
            "version": "128",
            "versionMajor": "128",
            "device": {
            "name": "Linux Desktop",
            "type": "Desktop",
            "brand": "Unknown",
            "cpu": "Intel x86_64"
            },
            "engine": {
            "name": "Blink",
            "type": "Browser",
            "version": "128",
            "versionMajor": "128"
            },
            "operatingSystem": {
            "name": "Linux",
            "type": "Desktop",
            "version": "??",
            "versionMajor": "??"
            }
        }
    }
</script>

```
## Error Handling

Inspect the `status` field in the response to detect any errors. A missing `status` field typically indicates a successful request, while its presence signals an issue. For example, if you are using developer plan and are trying to query the security information for an ipAddress, you will encounter an error as shown below:

```html
<script>
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        includeSecurity : true,
        });

    const resp = await ipGeoAPI.getGeolocation();
      //sample error response
  {
    error_message: "IP-hostname lookup, IP-security lookup and user-agent parsing are not supported on your free subscription. These features are available to all paid subscriptions only"
    error_status: 401
  }

  if (!resp.error_message) {
      console.log(resp);
  } else {
      console.log("Something went wrong while fetching data", resp);
  }
</script>
```

More information about error codes and messages can be found in the [error codes section](https://ipgeolocation.io/ip-location-api.html#error-codes) of our documentation. For detailed API documentation and additional features, refer to the official [IPGeolocation API documentation](https://ipgeolocation.io/documentation.html).