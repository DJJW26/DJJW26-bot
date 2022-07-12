module.exports = {
    name: 'cricket',
    description: 'Play a classical game of hand cricket',
    category: 'fun',
    aliases: ['hand-cricket', 'handCricket'],
    async execute(message, args, client, Discord) {
        var solo = null;
        var batting = null;
        var gameData = {
            authorScore: 0,
            targetScore: 0,
        }
        if (client.games.cricket.includes(message.author.id)) return message.reply('You have an ongoing game.');

        const infoBed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('How to play the game')
            .setDescription('This is a game of hand cricket which is played between 2 players.\nYou can mention a player to play with, or play with the bot itself.\nTo play the game, a player has to win the toss to select batting or bowling, then after selecting the desired choice,both the players start using the buttons to select what number they has to use.\nIf the numbers do not match, the number adds to the score of the batsman, or else if consecutive, the batsman is bowled and loses theyre wicket, or if the numbers are same, the numbers are multiplied and added to the score of the batsman.\nOnce both the players have finished their batting, the one with the highest score wins.');

        message.channel.send({ embeds: [infoBed] })

        if (!message.mentions.users.size) solo = true;
        else {
            solo = message.mentions.users.first();
        }

        var toss = Math.round(Math.random() * 10);
        var other = null;

        if (toss % 2 == 0) {toss = message.author;other = null} 
        else {
            if (solo == true) toss = client.user.id;
            else toss = solo;
        }

        if (toss == client.user.id) {
            var amogus = Math.round(Math.random() * 10);
            if(amogus % 2 == 0) {batting = client.user.id; message.channel.send(`The bot has won the toss and has chose to bat!`)}
            else {batting = message.author.id; message.channel.send(`The bot has won the toss and has chose to bowl`)};
        }

        message.channel.send(`<@${toss.id}> has won the toss!\nYou have 15 seconds to respond with 'bat' or 'bowl'`)

        const filter = ({ author, content }) => toss == author

        const collector = message.channel.createMessageCollector({ filter, time: 15000, });

        collector.on('collect', async (msg) => {
            if (msg.toLowerCase() == 'bat') batting = toss.id;
            else if(msg.toLowerCase() == 'bowl') batting = null;
        })
    }
}