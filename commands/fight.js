const { MessageEmbed, MessageButton } = require('discord.js');
const { Collection } = require('discord.js');
const game = require('discord-fight-game');

module.exports = {
    name: 'fight',
    description: 'Fight someone.',
    category: 'fun',
    async execute(message, args, client) {
        const fight = new game(client)
        fight.solo(message)/*
        const target = message.mentions.users.first();
        if (!target) return message.channel.send('You need to mention someone to fight!');

        client.fighters = new Collection();
        client.fighters.set(message.author.id, 1);
        client.fighters.set(target.id, 1);

        var authorHealth = 100
        var targetHealth = 100

        const fightbed = new MessageEmbed()
            .setDescription(`${message.author.username}${target}!`)
        */
    }
}