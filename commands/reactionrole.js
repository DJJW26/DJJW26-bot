const discord = require('discord.js');
module.exports = {
    name: 'reactionrole',
    description: 'adds roles to members upon reactiong to emojis',
    cooldowns: 5,
    async execute(message, client) {
        if (message.member.permissions.has('MANAGE_SERVER') || message.member.id === '869768645067292693') {
            const channel = '902533514677874688'
            const admin = message.guild.roles.cache.find(role => role.name === "admin");
            const muted = message.guild.roles.cache.find(role => role.name === "muted");

            const adminEmoji = '🛡'
            const mutedEmoji = '🔇'

            const newEmbed1 = new discord.MessageEmbed()
                .setColor('#e42643')
                .setTitle('Choose your role')
                .setDescription('react with 🛡 to get admin role and react with 🔇 to get muted role\n\n'
                    + `${adminEmoji} for admin team\n`
                    + `${mutedEmoji} for muted team`);

            let messageEmbed = await message.channel.send({ embeds: [newEmbed1] });
            messageEmbed.react(adminEmoji);
            messageEmbed.react(mutedEmoji);

            client.on('messageReactionadd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;


                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === adminEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(admin);
                    }
                    if (reaction.emoji.name === mutedEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(muted);
                    }
                } else {
                    return;
                }
            });
        }
        else {
            message.reply('you do not have the perms to do this');
        }
    }
}