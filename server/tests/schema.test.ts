import { testServer } from "./index.test";

jest.setTimeout(20000);

it('Should be able to query hackers', async () => {
    const response = await testServer.executeOperation({
        query: `
            query GetHackers {
                hackers {
                    id
                    name
                    phone
                    company
                }
            }
        `
    })

    expect(response.body.kind === "single");
    if (response.body.kind === "single") {
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(response.body.singleResult.data?.hackers).toHaveLength(1000);
    }
});

it('Should be able to query the skills of hackers', async () => {
    const response = await testServer.executeOperation({
        query: `
            query GetHackerSkills {
                hackers {
                    skills {
                        skill
                        rating
                    }
                }
            }
        `
    })

    expect(response.body.kind === "single");
    if (response.body.kind === "single") {
        expect(response.body.singleResult.errors).toBeUndefined();
    }
});

it('Should be able to get a specific hacker', async () => {
    const response = await testServer.executeOperation({
        query: `
            query GetHacker {
                hacker(id: 1) {
                    id
                    name
                    phone
                    company
                    skills {
                        skill
                        rating
                    }
                }
            }
        `
    })

    expect(response.body.kind === "single");
    if (response.body.kind === "single") {
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(response.body.singleResult.data?.hacker).toBeDefined();
    }
});

it('Should be able to query all skills in an aggregate view', async () => {
    const response = await testServer.executeOperation({
        query: `
            query GetSkills {
                skills {
                    skill
                    count
                }
            }
        `
    })

    expect(response.body.kind === "single");
    if (response.body.kind === "single") {
        expect(response.body.singleResult.errors).toBeUndefined();
    }
});

it('Should be able to query events', async () => {
    const response = await testServer.executeOperation({
        query: `
            query GetEvents {
                events {
                    id
                    event
                }
            }
        `
    })

    expect(response.body.kind === "single");
    if (response.body.kind === "single") {
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(response.body.singleResult.data?.events).toHaveLength(3);
    }
});
