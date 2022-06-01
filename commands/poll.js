const Discord = require('discord.js');
const { poll } = require('discord.js-poll');

module.exports = {
    name: 'poll',
    description: 'Create a poll',
    category: 'utility',
    execute(message, args) {
        poll(message, args, '+', '#00D1CD');
    },
};