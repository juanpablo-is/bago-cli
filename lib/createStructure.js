const path = require('path');
const fs = require('fs');
const os = require('os');

const { init, defaults } = require('./Structure');

module.exports = class CreateStructure {
  constructor(config) {
    this.config = config;

    const desktopDir = path.join(os.homedir(), 'Desktop');
    this.config.folderName = `${desktopDir}\\bago-projects\\${this.config.name}`;

    this.structure = init(this.config.index);
  }

  createStructure() {
    if (!this.config.project) {
      return 'No hay estructura para este tipo de proyecto.';
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

  #existFolder = (folderName, process = 0) => {
    return fs.existsSync(folderName);
  };
};
