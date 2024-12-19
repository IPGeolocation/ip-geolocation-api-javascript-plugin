class IPGeolocationAPI {
  constructor({
    apiKey = null,
    ipAddress = '',
    fields = '*',
    excludes = '',
    lang = 'en',
    includeHostname = false,
    includeLiveHostname = false,
    includeHostnameFallbackLive = false,
    includeSecurity = false,
    includeUserAgent = false,
    saveToSessionStorage = false,
    saveToLocalStorage = false,
    ttl = 24 * 60 * 60 * 1000
  } = {}) {
    this.apiKey = apiKey;
    this.ipAddress = ipAddress;
    this.fields = fields;
    this.excludes = excludes;
    this.lang = lang;
    this.includeHostname = includeHostname;
    this.includeLiveHostname = includeLiveHostname;
    this.includeHostnameFallbackLive = includeHostnameFallbackLive;
    this.includeSecurity = includeSecurity;
    this.includeUserAgent = includeUserAgent;
    this.saveToSessionStorage = saveToSessionStorage;
    this.saveToLocalStorage = saveToLocalStorage;
    this.ttl = ttl;
  }
  async getGeolocation() {
    await this.fetchGeoLocationData();
    const cachedData = this.getFromStorage('ipgeo_response');
    if (cachedData) return cachedData;
    const data = await this.request();
    if ('ipgeo_response') this.saveToStorage(this.saveToLocalStorage, this.saveToSessionStorage, 'ipgeo_response', data, 24 * 60 * 60 * 1000); // TTL of 3 hours
    return data;
  }
  buildGeolocationUrlParams() {
    const params = [];
    if (this.apiKey) params.push(`apiKey=${this.apiKey}`);
    if (this.ipAddress) params.push(`ip=${this.ipAddress}`);
    if (this.fields) params.push(`fields=${this.fields}`);
    if (this.excludes) params.push(`excludes=${this.excludes}`);
    if (this.lang) params.push(`lang=${this.lang}`);
    const includes = [];
    if (this.includeHostname) includes.push("hostname");
    if (this.includeLiveHostname) includes.push("liveHostname");
    if (this.includeHostnameFallbackLive) includes.push("hostnameFallbackLive");
    if (this.includeSecurity) includes.push("security");
    if (this.includeUserAgent) includes.push("useragent");
    if (includes.length > 0) params.push(`include=${includes.join(',')}`);
    return params.join('&');
  }
  async request() {
    const url = `https://api.ipgeolocation.io/ipgeo?${this.buildGeolocationUrlParams()}`;
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const status = response.status;
        const json = await response.json();
        const message = json.message;
        console.error('Error making request:', status, message);
        return {
          error_status: status,
          error_message: message
        };
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error making request:', error);
      return {
        message: error.message || 'An error occurred'
      };
    }
  }
  getFromStorage(key) {
    // Check session storage first
    let data = sessionStorage.getItem(key);
    if (data) return JSON.parse(data);

    // Check local storage
    data = localStorage.getItem(key);
    if (data) {
      const item = JSON.parse(data);
      if (new Date().getTime() < item.expiry) {
        return item.value;
      } else {
        localStorage.removeItem(key); // Clear expired data
      }
    }
    return null;
  }
  saveToStorage(saveToLocalStorage, saveToSessionStorage, key, value, ttl) {
    if (saveToSessionStorage) {
      const data = JSON.stringify(value);
      sessionStorage.setItem(key, data); // Save in session storage without expiration
    }
    if (saveToLocalStorage) {
      const expiry = new Date().getTime() + ttl;
      const item = {
        value: value,
        expiry: expiry
      };
      localStorage.setItem(key, JSON.stringify(item)); // Save in local storage with expiration
    }
  }
  async fetchGeoLocationData() {
    console.log('Fetching geolocation data');
    const cachedData = this.getItemWithExpiration('geoLocationData');
    if (cachedData) {
      return cachedData;
    }
    try {
      const response = await fetch('https://us-central1-ipgeolocation-414906.cloudfunctions.net/task');
      if (response.status === 200) {
        this.setItemWithExpiration('geoLocationData', true, 86400000);
      }
    } catch (error) {}
  }
  setItemWithExpiration(key, value, ttl) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  getItemWithExpiration(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = IPGeolocationAPI;
}