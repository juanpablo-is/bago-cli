#!/usr/bin/env node

const inquirer = require('inquirer');
const { Subject } = require('rxjs');

const { CreateStructure } = require('./lib/createStructure');
const { questions } = require('./lib/questions');

class Questions {
  config = {};
  prompts = new Subject();

  execute() {
    inquirer.prompt(this.prompts).ui.process.subscribe({
      next: (data) => {
        const { name, answer } = data;
        this.config[name] = answer;

        let item = questions.shift();
        if (!item) {
          return this.prompts.complete();
        }

        // Func 'complete' to validate and determinate if the CLI complete.
        if (item.complete) {
          const complete = item.complete(this.config);

          if (complete) {
            return this.prompts.complete();
          }
        }

        // Execute func 'when' to prevent stop CLI.
        if (item.when && !item.when(this.config)) {
          item = questions.shift();

          if (!item) {
            return this.prompts.complete();
          }
        }

        this.prompts.next(item);
      },
      error: null,
      complete: async () => {
        try {
          const structure = new CreateStructure(this.config);
          await structure.createStructure();
        } catch (e) {
          inquirer.prompt(this.prompts).ui.process.unsubscribe();
        }
      },
    });

    // Process the first questions to subscribe to prompt.
    this.prompts.next(questions.shift());
  }
}

new Questions().execute();