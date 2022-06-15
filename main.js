const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ intents: 32767 }, { partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_PRESENCES"] });
const mongoose = require("mongoose");

const { Player } = require('discord-player');
const { Client, Intents } = require('discord.js');

const fs = require('fs');

client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'slash_command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
});

client.snipes = {
    snipes: new Discord.Collection(),
    esnipes: new Discord.Collection(),
}

client.switches = {
    commands: true,
    slashCommands: true,
}

client.trusted = ['869768645067292693', '561130926218674199'];

mongoose.connect(process.env.MONGODB_SRV, {
    useNewURLParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to the database!')
}).catch((err) => {
    console.log(err);
});

client.login(process.env.DISCORD_TOKEN);