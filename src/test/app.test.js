const request = require("supertest");
const app = require("../app");
// beforeAll(() => {
//     require("dotenv").config();
// });

// let t;

// beforeAll(async () => {
//     await startDatabase(sequelize);
// });

// beforeEach(async () => {
//     await sequelize.sync({ force: true });
//     t = await sequelize.transaction();
// });

afterEach(async () => {
    jest.clearAllMocks();
});

// afterAll(async () => {
//     await stopDatabase(sequelize);
// });

describe("Test Application Setup", () => {
    test("Should return success with status code of 200", () => {
        return request(app).get("/api/test/").expect(200);
    });
});
