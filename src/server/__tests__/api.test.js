const request = require("supertest");
const app = require("../app");
const knex = require("../database/connection");

describe("API tests", () => {
    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });
    
    afterEach(async () => {
        await knex.migrate.rollback();
    });

    test("GET /api", async () => {
        const response = await request(app.callback()).get("/api");
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("notes-dashboard");
    });

    test("GET /api/notes", async () => {
        const response = await request(app.callback()).get("/api/notes");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json");
        expect(response.body.data).toHaveLength(2);
    });

    test("GET /api/notes/:id", async () => {
        const response = await request(app.callback()).get("/api/notes/1");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json");
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0].id).toEqual(1);
    });

    test.todo("POST /api/notes");
    test.todo("PUT /api/notes/:id");
    test.todo("DELETE /api/notes/:id");
});