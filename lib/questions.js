const inquirer = require('inquirer');

module.exports = {
  sayQuestions: () => {
    const questions = [
      {
        name: 'name',
        type: 'input',
        message: 'Input name of project:',
        validate: (value) => {
          if (!value.length) {
            return 'Please enter project name.';
          }

          if (value.length < 5) {
            return 'Please enter project name with +5 characters.';
          }

          return true;
        },
      },
      {
        name: 'project',
        type: 'list',
        message: 'Choose type project:',
        choices: [
          { value: 'node', name: 'NodeJS only backend' },
          { value: 'node-render', name: 'NodeJS with SSR' },
        ],
        validate: (value) => {
          if (value.length) {
            return true;
          }

          return 'Please enter project type.';
        },
      },
      {
        name: 'packages',
        type: 'checkbox',
        message: 'Choose packages nodejs:',
        choices: [
          { value: 'express', name: 'Express', checked: true },
          { value: 'mongoose', name: 'Mongoose' },
          { value: 'nodemon', name: 'Nodemon (dev)' },
          { value: 'cors', name: 'CORS' },
        ],
        validate: (value) => {
          if (value.length) {
            return true;
          }

          return 'Please enter project type.';
        },
      },
    ];

    return inquirer.prompt(questions);
  },
};
