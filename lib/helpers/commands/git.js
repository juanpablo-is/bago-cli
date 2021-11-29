const fs = require('fs');
const { exec } = require('child_process');

module.exports = async ({ git, gitignore, folderName }) => {
  if (git === true) {
    await existsGitFolder(folderName);

    await gitInit(folderName);

    if (gitignore === true) {
      await gitIgnore(folderName);
    }

    await gitFirstCommit(folderName, 'First commit with Bago-cli');
  }
};

const existsGitFolder = (folderName) => {
  return new Promise((resolve, reject) => {
    const existsGit = fs.existsSync(`${folderName}\\.git`);

    if (existsGit) {
      return fs.rm(`${folderName}\\.git`, { recursive: true, force: true }, (err) => {

        if (err) {
          return reject(err);
        }

        resolve(true);
      });
    }

    resolve(true);
  });
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

const gitFirstCommit = (folderName, message) => {
  return new Promise((resolve, reject) => {
    exec(
      `git add .`,
      {
        encoding: 'utf8',
        cwd: folderName,
      },
      (error, stdout) => {
        if (error) {
          return reject(error);
        }

        exec(
          `git commit -m "${message}"`,
          {
            encoding: 'utf8',
            cwd: folderName,
          },
          (error, stdout) => {
            if (error) {
              return reject(error);
            }

            resolve(stdout);
          },
        );
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