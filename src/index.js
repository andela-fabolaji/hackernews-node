const path = require('path');
const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const typeDefs = path.resolve(__dirname, './schema.graphql');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');

require('dotenv').config();

const APP_SECRET = process.env.APP_SECRET;

// resolvers
const resolvers = {
  Query,
  Mutation,
  Link,
  User
};

// graphql context
const context = req => ({
  ...req,
  prisma,
  APP_SECRET
});

// server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context
});
server.start(info => console.log(`GraphQL Server started at http://localhost:${info.port}`));
