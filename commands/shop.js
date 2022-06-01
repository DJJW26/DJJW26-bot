const MessageEmbed = require('discord.js');
const Discord = require('discord.js');
const items = require('../shopItems.js')
const fs = require('fs');
module.exports = {
  name: "shop",
  description: "The item shop",
  category: "economy",
  async execute(message, args, client) {
    if(items.length === 0) return message.reply('There is no item for sale.')

    const shopList = items
      .map((value, index) => {
        return `**${index+1})** ${value.item} => ${value.price} coins`
      });
      message.channel.send(shopList.join(' \n'));
  }
}