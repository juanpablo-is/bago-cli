const inquirer = require('inquirer');
const { existFolder } = require('./createStructure');

module.exports = {
  sayQuestions: () => {
    const questions = [
      {
        name: 'name',
        type: 'input',
        message: 'Input name of project :',
        validatingText: 'Validating name project...',
        validate: async (value) => {
          if (!value.length) {
            return 'Please enter project name.';
          }

          if (value.length < 3) {
            return 'Please enter project name with +3 characters.';
          }

          const exists = await existFolder(value);
          if (exists !== true) {
            return exists || 'The folder is not empty, delete folder content or input other name.';
          }

          return true;
        },
      },
      {
        name: 'project',
        type: 'list',
        message: 'Choose type project :',
        choices: [
          { value: 'node', name: 'NodeJS only backend' },
          { value: 'node-render', name: 'NodeJS with SSR' },
        ],
        validate: (value) => {
          if (!value.length) {
            return 'Please enter project type.';
          }

          return true;
        },
      },
      {
        name: 'packages',
        type: 'checkbox',
        message: 'Choose packages NPM :',
        choices: [
          { value: 'express', name: 'Express', checked: true },
          { value: 'mongoose', name: 'Mongoose' },
          { value: 'nodemon', name: 'Nodemon (dev)' },
          { value: 'cors', name: 'CORS' },
        ],
      },
      {
        name: 'git',
        type: 'confirm',
        message: 'Do you want to add git? : (If exists, it will be replaced.)',
      },
      {
        name: 'gitignore',
        type: 'confirm',
        message: 'Do you want to add .gitignore? :',
        when: answers => answers.git,
      },
    ];

    return inquirer.prompt(questions);
  },
};
