import { QueryResolvers } from '../../types/graphql';
import { getAllHackers, getHacker, getSkills } from '../datasources/get';

const queries: QueryResolvers = {
    hackers: () => getAllHackers().then((hackers) => {
        return hackers;
    }),
    
    hacker: (_, { id }) => getHacker(id).then((hacker) => {
        return hacker;
    }),

    skills: (_, { min, max }) => getSkills(min, max).then((skills) => {
        return skills;
    })
}

export default queries;
