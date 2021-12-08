const child_process = require('child_process');

module.exports = async (commands, folderName) => {
  const commandsPromises = [];

  commands.forEach(line => {
    commandsPromises.push(executeCommand(line, folderName));
  });

  await Promise.all(commandsPromises);
};

const executeCommand = (line, folderName) => {
  return new Promise((resolve, reject) => {

    child_process.exec(
      line,
      {
        encoding: 'utf8',
        cwd: folderName,
        // timeout: 3000,
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
