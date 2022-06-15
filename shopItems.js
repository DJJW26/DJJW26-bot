const Inventory = require('./models/inventory');

module.exports = [
    {
        item: 'Vertical slab',
        price: 10000,
        description: 'What?? How?? Vertical slab??!!',
        usable: false
    },
    {
        item: 'Daily box',
        price: 'Cannot be bought with',
        description: 'Small chance of getting this box from the daily command.',
        usable: true,
        async use(message, args, client, Discord, profileData) {
            let max = 500000
            let min = 5000
            const randCoins = Math.floor(Math.random() * (max - min + 1) + min)

            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: randCoins,
                    },
                }
            );

            const lootBed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle(`${message.author.username}'s loot`)
                .setDescription('You earned the following stuff: ')
                .addField({ name: 'Coins: ', value: `${randCoins}` })

            const items = ['Iron', 'Jug', 'Biscuit', 'Door']

            const itemCount = Math.floor(Math.random() * (4 - 1 + 1) + 1);

            const chosenItems = items.sort(() => Math.random() - Math.random()).slice(0, itemCount);

            chosenItems.forEach(element => {
                lootBed.addField({ name: `${element}`, value: '1' });

                const params = {
                    User: message.author.id,
                }

                Inventory.findOne(params, async (err, data) => {
                    if (data) {
                        const hasItem = Object.keys(data.Inventory).includes(element);
                        if (!hasItem) {
                            data.Inventory[element] = 1;
                        } else {
                            data.Inventory[element]++;
                        }
                        await Inventory.findOneAndUpdate(params, data);
                    } else {
                        new Inventory({
                            User: message.author.id,
                            Inventory: {
                                [element]: 1,
                            },
                        }).save();
                    }
                });
            })

            const dailyId = 'Daily box'

            Inventory.findOneAndUpdate(params, async (err, data) => {
                data.Inventory[dailyId]--;
            }).save();

            message.channel.send({ embeds: [lootBed] })
        }
    },
    {
        item: 'Door',
        price: 4000,
        description: 'Just a door.',
        usable: false
    },
    {
        item: 'Ping',
        price: 'Cannot be bought with',
        description: 'A ping.',
        usable: true,
        async use(message, args, client, Discord, profileData) {
            const pingItemToRemove = 'Ping';

            const params = {
                User: message.author.id,
            };

            Inventory.findOne(params, async (err, data) => {
                data.Inventory[pingItemToRemove]--;
                await Inventory.findOneAndUpdate(params, data);
            });

            return message.channel.send(`<@${message.author.id}>`);
        }
    },
    {
        item: 'Jug',
        price: 6000,
        description: 'A jug.',
        usable: true,
        async use(message, args, client, Discord, profileData) {
            randIntJug = Math.floor(Math.random() * (10 - 1 + 1) + 1);

            if (randIntJug == 7) {
                const jugItemToRemove = 'Jug'

                const params = {
                    User: message.author.id,
                };

                Inventory.findOne(params, async (err, data) => {
                    data.Inventory[jugItemToRemove]--;
                    await Inventory.findOneAndUpdate(params, data);
                });
                return message.channel.send('Uh oh, your jug broke.');
            }

            message.channel.send('You drank some water from your jug. The water is good')

        }
    },
    {
        item: 'Iron',
        price: 20000,
        description: 'Some iron.',
        usable: false
    },
    {
        item: 'Biscuit',
        price: 'Cannot be bought with',
        description: 'Just a biscuit.',
        usable: true,
        async use(message, args, client, Discord, profileData) {
            const biscuitItemToRemove = 'Biscuit'

            const params = {
                User: message.author.id,
            };

            Inventory.findOne(params, async (err, data) => {
                data.Inventory[biscuitItemToRemove]--;
                await Inventory.findOneAndUpdate(params, data);
            });
            return message.channel.send('You ate some biscuit. This biscuit is good.');
        }
    }
]