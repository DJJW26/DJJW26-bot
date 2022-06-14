module.exports = {
    name: 'lockdown',
    description: 'lockdowns certain channels',
    cooldowns: 10,
    category: 'moderation',
    async execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('You do not have permission to use this command');

        const role = message.guild.roles.everyone;

        if (!args.length) return message.reply('Please specify true or false');

        const perms = role.permissions.toArray();

        if (args[0].toLowerCase() === 'true') {
            const newPerms = perms.filter(perm => perm !== 'SEND_MESSAGES');
            await role.edit({ permissions: newPerms });
            message.reply('Locked down all channels');
        } else if (args[0].toLowerCase() === 'false') {
            perms.push('SEND_MESSAGES');
            await role.edit({ permissions: perms });
            message.reply('Unlocked all channels');
        } else {
            return message.reply('Please specify true or false');
        }
    }
}