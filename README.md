# Backathon
Hackathon for fixing back problems

[Intro](#intro) •
[Setup](#setup) •
[API](#api) •
[Next](#next)

## Intro
Backathon is back and it's here to fix our backs, but we lack a backend to back us up so let's give that a crack:

Backathon's backend is a GraphQL server built with [Apollo Server]('https://www.apollographql.com/docs/apollo-server/') and TypeScript, with all user data stored in an SQLite database.

### Overview

```
backathon
├───server // Bulk of the logic and code
│   ├───constants // Constant values such as test data and SQL queries
│   ├───datasources // Functions to communicate with the database
│   └───resolvers // Resolvers for queries and mutations for the server
└───types // Type definitions for the project
```

`index.ts` - Runs the main GraphQL Apollo Server

`database.ts` - Script to initialize the SQLite database and insert the information from `data.json`

`schema.graphql` - Types and definitions for queries and mutations

## Setup
Server is hosted locally at `https://localhost:4000`

Project can be run from the root directory using [Docker]('https://www.docker.com/get-started/') if installed
```
docker-compose up
```

Otherwise clone the repository and install all dependencies with `npm install` and run the server
```
npm start
```

### Development
Other commands are provided to aid in development

`npm run gen` - Generates a `graphql.d.ts` file with proper type definitions based on the GraphQL schema and should be run whenever changes are made to `schema.graphql`

`npm run db` - Initializes the database `hackers.db` with the test data from `data.json`

> :memo: **Note:** Currently the commands will delete the current database and recreate it. This is because there is no check to prevent duplication when inserting users from `data.json` since the unique `id` is assigned incrementally as users are added to the database. This could be changed if a unique constraint was added to, for example, the user's email.
>
> (It also helped during development since changes to the database would mess up the old version)

`npm run db` - Runs the server without calling the other scripts

`npm test` - Runs all the tests

## API

### Query
Get data of all hackers
```
query {
  hackers {
    id
    name
    email
    phone
    company
    skills {
      id
      skill
      rating
    }
  }
}
```

Gets data of a specific hacker
```
query {
  hacker(id: number) {
    id
    name
    email
    phone
    company
    skills {
      id
      skill
      rating
    }
  }
}
```

Gets an aggregate view of all skills
```
query {
  skills(min: number, max: number) {
    skill
    count
  }
}
```

### Mutation
Updates a single hacker
```
mutation {
  updateHacker(id: number, data: HackerInput) {
    hacker {
      name
      email
      phone
      company
      skills {
        skill
        rating
      }
    }
    success
  }
}
```

## Next

