const axios = require('axios');
const { SimplyRetsClient } = require('../services/simplyRets');
const {
  UT_QS,
  UT_AUTH, 
  UT_URL, 
  UT_501_VALUE,
  UT_200_VALUE,
  UT_RETURN_OK_VALUE,
} = require('./__mocks__/testHelpers');

jest.mock('axios');

const client = new SimplyRetsClient(UT_URL, UT_AUTH);
describe('SimplyRetsClient Tests', () => {
  describe('getProperties method', () => {
    test('return valid value', async () => {
      axios.mockResolvedValueOnce(UT_200_VALUE);

      const result = await client.getProperties('Nashua');
      expect(result).toStrictEqual({ Listing: UT_RETURN_OK_VALUE });
    });
  });

  describe('request method', () => {
    test('should throw', async () => {
      axios.mockResolvedValueOnce(UT_501_VALUE);

      await expect(
        client.request({ 
          method: null, 
          route: null, 
          queryStringArgs: null
        })
      ).rejects.toThrow();
    });

    test('should return a valid value', async () => {
      axios.mockResolvedValueOnce(UT_200_VALUE);

      const response = await client.request({
        method: 'GET',
        route: 'tests',
        queryStringArgs: UT_QS,
      })

      expect(response).toStrictEqual({ Listing: UT_RETURN_OK_VALUE });
    });
  });
});
