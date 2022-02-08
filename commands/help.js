module.exports = {
    name: 'help',
    description: 'send an embed for help',
    cooldowns: 1,
    execute(message, args, client, Discord, ProfileData, user, userQuery, master) {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('PURPLE')
        .setTitle('COMMANDS')
        .setDescription('All the commands you can use it with this bot')
        .addFields(
            {name: 'ban', value:'bans a user'},
            {name: 'unban', value: 'unbans a user'},
            {name: 'kick', value: 'kicks a user'},
            {name: 'mute', value: 'mutes a user'},
            {name: 'unmute', value: 'unmutes a user'},
            {name: 'purge', value: 'purges a certain amount of messages'},
            {name: 'lock', value: 'locks a channel'},
            {name: 'unlock', value: 'unlocks a channel'},
            {name: 'ping', value: 'checks the ping of the bot'},
            {name: 'image', value:'searches an image in the internet n sends it'},
        )
        message.channel.send({embeds: [helpEmbed]});
    }
}