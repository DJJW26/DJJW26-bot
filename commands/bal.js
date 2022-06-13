const {MessageEmbed} = require('discord.js');
const profileModel = require(`./../models/profileSchema`)

module.exports = {
    name: 'bal',
    aliases: ['balance', 'cash', 'money', 'coins'],
    permissions: [],
    cooldown: 3,
    description: 'Lets you check your balance',
    category: 'economy',
    async execute(message, args) {
        let userBal = null;
        let userBal1 = null;
        if (args.length > 0) {
            if (args[0].startsWith('<@')) {
                if (args[0].startsWith('<@&')) {
                }
                else {
                    userBal = message.mentions.users.first();
                }
            }
        }
        else {
            userBal = message.author.id;
            userBal1 = message.author;
        }
        try {
            ProfileData = await profileModel.findOne({ userID: userBal })
            if (!ProfileData) {
                let profile = await profileModel.create({
                    userID: { type: String, required: true },
                    coins: { type: Number, default: 5000, min: 0 },
                    bank: { type: Number, default: 0, min: 0 },
                    inventory: [Item]
                })
                profile.save();
            }
            ProfileData = await profileModel.findOne({ userID: userBal })
        } catch (err) {
            console.log(err)
        }

        let wallet = ProfileData.coins.toLocaleString('en-US')
        let bank = ProfileData.bank.toLocaleString('en-US')

        const balEmbed = new MessageEmbed()
            .setTitle(`**${userBal1.username}** bal`)
            .setColor('GREEN')
            .setThumbnail(`${userBal1.displayAvatarURL()}`)
            .addField('WALLET :', `${wallet}`)
            .addField('BANK :', `${bank}`)
            .setFooter('what a scrub')

        message.channel.send({ embeds: [balEmbed] });
    }

}