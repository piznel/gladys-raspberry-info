const childProcess = require('child_process');

module.export = function(cmd) {
  return exec(cmd)
}

function exec(command) {
  try {
    return childProcess.execSync(command).toString();
  } catch (e) {
    // treat execute error as empty.
    return e;
  }
}