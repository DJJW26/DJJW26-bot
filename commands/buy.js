const fs = require('fs');
const Inventory = require('../models/inventory');
const items = require('../shopItems')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
  name: "buy",
  async execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master, afks) {
    if (!args[0]) return message.reply('Please specify an item to buy');
    const itemToBuy = args[0];

    const validItem = !!items.find((val) => val.item === itemToBuy);
    if (!validItem) return message.reply('The item that you wanted to buy is not even an item');

    const itemPrice = items.find((val) => val.item.toLowerCase() === itemToBuy)
      .price;

    try {
      ProfileData = await profileModel.findOne({ userID: message.author.id })
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
          Inventory: [Item]
        })
        profile.save();
      }
      ProfileData = await profileModel.findOne({ userID: message.author.id })
    } catch (err) {
      console.log(err)
    }

    const userBalance = ProfileData.coins;
    if (userBalance < itemPrice) return message.reply(`You only have ${userBalance} while the item cost is ${itemPrice}. Go withdraw some money or beg for some.`);

    const confirmationEmbed = new MessageEmbed()
      .setColor('YELLOW')
      .setTitle('Confirm purchase')
      .setDescription(`Are you sure you want to buy ${itemToBuy} for ${itemPrice}?`)

    message.channel.send({
      embeds: [confirmationEmbed], components: [
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

    let f = async (interaction) => {
      if (!interaction.isButton()) return;
      if (interaction.customId.includes('yes')) {
        await interaction.deferUpdate()
        const params = {
          User: message.author.id,
        };

        Inventory.findOne(params, async (err, data) => {
          if (data) {
            const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
            if (!hasItem) {
              data.Inventory[itemToBuy] = 1;
            } else {
              data.Inventory[itemToBuy]++;
            }
            await Inventory.findOneAndUpdate(params, data);
            await profileModel.findOneAndUpdate(
              {
                userID: message.author.id,
              },
              {
                $inc: {
                  coins: -itemPrice,
                },
              }
            );
          } else {
            new Inventory({
              User: message.author.id,
              Inventory: {
                [itemToBuy]: 1,
              },
            }).save();
            await profileModel.findOneAndUpdate(
              {
                userID: message.author.id,
              },
              {
                $inc: {
                  coins: -itemPrice,
                },
              }
            );
          }
          message.reply({
            embeds: [new MessageEmbed()
              .setColor('GREEN')
              .setDescription(`You have bought ${itemToBuy} and paid ${itemPrice}`)
              .setTitle(`Successfull ${itemToBuy} purchase`)]
          })
        });

        client.off('interactionCreate', f)
      }
      if(interaction.customId.includes('no')){
        message.reply('Ok not doing that.')
        client.off('interactionCreate', f)
      }
    }

    client.on('interactionCreate', f);
  }
}