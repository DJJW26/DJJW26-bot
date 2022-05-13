const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Collection,
} = require('discord.js')
const gameSet = new Collection();
const wordleList = require('../wordle.json');
module.exports = {
    name: 'wordle',
    async execute(message, args, client, Discord) {
        if (gameSet.has(message.author.id)) {
            return message.reply(
                "You already have an active game... If you don't know where it is, wait for 5 minutes and try again!"
            )
        }
        gameSet.set(message.author, '')
        const user = message.author
        let length = wordleList.length;
        let rand = Math.floor(Math.random() * (length - 1 + 1) + 1)
        let wOrD = wordleList[rand];
        console.log(wOrD)
        await message.reply('Game started')
        const embed = new MessageEmbed()
            .setTitle('📕 Wordle')
            .setDescription(
                'World is a word guessing game. You have to guess the correct word in 5 tries or less.'
            )
            .addField(
                'How it works:',
                'You have to type a __5 letter__ word in the chat once you are ready. The bot then edits the message with your word.\nIf the button is disabled, the letter is not in the word.\nIf the button is blurple, the letter is in the word, but not at the right place.\nIf the button is green, the letter is in the word and at correct place.'
            )
            .setFooter({ text: '🤓', iconURL: user.displayAvatarURL() })
            .setColor('ORANGE')

        const componentArray = [
            new MessageActionRow(),
            new MessageActionRow(),
            new MessageActionRow(),
            new MessageActionRow(),
            new MessageActionRow(),
        ]
        for (const row of componentArray) {
            if (row.components.length > 5) continue
            for (let i = 0; i < 5; i++) {
                const id = (Math.random() + 1).toString(36).substring(7)
                row.addComponents([
                    new MessageButton()
                        .setEmoji('914473340129906708')
                        .setStyle('SECONDARY')
                        .setCustomId(id),
                ])
            }
        }

        const Game = await message.channel.send({
            content: `${user.toString()}`,
            embeds: [embed],
            components: [
                new MessageActionRow().addComponents([
                    new MessageButton()
                        .setLabel('Start')
                        .setStyle('SUCCESS')
                        .setCustomId('start-w'),
                    new MessageButton()
                        .setLabel('Go back')
                        .setStyle('DANGER')
                        .setCustomId('no-w'),
                ]),
            ],
        })

        const confirmation = Game.createMessageComponentCollector()
        confirmation.on('collect', (b) => {
            if (b.customId === 'start-w') {
                Game.edit({
                    content: Game.content,
                    embeds: Game.embeds,
                    components: [...componentArray],
                })
                b.deferUpdate()
                Game.channel.send(
                    'You can now type words in chat(max: 5 letters and 5 words). The edits may take time to load due to rate limits. To exit out of the game type `end`.'
                )
            } else if (b.customId === 'no-w') {
                Game.components[0].components
                    .filter((a) => a.customId === 'start-w')[0]
                    .setStyle('SECONDARY')
                Game.components[0].components.forEach((a) => {
                    a.setDisabled()
                })

                Game.edit({
                    content: Game.content,
                    embeds: Game.embeds,
                    components: Game.components,
                })
                return Game.channel.send('The game has been cancelled.')
            } else b.deferUpdate()
        })

        const mainCollector = message.channel.createMessageCollector({
            filter: (msg) => msg.author.id === user.id,
            time: require('ms')('5m'),
        })
        let currentLine = 0
        let editing = false
        let win = false
        mainCollector.on('collect', async (msg) => {
            if (msg.content.toLowerCase() === 'end') {
                mainCollector.stop()
                confirmation.stop()
                return msg.channel.send('The game has ended')
            }
            if (currentLine > 5) {
                mainCollector.stop()
                confirmation.stop()
                return msg.reply('The game has ended as you are out of tries!')
            }
            if (msg.content.length > 5)
                return msg.reply('The word can be of max 5 letters.')
            if (msg.content.length < 5)
                return msg.reply('The word can be of min 5 letters.')
            if (!/^[a-zA-Z]+$/.test(msg.content))
                return msg.reply('The word must only contain alphabets.')
            if (editing)
                return msg.reply(
                    'Please wait, the message is still being edited...'
                )
            if (msg.content.toLowerCase() === wOrD) win = true
            if (currentLine > 4 && !win) {
                mainCollector.stop();
                confirmation.stop();
                return msg.reply(
                    `You could not finish the game in 5 tries... The word was \`${wOrD}\``
                )
            }
            editing = true
            for (let i = 0; i < msg.content.length; i++) {
                Game.components[currentLine].components[i].label =
                    msg.content[i].toUpperCase()
                Game.components[currentLine].components[i].emoji = null
                if (wOrD[i] === msg.content[i].toLowerCase()) {
                    Game.components[currentLine].components[i].setStyle(
                        'SUCCESS'
                    )
                } else if (wOrD.includes(msg.content[i].toLowerCase())) {
                    Game.components[currentLine].components[i].setStyle(
                        'PRIMARY'
                    )
                } else
                    Game.components[currentLine].components[i].setStyle(
                        'SECONDARY'
                    )
            }
            if (win) {
                Game.components.forEach((c) => {
                    c.components.forEach((a) => {
                        a.setDisabled()
                    })
                })
                Game.channel.send(
                    `Congrats ${message.author.toString()} you have won the game! The word was \`${wOrD}\``
                )
                mainCollector.stop()
                confirmation.stop()
            }
            Game.edit({
                content: user.toString(),
                embeds: [embed],
                components: Game.components,
            })
            editing = false
            currentLine++
        })
        mainCollector.on('end', (a) => {
            gameSet.delete(message.author.id)
        })
    },
}