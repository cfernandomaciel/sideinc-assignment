const { SimplyRetsClient } = require('../services/simplyRets');
module.exports.getPropertyByCity = async (cityName) => {
  if (!cityName) {
    throw new Error('City name must be provided');
  }

  /*
    The approach of using a client here, is just to give the
    idea that we could have more than one client. I.e.: in a scenario where
    this microservice gets to work with more than one API. 

    In this case it would call as many clients as existing/available
  */
  const client = new SimplyRetsClient();
  const { Listing } = await client.getProperties(cityName);
  return Listing;
}