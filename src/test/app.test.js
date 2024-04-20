const request = require("supertest");
const app = require("../app");
const { startDatabase, stopDatabase } = require("../database");

// beforeAll(() => {
//     require("dotenv").config();
// });

beforeEach(async () => {
    await startDatabase();
});

afterEach(async () => {
    await stopDatabase();
});

describe("Test the default endpoint", () => {
    test("Should return success with status code of 200", () => {
        console.log(request(app).get("/api/test/"));
        return request(app).get("/api/test/").expect(200);
    });
});
