const Discord = require('discord.js');
const { poll } = require('discord.js-poll');

module.exports = {
    name: 'poll',
    description: 'Create a poll',
    execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master) {
        poll(message, args, '+', '#00D1CD');
    },
};