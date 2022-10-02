const fetch = require('../../utils/httpRequest');

/**
 * Client layer for SimplyRets API. Tailored to contain a properties request, for the assignment
 */
class SimplyRetsClient {
  constructor(baseUrl, authStr) {
    // here I'm just simulating that these infos could come through some 
    // external config, such as a DB, or defaults to an .env file 
    // deployed along with the server app.
    this.baseUrl = baseUrl || process.env.SIMPLY_RETS_API;
    this.authStr = authStr || process.env.SIMPLY_RETS_BASIC_AUTH;
  }

  /**
   * General simplyRets API Request authenticated method.
   * @param { method: string, route: string, queryStringArgs: string } args
   * @returns Listing
   */
  async request({ method, route, queryStringArgs }) {
    const headers = {
      Authorization: `Basic ${this.authStr}`,
    };

    const options = {
      baseUrl: `${this.baseUrl}/${route}`,
      method,
      headersOptions: headers,
      queryStringArgs
    };

    const response = await fetch.request(options);
    return {
      Listing: response,
    }
  }

  /**
   * Receives a city name, and calls /Properties route
   * @param { string } cityName 
   * @returns Listing
   */
  async getProperties(cityName) {
    const searchEntity = 'properties';
    const requestOptions = {
      method: 'GET',
      route: searchEntity,
      queryStringArgs: cityName,
    };

    return await this.request(requestOptions);
  }
}

module.exports = SimplyRetsClient;