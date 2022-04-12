module.exports = {
    name: 'activity',
    execute(message, args, client) {
        let types = 2;
/*        if (message.author != '869768645067292693' || message.author != '928895679043080192') {
            return message.reply('you cant use this command');
        }
        else {*/
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
//        }
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