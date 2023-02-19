export const CREATE_HACKERS = `
    CREATE TABLE IF NOT EXISTS hackers (
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCHAR(70) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(26) NOT NULL,
        company TEXT NOT NULL
    );
`;

export const CREATE_SKILLS = `
    CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY NOT NULL,
        skill TEXT NOT NULL,
        rating INTEGER NOT NULL,
        hackerId INTEGER NOT NULL,
        FOREIGN KEY (hackerID) REFERENCES hackers(id)
    );
`;

export const INSERT_HACKER = `
    INSERT INTO hackers (name, email, phone, company)
    VALUES (?, ?, ?, ?)
    RETURNING id;
`;

export const INSERT_SKILL = `
    INSERT INTO skills (skill, rating, hackerId)
    VALUES (?, ?, ?)
    RETURNING id, skill, rating, hackerId;
`;

export const GET_ALL_HACKERS = `
    SELECT * FROM hackers;
`;

export const GET_HACKER = `
    SELECT * FROM hackers WHERE id = ?;
`

export const GET_SKILLS = `
    SELECT * FROM skills WHERE hackerId = ?;
`;

export const GET_SKILLS_AGGREGATE = `
    SELECT skill, COUNT(*) AS count
    FROM skills
    GROUP BY skill
    HAVING count >= COALESCE(?, count) AND count <= COALESCE(?, count);
`

export const UPDATE_HACKER = `
    UPDATE hackers
    SET 
        name = COALESCE(?, name),
        email = COALESCE(?, email),
        phone = COALESCE(?, phone),
        company = COALESCE(?, company)
    WHERE id = ?
    RETURNING name, email, phone, company;
`;

export const UPDATE_SKILL = `
    UPDATE skills
    SET rating = ?
    WHERE skill = ? AND hackerId = ?
    RETURNING skill, rating, hackerId
`
