# Backathon
Hackathon for fixing back problems

[Intro](#intro) •
[Setup](#setup) •
[API](#api) •
[Next](#next)

## Intro
Backathon is back and hackers are here to fix our backs, but we lack a backend to back us up so let's give that a crack:

Currently all the data is stored in one measly JSON file, so let's fix that - Backathon's improved backend is a GraphQL server built with [Apollo Server]('https://www.apollographql.com/docs/apollo-server/') and TypeScript, with all hacker data stored in an SQLite database.

Apollo Server provides a nice UI to explore and test queries or mutations, read documentation, and view the schema

![apolloserver](public\apolloserver.png)

### Overview

```
backathon
├───server // Bulk of the logic and code
│   ├───constants // Constant values such as test data and SQL queries
│   ├───datasources // Functions to communicate with the database
│   └───resolvers // Resolvers for queries and mutations for the server
└───types // Type definitions for the project
```
**Important Files**

`index.ts` - Runs the main GraphQL Apollo Server

`database.ts` - Script to initialize the SQLite database and insert the information from `data.json`

`schema.graphql` - Types and definitions for queries and mutations

## Setup
Server is hosted locally at `https://localhost:4000`

Project can be run from the root directory using [Docker]('https://www.docker.com/get-started/') if installed
```
docker-compose up
```

Otherwise install all dependencies with `npm install` and run the server
```
npm start
```
> **Note:** This will take a while. You get to painstakingly watch `Inserted hacker #?` polute your terminal 1000 times as each one of the 1000 hackers are inserted into the database

### Development
Other commands are provided to aid in development

`npm run gen` - Generates a `graphql.d.ts` file with proper type definitions based on the GraphQL schema and should be run whenever changes are made to `schema.graphql`

- Type definitions throughout the project are imported from `graphql.d.ts`

`npm run db` - Initializes the database `hackers.db` with the test data from `data.json`

> **Note:** Currently the commands will delete the current database and recreate it. This is because there is no check to prevent duplication when inserting users from `data.json` since the unique `id` is assigned incrementally as users are added to the database. This could be changed if a unique constraint was added to, for example, the user's email.
>
> (It also helped during development since changes to the database tables would mess up on the old version)

`npm run dev` - Runs the server without calling the other scripts

`npm test` - Runs all the tests
> **Note:** These tests take a while to run due to the queries taking a while to resolve

## API

### Query
**hackers**

To start off, it is important to be able to view all hackers in a hackathon, listing out all information about them all, including their personal information, skills, and attended events.
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
      hackerId
    }
    attended {
      id
      event
    }
  }
}
```
> **Note:** This endpoint takes around 10 seconds to run, which is quite a while. This is because additional database calls are done to get the hacker's skills and attended events, which adds up over all hackers. Ideally, this should be optimized.

However, this information may not be useful for sponsors or employers who wish to scout out hackers to hire. Perhaps they wish to seek out only those who are highly proficient. Then they can filter out hackers with at least one skill above a certain level.
```
query {
  hackers(rating: 4) {
    id
    name
    skills {
      skill
      rating
    }
  }
}
```
Or perhaps they're looking for those with a specific skill
```
query {
  hackers(skill: "Go", rating: 4) {
    id
    name
    skills {
      skill
      rating
    }
  }
}
```
Us at Backathon, we value those that know Racket. Unfortunately, there is no one :(
```
query {
  hackers(skill: "Racket") {
    id
    name
    skills {
      skill
      rating
    }
  }
}
```
**hacker**

If you know the specific ID of a specific hacker, and you want to see their information, you can do so as well

```
query {
  hacker(id: 1) {
    id
    name
    email
    phone
    company
    skills {
      id
      skill
      rating
      hackerId
    }
    attended {
      id
      event
    }
  }
}
```

**skills**

Another important bit of information is the frequency of skills amongst all the hackers. You can get an aggregate view of all skills as well as all users with that skill, within a provided range.
```
query {
  skills {
    skill
    count
    hackers {
      name
    }
  }
}
```
A range can be provided to narrow the results

- `skills(min: 10, max: 30)`
- `skills(min: 15)`
- `skills(max: 14)`



**skill**

If you come across the ID of a specific hacker's skill and you wish to query for it, you can do that as well
```
query {
  skill(id: 1) {
    skill
    hackers {
      name
      id
    }
  }
}
```

**events**

Finally, you can query for all events and those who attended. Nothing fancy.
```
query {
  events {
    id
    event
    attendees {
      name
    }
  }
}
```

### Mutation
**updateHacker**

People change. Hackers change. Thus, we should update the database to reflect any changes. We can also add updates to skills or add new ones.
```
mutation {
  updateHacker(id: 1,
  data: {
    name: "Hackerman",
    email: "hacker@hack.com",
    phone: "999-999-9999",
    company: "HackBack",
    skills: [
    {
      skill: "Racket",
      rating: 10
    },
    {
      skill: "Swift",
      rating: 1
    }
  ]  
    registered: true
  }) {
    success
    code
    message
    hacker {
      name
      email
      phone
      company
      registered
      skills {
        skill
        rating
      }
    }
  }
}
```
We can query `hacker(id: 1)` to see the updates. Note that the hacker has lost some skill in Swift in exchange for gaining the skill of Racket.

**registerHacker**

When hackers arrive to the hackathon, they need to be registered. Thus, we can pass in the hacker's ID to register them
```
mutation {
  registerHacker(id: 1) {
    success
    code
    message
    hacker {
      name
      email
      phone
      company
      registered
    }
  }
}
```
And `registered` is now true for Hackerman.

**eventAttended**
Lastly, we also want to record when hackers attend events or activities. This can be done by adding an entry with the hacker's ID and the event's ID.
```
mutation {
  eventAttended(hackerId: 1, eventId: 1) {
    success
    code
    message
  }
}
```
We can query for Hackerman with `hacker(id: 1)` and see he has eaten breakfast in `attended`. Similarly, we can query `events(id: 1)` and see that in `attendees` there is Hackerman.


## Next
There are many improvements that can be done to Backathon's backend, which includes but is not limited to

- Querying for hackers with a variable length array of skills
- Research to see if SQL queries can be improved or optimized
- Improve tests and potentially add some more
  
  - Test resolvers
  - Find a way to mock the database instead of testing agains the actual database

- Add other columns or information to tables, namely the events table
- Add more queries or mutations such as inserting or deleting

