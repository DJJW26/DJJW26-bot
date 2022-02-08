module.exports = {
    name: 'invite',
    description: "sends bot invite",
    cooldowns: 1,
    execute(message, args, client, Discord, ProfileData, user, userQuery) {
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#2d84d2')
            .setTitle('Invite this bot to your server')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=873040545327501382&permissions=0&scope=bot')
            .setDescription('The link to invite the bot to your own server!')
            .addFields(
                { name: 'Link to invite the bot', value: 'https://discord.com/api/oauth2/authorize?client_id=873040545327501382&permissions=0&scope=bot' },
                { name: 'Upvote this bot', value: 'under devlopment :)' }
            )
            .setFooter('Upvote the bot please, it helps a lot!')

        message.channel.send({ embeds: [newEmbed] });
    }
}