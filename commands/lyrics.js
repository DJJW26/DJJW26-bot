const lyrics = require('lyrics-finder');
const yt = require('yt-search'); 
const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'lyrics',
    description: 'Searches song lyrics from Google',
    cooldowns: 1,
    async execute(message, args, Discord) {
        if (!args) return message.channel.send('No song specified'); 

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL()); 
        let lyric = await lyrics(args.join(' ')); 
        let noLyric = 0

        if (!lyric) {
            lyric = `No Lyrics found for ${args.join(' ')}`; 
            noLyric++ 
        }

        embed.setDescription(lyric.length >= 4093 ? lyric.substring(0, 4093) + '...' : lyric); 

        if (noLyric == 0) {
            let res = await yt.search(args.join(' ')); 
            let song = res.videos[0]; 
            if (song) embed.setTitle(song.title).setURL(song.url).setThumbnail(song.image) 
        }

        message.channel.send({ embeds: [embed] }) 
    }
}