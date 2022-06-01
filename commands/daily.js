const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js');
const profileModel = require("../models/profileSchema");
module.exports = {
    name: 'daily',
    desciption: 'Gives you your daily reward',
    category: 'economy',
    cooldown: 86400,
    async execute(message, args) {
        let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle(`${message.author.username}'s daily coins`)
            .setDescription('\n 25,000 daily coins have been added to your wallet!\n')

        await profileModel.findOneAndUpdate(
            {
                userID: message.author.id,
            },
            {
                $inc: {
                    coins: 25000,
                },
            }
        );
        message.channel.send({embeds: [embed]});
    }
}