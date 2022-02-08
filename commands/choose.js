module.exports = {
    name: 'choose',
    description: 'chooses between args',
    execute(message, args, client, Discord, ProfileData, user, userQuery) {
        const prefix = process.env.PREFIX;
        if (message.content.includes(',')) {
            const commaArgs = message.content.slice(prefix.length).split(/,+/);
            commaArgs.shift();
            random1 = Math.floor(Math.random() * commaArgs.length);
            message.channel.send(`${message.author}, I choose \`${commaArgs[random1]}\``);
        }
        else {
            const nonCommaArgs = message.content.slice(prefix.length).split(/ +/);
            nonCommaArgs.shift();
            random2 = Math.floor(Math.random() * nonCommaArgs.length);
            message.channel.send(`${message.author}, I choose \`${nonCommaArgs[random2]}\``);
        }
    }
}