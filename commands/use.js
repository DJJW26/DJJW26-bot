const items = require('../shopItems');
const Inventory = require('../models/inventory');

module.exports = {
    name: 'use',
    description: 'used to use an item',
    async execute(message, args, client, Discord) {
        const itemToUse = args[0];

        if (!itemToUse) return message.reply('What item do you wanna use?');

        const validItem = !!items.find((val) => val.item === itemToUse);
        if (!validItem) return message.reply('That item doesnt even exist?');

        const params = {
            User: message.author.id,
        }
        await Inventory.findOne(params, async (err, data) =>{
            if(!data) return message.reply('You dont have that item?')
            const hasItem = Object.keys(data.Inventory).includes(itemToUse);
            if(!hasItem) return message.reply('You dont have that item?');
        })

        const usableItem = !!items.find((val) => val.item === itemToUse)
            .usable;
        if(!usableItem) return message.reply('You cant use that item?')

        const use = !!item.find((val) => val.item === itemToUse).use(message, args, client, Discord);
    }
}