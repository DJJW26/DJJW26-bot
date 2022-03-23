const {Discord} = require("discord.js");
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'dice',
    description: 'rolls a dice',
    aliases: ['roll'],
    cooldowns: 2,
    execute(message, args) {
        if (args.length > 0) {
            const errorEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Invalid args')
            .setDescription('Invalid args provided, please provide arguments in this format" \n `%roll <minimum output number>-<maximum output number>` \n Example: `%roll 8-20`');
            let range = args[0];
            if(range.includes('-')){
                let rangeArgs = range.split('-');
                if(isNaN(rangeArgs[0]) || isNaN(rangeArgs[1])) return message.channel.send({embeds: [errorEmbed]});
                let max1 = rangeArgs[1];
                let min1 = rangeArgs[0];
                const output = Math.floor(Math.random() * (max1 - min1 + 1) + min1);
                message.channel.send('Rolling...').then((sent) => {
                    sent.edit(`${message.author.username} rolls a ${output}`);
                })
            }
            else{
                message.channel.send({embeds: [errorEmbed]});
            }
        }
        else {
            let max = 6;
            let min = 1;
            const dice = Math.floor(Math.random() * (max - min + 1) + min);
            message.channel.send('Rolling dice...').then((sent) => {
                sent.edit(`${message.author.username} rolls a ${dice}`);
            })
        }
    }
}