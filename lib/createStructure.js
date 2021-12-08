const path = require('path');
const fs = require('fs');
const os = require('os');
const BottomBar = require('inquirer/lib/ui/bottom-bar');

// Helpers/Utils
const { colors } = require('./helpers/Utils');

// Imports commands file.
const cmdCommands = require('./helpers/commands/cmd');
const npmCommands = require('./helpers/commands/npm');
const gitCommands = require('./helpers/commands/git');

class CreateStructure {
  // Initial vars.
  config = {
    folderName: '',
    packages: [],
    project: '',
  };

  constructor(config) {
    this.config = config;

    // const desktopDir = path.join(os.homedir(), 'Desktop');
    // this.config.folderName = `${desktopDir}\\bago-projects\\${this.config.name}`;
    this.config.folderName = `${process.cwd()}\\${this.config.name}`;

    // TODO: try/catch when not exist path.
    this.structure = require(`./structures/${this.config.project}`);

    this.interval = 0;
    this.i = 0;
    this.ui = new BottomBar();
  }

  async createStructure() {
    this.ui.log.write('');

    if (!this.structure.mapping) {
      return 'Not have structure to this type project.';
    }

    try {
      // Create main folder.
      this.#initLoading('Creating main folder...');
      await this.#createFolder();
      this.#closeLoading('Main folder created!');

      // Execute commands inside file json.
      if (this.structure.commands) {
        this.#initLoading('Executing commands CLI...');
        await cmdCommands(this.structure.commands, this.config.folderName);
        this.#closeLoading('Commands executed successfully.');
      }

      // Create mapping files/folders according to .json
      this.#initLoading('Creating structure folder/files...');
      await this.#recursiveCreating(this.structure.mapping);
      this.#closeLoading('Installing of the structure done!');

      // Execute commands NPM.
      if (this.config.packages) {
        this.#initLoading('Executing NPM...');
        await npmCommands(this.config);
        this.#closeLoading('NPM done!');
      }

      // Execute command git
      if (this.config.git) {
        this.#initLoading('Executing GIT...');
        // await gitCommands(this.config);
        this.#closeLoading('GIT Done!');
      }

      this.#closeLoading('Installation done!');

    } catch (e) {
      // await this.#removeFolder();
      this.#closeLoading('Failed installation, try again.', false);
      throw new Error(e);
    }
  }

  #createFolder(name = '') {
    return new Promise(((resolve, reject) => {
      fs.mkdir(`${this.config.folderName}\\${name}`, { recursive: true }, (err) => {
        if (err) {
          return reject(err);
        }

        resolve(true);
      });
    }));
  }

  #createFile({ name, description = '' }) {
    return new Promise(((resolve, reject) => {
      fs.writeFile(`${this.config.folderName}\\${name}`, description, (err) => {
        if (err) {
          return reject(err);
        }

        resolve(true);
      });
    }));
  }

  async #recursiveCreating(mapping, nameFolderParent = undefined) {
    for (const item of mapping) {
      item.name = (nameFolderParent ? `${nameFolderParent}\\` : '') + item.name;

      switch (item.type) {
        case  'file':
          await this.#createFile({
            name: item.name,
            description: item.description,
          });
          break;

        case 'folder':
          await this.#createFolder(item.name);

          if (item.children && item.children.length > 0) {
            await this.#recursiveCreating(item.children, item.name);
          }

          break;
      }
    }
  }

  #removeFolder(path = undefined) {
    return new Promise(((resolve, reject) => {
      fs.rmdir(path || `${this.config.folderName}`, { maxRetries: 5 }, (err) => {

        if (err) {
          return reject(err);
        }

        resolve(true);
      });
    }));
  }

  #initLoading(message) {
    const loader = ['/    ', '|    ', '\\    ', '-    '];

    this.interval = setInterval(() => {
      this.ui.updateBottomBar(loader[this.i++ % 4] + message);
    }, 300);
  }

  #closeLoading(message, success = true) {
    clearInterval(this.interval);

    const icon = (success
        ? colors.green + ' ✅ '
        : colors.red + ' ❌ '
    ) + colors.reset;

    this.ui = new BottomBar();
    this.ui.log.write(icon + ' ' + (message));
  }
}

module.exports = {
  CreateStructure,
};