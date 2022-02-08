module.exports = {
    name: 'bal',
    aliases: ['balance', 'cash', 'money', 'coins'],
    permissions: [],
    cooldown: 5,
    description: 'check users balance',
    async execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery) {
        let userBal = null;
        let userBal1 = null;
        if (args.length > 0) {
            if (args[1].startsWith('<@')) {
                if (args[1].startsWith('<@&')) {
                }
                else {
                    userBal = message.mentions.users.first();
                }
            }
        }
        else{
            userBal = message.author.id;
            userBal1 = message.author;
        }
        try {
            ProfileData = await profileModel.findOne({ userID: userBal})
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
        } catch (err) {
            console.log(err)
        }
        const balEmbed = new Discord.MessageEmbed()
            .setTitle(`**${userBal1.username}** bal`)
            .setColor('RANDOM')
            .setThumbnail(`${userBal1.displayAvatarURL()}`)
            .addField('WALLET :', `${ProfileData.coins}`)
            .addField('BANK :', `${ProfileData.bank}`)
            .setFooter('what a scrub')

        message.channel.send({ embeds: [balEmbed] });
    }

}