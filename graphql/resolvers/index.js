const Properties = require('./properties');
const Users = require('./users');

const resolvers = {
  Query: {
    ...Properties.queries,
    ...Users.queries,
  }
};

module.exports = resolvers;