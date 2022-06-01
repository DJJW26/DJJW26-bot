const { Util } = require("discord.js");

module.exports = {
    name: 'emoji-steal',
    aliases: ['emojiSteal','emoji'],
    description: 'Steals an emoji from a server',
    category: 'utility',
    execute(message, args){
        if(!args.length){
            return message.reply('please specify the emoji')
        }

        for(const rawEmoji of args){
            const parsedEmoji = Util.parseEmoji(rawEmoji);

            if(parsedEmoji.id) {
                const extension = parsedEmoji.animated ? ".gif" : '.png';
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                message.guild.emojis
                .create(url, parsedEmoji.name)
                .then((emoji) => message.channel.send(`Added: \`${emoji.url}\``))
            }
        }
    }
}