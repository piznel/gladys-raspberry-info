const childProcess = require('child_process');
const Promise = require('bluebird');

module.exports = function sendCommand(cmd) {
  return Promise.resolve(exec(cmd))
}

function exec(command) {
  try {
    let answer = childProcess.execSync(command).toString()
    return answer;
  } catch (e) {
    // treat execute error as empty.
    return;
  }
}