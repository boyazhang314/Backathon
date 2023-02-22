import sqlite3 from 'sqlite3';

import {
    Hacker,
    Skill,
    SkillInput,
    Event
} from '../../types/graphql';

import {
    INSERT_HACKER,
    INSERT_SKILL,
    INSERT_EVENT,
} from '../constants/sql';

export const insertHacker = async (hacker: Hacker) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<number>((resolve, reject) => {
        db.serialize(() => {
            db.get(
                INSERT_HACKER,
                [
                    hacker.name,
                    hacker.email,
                    hacker.phone,
                    hacker.company
                ],

                (err: Error, row: any) => {
                    if (err) return reject(err);
                    db.close();
                    return resolve(row.id);
                }
            );
        });
    });
};

export const insertSkill = async (hackerId: number, skill: SkillInput) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<Skill>((resolve, reject) => {
        db.serialize(() => {
            db.get(
                INSERT_SKILL,
                [
                    skill.skill,
                    skill.rating,
                    hackerId,
                ],
                (err: Error, row: any) => {
                    if (err) return reject(err);
                    db.close();
                    return resolve(row);
                }
            );
        });
    });
}

export const insertSkills = async (hackerId: number, skills: Skill[]) => {
    const promises = skills.map((skill) => {
        return new Promise<number>((resolve, reject) => {
            insertSkill(hackerId, skill).then((response) => {
                return resolve(response.id);
            }).catch((err) => {
                return reject(err);
            })
        });
    });

    await Promise.all(promises).catch((err) => {
        console.error(err);
    });
};

export const insertEvent = async (event: Event) => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise<Event>((resolve, reject) => {
        db.serialize(() => {
            db.get(
                INSERT_EVENT,
                [event.event],
                (err: Error, row: any) => {
                    if (err) return reject(err);
                    db.close();
                    return resolve(row);
                }
            );
        });
    });
};
