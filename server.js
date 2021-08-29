const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3500;


async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
          console.log(`API server running on port ${PORT}!`);
          // log where we can go to test our GQL API
          console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
}

startApolloServer(typeDefs, resolvers);