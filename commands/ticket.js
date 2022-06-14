const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'ticket',
    description: 'creates a message that will create a ticket',
    cooldowns: 600,
    category: 'utility',
    async execute(message, args, client, Discord) {
        const ticketEmoji = '📨';
        const ticketEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Create a ticket to get support')
            .setDescription('React with 📨 to create a ticket')
            .setFooter('Support')
        await message.channel.send({ embeds: [ticketEmbed] }).then((m) => {
            m.react('📨')
        })
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton
                    .setLabel('Primary')
                    .setStyle('PRIMARY'),
            );

        let embed = msg.embeds[0];
        reaction.users.remove(message.author.id);

        const modRole = message.guild.roles.cache.find(role => role.name === 'admin');
        const channel = await message.guild.channels.create(`ticket-${message.author.username}`)

        await channel.setParent('872387869866590219');
        console.log(channel.parentID);

        channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false, 'VIEW_CHANNEL': false });
        channel.permissionOverwrites.edit(message.author, { 'SEND_MESSAGES': true, 'VIEW_CHANNEL': true })

        const supportEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor('Welcome to support!')
            .setDescription(`Dear, <@${message.author.id}>\nThank you for contacting our support team! We will reach to you ASAP!`)
        channel.send({ embeds: [supportEmbed] });

        const reachEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor('We will reach to you ASAP!')
            .setDescription(`<#${channel.id}>`)
        message.channel.send({ embeds: [reachEmbed] })
    }
}
