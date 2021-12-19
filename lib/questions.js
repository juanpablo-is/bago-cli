const inquirer = require('inquirer');

const BagoProjects = require('./structures/BagoProjects');
const { existFolder } = require('./helpers/Utils');

module.exports = [
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
    name: 'framework',
    type: 'list',
    message: 'Choose framework/language :',
    choices: BagoProjects.frameworks,
  },
  {
    name: 'project',
    type: 'list',
    message: 'Choose type project :',
    choices: [],
    complete: function({ framework }) {
      const choices = BagoProjects.list(framework);
      this.choices = choices;

      return choices.length <= 0;
    },
  },
  {
    name: 'packages',
    type: 'checkbox',
    message: 'Choose packages NPM :',
    choices: [new inquirer.Separator('▶ By BAGO ◀'), ...BagoProjects.packages],
    complete: function({ project }) {
      const { packages, author } = BagoProjects.packagesByStructure(project);

      if (packages.length > 0) {
        packages.unshift(new inquirer.Separator(`\n▶ By ${author || 'Project'}  ◀`));
        this.choices = [...this.choices, ...packages];
      }
    },
    pageSize: 15,
  },
  {
    name: 'git',
    type: 'confirm',
    message: 'Do you want to add git? : (If exists, it will be replaced)',
  },
  {
    name: 'gitignore',
    type: 'confirm',
    message: 'Do you want to add .gitignore? :',
    when: answers => answers.git,
  },
];
