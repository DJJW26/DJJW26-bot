module.exports = {
    name: '8ball',
    description: 'you know what it does',
    execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master) {
        const responses = [
            "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "You may rely on it.", "As I see it, yes.",
            "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.",
            "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.",
            "Very doubtful.",
        ];
        if (!args.length) {
            message.reply('ask a question')
        }
        else {
            const number = Math.floor(Math.random() * responses.length);
            message.reply(responses[number]);
        }
    }
}