module.exports = {
    name: 'pressf',
    execute(message, args) {

        if (!args.length) return message.reply('What do you want to pay respect to?');

        message.channel.send(`Ok everyone, lets pay respects to ${args.join(' ')} by reacting to 🇫`).then((sent) => {
            sent.react('🇫');

            const filter = (reaction) => {
                return reaction.emoji.name === '🇫';
            };

            const collector = sent.createReactionCollector({ filter, max: 100, time: 60000 });

            const respecters = [];

            collector.on('collect', (reaction, user) => {
                respecters.push(user.tag);
            })

            collector.on('end', collected => {
                respecters.shift();
                if (!respecters.length) {
                    message.channel.send(`No one paid their respects to ${args.join(' ')}`);
                }
                for (var i = 0; i < respecters.length; i++) {
                    message.channel.send(`\`${respecters[i]}\` has paid respects to \`${args.join(' ')}\``);
                }
            })
        });
    }
}