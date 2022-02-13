module.exports = {
    name: 'bot',
    aliases: 'botclear',
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