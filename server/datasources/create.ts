import sqlite3 from 'sqlite3';

import {
    CREATE_HACKERS,
    CREATE_SKILLS,
} from '../constants/sql';

export const createHackers = () => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise((resolve, reject) => {
        db.run(CREATE_HACKERS, (err) => {
            if (err) return reject(err);
            db.close();
            resolve('Created hackers table');
        })
    })
}

export const createSkills = () => {
    const db = new sqlite3.Database('hackers.db');
    return new Promise((resolve, reject) => {
        db.run(CREATE_SKILLS, (err) => {
            if (err) return reject(err);
            db.close();
            resolve('Created skills table');
        })
    })
}