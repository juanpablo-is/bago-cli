#!/usr/bin/env node

const { sayQuestions } = require('./lib/questions');
const CreateStructure = require('./lib/createStructure');

const run = async () => {
  const answers = await sayQuestions();
  const structure = new CreateStructure(answers);
  structure.createStructure();
};

run();
