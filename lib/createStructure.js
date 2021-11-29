const path = require('path');
const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');

const { init, defaults } = require('./Structure');

class CreateStructure {
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
    await this.#executeNPM();

    // Execute command git
    await this.#executeGit();
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

  async #executeNPM() {
    await this.#npmInit();

    if (this.config.packages) {
      await this.#npmPackages();
    }
  }

  #npmInit() {
    return new Promise((resolve, reject) => {
      exec(
        `npm init -y`,
        {
          encoding: 'utf8',
          cwd: this.config.folderName,
          timeout: 3000,
        },
        (error, stdout) => {
          if (error) {
            return reject(error);
          }

          resolve(stdout);
        },
      );
    });
  }

  #npmPackages() {
    const packages = this.config.packages.reduce(
      (previous, current) => `${previous} ${current}`,
    );

    return new Promise((resolve, reject) => {
      exec(
        `npm install ${packages}`,
        {
          encoding: 'utf8',
          cwd: this.config.folderName,
        },
        (error, stdout) => {
          if (error) {
            return reject(error);
          }

          resolve(stdout);
        },
      );
    });
  }

  async #executeGit() {
    if (this.config.git === true) {
      await this.#gitInit();

      if (this.config.gitignore === true) {
        await this.#gitIgnore();
      }
    }
  }

  #gitInit() {
    return new Promise((resolve, reject) => {
      exec(
        `git init`,
        {
          encoding: 'utf8',
          cwd: this.config.folderName,
          timeout: 3000,
        },
        (error, stdout) => {
          if (error) {
            return reject(error);
          }

          resolve(stdout);
        },
      );
    });
  }

  #gitIgnore() {
    return new Promise((resolve, reject) => {
      fs.writeFile(`${this.config.folderName}\\.gitignore`, 'node_modules', (err) => {
        if (err) {
          return reject(err);
        }

        resolve(true);
      });
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
    // Add search appearance.
    setTimeout(() => {
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
    }, 1000);
  });
};

module.exports = {
  CreateStructure,
  existFolder,
};