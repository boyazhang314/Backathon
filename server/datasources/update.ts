import sqlite3 from 'sqlite3';

import { insertSkill } from './insert';

import {
    Hacker,
    SkillInput,
    HackerInput,
    UpdateHackerMutationResponse
} from '../../types/graphql';

import {
    UPDATE_HACKER,
    UPDATE_SKILL
} from '../constants/sql';

import { getHackerSkills } from './get';

export const updateHacker = (
    id: number,
    data: HackerInput
) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<UpdateHackerMutationResponse>((resolve, reject) => {
        db.all(
            UPDATE_HACKER,
            [
                data.name,
                data.email,
                data.phone,
                data.company,
                id
            ],
            async (err, rows) => {
                if (err) return reject({
                    code: '500',
                    success: false,
                    message: err.message
                });
                if (rows.length !== 1) return reject({
                    code: '500',
                    success: false,
                    message: 'No hacker found'
                });
                
                if (data.skills)
                    for (let skill of data.skills) {
                        if (skill) await updateSkill(id, skill).catch((err) => {
                            return reject(err);
                        });
                    }

                const skills = await getHackerSkills(id);
                let hacker: Hacker = {
                    id: rows[0].id,
                    name: rows[0].name,
                    email: rows[0].email,
                    phone: rows[0].phone,
                    company: rows[0].company,
                    skills: skills
                };

                db.close();
                return resolve({
                    code: '200',
                    success: true,
                    message: 'Successfully updated user',
                    hacker: hacker
                });
            }
        )
    })
}

export const updateSkill = (
    hackerId: number,
    data: SkillInput,
) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<SkillInput>((resolve, reject) => {
        db.all(
            UPDATE_SKILL,
            [
                data.rating,
                data.skill,
                hackerId
            ],
            async (err, rows) => {
                if (err) return reject(err);
                if (rows.length !== 1) {
                    // skill doesn't exist, so insert
                    insertSkill(hackerId, data).then((row) => {
                        return resolve({
                            skill: row.skill,
                            rating: row.rating,
                            hackerId: row.hackerId
                        })
                    })
                } else {
                    return resolve({
                        skill: rows[0].skill,
                        rating: rows[0].rating,
                        hackerId: rows[0].hackerId
                    })
                }
            }
        )
    })
}
