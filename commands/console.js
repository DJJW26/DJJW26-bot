module.exports = {
    name: 'console',
    description: 'Logs smth in the console',
    category: 'dev',
    execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master) {
        const n = message.content.replace('%console ', '');
        console.log(n);
        message.react('👍');
    }
}
