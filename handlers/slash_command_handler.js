const fs = require('fs');

module.exports = (client, Discord) => {
    const commandFiles = fs
        .readdirSync('./slashcommands/')
        .filter((file) => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`../slashcommands/${file}`)

        client.slashCommands.set(command.data.name, command)
    }
}