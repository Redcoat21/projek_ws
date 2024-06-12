const sequelize = require("sequelize");
const UserModel = require("../model/models/User");

jest.mock("sequelize");

describe("User model", () => {
    let User;

    beforeEach(() => {
        User = UserModel(sequelize, sequelize.DataTypes);
    });

    it("should mock the create method", async () => {
        const mockUser = { id: 1, name: "John Doe" };
        User.create.mockResolvedValueOnce(mockUser);

        const result = await User.create({ name: "John Doe" });
        expect(result).toEqual(mockUser);
    });
});
