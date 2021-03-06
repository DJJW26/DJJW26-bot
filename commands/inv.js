const { MessageEmbed } = require('discord.js');
const Inventory = require('../models/currencyModel');
module.exports = {
  name: "inv",
  description: 'Lets the user check their inventory',
  aliases: ['inventory'],
  category: 'economy',
  async execute(message, args, client, Discord) {
    await Inventory.findOne({ User: message.author.id }, async (err, data) => {
      if (!data) return message.reply('Nothing to see here')
      const mappedData = Object.keys(data.Inventory).map((key) => {
        return `${key} ─ ${data.Inventory[key]}`
      }).join(' \n');

      message.channel.send({
        embeds: [new MessageEmbed()
          .setColor('GREEN')
          .setTitle(`${message.author.username}'s inventory`)
          .setDescription(`${mappedData}`)]
      });
    }).clone().catch(async (err) => { console.log(err) });
  }
}
