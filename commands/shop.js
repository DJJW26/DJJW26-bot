const MessageEmbed = require('discord.js');
const Discord = require('discord.js');

const fs = require('fs');
module.exports = {
  name: "shop",
  async execute(message, args){
    let shop_data = JSON.parse(Buffer.from(fs.readFileSync('./shop.json')).toString());
    let index = (args[0] || "1");
    let page = shop_data.pages[index];

    if(!page) {
      return message.channel.send("there are only 2 pages, where r u even searching dum")
    }

    const shop = new Discord.MessageEmbed()
    .setTitle("Shop")
    .setColor("RANDOM");

    for(let item of page.items){
      if('hidden' in item){
        if(!item.hidden){
          continue;
        }
      }
      shop.addField(item.name, `Description: \`${item.description || "None"}\`\ncost: \`${item.cost || "Null"}\``);
    }

    await message.channel.send({embeds : [shop] });

  }
}
