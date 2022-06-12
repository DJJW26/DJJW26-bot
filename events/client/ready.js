const shell = require('shelljs');

module.exports = () => {
    console.log('bot is online');
    shell.exec('node deploy.js')
}
