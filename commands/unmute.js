module.exports = {
    name: 'unmute',
    description: 'unmutes a member',
    cooldowns: 1,
    execute(message, args, client, Discord, ProfileData, user, userQuery, master){
        const target = message.mentions?.users?.first();
        if(member.message.permissions.has('BAN_MEMBERS')|| message.member.id === '869768645067292693'){
            if(target) {
                let mainRole = message.guild.roles.cache.find(role => role.name === 'admin');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');
    
                let memberTarget = message.guild.members.cache.get(target.id);
    
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                message.channel.send (`<${memberTarget.user.id}> has been unmuted`);
            } else {
                message.channel.send('cant find that user');
            }
        }
        else{
            message.reply('you dont have the perms to do that')
        }
    }
}