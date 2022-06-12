module.exports = async (Discord, client, interaction) => {
    console.log(interaction)
    if (!interaction.isCommand()) return

    const { commandName } = interaction

    const command = client.slashCommands.get(commandName)

    if (!command) return
    if (
        !client.switches.slashCommands &&
        !interaction.user.id == 869768645067292693
    ) {
        return interaction.reply({
            content: 'Slash Commands are disabled temporarily.',
        })
    }
    if (command.permissions) {
        if (!interaction.member.permissions.has(command.permissions)) {
            return interaction.reply({
                content: `You need the \`${command.permissions.toUpperCase()}\` permission to run this command.`,
                ephemeral: true,
            })
        }
    }

    try {
        await command.execute(interaction, client)
    } catch (e) {
        console.error(e)
        await interaction.reply({
            content:
                'There was an error executing this command, the devs are notified',
            ephemeral: true,
        })
    }
}