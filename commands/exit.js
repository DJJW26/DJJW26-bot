module.exports = {
    name: 'exit',
    description: 'shows that a user has left the chat',
    cooldowns: 1,
    category: 'fun',
    execute(message){
        message.channel.send(`**${message.author.username}** has left the chat`);
    }
}