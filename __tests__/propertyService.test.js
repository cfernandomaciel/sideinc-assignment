const axios = require('axios');
const propertyService = require('../controllers/propertyService');
const {
  UT_AUTH, 
  UT_URL, 
  UT_200_VALUE,
  UT_RETURN_OK_VALUE,
} = require('./__mocks__/testHelpers');

jest.mock('axios');

describe('PropertyService Controller Tests', () => {
  test('should throw', async () => {
    await expect(propertyService.getPropertyByCity(null)).rejects.toThrow();
  });

  test('should Return Listing', async () => {
    process.env.SIMPLY_RETS_API = UT_URL;
    process.env.SIMPLY_RETS_BASIC_AUTH = UT_AUTH;

    axios.mockResolvedValueOnce(UT_200_VALUE);

    const result = await propertyService.getPropertyByCity('Nashua');

    expect(result).toStrictEqual(UT_RETURN_OK_VALUE);
  });
});
