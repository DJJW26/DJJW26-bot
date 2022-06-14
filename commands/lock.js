module.exports = {
    name: 'lock',
    description: 'locks a specific channel',
    cooldowns: 10,
    category: 'moderation',
    execute (message){
        if(message.member.permissions.has('BAN_MEMBERS') || message.member.id === '869768645067292693')
        {
            message.channel.permissionOverwrites.create(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
            message.channel.send('THIS CHANNEL HAS BEEN LOCKED DOWN');
        }
        else 
        {
            message.reply('you do not have perms high enough to do that')
        }
    }

}