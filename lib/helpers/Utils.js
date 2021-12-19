const path = require('path');
const os = require('os');
const fs = require('fs');

module.exports = {
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
  ARGUMENT_CREATE_APP: '[name-project]',
};