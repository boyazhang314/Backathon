import sqlite3 from 'sqlite3';

import {
    Hacker,
    Skill,
    SkillAggregate,
} from '../../types/graphql';

import {
    GET_ALL_HACKERS,
    GET_HACKER,
    GET_SKILLS,
    GET_SKILLS_AGGREGATE,
} from '../constants/sql';

export const getAllHackers = () => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<Hacker[]>((resolve, reject) => {
        db.all(
            GET_ALL_HACKERS,
            [],
            async (err, rows) => {
                if (err) return reject(err);

                let hackers: Hacker[] = [];
                for (let row of rows) {
                    const skills = await getHackerSkills(row.id);

                    hackers.push({
                        id: row.id,
                        name: row.name,
                        email: row.email,
                        phone: row.phone,
                        company: row.company,
                        skills: skills
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
                let hacker: Hacker = {
                    id: rows[0].id,
                    name: rows[0].name,
                    email: rows[0].email,
                    phone: rows[0].phone,
                    company: rows[0].company,
                    skills: skills
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
            GET_SKILLS,
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

export const getSkills = (
    min: number | null | undefined,
    max: number | null | undefined
) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<SkillAggregate[]>((resolve, reject) => {
        db.all(
            GET_SKILLS_AGGREGATE,
            [min, max],
            (err, rows) => {
                if (err) return reject(err);

                let skillsAggregate: SkillAggregate[] = [];
                rows.forEach((row) => {
                    skillsAggregate.push({
                        skill: row.skill,
                        count: row.count,
                    })
                });
                db.close();
                return resolve(skillsAggregate);
            }
        )
    })
}
