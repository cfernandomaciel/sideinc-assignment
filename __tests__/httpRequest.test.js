const axios = require('axios');
const fetch = require('../utils/httpRequest');
const {
  UT_QS,
  UT_AUTH, 
  UT_URL, 
  UT_200_VALUE,
} = require('./__mocks__/testHelpers');

jest.mock('axios');

describe('test http axios abstraction layer', () => {
  const UT_HEADERS = {
    Authorization: UT_AUTH,
  };

  const UT_REQUEST_OPTIONS = {
    baseUrl: UT_URL,
    headersOptions: UT_HEADERS,
    queryStringArgs: UT_QS,
  };

  describe('when API call is successful', () => {
    test.each([
      ['GET request', 'GET'],
      ['POST request', 'POST'],
      ['PUT request', 'PUT'],
      ['DELETE request', 'DELETE']
    ])('%p', async (testType, method) => {
      axios.mockResolvedValueOnce(UT_200_VALUE);

      UT_REQUEST_OPTIONS.method = method;

      const expectedOptions = {
        url: `${UT_URL}?${UT_QS}`,
        method,
        headers: {
          ...UT_REQUEST_OPTIONS.headersOptions,
        }
      };

      const response = await fetch.request(UT_REQUEST_OPTIONS);

      expect(axios).toHaveBeenCalledWith(expectedOptions);
      expect(response).toStrictEqual(UT_200_VALUE.data);
    });
  });

  describe('when API Call fails', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test.each([
      ['no base Url', null, 'GET', UT_HEADERS, UT_QS, 200, 'Must provide baseUrl'],
      ['status different than 200', UT_URL, 'GET', UT_HEADERS, UT_QS, 400, 'Server did not respond well. Status: 400'],
    ])('%p', async (testType, baseUrl, method, headersOptions, queryStringArgs, responseStatus, expectedValue) => {

      axios.mockResolvedValue({
        status: responseStatus,
        data: {}
      });

      await expect(
        fetch.request({
          baseUrl,
          method,
          headersOptions,
          queryStringArgs,
        })
      ).rejects.toThrow(expectedValue);
    });
  });
});
