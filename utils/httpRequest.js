const axios = require('axios');

/**
 * Generalized Http Request, based in Axios, taylored to respond to http status 200
 * @param { 
 * { 
 *   baseUrl: string , 
 *   method: 'GET'| 'POST' | 'PUT' | 'DELETE', 
 *   headersOptions: headers,
 *   queryStringArgs: string
 * } } args
 * @returns Axios response.data
 */
module.exports.request = async ({ baseUrl, method, headersOptions, queryStringArgs = '' }) => {
  const generalErrorMsg = 'Server did not respond well.';
  try {
    if (!baseUrl) {
      throw new Error('Must provide baseUrl');
    }
    const qs = queryStringArgs ? `?${queryStringArgs}` : '';

    const options = {
      url: `${baseUrl}${qs}`,
      method,
      headers: {
        ...headersOptions,
      },
    };

    const response = await axios(options);

    // making it a little more curated for the sake of simplicity. 
    // no status 200, then no deal
    if (response.status === 200) {
      return response.data;
    }

    throw new Error(`${generalErrorMsg} Status: ${response.status}`);
  } catch (e) {
    throw e;
  }
}
