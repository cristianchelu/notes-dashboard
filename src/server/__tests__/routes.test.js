const request = require("supertest");
const app = require("../app");

describe("basic route tests", () => {
    test("GET /", async () => {
        const response = await request(app.callback()).get("/");
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("notes-dashboard");
    });
});