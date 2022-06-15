const { MessageEmbed } = require('discord.js');
const profileModel = require(`./../models/profileSchema`)

module.exports = {
    name: 'bal',
    aliases: ['balance', 'cash', 'money', 'coins'],
    cooldown: 3,
    description: 'Lets you check your balance',
    category: 'economy',
    async execute(message, args) {
        var user = null;
        if (message.mentions.users.size) {
            user = message.mentions.users.first().id;
        } else {
            user = message.author.id;
        }
        try {
            var profile = await profileModel.findOne({ userID: user });
            if (!profile) {
                const newProfile = new profileModel({
                    userID: user,
                    coins: 5000,
                    bank: 0
                });
                await newProfile.save();
            }
            profile = await profileModel.findOne({ userID: user });
            const embed = new MessageEmbed()
                .setTitle('Balance')
                .setColor('GREEN')
                .addField('WALLET :', `${profile.coins.toLocaleString('en-US')}`)
                .addField('BANK :', `${profile.bank.toLocaleString('en-US')}`)

            const hm = await message.guild.members.cache.get(user);

            embed.setThumbnail(hm.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));

            return message.channel.send({ embeds: [embed] });
        } catch (err) {
            console.log(err)
        }
    }
}