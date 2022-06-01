module.exports = {
    name: 'activity',
    description: 'Sets the bot\'s activity',
    category: 'dev',
    execute(message, args, client) {
        let types = 2;
        if (message.author.id != 869768645067292693 || message.author.id != 928895679043080192) {
            return 
        }
        else {
            if (args[0] === "playing") {
                types = 0
            } else if (args[0] === "streaming") {
                types = 1
            } else if (args[0] === "listening") {
                types = 2
            } else if (args[0] === "watching") {
                types = 3
            } else if (args[0] === "competing") {
                types = 5
            } else if (args[0] === "reset") {

                client.user.setActivity(`%help`, { type: "LISTENING" })

                return message.channel.send('Status changed succesfully')

            } else {
                return message.channel.send('Invalid activity type.')
            }
        }
        args.shift();
        const content = args.join(' ')
        client.user.setPresence({
            activity: {
                name: content,
                type: types
            }
        })
        message.channel.send('Status changed succesfully')
    }
}