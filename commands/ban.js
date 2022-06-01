module.exports = {
    name: 'ban',
    description: 'bans a member',
    cooldowns: 5,
    category: 'moderation',
    execute(message){
        const member = message.mentions.users.first();
        const userID = message.guild.members.cache.get(member.id);
        const name = member.username;
        if (message.member.permissions.has('BAN_MEMBERS')|| message.member.id === '869768645067292693'){
            if(userID.kickable == true){
                userID.ban();
                message.channel.send(`**${name}** has been banned`);
            }
            else{
                message.channel.send(`Failed to ban **${name}**`);
            }
        }
        else {
            message.reply('you dont have perms to do that');
        }
    }
}