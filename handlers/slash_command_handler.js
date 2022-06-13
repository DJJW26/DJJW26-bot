const fs = require('fs');

module.exports = (client, Discord) => {
    const commandFiles = fs
        .readdirSync('../slash_commands/')
        .filter((file) => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`../slash_commands/${file}`);

        client.slashCommands.set(command.data.name, command)
    }
}