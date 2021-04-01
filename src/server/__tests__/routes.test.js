const request = require("supertest");
const app = require("../app");

describe("API tests", () => {
    test("GET /api", async () => {
        const response = await request(app.callback()).get("/api");
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("notes-dashboard");
    });
});