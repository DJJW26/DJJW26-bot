const { MessageEmbed } = require('discord.js');
const yts = require('yt-search');

module.exports = {
    name: 'youtube',
    aliases: ['yt', 'yt-search'],
    cooldown: 5,
    async execute(message, args) {
        if (!args.length) return message.reply('Provide video name')
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Videos')
        .setDescription('Top 3 videos found: ')
        const r = await yts(args.join(" "))
        const videos = r.videos.slice(0, 3)
        videos.forEach(function (v) {
            const views = String(v.views).padStart(10, ' ')
            embed.addField('\u200B', `${views} | ${v.title} (${v.timestamp}) | ${v.author.name} | [LINK](${v.url})`)
        })
        message.reply({embeds: [embed]});
    }
}