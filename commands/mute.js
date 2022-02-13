const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "This mutes a member",
    cooldowns: 1,
    execute(message, args) {
        if (message.member.permissions.has('BAN_MEMBERS') || message.member.id === '869768645067292693') {
            const target = message.mentions.users.first();
            if (target) {

                let mainRole = message.guild.roles.cache.find(role => role.name === 'admin');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');

                let memberTarget = message.guild.members.cache.get(target.id);

                if (!args[1]) {
                    memberTarget.roles.remove(mainRole.id);
                    memberTarget.roles.add(muteRole.id);
                    message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                    return
                }
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id);
                    memberTarget.roles.add(mainRole.id);
                }, ms(args[1]));
            } else {
                message.channel.send('Cant find that member!');
            }
        }
    }
}