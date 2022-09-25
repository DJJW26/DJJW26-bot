module.exports = {
    name: 'cricket',
    description: 'Play a classical game of hand cricket',
    category: 'fun',
    aliases: ['hand-cricket', 'handCricket'],
    async execute(message, args, client, Discord) {
        if(!message.mentions.users.size) return message.reply('You must mention a user to play with');
        message.channel.send(`<@${message.mentions.users.first().id}>, <@${message.author.id}> has invited you to play a game of hand cricket with you. React with 👍 to accept the challenge.`)
            .then(x => { 
                x.react('👍');
                const filter = (user) => {user.id === `${message.mentions.users.first().id}`;}
                const confirmCollector = x.createReactionCollector({filter, max: 1, time: 15000})
                confirmCollector.on('end', l => {
                    if(l.size == 0) return message.reply('They dont want to play with you i guess.')
                })
            });
            console.log('still');
        let batter = null;
        const user1 = {
            user: message.author,
            score: 0,
            job: null
        }
        const user2 = {
            user: message.mentions.users.first(),
            score: 0,
            job: null
        }
        if(Math.round(Math.random()*10) % 2 == 0) {
            batter = user2.user;
            user1.job = 'bowler';
            user2.job = 'batter';
        } else {
            batter = user1.user;
            user1.job = 'batter';
            user2.job = 'bowler';
        }
    }
}