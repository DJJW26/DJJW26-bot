const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const profileModel = require("../models/profile");
module.exports = {
    name: 'give',
    aliases: 'share',
    description: 'give some coins to a player',
    category: 'economy',
    async execute(message, args, client) {
        let target;
        if (!message.mentions.users.size) {
            if (!args[0]) return message.reply('No user provided.')
            else {
                try {
                    target = message.guild.members.fetch(args[0]).id;
                } catch (err) {
                    target = null;
                    return message.reply('Provide a valid user.')
                }
            }
        }
        else target = message.mentions.users.first().id;

        if(target === message.author.id) return message.reply('Yeahh.. You cant share coins with yourself..')

        if (!args[1]) return message.reply('No amount to send provided');

        const coinsToDonate = parseInt(args[1]);
        if (isNaN(coinsToDonate)) return message.reply("Please enter a valid number");

        try {
            var ProfileData = await profileModel.findOne({ userID: message.author.id })
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

        if (coinsToDonate > ProfileData.coins) return message.reply('You dont have enough money to send, go withdraw some from your bank or beg for some.')
        if (coinsToDonate < 0) return message.reply('Please enter a valid number to send');

        const confirmBed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('Pending confirmation')
            .setDescription(`Are you sure you want to send ${coinsToDonate} to <@${target}>?`);

        message.reply({
            embeds: [confirmBed], components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('yes')
                            .setLabel('Yes')
                            .setStyle('SUCCESS'),
                        new MessageButton()
                            .setCustomId('no')
                            .setLabel('No')
                            .setStyle('DANGER')
                    )
            ]
        })

        let f = async(interaction) => {
            if(!interaction.isButton()) return;
            if(interaction.customId.includes('yes')){
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    },
                    {
                        $inc: {
                            coins: -coinsToDonate,
                        },
                    }
                );
        
                await profileModel.findOneAndUpdate(
                    {
                        userID: target,
                    },
                    {
                        $inc: {
                            coins: coinsToDonate,
                        },
                    }
                );
                message.reply(`Gave ${coinsToDonate} to <@${target}>`);
                client.off('interactionCreate', f);
            }
            if(interaction.customId.includes('no')){
                message.reply('Ok not doing that.')
                client.off('interactionCreate', f);
            }
        }

        client.on('interactionCreate', f);
    }
}