const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

/**
 * Generates one JWT for usage in the system
 * @returns JWT string
 */
const generateToken = () => {
  const { JWT_SECRET, JWT_USER } = process.env;
  const jwtExpiresIn = 60 * 60; // seconds
  return jwt.sign(
    {
      sub: JWT_USER,
    },
    JWT_SECRET,
    { expiresIn: jwtExpiresIn },
  );
};

/**
 * Validates the JWT against the given secret it's been signed
 * @param { string } jwtToken
 * @param { string } secret
 * @returns the opened token details or throws
 */
const verifyTokenOrThrow = (jwtToken, secret) => {
  try {
    const tokenDetails = jwt.verify(jwtToken, secret);
    return tokenDetails;
  } catch (error) {
    throw new AuthenticationError('Invalid/Expired token');
  }
};

/**
 * Checks the incoming jwt
 * @param { string } jwtToken 
 * @returns the decoded jwt
 */
const assertJWT = (jwtToken) => {
  const { JWT_SECRET } = process.env;
  const [, token] = jwtToken.split(' ');
  const decodedToken = verifyTokenOrThrow(token, JWT_SECRET);
  return decodedToken;
};

module.exports.assertJWT = assertJWT;
module.exports.generateToken = generateToken;
