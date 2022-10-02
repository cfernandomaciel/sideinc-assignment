require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { internalMethods: Users } = require('./graphql/resolvers/users');
const { typeDefs, resolvers } = require('./graphql');

const { PORT = 4000 } = process.env;

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = Users.getUserByToken(token);

    return { user }
  }
});

(async () => {
  const serverPath = `http://localhost:${PORT}/graphql`;
  await server.start();
  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.status(200).send(`go to ${serverPath}`);
  });

  app.listen({ port: 4000 }, () =>
    console.log(`Listening on ${serverPath}`)
  );
})();
