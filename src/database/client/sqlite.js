const { Sequelize } = require("sequelize");

module.exports = new Sequelize(`sqlite::memory`, {
    logging: (...msg) => {
        return console.log(
            chalk.bold(chalk.bgBlue("[DB QUERY]:")),
            chalk.bold(chalk.green(msg[0]))
        );
    },
});
