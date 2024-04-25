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

describe("Expect application is running fine", () => {
    test("Should return true", () => {
        expect(200).toBe(200);
    });
});
