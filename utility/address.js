const {fakerID_ID: faker} = require("@faker-js/faker");
const addressGenerator = () => {
    const country = "Indonesia";
    const city = faker.location.city();
    const state = faker.location.state();
    const address = faker.location.streetAddress();
    const zipCode = faker.location.zipCode();

    const buildingNumber = faker.location.buildingNumber();

    return `${address} No ${buildingNumber}, ${zipCode}, ${city}, ${state}, ${country}`;
};

module.exports = {
    addressGenerator
}