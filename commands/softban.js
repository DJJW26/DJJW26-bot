module.exports = {
    name: 'softban',
    description: 'softbans a member',
    cooldowns: 5,
    execute(message){
        const member = message.mentions.users.first();
        const userID = message.guild.members.cache.get(member.id);
        const name = member.username;
        if (message.member.permissions.has('BAN_MEMBERS')|| message.member.id === '869768645067292693'){
            if(userID.kickable == true){
                userID.ban();
                userID.unban();
                message.channel.send(`**${name}** has been softbanned`);
            }
            else{
                message.channel.send(`Failed to softban **${name}**`);
            }
        }
        else {
            message.reply('you dont have perms to do that');
        }
    }
}