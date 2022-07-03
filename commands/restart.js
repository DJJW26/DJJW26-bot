const shell = require('shelljs')
module.exports = {
    name: 'reboot',
    aliases: 'restart',
    description: 'Restart the bot',
    category: 'dev',
    async execute(message,args,client) {
        message.react('👍');
        shell.exec('node main.js')
    }
}