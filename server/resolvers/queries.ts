import { QueryResolvers } from '../../types/graphql';
import { getAllHackers, getHacker, getSkills, getSkill, getEvents } from '../datasources/get';

const queries: QueryResolvers = {
    hackers: (_, { skill, rating }) => getAllHackers(skill, rating).then((hackers) => {
        return hackers;
    }),
    
    hacker: (_, { id }) => getHacker(id).then((hacker) => {
        return hacker;
    }),

    skills: (_, { min, max }) => getSkills(min, max).then((skills) => {
        return skills;
    }),

    skill: (_, { id }) => getSkill(id).then((skill) => {
        return skill;
    }),

    events: () => getEvents().then((events) => {
        return events;
    })
}

export default queries;
