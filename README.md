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

- **lang** (`optional: string`): Language of the response. The default is `en`. Supported languages include: `ru`, `de`, `ja`, `fr`, `cn`, `es`, `cs`, `it`, `fa`, `ko`, `pt`. Translations are only supported on paid accounts.

- **includeHostname** (`optional:  boolean`): Includes hostname lookup from the IPGeolocation's IP-Hostname database (Paid feature).

- **includeLiveHostname** (`optional:  boolean`): Enables live hostname lookup (Paid feature).

- **includeHostnameFallbackLive** (`optional:  boolean`): Combines hostname lookup from the IP-Hostname database and live sources if no hostname is found in the IPGeolocation database (Paid feature).

- **includeSecurity** (`optional:  boolean`): Adds IP-Security information to the response (Paid feature).

- **includeUserAgent** (`optional:  boolean`): Includes information about the client’s user agent (Paid feature).

- **includeTimeZone** (`optional:  boolean`): Includes information about the client’s IP time zone (Paid feature).

- **includeDMACode** (`optional:  boolean`): Includes information about the client’s IP DMA Code (Paid feature).

- **saveToSessionStorage** (`optional:  boolean`): Saves geolocation data to session storage for temporary use.

- **saveToLocalStorage** (`optional:  boolean`): Saves geolocation data to local storage for long-term use.

- **ttl** (`optional`): Valid for only saving data to local storage. Time-to-live for data stored in local storage, specified in hours (e.g., `3` for 3 hours). The default is 24 hours.

Please note that only one of these three options (`includeHostname`, `includeLiveHostname`, or `includeHostnameFallbackLive`) should be passed at a time. Depending on your requirements, you can use storage options to `cache` the response.

## Example Code

To access this service, add the following Javascript call (usually within the `<head>` block of your pages). Note: this service will only work when embedded in web pages - no server-side calls will work.

```html
<script
  language="JavaScript"
  src="https://static.ipgeolocation.io/ipgeolocation-api-plugin.v1.0.0.js"
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

    // sample response (Free API Subscription)
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
            "languages": ["en-US","es-US","haw","fr"]
        },
        "currency": {
            "code": "USD",
            "name": "US Dollar",
            "symbol": "$"
        }
    }

    // sample response (Standard API Subscription)
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
            "languages": ["en-US","es-US","haw","fr"]
        },
        "network": {
            "asn": {
                "as_number": "AS15169",
                "organization": "Google LLC",
                "country": "US"
            },
            "company": {
                "name": "Google LLC"
            }
        },
        "currency": {
            "code": "USD",
            "name": "US Dollar",
            "symbol": "$"
        },
        "time_zone": {
            "name": "America/Los_Angeles",
            "offset": -8,
            "offset_with_dst": -7,
            "current_time": "2025-04-22 06:19:40.951-0700",
            "current_time_unix": 1745327980.951,
            "is_dst": true,
            "dst_savings": 1,
            "dst_exists": true,
            "dst_start": {
                "utc_time": "2025-03-09 TIME 10",
                "duration": "+1H",
                "gap": true,
                "date_time_after": "2025-03-09 TIME 03",
                "date_time_before": "2025-03-09 TIME 02",
                "overlap": false
            },
            "dst_end": {
                "utc_time": "2025-11-02 TIME 09",
                "duration": "-1H",
                "gap": false,
                "date_time_after": "2025-11-02 TIME 01",
                "date_time_before": "2025-11-02 TIME 02",
                "overlap": true
            }
        },
        "user_agent": {
            "user_agent_string": "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9",
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

    // sample response (Advanced API Subscription)
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
            "locality": "Mountain View",
            "accuracy_radius": "",
            "dma_code": "807",
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
            "languages": ["en-US","es-US","haw","fr"]
        },
        "network": {
            "asn": {
                "as_number": "AS15169",
                "organization": "Google LLC",
                "country": "US",
                "asn_name": "GOOGLE",
                "type": "isp",
                "domain": "about.google",
                "date_allocated": "",
                "allocation_status": "Assigned",
                "num_of_ipv4_routes": "1099",
                "num_of_ipv6_routes": "107",
                "rir": "ARIN"
            },
            "connection_type": "wired",
            "company": {
                "name": "Google LLC",
                "type": "hosting",
                "domain": "google.com"
            }
        },
        "currency": {
            "code": "USD",
            "name": "US Dollar",
            "symbol": "$"
        },
        "security": {
            "threat_score": 80,
            "is_tor": false,
            "is_proxy": true,
            "proxy_type": "VPN",
            "proxy_provider": "",
            "is_anonymous": true,
            "is_known_attacker": true,
            "is_spam": false,
            "is_bot": false,
            "is_cloud_provider": false,
            "cloud_provider": ""
        },
        "abuse": {
            "route": "8.8.8.0/24",
            "country": "US",
            "handle": "ABUSE5250-ARIN",
            "name": "Abuse",
            "organization": "Abuse",
            "role": "abuse",
            "kind": "group",
            "address": "1600 Amphitheatre Parkway\nMountain View\nCA\n94043\nUnited States",
            "emails": ["network-abuse@google.com"],
            "phone_numbers": ["+1-650-253-0000"]
        },
        "time_zone": {
            "name": "America/Los_Angeles",
            "offset": -8,
            "offset_with_dst": -7,
            "current_time": "2025-04-22 04:56:55.430-0700",
            "current_time_unix": 1745323015.43,
            "is_dst": true,
            "dst_savings": 1,
            "dst_exists": true,
            "dst_start": {
                "utc_time": "2025-03-09 TIME 10",
                "duration": "+1H",
                "gap": true,
                "date_time_after": "2025-03-09 TIME 03",
                "date_time_before": "2025-03-09 TIME 02",
                "overlap": false
            },
            "dst_end": {
                "utc_time": "2025-11-02 TIME 09",
                "duration": "-1H",
                "gap": false,
                "date_time_after": "2025-11-02 TIME 01",
                "date_time_before": "2025-11-02 TIME 02",
                "overlap": true
            }
        },
        "user_agent": {
            "user_agent_string": "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9",
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

   </scritp>
```

### Example 2: Get Only the required fields

You can filter the API response by specifying names of the fields that you want instead of getting the full response. Here are a few examples to get only the required fields:

```javascript
<script>

// to get the geolocation information only

    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location",
    });
    const resp = await ipGeoAPI.getGeolocation();

    // sample response (Free/Standard API Subscription)
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

    //sample response (Advanced API Subscription)
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
            "locality": "South Brisbane",
            "accuracy_radius": "",
            "zipcode": "4101",
            "latitude": "-27.47306",
            "longitude": "153.01421",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/au_64.png",
            "geoname_id": "10113228",
            "country_emoji": "🇦🇺"
        }
    }

    // you can also specify multiple fields separated by comma, for example to get the country and city information only

        const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location.country_name,location.city",
    });
    const resp = await ipGeoAPI.getGeolocation();

    // sample response
    {
        "ip": "1.1.1.1",
        "location": {
            "country_name": "Australia",
            "city": "South Brisbane"
        }
    }

    // to get geolocation and currency information

        const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location,currency",
    });

    // fetch the geolocation infromation from the API and use it as you want
    const resp = await ipGeoAPI.getGeolocation();

    // sample response (Free/Standard API Subscription)
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

    // sample response (Advanced API Subscription)
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
            "locality": "Mountain View",
            "accuracy_radius": "",
            "dma_code": "807",
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
</script>
```

### Example 3: Remove the Unnecessary Fields

you can also filter the API response by specifying the names of fields (except IP address) that you want to remove from the API response. Here are a few examples to exclude the unnecessary fields

```javascript
<script>
    // Exclude Continent Code, Currency and, network Objects
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        excludes: "location.continent_code,currency,network",
    });
    const resp = await ipGeoAPI.getGeolocation();

    //sample response (Free/Standard API Subscription)
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
            "languages": ["en-US","es-US","haw","fr"]
        }
    }

    // sample response (Advanced API Subscription)
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
            "locality": "Mountain View",
            "accuracy_radius": "",
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
            "languages": [ "en-US", "es-US", "haw", "fr"]
        }
    }

    // Get the location Fields and Exclude Continent Information
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location",
        excludes: "location.continent_code,location.continent_name",
    });
    const resp = await ipGeoAPI.getGeolocation();
   //sample response (Free/Standard API Subscription)
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

    // sample response (Advanced API Subscription)
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
            "locality": "Mountain View",
            "accuracy_radius": "",
            "zipcode": "94043-1351",
            "latitude": "37.42240",
            "longitude": "-122.08421",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
            "geoname_id": "6301403",
            "country_emoji": "🇺🇸"
        }
    }


</script>
```

### Example 4: IP-Security Information for an IP Address

`IP-Security` information is only available in `Advanced API Subscriptions`, but doesn't respond it by default. To get `IP-Security` information along with the geolocation information, you must pass the `includeSecurity: true` while initializing the `IPGeolocationAPI`.

```javascript
<script>
    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location",
        excludes: "location.continent_code,location.continent_name",
        includeSecurity: true
    });
    const resp = await ipGeoAPI.getGeolocation();
    // sample response (Advanced API Subscription)

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
            "locality": "Mountain View",
            "accuracy_radius": "",
            "zipcode": "94043-1351",
            "latitude": "37.42240",
            "longitude": "-122.08421",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
            "geoname_id": "6301403",
            "country_emoji": "🇺🇸"
        },
        "security": {
            "threat_score": 80,
            "is_tor": false,
            "is_proxy": true,
            "proxy_type": "VPN",
            "proxy_provider": "",
            "is_anonymous": true,
            "is_known_attacker": true,
            "is_spam": false,
            "is_bot": false,
            "is_cloud_provider": false,
            "cloud_provider": ""
        }
    }

</script>
```

### Example 5: Hostname Lookup for an IP Address

IPGeolocation API also provide `hostname` lookup for an IP address on all the `paid subscriptions`, but doesn't respond it by default. To get the `hostname` for an IP address, you can pass one of the three values `includeHostname:true`, `includeLiveHostname:true`, `includeHostnameFallbackLive:true` while initializing the `IPGeolocationAPI`.

```javascript
<script>

    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location",
        excludes: "location.continent_code,location.continent_name",
        includeLiveHostname: true
    });
    const resp = await ipGeoAPI.getGeolocation();
    //sample response (Standard API Subscription)

    {
        "ip": "8.8.8.8",
        "hostname": "dns.google",
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

    // sample response (Advanced API Subscription)

    {
        "ip": "8.8.8.8",
        "hostname": "dns.google",
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
            "locality": "Mountain View",
            "accuracy_radius": "",
            "zipcode": "94043-1351",
            "latitude": "37.42240",
            "longitude": "-122.08421",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
            "geoname_id": "6301403",
            "country_emoji": "🇺🇸"
        }
    }
</script>

```

### Example 6 : User-Agent Information for a Device

IP Geolocation API also provides `User-Agent` information on all the `paid subscriptions`, but doesn't respond it by default. To get `User-Agent` information along with the geolocation information, you must pass the `includeUserAgent: true` while initializing the `IPGeolocationAPI`.

```javascript
<script>

    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location.country_code2,location.city",
        includeUserAgent: true
    });
    const resp = await ipGeoAPI.getGeolocation();
    //sample response (Standard/Advanced API Subscription)
    {
        "ip": "8.8.8.8",
        "location": {
            "city": "Mountain View",
            "country_code2": "US"
        },
        "user_agent": {
            "user_agent_string": "PostmanRuntime/7.43.3",
            "name": "PostmanRuntime",
            "type": "Robot",
            "version": "7.43.3",
            "version_major": "7",
            "device": {
                "name": "Postman Runtime",
                "type": "Robot",
                "brand": "Postman",
                "cpu": "Unknown"
            },
            "engine": {
                "name": "PostmanRuntime",
                "type": "Robot",
                "version": "7.43.3",
                "version_major": "7"
            },
            "operating_system": {
                "name": "Cloud",
                "type": "Cloud",
                "version": "??",
                "version_major": "??",
                "build": "??"
            }
        }
    }
</script>

```

### Example 7 : DMA Information for an IP Address

If you want to get `DMA (Designated Market Area)` code, which is specifically used in the US for marketing and regional targeting, you can get through the IP Geolocation API on `Advanced API subscription`. To get `DMA Code` information along with the geolocation information, you must pass the `includeDma:true` while initializing the `IPGeolocationAPI`.

```javascript
<script>

    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location",
        includeDma: true
    });
    const resp = await ipGeoAPI.getGeolocation();
    //sample response (Advanced API API Subscription)
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
            "locality": "Mountain View",
            "accuracy_radius": "",
            "dma_code": "807",
            "zipcode": "94043-1351",
            "latitude": "37.42240",
            "longitude": "-122.08421",
            "is_eu": false,
            "country_flag": "https://ipgeolocation.io/static/flags/us_64.png",
            "geoname_id": "6301403",
            "country_emoji": "🇺🇸"
        }
    }
</script>

```

### Example 8 : Abuse Contact Information for an IP Address

IP Geolocation API can also provide `abuse contact` information of an IP address on `Advanced API subscription`, but doesn't respond it by default. To get `abuse contact` information along with the geolocation information, you must pass the `includeAbuse:true` while initializing the `IPGeolocationAPI`.

```javascript
<script>

    const ipGeoAPI = new IPGeolocationAPI({
        apiKey: "YOUR_API_KEY",
        fields: "location.city,location.country_name",
        includeAbuse:true
    });
    const resp = await ipGeoAPI.getGeolocation();
    //sample response (Advanced API Subscription)
    {
        "ip": "1.2.3.4",
        "location": {
            "city": "Brisbane",
            "country_name": "Australia"
        },
        "abuse": {
            "route": "1.2.3.0/24",
            "country": "AU",
            "handle": "IRT-APNICRANDNET-AU",
            "name": "IRT-APNICRANDNET-AU",
            "organization": "",
            "role": "abuse",
            "kind": "group",
            "address": "PO Box 3646\nSouth Brisbane, QLD 4101\nAustralia",
            "emails": ["helpdesk@apnic.net"],
            "phone_numbers": ["+61-7-3858-3188","+61-7-3858-3199"]
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
