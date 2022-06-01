const fs = require('fs');
const Inventory = require('../models/inventory');
const items = require('../shopItems')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
  name: "sell",
  description: "Sell some items",
  category: "economy",
  async execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master) {
    if (!args[0]) return message.reply('Please specify an item to sell');
    const itemToSell = args[0];
    console.log(itemToSell);

    const validItem = !!items.find((val) => val.item === itemToSell);
    if (!validItem) return message.reply('The item that you wanted to sell is not even an item');
    console.log(validItem);

    const itemPrice = items.find((val) => val.item === itemToSell)
      .price;
    console.log(itemPrice);

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

    const params = {
      User: message.author.id,
    };

    Inventory.findOne(params, async (err, data) => {
      if (data) {
        const hasitem = Object.keys(data.Inventory).includes(itemToSell)
        if (!hasitem) return message.reply('You dont even have that item in ur inventory.');
      } else {
        new Inventory({
          User: message.author.id,
          Inventory: {},
        }).save();
        await Inventory.findOneAndUpdate(params, data);
      }
    })

    const confirmationEmbed = new MessageEmbed()
      .setColor('YELLOW')
      .setTitle('Confirm purchase')
      .setDescription(`Are you sure you want to sell ${itemToSell} for ${itemPrice / 3}?`)

    message.channel.send({
      embeds: [confirmationEmbed], components: [
        new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('sell_yes')
              .setLabel('Yes')
              .setStyle('SUCCESS'),
            new MessageButton()
              .setCustomId('sell_no')
              .setLabel('No')
              .setStyle('DANGER')
          )
      ]
    })

    let f = async (interaction) => {
      if (!interaction.isButton()) return;
      if (interaction.customId.includes('sell_')) {
        if (interaction.customId.includes('yes')) {
          await interaction.deferUpdate()
          const params = {
            User: message.author.id,
          };

          const addCoins = Math.floor(itemPrice / 3);

          Inventory.findOne(params, async (err, data) => {
            if (data) {
              const item = data.Inventory[itemToSell];
              if (item.amount < 2) {
                delete data.Inventory[itemToSell]
                await Inventory.findOneAndUpdate(params, data);
                await profileModel.findOneAndUpdate(
                  {
                    userID: message.author.id,
                  },
                  {
                    $inc: {
                      coins: addCoins,
                    },
                  }
                );
              } else {
                data.Inventory[itemToSell]--;
                await Inventory.findOneAndUpdate(params, data);
                await profileModel.findOneAndUpdate(
                  {
                    userID: message.author.id,
                  },
                  {
                    $inc: {
                      coins: itemPrice / 3,
                    },
                  }
                );
              }
            } else {
              new Inventory({
                User: message.author.id,
                Inventory: {},
              }).save();
              await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc: {
                    coins: itemPrice / 3,
                  },
                }
              );
              await Inventory.findOneAndUpdate(params, data);
            }
            message.reply({
              embeds: [new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`You have sold ${itemToSell} and got ${itemPrice / 3}`)
                .setTitle(`Successfull ${itemToSell} sale`)]
            })
          });

          client.off('interactionCreate', f)
        }
        if (interaction.customId.includes('no')) {
          message.reply('Ok not doing that.')
          client.off('interactionCreate', f)
        }
      }
    }

    client.on('interactionCreate', f);
  }
}