const db = require('../models/afkModel')

module.exports = {
    name: 'afk',
    async execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master, afkInfo) {
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

        let reason = 'AFK'
        let user2 = await db.findOne({ userId: message.author.id })
        if (!user2) {
            const newUser = new db({
                User: message.author.id,
                afk: {
                    afk: true,
                    reason: 'AFK',
                },
            })
            newUser.save()
            user2 = newUser
        } else {
            reason = args.join(' ')
            if (!reason) reason = 'AFK'

            user2.afk = {
                afk: true,
                reason: reason,
                time: new Date()
            }
            user2.save()
        }
        message.channel.send(`${message.member}, I have set your afk:- \n ${reason}`)
        try {
            message.member.setNickname(`${message.member.displayName} ~ AFK`)
        } catch (err) {
            console.error(err)
        }
        afkInfo.push(message.author.id)
        console.log(afkInfo)
        return
    }
}