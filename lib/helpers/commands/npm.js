const { exec } = require('child_process');

module.exports = async ({ packages, folderName }) => {
  await npmInit(folderName);

  if (packages) {
    await npmPackages(folderName, packages);
  }
};

const npmInit = (folderName) => {
  return new Promise((resolve, reject) => {
    exec(
      `npm init -y`,
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

const npmPackages = (folderName, packages) => {
  const packagesLine = packages.reduce(
    (previous, current) => `${previous} ${current}`,
  );

  return new Promise((resolve, reject) => {
    exec(
      `npm install ${packagesLine}`,
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
  });
};