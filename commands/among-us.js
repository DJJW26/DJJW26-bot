const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow,
} = require('discord.js')
const { inspect } = require('util')
const { randomBytes } = require('crypto')
const randomHash = () => {
    return randomBytes(18).toString('hex')
}
module.exports = {
    name: 'amongus',
    category: 'fun',
    aliases: ['amogus'],
    description: 'Start a game of amogus, right in discord!',
    async execute(message, args, client) {
        const sessionId = randomHash()
        const joinEmbed = new MessageEmbed()
            .setTitle('Among Us')
            .setDescription(
                'Click the **Join** button to enter the game!\n\nMax players: **10**'
            )
            .setColor('GREEN')
        const getPlayers = (
            await message.channel.send({
                embeds: [joinEmbed],
                components: [
                    new MessageActionRow().addComponents([
                        new MessageButton()
                            .setLabel('Join')
                            .setCustomId(`join:${sessionId}`)
                            .setStyle('PRIMARY'),
                    ]),
                ],
            })
        ).createMessageComponentCollector({
            time: 15_000,
        })

        const gamedata = []

        getPlayers.on('collect', async (button) => {
            if (gamedata.find((v) => v.user.id === button.user.id)) {
                return button.reply({
                    content: 'You have already joined.',
                    ephemeral: true,
                })
            }
            if (gamedata.length > 9) {
                return button.reply({
                    content: 'The game is full.',
                    ephemeral: true,
                })
            }
            const temp = gamedata.length
            gamedata.push({
                user: button.member,
                gameId: `${button.member.id}`,
                impostor: false,
                votes: 0,
                messages: 0,
            })

            button.reply({
                content: `You have joined the game`,
                ephemeral: true,
            })
        })

        getPlayers.on('end', async () => {
            if (gamedata.length < 3) {
                return message.reply(
                    'You need more friends to play this game.\nMinimum players: 3'
                )
            }
            const components = [new MessageActionRow()]

            for (let i = 0; i < gamedata.length; i++) {
                if (components[0].components.length < 5) {
                    components[0].addComponents([
                        new MessageButton()
                            .setLabel(`${gamedata[i].user.displayName}`)
                            .setCustomId(gamedata[i].gameId)
                            .setStyle('SECONDARY')
                            .setEmoji(gamedata[i].gameId.split(':')[1])
                            .setDisabled(),
                    ])
                } else {
                    if (!components[1]) components.push(new MessageActionRow())
                    components[1].addComponents([
                        new MessageButton()
                            .setLabel(`${gamedata[i].user.displayName}`)
                            .setCustomId(gamedata[i].gameId)
                            .setStyle('SECONDARY')
                            .setEmoji(gamedata[i].gameId.split(':')[1])
                            .setDisabled(),
                    ])
                }
            }
            await message.channel.send({
                embeds: [
                    {
                        title: `Among Us`,
                        color: 'GREEN',
                        description: `**HOW TO WIN**:\n\n__Impostor__:\n> Send atleast 15 messages in order to win!\n__Crewmate__:\n> Start an Emergency Meeting by typing __emergency__ in chat and vote out whoever is sus!`,
                        footer: {
                            text: "Check your DMs! You have been DM'd your role!",
                        },
                    },
                ],
                components,
            })

            const impostor =
                gamedata[Math.floor(Math.random() * gamedata.length)]
            impostor.impostor = true
            for await (const user of gamedata) {
                await user.user.send({
                    content: `You are ${user.impostor ? 'the **Impostor**' : 'a **Crewmate**'
                        }`,
                })
            }

            await message.channel.send(
                `Everyone was DM'd and the game has started! Good luck.`
            )

            const collector = await message.channel.createMessageCollector({
                filter: (msg) =>
                    gamedata.some((v) => v.user.id === msg.author.id),
            })
            let emergencies = 3
            let inEmergency = false
            collector.on('collect', async (msg) => {
                const user = gamedata.find((u) => u.user.id === msg.author.id)
                if (!inEmergency) user.messages++

                if (user.impostor && user.messages > 15) {
                    collector.stop()
                    return message.channel.send({
                        content: `${user.user.toString()} was the impostor and they got more than 15 messages!\nThey have won the game!!`,
                    })
                }
                if (msg.content.toLowerCase() === 'emergency') {
                    if (emergencies < 1) {
                        msg.reply({
                            content:
                                'You used the emergency button too many times and... IT BROKE!!!',
                        })
                        message.channel.send({
                            content: `${impostor.user.toString()} has won the game!! They were the impostor.`,
                        })
                    }
                }
            })
        })
    },
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}