module.exports = {
    name: 'unban',
    description: 'unbans a member',
    cooldowns: 1,
    category: 'moderation',
    execute(message, args) {
        if (message.member.permissions.has('BAN_MEMBERS') || message.member.id === '869768645067292693') {
            const id = args[0];
            message.guild.members.unban(id);
            message.channel.send("user has been unbanned")
        }
        else {
            message.channel.send("failed to unban user");
        }
    }
}