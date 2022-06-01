module.exports = {
    name: 'bot',
    description: 'Clears all bot messages',
    aliases: 'botclear',
    cooldowns: 5,
    category: 'utility',
    execute(message) {
        try {
            message.channel.messages.fetch().then(messages => {
                const botMessages = messages.filter(msg => msg.author.bot);
                message.channel.bulkDelete(botMessages);
            });
        } catch (err) {
            return;
        }
        message.delete();
    }
}