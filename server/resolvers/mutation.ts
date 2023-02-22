import { MutationResolvers } from '../../types/graphql';
import { updateHacker, registerHacker, eventAttended } from '../datasources/update';

const mutations: MutationResolvers = {
    updateHacker: (_, { id, data }) => updateHacker(
        id, data
    ).then((response) => {
        return response;
    }),

    registerHacker: (_, { id }) => registerHacker(id).then((response) => {
        return response;
    }),

    eventAttended: (_, { hackerId, eventId }) => eventAttended(hackerId, eventId).then((response) => {
        return response
    })
}

export default mutations;
