import sqlite3 from 'sqlite3';

import {
    Hacker,
    Skill,
    SkillAggregate,
    Event,
} from '../../types/graphql';

import {
    GET_ALL_HACKERS,
    GET_HACKER,
    GET_HACKER_SKILLS,
    GET_SKILL_AGGREGATE,
    GET_SKILLS_AGGREGATE,
    GET_SKILL_HACKERS,
    GET_EVENTS,
    GET_HACKER_EVENTS,
    GET_EVENT_HACKERS,
} from '../constants/sql';

export const getAllHackers = (
    skill: string | null | undefined,
    rating: number | null | undefined
) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<Hacker[]>((resolve, reject) => {
        db.all(
            GET_ALL_HACKERS,
            [skill, rating],
            async (err, rows) => {
                if (err) return reject(err);

                let hackers: Hacker[] = [];
                for (let row of rows) {
                    const skills = await getHackerSkills(row.hackerId);
                    const events = await getHackerEvents(row.hackerId);

                    hackers.push({
                        id: row.hackerId,
                        name: row.name,
                        email: row.email,
                        phone: row.phone,
                        company: row.company,
                        registered: row.registered,
                        skills: skills,
                        attended: events
                    })
                }
                db.close();
                return resolve(hackers);
            }
        )
    })
}

export const getHacker = (id: number) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<Hacker>((resolve, reject) => {
        db.all(
            GET_HACKER,
            [id],
            async (err, rows) => {
                if (err) return reject(err);
                if (rows.length !== 1) return reject('No hacker found')

                const skills = await getHackerSkills(rows[0].id);
                const events = await getHackerEvents(rows[0].id);
                let hacker: Hacker = {
                    id: rows[0].id,
                    name: rows[0].name,
                    email: rows[0].email,
                    phone: rows[0].phone,
                    company: rows[0].company,
                    registered: rows[0].registered,
                    skills: skills,
                    attended: events
                };

                db.close();
                return resolve(hacker);
            }
        )
    })
}

export const getHackerSkills = (hackerId: number) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<Skill[]>((resolve, reject) => {
        db.all(
            GET_HACKER_SKILLS,
            [hackerId],
            (err, rows) => {
                if (err) return reject(err);

                let skills: Skill[] = [];
                rows.forEach((row) => {
                    skills.push({
                        id: row.id,
                        skill: row.skill,
                        rating: row.rating,
                        hackerId: row.hackerId
                    })
                });
                db.close();
                return resolve(skills);
            }
        )
    })
}

export const getHackerEvents = (hackerId: number) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<Event[]>((resolve, reject) => {
        db.all(
            GET_HACKER_EVENTS,
            [hackerId],
            (err, rows) => {
                if (err) return reject(err);

                let events: Event[] = [];
                rows.forEach((row) => {
                    events.push({
                        id: row.eventId,
                        event: row.event
                    })
                });

                db.close();
                return resolve(events);
            }
        )
    })
}

export const getSkillHackers = (skill: string) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<Hacker[]>((resolve, reject) => {
        db.all(
            GET_SKILL_HACKERS,
            [skill],
            (err, rows) => {
                if (err) return reject(err);

                let hackers: Hacker[] = [];
                for (let row of rows) {

                    hackers.push({
                        id: row.hackerId,
                        name: row.name,
                        email: row.email,
                        phone: row.phone,
                        company: row.company,
                        registered: row.registered,
                    })
                }
                db.close();
                return resolve(hackers);
            }
        )
    })
}

export const getSkills = (
    min: number | null | undefined,
    max: number | null | undefined
) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<SkillAggregate[]>((resolve, reject) => {
        db.all(
            GET_SKILLS_AGGREGATE,
            [min, max],
            async (err, rows) => {
                if (err) return reject(err);

                let skillsAggregate: SkillAggregate[] = [];
                for (let row of rows) {
                    const hackers = await getSkillHackers(row.skill);

                    skillsAggregate.push({
                        skill: row.skill,
                        count: row.count,
                        hackers: hackers
                    })
                }

                db.close();
                return resolve(skillsAggregate);
            }
        )
    })
}

export const getSkill = (id: number) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<SkillAggregate>((resolve, reject) => {
        db.all(
            GET_SKILL_AGGREGATE,
            [id],
            async (err, rows) => {
                if (err) return reject(err);
                if (rows.length !== 1) return reject('No hacker found')

                const hackers = await getSkillHackers(rows[0].skill);
                let skillAggregate: SkillAggregate = {
                    skill: rows[0].skill,
                    count: 1,
                    hackers: hackers
                };

                db.close();
                return resolve(skillAggregate);
            }
        )
    })
}

export const getEvents = () => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<Event[]>((resolve, reject) => {
        db.all(
            GET_EVENTS,
            [],
            async (err, rows) => {
                if (err) return reject(err);

                let events: Event[] = [];
                for (let row of rows) {
                    const hackers = await getEventHackers(row.id);
                    
                    events.push({
                        id: row.id,
                        event: row.event,
                        attendees: hackers
                    })
                }
                db.close();
                return resolve(events);
            }
        )
    })
}

export const getEventHackers = (eventId: number) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<Hacker[]>((resolve, reject) => {
        db.all(
            GET_EVENT_HACKERS,
            [eventId],
            (err, rows) => {
                if (err) return reject(err);

                let hackers: Hacker[] = [];
                for (let row of rows) {
                    hackers.push({
                        id: row.hackerId,
                        name: row.name,
                        email: row.email,
                        phone: row.phone,
                        company: row.company,
                        registered: row.registered,
                    })
                }
                db.close();
                return resolve(hackers);
            }
        )
    })
}
