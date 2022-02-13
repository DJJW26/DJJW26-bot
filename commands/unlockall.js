const unlockChannel = ['850056629612970004','845610764613189633','882876945682022461'];
module.exports = {
    name: 'unlockall',
    description: 'unlocks certain channels',
    cooldowns: 1,
    execute (message){
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