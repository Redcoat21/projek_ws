const chalk = require("chalk");

const sendDbInfo = (message) => {
    console.log(chalk.bold(chalk.bgBlue("[DB INFO]:"), chalk.green(message)));
};

const sendDbError = (message) => {
    console.log(chalk.bold(chalk.bgRed("[DB ERROR]:"), chalk.red(message)));
};

module.exports = {
    sendDbInfo,
    sendDbError,
};
