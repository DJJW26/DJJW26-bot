const { Permissions } = require('discord.js');
module.exports = {
    name: 'unlock',
    description: 'unlocks a specific channel',
    cooldowns: 1,
    execute (message, args, client, Discord, ProfileData, user, userQuery, master){
        if(message.member.permissions.has('BAN_MEMBERS') || message.member.id === '869768645067292693')
        {
            message.channel.permissionOverwrites.create(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
        }
        else 
        {
            message.reply('you do not have perms high enough to do that')
        }
    }

}