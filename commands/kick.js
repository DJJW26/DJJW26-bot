module.exports = {
    name: 'kick',
    description: 'kicks a member',
    cooldowns: 1,
    execute(message){
        const member = message.mentions.users.first();
        if(!member) return message.reply('Mention a user.');
        const userID = message.guild.members.cache.get(member.id);
        if (message.member.permissions.has('KICK_MEMBERS')|| message.member.id === '869768645067292693'){
            if(userID.kickable == true){
                userID.kick();
                message.channel.send(`**${member.username}** has been kicked`);
            }
            else{
                message.channel.send(`Failed to kick **${member.username}** `);
            }
        }
        else {
            message.reply('You dont have perms to do that');
        }
    }
}