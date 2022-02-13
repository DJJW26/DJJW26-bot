module.exports = {
    name: 'exit',
    description: 'shows that a user has left the chat',
    cooldowns: 1,
    execute(message, user){
        message.channel.send(`**${user}** has entered the chat`);
    }
}