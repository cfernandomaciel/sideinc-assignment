const { PropertyService } = require('./../../controllers');
const auth = require('../../utils/auth');

const Properties = {
  queries: {
    getPropertyByCity: (parent, args, context) => {
      if (!context.user) {
        return null; 
      }
      const key = args.city;
      return PropertyService.getPropertyByCity(key);
    },
  },
  internalMethods: { },
};

module.exports = Properties;