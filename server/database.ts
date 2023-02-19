  /////////////////////////////
 // DATABASE INITIALIZATION //
/////////////////////////////

import sqlite3 from 'sqlite3';

import { createHackers, createSkills } from './datasources/create';
import { insertHacker, insertSkills } from './datasources/insert';

const database = new sqlite3.Database('hackers.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database');
});

database.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Closed the SQLite database");
});

// CREATE tables
const createDB = () => {
    return new Promise<string>((resolve, reject) => {
        createHackers().then(() => {
            createSkills().then(() => {
                console.log('Created tables');
                resolve('Created tables');
            }).catch((err) => {
                return reject(err);
            })
        }).catch((err) => {
            return reject(err);
        })
    })
}

// INSERT data
const initDB = () => {
    return new Promise<string>(async (resolve, reject) => {
        const hackers = require('./constants/data.json');
        for (let hacker of hackers) {
            const hackerId = await insertHacker(hacker);
            console.log('Inserted hacker #' + hackerId);

            await insertSkills(hackerId, hacker.skills).catch((err) => {
                return reject(err);
            });
        }
        return resolve('Done initializing');
    })
};

createDB().then(() => {
    initDB().catch((err) => console.error(err))
}).catch((err) => {
    console.error(err);
})