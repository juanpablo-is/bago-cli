const chalk = require('chalk');
const { structures } = require('./structures/BagoProjects');
const { name } = require('../package.json');
const { ARGUMENT_CREATE_APP } = require('./helpers/Utils');

module.exports = {
  list: () => {
    console.log(chalk.cyan(' ==================================='));
    console.log(chalk.cyan('|| Structures authorized for Bago. ||'));
    console.log(chalk.cyan(' ===================================\n'));

    structures.forEach((structure) => {
      console.log(`  ${chalk.cyan('▶')}  ${chalk.cyan(structure.name)} by ${chalk.yellowBright(structure.author || 'Anonymous')}`);

      if (structure.more) {
        console.log(`     See more on: ${chalk.red(structure.more)}\n`);
      }
    });

    process.exit(0);
  },
  displayErrorMissingArgument: () => {
    console.error('\nPlease specify the project name:');
    console.log(`  ${chalk.blue(name)} ${chalk.green(ARGUMENT_CREATE_APP)}`);

    console.log('\nFor example:');
    console.log(`  ${chalk.blue(name)} ${chalk.green('bago-app')}`);

    console.log(`\nRun ${chalk.cyan(`${name} --help`)} to see all options.`);

    process.exit(0);
  },
};