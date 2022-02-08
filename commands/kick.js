module.exports = {
    name: 'kick',
    description: 'kicks a member',
    cooldowns: 1,
    execute(message, args, client, Discord, ProfileData, user, userQuery, master){
        const member = message.mentions.users.first();
        const userID = message.guild.members.cache.get(member.id);
        if (message.member.permissions.has('KICK_MEMBERS')|| message.member.id === '869768645067292693'){
            if(userID.kickable == true){
                userID.kick();
                message.channel.send(`**${name}** has been kicked`);
            }
            else{
                message.channel.send(`Failed to kick **${name}** `);
            }
        }
        else {
            message.reply('you dont have perms to do that');
        }
    }
}