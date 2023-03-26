const fork = require('child_process').fork;
const pushProcess = fork('childprocess.js');

module.exports = pushProcess;