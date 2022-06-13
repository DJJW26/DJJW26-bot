const {
    Message,
    Client,
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow,
    SelectMenuInteraction,
} = require('discord.js')

module.exports = {
    name: 'help',
    description: 'send an embed for help',
    cooldowns: 1,
    category: 'utility',
    async execute(message, args, client) {
        const embed = new MessageEmbed()
            .setTitle('Help Command')
            .setColor('GREEN')
            .setDescription(`Select a Category to see the commands!`)
            .setThumbnail(client.user.displayAvatarURL())

        const selection = new MessageSelectMenu()
            .setPlaceholder('Choose a Category...')
            .setCustomId('help-menu')
            .setOptions([
                {
                    label: 'Fun',
                    value: 'select-fun',
                    description: 'Fun commands to try out!',
                    emoji: '🎈',
                },
                {
                    label: 'Developer',
                    value: 'select-dev',
                    description:
                        "Chances are, you can't use any of these commands.",
                    emoji: '👩‍💻',
                },
                {
                    label: 'Utility',
                    value: 'select-utility',
                    description: 'Commands that might help you.',
                    emoji: '⚙',
                },
                {
                    label: 'Economy',
                    value: 'select-economy',
                    description: "Custom economy commands",
                    emoji: '💰',
                },
                {
                    label: 'Moderation',
                    value: 'select-moderation',
                    description: 'Moderation commands',
                    emoji: '🔨',
                },
                {
                    label: 'Music',
                    value: 'select-music',
                    description: 'Music commands',
                    emoji: '🎵',
                }
            ])
            .setMaxValues(1)
            .setMinValues(1)

        const mainMessage = await message.channel.send({
            embeds: [embed],
            components: [new MessageActionRow().addComponents([selection])],
        })

        const mainCollector = mainMessage.createMessageComponentCollector({
            time: 60 * 1000 * 2,
            filter: (u) => u.user.id === message.author.id,
        })

        mainCollector.on('collect', async (select) => {
            const value = select.values[0]
            const category = value.replace('select-', '')
            const commands = {
                legacy: client.commands.filter(
                    (c) => c.category && c.category === category
                ),
                slash: client.slashCommands.filter(
                    (c) => c.category && c.category === category
                ),
            }

            select.deferUpdate()

            embed.setFields([
                {
                    name: 'Legacy Commands',
                    value:
                        commands.legacy
                            .map((c) => `\`${c.name}\` `)
                            .join(', ') || 'No commands here!',
                    inline: false,
                },
                {
                    name: 'Slash Commands',
                    value:
                        commands.slash
                            .map((c) => `\`${c.data.name}\` `)
                            .join(', ') || 'No commands here!',
                    inline: false,
                },
            ])
            select.message.edit({
                embeds: [embed],
                components: [new MessageActionRow().addComponents([selection])],
            })
        })
    }
}