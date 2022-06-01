const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "dm",
    aliases: ['text, message, direct-message'],
    description: 'Why have i even given this',
    category: 'utility',
    execute(message, args) {
        const errorMessage = 'Please enter a correct input: \n `%dm <user mention>/<user id> <message>` \n Example: `%dm @DJJW26#4190 idk if there is any use to this command except to send msgs to ppl who have blocked me`'
        if (!args.length) return message.reply(errorMessage);
        if (!message.mentions.users.size) return message.reply(errorMessage);
        else {
            if (args.length < 2) return message.reply('Please enter a message to send');
            if (message.mentions.users.first().bot) return message.reply('Well... yeah u cant dm bots, cuz there is no point in doing so');
            args.shift();
            const msg1 = args.join(' ');
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle('New message')
                .setDescription(`New message from \`${message.author.tag}\` \n \`${msg1}\``);
            message.mentions.users.first().send({ embeds: [embed] });
            message.react('👍');
        }
    }
}