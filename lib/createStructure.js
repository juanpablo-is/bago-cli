const path = require('path');
const fs = require('fs');
const os = require('os');

module.exports = class CreateStructure {
  constructor(config) {
    this.config = config;

    const desktopDir = path.join(os.homedir(), 'Desktop');
    this.config.folderName = `${desktopDir}\\bago-projects\\${this.config.name}`;
  }

  createStructure() {
    if (!this.config.project) {
      return 'No hay estructura para este tipo de proyecto.';
    }

    // Create main folder.
    this.#createFolder(this.config.folderName);
  }

  #createFolder(name) {
    fs.mkdir(name, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  }
};
