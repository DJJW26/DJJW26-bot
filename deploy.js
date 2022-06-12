const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const clientId = "873040545327501382"

const commands = []
const commandFiles = fs
    .readdirSync('./slash_commands')
    .filter((file) => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./slash_commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)

    ; (async () => {
        try {
            console.log('Started refreshing application (/) commands.')

            await rest.put(Routes.applicationCommands(clientId), {
                body: commands,
            })

            console.log('Successfully reloaded application (/) commands.')
        } catch (error) {
            console.error(error)
        }
    })()