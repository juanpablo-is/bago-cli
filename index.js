#!/usr/bin/env node

'use strict';

const commander = require('commander');
const chalk = require('chalk');

const { name, version } = require('./package.json');
const { ARGUMENT_CREATE_APP } = require('./lib/helpers/Utils');

const CLI = require('./lib/cli');
const questions = require('./lib/questions');
const { list } = require('./lib/options');

let projectName;

const init = () => {
  const program = new commander.Command(name)
    .version(version)
    .arguments(ARGUMENT_CREATE_APP)
    .usage(`${chalk.blue(ARGUMENT_CREATE_APP)} [options]`)
    .action(name => {
      projectName = name;
    })
    .option('--list', 'Print list preload projects.')
    .allowUnknownOption()
    .parse(process.argv);

  executeOptions(program);
  executeCLI();
};

const executeCLI = () => {
  const questionCLI = new CLI();

  if (typeof projectName !== 'undefined') {
    questionCLI.preName(projectName);

    questions.shift();
  }

  questionCLI.execute(questions);
};

const executeOptions = (program) => {
  if (program.list) {
    list();
  }
};

init();