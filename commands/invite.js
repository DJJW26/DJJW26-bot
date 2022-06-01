const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'invite',
    description: "Use this to invite the bot to your server",
    cooldowns: 1,
    category: 'utility',
    execute(message, Discord) {
        const newEmbed = new MessageEmbed()
            .setColor('#2d84d2')
            .setTitle('Invite this bot to your server')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=873040545327501382&permissions=8&scope=bot%20applications.commands')
            .setDescription('The link to invite the bot to your own server!')
            .addFields(
                { name: 'Link to invite the bot', value: 'https://discord.com/api/oauth2/authorize?client_id=873040545327501382&permissions=8&scope=bot%20applications.commands' },
                { name: 'Upvote this bot', value: 'under devlopment :)' }
            )
            .setFooter('Upvote the bot please, it helps a lot!')

        message.channel.send({ embeds: [newEmbed] });
    }
}