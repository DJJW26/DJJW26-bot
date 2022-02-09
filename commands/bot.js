module.exports = {
    name: 'bot',
    aliases: 'botclear',
    execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master) {
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