const fs = require('fs');
const currencyModel = require('../models/currencyModel');
const items = require('../shopItems')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
  name: "buy",
  description: 'Used to buy an item from the shop',
  category: 'economy',
  async execute(message, args, client) {
    if (!args[0]) return message.reply('Please specify an item to buy');
    const itemToBuy = args[0];

    const validItem = !!items.find((val) => val.item === itemToBuy);
    if (!validItem) return message.reply('The item that you wanted to buy is not even an item');

    const itemPrice = items.find((val) => val.item === itemToBuy)
      .price;


      if(itemPrice == 'Cannot be bought with') return message.reply('You cant buy that item?');

    try {
      ProfileData = await currencyModel.findOne({ userID: message.author.id })
      if (!ProfileData) {
        let profile = await currencyModel.create({
          userID: message.author.id,
          coins: 5000,
          bank: 0,
          Inventory: {},
        })
        profile.save();
      }
      ProfileData = await currencyModel.findOne({ userID: message.author.id })
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

        currencyModel.findOne(params, async (err, data) => {
          if (data) {
            const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
            if (!hasItem) {
              data.Inventory[itemToBuy] = 1;
            } else {
              data.Inventory[itemToBuy]++;
            }
            await currencyModel.findOneAndUpdate(params, data);
            await currencyModel.findOneAndUpdate(
              {
                userID: message.author.id,
              },
              {
                $inc: {
                  coins: -itemPrice,
                },
              }
            );
            message.reply({
              embeds: [new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`You have bought ${itemToBuy} and paid ${itemPrice}`)
                .setTitle(`Successfull ${itemToBuy} purchase`)]
            })
          } else {
            new currencyModel({
              User: message.author.id,
              Inventory: {
                [itemToBuy]: 1,
              },
            }).save();
            await currencyModel.findOneAndUpdate(
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