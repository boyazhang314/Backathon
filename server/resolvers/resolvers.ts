import { Resolvers } from '../../types/graphql';
import queries from './queries';
import mutations from './mutation';

const resolvers: Resolvers = {
    Query: queries,
    Mutation: mutations,
};

export default resolvers;
