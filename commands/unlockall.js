module.exports = {
    name: 'unlockall',
    description: 'unlocks certain channels',
    cooldowns: 1,
    category: 'moderation',
    execute (message){
        const unlockChannel = [];
        if(message.member.permissions.has('BAN_MEMBERS') || message.member.id === '869768645067292693'){
            message.guild.channels.cache.forEach(channel => {
                if(unlockChannel.includes(channel.id)) return 
                channel.permissionOverwrites.create(channel.guild.roles.everyone, { SEND_MESSAGES: null });
            });
        }
        else{
            message.channel.send('you do not have perms high enough');
        }
        message.channel.send('THIS CHANNEL HAS BEEN LOCKED DOWN');
    }
}