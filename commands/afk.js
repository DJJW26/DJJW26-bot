const db = require('../models/afkModel')

module.exports = {
    name: 'afk',
    async execute(message, args, client) {
        const admin = message.member.permissions.has('ADMINISTRATOR')
        if (['clear', 'remove'].includes(args[0]) && admin) {
            args.shift()
            if (!args[0])
                return message.channel.send('Please provide a user')

            const mention =
                message.mentions.members.size > 0
                    ? message.mentions.members.first()
                    : message.guild.members.cache.get(args[0]) || null

            if (!mention) return message.channel.send('Couldnt find the user');

            const dbUser = db.findOne({ User: mention.id })
            if (!dbUser || dbUser.afk.afk == false) return message.channel.send('User is not afk')

            dbUser.afk.afk = false;
            dbUser.save()
            message.react('☑️')
        }

        let user = await db.findOne({ userId: message.author.id })
        if (!user) {
            const newUser = new db({
                User: message.author.id,
                afk: {
                    afk: true,
                    reason: 'AFK',
                },
            })
            newUser.save()
            user = newUser
        }
        else {

            let reason = args.join(' ') 
            if(!reason) reason = 'AFK'

            user.afk = {
                afk: true,
                reason: reason,
                time: new Date()
            }
            user.save()
        }
        message.channel.send(`${message.member}, I have set your afk:- \n ${reason}`)
        try {
            message.member.setNickname(`${message.member.displayName} ~ AFK`)
        } catch (err) {
            console.log(err)
        }
        setTimeout(() => {
            client.afkInfo.afks.push(message.author.id)
        }, 5000)
        return
    }
}