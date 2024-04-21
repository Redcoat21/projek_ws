const request = require("supertest");
const app = require("../app");
const { startDatabase, stopDatabase } = require("../database");
const { dbTest: sequelize } = require("../database");

// beforeAll(() => {
//     require("dotenv").config();
// });

let t;

beforeAll(async () => {
    await startDatabase(sequelize);
});

beforeEach(async () => {
    await sequelize.sync({ force: true });
    t = await sequelize.transaction();
});

afterEach(async () => {
    await t.rollback();
});

afterAll(async () => {
    await stopDatabase(sequelize);
});

describe("Test the default endpoint", () => {
    test("Should return success with status code of 200", () => {
        return request(app).get("/api/test/").expect(200);
    });
});

describe("Test transaction is created", () => {
    test("Should return true", () => {
        return expect(t).toBeTruthy();
    });
});
