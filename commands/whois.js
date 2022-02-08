const Discord = module.require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'whois',
    description: 'gives description bout user',
    async execute(message, args, client, Discord, ProfileData, userQuery, master) {

        const user = message.mentions.users.first() || message.author;
        const roles = new Map();
        const joinDiscord = moment(user.createdAt).format('llll');
        const joinServer = moment(user.joinedAt).format('llll');
        const embed = new Discord.MessageEmbed()
            .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
            .setDescription(`${user}`)
            .setColor(`RANDOM`)
            .setThumbnail(`${user.displayAvatarURL()}`)
            .addField('Joined at:', `${moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
            .addField('Status:', user.presence?.status(), true)
//            .addField('Roles:', user.roles.map(r => `${r}`).join(' | '), true)
            .setFooter(`ID: ${user.id}`)
            .setTimestamp();

        message.channel.send({ embeds : [embed] });
    }
}