const db = require('../models/hlModel')

module.exports = {
    name: 'highlight',
    description: 'Highlights a word in a message',
    category: 'utility',
    aliases: ['hl'],
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You must provide a word to highlight.`);
        }

        const word = args[0];

        if(word == 'list') {
            db.find({ Users: `${message.author.id}` }, (err, data) => {
                if(!data.length) {
                    return message.channel.send(`No words have been highlighted for <@${message.author.id}>`);
                }
                const words = data.map(d => d.Word);
                const embed = new Discord.MessageEmbed()
                    .setTitle('Highlighted Words')
                    .setDescription(words.join('\n'))

                return message.channel.send(embed);
            });
        }

        const hl = await db.findOne({ Word: word }, (err, data) => {
            if (!data) {
                new db({
                    Word: word,
                    Users: [message.author.id],
                }).save();
                message.react("👍");
            } else {
                data.Users.push(message.author.id);
                data.save();
                message.react("👍");
            }
        });
    }
}