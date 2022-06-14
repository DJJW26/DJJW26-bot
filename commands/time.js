const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
} = require('discord.js')
const { TimestampStyles } = require('@discordjs/builders')
const { getMilliseconds } = require('better-ms')

module.exports = {
    name: 'time',
    description: 'Get relative time.',
    usage: `<time>`,
    category: 'utility',
    async execute(message, args) {
        const formatTime = (time, format) => {
            return `<t:${(time / 1000).toFixed(0)}:${format || 'R'}>`
        }

        if (!args[0])
            return message.reply(
                'Please provide time.\n\nExample: `%time 30 minutes`'
            )

        const rawTime = args.join(' ')
        const time = getMilliseconds(rawTime)
        if (!time)
            return message.reply(
                `Couldn't parse \`${rawTime}\` as valid time.\n\nExample: \`fh time 30 minutes\``
            )

        const embed = new MessageEmbed()
            .setTitle('Time Formatter')
            .setDescription(
                'Choose a format and click the button to get text that you can copy.'
            )
        const components = [new MessageActionRow(), new MessageActionRow()]
        const array = [
            ['Short time', 't'],
            ['Long time', 'T'],
            ['Short date', 'd'],
            ['Long date', 'D'],
            ['Short date time', 'f'],
            ['Long date time', 'F'],
            ['Relative time', 'R'],
        ]
        for (const val of array) {
            embed.addField(
                val[0],
                formatTime(
                    new Date().getTime() + time,
                    val[1]
                ),
                true
            )
            if (components[0].components.length < 5) {
                components[0].addComponents([
                    new MessageButton()
                        .setLabel(val[0])
                        .setStyle('SUCCESS')
                        .setCustomId(
                            `${(Math.random() + 1).toString(36).substring(2)}:${val[1]
                            }`
                        ),
                ])
            } else {
                components[1].addComponents([
                    new MessageButton()
                        .setLabel(val[0])
                        .setStyle('SUCCESS')
                        .setCustomId(
                            `${(Math.random() + 1).toString(36).substring(2)}:${val[1]
                            }`
                        ),
                ])
            }
        }

        const m = await message.channel.send({
            embeds: [embed],
            components,
        })
        const collector = m.createMessageComponentCollector({
            filter: (b) => {
                if (b.user.id !== message.author.id) {
                    return b.reply({
                        content: `Type \`fh time\` to get your own interface.`,
                        ephemeral: true,
                    })
                } else return true
            },
            time: 30000,
        })

        collector.on('collect', async (b) => {
            const id = b.customId.split(':')[1]
            b.deferUpdate()
            return message.channel.send({
                content: `\`${formatTime(
                    new Date().getTime() + time,
                    id
                )}\``,
            })
        })
        collector.on('end', () => {
            m.components.forEach((com) => {
                com.components.forEach((c) => {
                    c.setDisabled()
                })
            })
            m.edit({
                components: m.components,
            })
        })
    },
}