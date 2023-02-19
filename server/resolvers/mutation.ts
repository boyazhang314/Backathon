import { MutationResolvers } from '../../types/graphql';
import { updateHacker } from '../datasources/update';

const mutations: MutationResolvers = {
    updateHacker: (_, { id, data }) => updateHacker(
        id, data
    ).then((response) => {
        return response;
    })
}

export default mutations;
