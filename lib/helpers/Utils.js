const path = require('path');
const os = require('os');
const fs = require('fs');

module.exports = {
  colors: {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[34m',
    background: {
      red: '\x1b[41m',
      green: '\x1b[42m',
      yellow: '\x1b[43m',
      cyan: '\x1b[44m',
    },
  },
  /**
   * Verify if the name folder content some files inside.
   *
   * @param name String name of project.
   * @returns {Promise<string|boolean>}
   */
  existFolder: (name) => {
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
  },
};