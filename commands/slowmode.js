module.exports = {
    name: 'slowmode',
    description: 'changes the slowmode',
    aliases: ['sm', 'slow'],
    category: 'moderation',
    execute(message, args) {
        if (message.member.permissions.has('BAN_MEMBERS') || message.member.id === '869768645067292693') {
            if (args[0] < 21600) {
                message.channel.setRateLimitPerUser(args[0]);
                message.reply(`Set the slowmode to ${args[0]}`)
            }
            else {
                message.reply('Cant set slowmode above 6 hrs, use 21600 for 6 hrs slowmode')
            }
        }
        else {
            message.reply(' you dont have the perms to do so');
        }
    }
}