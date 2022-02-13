module.exports = {
    name: 'purge',
    description: 'purge messages',
    cooldowns: 1,
    async execute(message, args) {
        if (message.member.permissions.has('BAN_MEMBERS') || message.member.id === '869768645067292693') {
            if (!args[0]) return message.reply("Please enter the amount of messages you want to clear");
            if (isNaN(args[0])) return message.reply("Please enter a real number!");

            if (args[0] > 100) return message.reply("You cannot delete more than a 100 messages");
            if (args[0] < 1) return message.reply("You must delete atleast one message");

            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages);
                message.channel.bulkDelete(1);
            })
        }
    }
}