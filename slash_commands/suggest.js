const { SlashCommandBuilder } = require('@discordjs/builders')
const { CommandInteraction, Client, MessageEmbed } = require('discord.js')

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName(`suggest`)
        .setDescription('Suggest something you would like to see in this bot!')
        .addStringOption((opt) => {
            return opt
                .setName('suggestion')
                .setRequired(true)
                .setDescription('Your suggestion.')
        })
        .addBooleanOption((opt) => {
            return opt
                .setName('anonymous')
                .setDescription(
                    'Do you want your suggestion to be anonymous? Default: false'
                )
                .setRequired(false)
        }),
    async execute(interaction, client) {
        const data = {
            suggestion: interaction.options.getString('suggestion'),
            a: interaction.options.getBoolean('anonymous') || false,
        }

        const suggestChannel = client.channels.cache.get("986531883435315220")
        const suggestEmbed = new MessageEmbed()
            .setDescription(data.suggestion)
            .setTimestamp()
            .setColor('GREEN')

        if (data.a) {
            suggestEmbed.setAuthor({
                name: `Anonymous' suggestion`,
            })
        } else {
            suggestEmbed
                .setAuthor({
                    name: `${interaction.user.tag}'s suggestion:`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
                .setFooter({
                    text: interaction.user.id.toString(),
                })
        }

        suggestChannel.send({
            embeds: [suggestEmbed],
        })
        interaction.reply({
            content: `Your suggestion has been sent to the devs!`,
        })
    },
}