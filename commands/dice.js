module.exports = {
    name: 'dice',
    description: 'rolls a dice',
    aliases: ['roll'],
    cooldowns: 2,
    execute(message, args, client, Discord, ProfileData, user, userQuery){
        let max = 6;
        let min = 1;
        const dice = Math.floor(Math.random() * (max - min + 1) + min);
        message.channel.send('rolling dice').then((sent) => {
            sent.edit (`${message.author.username} rolls a ${dice}`);
        })
    }
}