const Discord = require('discord.js')

module.exports = {
    name: "embed",
    description: "make embed",
    cooldowns: 5,

    async execute(message, args,client, Discord){
        if(!message.member.permissions.has('MANNAGE_MESSAGES')) return 
        let title = args[0]
        let color = args[1] 
        let description = args.slice(2).join(" ")
        const error = new Discord.MessageEmbed() 
        .setColor('RANDOM')
        .setTitle('**ERROR INVALID ARGS**')
        .setDescription('`{prefix}embed, title(one word), color(hex code or basic colors in caps; i.e(YELLOW), description(embed body))`')

        if(!title) return message.channel.send({embeds: [error]})
        if(!color) return message.channel.send({embeds: [error]})
        if(!description) return message.channel.send({embeds: [error]})


        const embed = new Discord.MessageEmbed()
        .setTitle(`**${title}**`)
        .setColor(color)
        .setDescription(description)
        .setFooter(`Embed created by ${message.author.username}`)
        message.delete()

        message.channel.send({embeds: [embed]});
    }
}