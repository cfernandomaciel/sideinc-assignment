const auth = require('../../utils/auth');
const { AuthenticationError } = require('apollo-server');

const Users = {
  queries: {
    currentUser: (parent, args, context) => {
      return context.user;
    },
  },
  internalMethods: {
    /*
      This method will not be exposed to the graphQL, but will be available only for 
      context acquiring at index.js.
      
      Thus the reason it's not inside the `queries` container
    */
    getUserByToken: (jwtToken) => {
      if (!jwtToken) {
        throw new AuthenticationError('unauthorized: you must provide a header token');
      }
      const { sub, iat, exp } = auth.assertJWT(jwtToken);
      const { JWT_USER } = process.env;
      if (sub !== JWT_USER) {
        throw new AuthenticationError('unauthorized: user does not match');
      }
  
      return {
        email: sub,
        iat,
        expiration: exp,
      }
    },
  },
}

module.exports = Users;