import { readFileSync } from 'fs';
import { ApolloServer } from '@apollo/server';

import resolvers from '../resolvers/resolvers';
const typeDefs = readFileSync('./types/schema.graphql', { encoding: 'utf-8' });

interface Context {}

export const testServer = new ApolloServer<Context>({ typeDefs, resolvers });

jest.setTimeout(20000);

it('Server should be up', async () => {
    const response = await testServer.executeOperation({
        query: `
            query Query {
                hackers {
                    id
                }
            }
        `
    })

    expect(response.body.kind === "single");
    if (response.body.kind === "single") {
        expect(response.body.singleResult.errors).toBeUndefined();
    }
});
