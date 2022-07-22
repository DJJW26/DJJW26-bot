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
            data.coins = data.coins + 25000;
            data.save();
        }
        message.channel.send({ embeds: [embed] });
    }
}