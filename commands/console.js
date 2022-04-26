module.exports = {
    name: 'console',
    description: 'logs smth in the console',
    execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master, afks) {
        const n = message.content.replace('%console ', '');
        console.log(n);
        message.react('👍');
    }
}
