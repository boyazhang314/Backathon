export const CREATE_HACKERS = `
    CREATE TABLE IF NOT EXISTS hackers (
        id INTEGER PRIMARY KEY NOT NULL UNIQUE,
        name VARCHAR(70) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(26) NOT NULL,
        company TEXT NOT NULL,
        registered BOOLEAN DEFAULT false
    );
`;

export const CREATE_SKILLS = `
    CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY NOT NULL UNIQUE,
        skill TEXT NOT NULL,
        rating INTEGER NOT NULL,
        hackerId INTEGER NOT NULL,
        FOREIGN KEY (hackerId) REFERENCES hackers(id)
    );
`;

export const CREATE_EVENTS = `
    CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY NOT NULL UNIQUE,
        event TEXT NOT NULL
    );
`;

export const CREATE_HACKERS_EVENTS = `
    CREATE TABLE IF NOT EXISTS hackersEvents (
        hackerId INTEGER NOT NULL,
        eventId INTEGER NOT NULL,
        FOREIGN KEY (hackerId) REFERENCES hackers(id),
        FOREIGN KEY (eventId) REFERENCES hackers(id),
        PRIMARY KEY (hackerId, eventId)
    );
`

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

export const INSERT_EVENT = `
    INSERT INTO events (event)
    VALUES (?)
    RETURNING id, event;
`;

export const INSERT_ATTENDEE = `
    INSERT INTO hackersEvents (hackerId, eventId)
    VALUES (?, ?)
`;

export const GET_ALL_HACKERS = `
    SELECT * FROM hackers h
    LEFT JOIN skills s ON s.hackerId = h.id
    WHERE s.skill = COALESCE(?, s.skill)
    AND s.rating >= COALESCE(?, s.rating)
    GROUP BY s.hackerId;
`

export const GET_HACKER = `
    SELECT * FROM hackers WHERE id = COALESCE(?, id);
`

export const GET_HACKER_SKILLS = `
    SELECT * FROM skills WHERE hackerId = ?;
`;

export const GET_HACKER_EVENTS = `
    SELECT * FROM events
    JOIN hackersEvents ON events.id = hackersEvents.eventId
    JOIN hackers ON hackersEvents.hackerId = hackers.id
    WHERE hackers.id = ?
`

export const GET_SKILLS_AGGREGATE = `
    SELECT skill, COUNT(*) AS count
    FROM skills
    GROUP BY skill
    HAVING count >= COALESCE(?, count) AND count <= COALESCE(?, count);
`

export const GET_SKILL_AGGREGATE = `
    SELECT * FROM skills
    WHERE id = ?
    GROUP BY skill;
`

export const GET_SKILL_HACKERS = `
    SELECT * FROM skills s
    LEFT JOIN hackers h ON h.id = s.hackerId
    WHERE s.skill = ?
`

export const GET_EVENTS = `
    SELECT * FROM events
`

export const GET_EVENT_HACKERS = `
    SELECT * FROM hackers
    JOIN hackersEvents ON hackers.id = hackersEvents.hackerId
    JOIN events ON hackersEvents.eventId = events.id
    WHERE events.id = ?
`

export const UPDATE_HACKER = `
    UPDATE hackers
    SET 
        name = COALESCE(?, name),
        email = COALESCE(?, email),
        phone = COALESCE(?, phone),
        company = COALESCE(?, company),
        registered = COALESCE(?, registered)
    WHERE id = ?
    RETURNING name, email, phone, company, registered;
`;

export const UPDATE_SKILL = `
    UPDATE skills
    SET rating = ?
    WHERE skill = ? AND hackerId = ?
    RETURNING skill, rating, hackerId
`

export const REGISTER_HACKER = `
    UPDATE hackers
    SET 
        registered = true
    WHERE id = ?
    RETURNING name, email, phone, company, registered;
`
