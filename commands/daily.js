const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js');
const currencyModel = require("../models/currencyModel");
module.exports = {
    name: 'daily',
    desciption: 'Gives you your daily reward',
    category: 'economy',
    cooldown: 86400,
    async execute(message) {
        let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle(`${message.author.username}'s daily coins`)
            .setDescription('\nDaily coins have been added to your wallet!\n')

        var data = await currencyModel.findOne({ User: message.author.id });

        if (!data) {
            new currencyModel({
                User: message.author.id,
                coins: 30000,
                bank: 0,
                Inventory: {},
            }).save();
        } else {
            if (data.DailyStreak == 0) {
                data.DailyStreak = 1;
                data.DailyStreakTime = new Date();
                data.coins = 30000;
                data.save();
            } else {
                data.coins += 500 * data.DailyStreak;;
                data.save();
            }
        }
        message.channel.send({ embeds: [embed] });
    }
}