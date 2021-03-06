const request = require("request");

module.exports = {
    name: 'meme',
    description: 'shows a random meme',
    cooldowns: 1,
    category: 'fun',
    execute(message,args, client, Discord) {
        let urls = ["https://meme-api.herokuapp.com/gimme/dankmemes", "https://meme-api.herokuapp.com/gimme/wholesomememes", "https://meme-api.herokuapp.com/gimme/memes"];

        let subreddit = urls[Math.floor(Math.random() * urls.length)];
        return request(subreddit, (err, response, body) => {
            if (err) throw (err);
            var data = JSON.parse(body);

            let meme = new Discord.MessageEmbed()
                .setColor('#E7A700')
                .setTitle(data.title)
                .setImage(data.url);

            message.channel.send({embeds: [meme]}).catch(console.error);
        });
    }
}