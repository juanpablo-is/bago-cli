#!/usr/bin/env node

const { sayQuestions } = require('./lib/questions');

const run = async () => {
  const answers = await sayQuestions();
};

run();
