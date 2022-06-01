module.exports = {
    name: 'bon',
    description: 'bons a member',
    cooldowns: 2,
    category: 'fun',
    execute(message){
        const member = message.mentions.users.first();
        if(!member) return message.reply('Please enter a user')
        const userID = message.guild?.members?.cache?.get(member.id);
        const name = member.username;
        if (message.member.permissions.has('BAN_MEMBERS')|| message.member.id === '869768645067292693'){
            if(userID.kickable == true){
                message.channel.send(`**${name}** has been banned`);
            }
            else{
                message.channel.send(`Failed to ban **${name}**`);
            }
        }
        else {
            message.reply('You dont have perms to do that');
        }
    }
}