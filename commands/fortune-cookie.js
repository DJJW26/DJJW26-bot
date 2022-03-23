const Discord = require('discord.js');
const MessageEmbed = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'fortune-cookie',
    aliases: ['fortuneCookie', 'fortune', 'cookie'],
    description: 'open a fortune cookie',
    async execute(message) {
        try {
            ProfileData = await profileModel.findOne({ userID: message.author.id })
            if (!ProfileData) {
                let Item = await profileModel.create({
                    name: { type: String, required: true },
                    aliases: { type: Array, default: [] },
                    description: String,
                    cost: { type: Number, required: true },
                });


                let profile = await profileModel.create({
                    userID: { type: String, required: true },
                    coins: { type: Number, default: 5000, min: 0 },
                    bank: { type: Number, default: 0, min: 0 },
                    inventory: [Item]
                })
                profile.save();
            }
            ProfileData = await profileModel.findOne({ userID: message.author.id })
        } catch (err) {
            console.log(err)
        }

        if (ProfileData.coins > 100) {
            let answers = JSON.parse(Buffer.from(fs.readFileSync('./node_modules/fortune-cookie/fortune-cookie.json')).toString());
            let max = 250;
            let min = 0;
            const answer = Math.floor(Math.random() * (max - min + 1) + min);
            const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Fortune Cookie')
                .setDescription(`Your cookie says: \n \n \` ${answers[answer]} \``)
                .setFooter(`${message.author.username}'s fortune cookie`)
                .setTimestamp();
            message.channel.send({ embeds: [embed] });
        }
        else {
            return message.reply('you need atleast 100 coins to open a fortune cookie, we dont give em for free');
        }
    }
}