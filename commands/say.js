module.exports = {
    name: 'say',
    description: 'repeats what the user said',
    execute (message, args, client, Discord, ProfileData, user, userQuery){
        message.channel.send (message.content);
    }
}