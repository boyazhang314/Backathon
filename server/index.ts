  /////////////////
 // MAIN SERVER //
/////////////////

import { readFileSync } from 'fs';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import resolvers from './resolvers/resolvers';

interface Context {}

const typeDefs = readFileSync('./types/schema.graphql', { encoding: 'utf-8' });

export const apolloServer = new ApolloServer<Context>({ typeDefs, resolvers });

startStandaloneServer(apolloServer, {
  listen: { port: 4000 },
  context: async () => {
    return {}
  }
}).then(({ url }) => {
  console.log(`GraphQL Server ready at: ${url}`);
});
