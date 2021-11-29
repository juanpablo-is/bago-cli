const path = require('path');
const fs = require('fs');
const os = require('os');

const { init, defaults } = require('./Structure');

// Imports commands file.
const npmCommands = require('./helpers/commands/npm');
const gitCommands = require('./helpers/commands/git');

class CreateStructure {
  // Initial config.
  config = {
    folderName: '',
    packages: [],
    project: '',
  };

  constructor(config) {
    this.config = config;

    const desktopDir = path.join(os.homedir(), 'Desktop');
    this.config.folderName = `${desktopDir}\\bago-projects\\${this.config.name}`;

    this.structure = init(this.config.index);
  }

  async createStructure() {
    if (!this.config.project) {
      return 'Not have structure to this type project.';
    }

    // Create main folder.
    this.#createFolder(this.config.folderName);

    // Create main file (index.js)
    this.#createFile({
      name: `${this.config.folderName}\\index.js`,
    });

    // Create default structure folder.
    defaults['common'].forEach((folder) => {
      if (this.structure[folder]) {
        this.#create(this.structure[folder]);
      }
    });

    // Create default structure folder to this project type.
    defaults[this.config.project].forEach((folder) => {
      if (this.structure[folder]) {
        this.#create(this.structure[folder]);
      }
    });

    // Execute commands NPM.
    await npmCommands(this.config);

    // Execute command git
    await gitCommands(this.config);
  }

  #create(naming) {
    if (naming.children) {
    }

    this.#createFolder(`${this.config.folderName}\\${naming.name}`);
    this.#createFile({
      name: `${this.config.folderName}\\${naming.name}\\${naming.file}`,
      description: naming.description || '',
    });
  }

  #createFolder(name) {
    fs.mkdir(name, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  #createFile({ name, description = '' }) {
    fs.writeFile(name, description, (err) => {
      if (err) {
        throw err;
      }
    });
  }

};

/**
 * Verify if the name folder content some files inside.
 *
 * @param name String name of project.
 * @returns {Promise<string|boolean>}
 */
const existFolder = (name) => {
  const desktopDir = path.join(os.homedir(), 'Desktop');
  const folderName = `${desktopDir}\\bago-projects\\${name}`;

  return new Promise((resolve) => {
    const existsPackage = fs.existsSync(`${folderName}\\package.json`);
    if (existsPackage) {
      return resolve('File package.json already exists, need to be deleted');
    }

    const existsPackageLock = fs.existsSync(`${folderName}\\package-lock.json`);
    if (existsPackageLock) {
      return resolve('File package-lock.json already exists, need to be deleted');
    }

    const existsIndexFile = fs.existsSync(`${folderName}\\index.js`);
    if (existsIndexFile) {
      return resolve('File index.js already exists, need to be deleted');
    }

    resolve(true);
  });
};

module.exports = {
  CreateStructure,
  existFolder,
};