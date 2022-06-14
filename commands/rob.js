const profileModel = require('../models/profileSchema');
module.exports = {
    name: 'rob',
    aliases: 'ripoff',
    description: 'rob off some coins from a player',
    category: 'economy',
    async execute(message, args, client, Discord) {
        if (!args.length) return message.reply('whom do you wanna rob?');

        if (!message.mentions.users.size) return message.reply('mention the person you wanna rob');

        const target = message.mentions.users.first();

        if (!target) return message.reply('user doesnt exist');

        const robberID = message.author.id;

        try {
            const targetData = await profileModel.findOne({ userID: target.id });
            if (!targetData) return message.reply('user hasnt made an account yet');

            const robberData = await profileModel.findOne({ userID: robberID });
            if (!robberData) return message.reply('hol up mate, u havent even started and went off robbing');
            const coins = targetData.coins;

            if (coins < 5000) return message.reply('user doesnt have atleast 5000 coins, go find someone else');

            if (robberData.coins < 5000) return message.reply('you should have atleast 5000 coins in your pocket');

            const max = targetData.coins;
            const max1 = robberData.coins;
            const min = 5000;

            const rand = Math.floor(Math.random() * (max - min) + min);
            const rand1 = Math.floor(Math.random() * (max1 - min) + min);
            var luck = null;

            const robEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('SUCCESS!')
                .setDescription(`You successfully robbed ${rand} from the user`)
                .setFooter('imagine robbing')

            const notrobEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('failure')
                .setDescription(`You failed and paid the user ${rand1}`)
                .setFooter('imagine robbing')

            if (rand % 2 == 0) {
                luck = 'yes';
            }
            else {
                luck = 'no'
            }

            if (luck == 'yes') {
                await profileModel.findOneAndUpdate(
                    {
                        userID: robberID,
                    },
                    {
                        $inc: {
                            coins: rand,
                        },
                    }
                );

                await profileModel.findOneAndUpdate(
                    {
                        userID: target.id,
                    },
                    {
                        $inc: {
                            coins: -rand,
                        },
                    }
                );

                message.channel.send({ embeds: [robEmbed] });
            }
            else {
                await profileModel.findOneAndUpdate(
                    {
                        userID: target.id,
                    },
                    {
                        $inc: {
                            coins: rand1,
                        },
                    }
                );

                await profileModel.findOneAndUpdate(
                    {
                        userID: robberID,
                    },
                    {
                        $inc: {
                            coins: -rand1,
                        },
                    }
                );

                message.channel.send({ embeds: [notrobEmbed] })
            }
        } catch (err) {
            console.log(err)
        }
    }
}