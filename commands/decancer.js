const decancer = require('decancer');

module.exports = {
    name: 'decancer',
    description: 'Used to remove special characters from a nick',
    async execute(message, args, client) {
        const hasPerms = message.member.permissions.has('MANAGE_NICKNAMES');

        if (!hasPerms) return message.reply('No perms.');

        if (!message.mentions.users.size) {
            if (!args.length) return message.reply('Please provide a user.')
            try {
                var user = await client.users.cache.get(args[0]);
            } catch (err) {
                message.reply('Cant find the user.')
            }
        }
        else user = message.mentions.users.first();

        const cleaned = decancer(user.username);

        message.guild.members.edit(user.id, { nick: `${cleaned}`})
    }
}