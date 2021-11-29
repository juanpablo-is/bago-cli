const fs = require('fs');
const { exec } = require('child_process');

module.exports = async ({ git, gitignore, folderName }) => {
  if (git === true) {
    await gitInit(folderName);

    if (gitignore === true) {
      await gitIgnore(folderName);
    }
  }
};

const gitInit = (folderName) => {
  return new Promise((resolve, reject) => {
    exec(
      `git init`,
      {
        encoding: 'utf8',
        cwd: folderName,
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
};

const gitIgnore = (folderName) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${folderName}\\.gitignore`, 'node_modules', (err) => {
      if (err) {
        return reject(err);
      }

      resolve(true);
    });
  });
};