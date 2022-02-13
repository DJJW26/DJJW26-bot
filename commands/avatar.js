module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp', 'profilepic', 'av'],
    description: 'Return a user(s) avatar picture!',
    //Use your own execute parameters
    execute(message) {

        if (!message.mentions.users.size) {
            return message.channel.send(`**Your Avatar: ** ${message.author.displayAvatarURL({ dynamic: true })}`);
        }

        else
        var guy = message.mentions.users.first();
            return message.channel.send(`**${guy.username}'s Avatar: ** ${guy.displayAvatarURL({ dynamic: true })}`)
    }
}