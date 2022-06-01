const request = require("request");

module.exports = {
    name: 'interesting',
    aliases: 'interest',
    description: 'shows a random interesting fact',
    category: 'fun',
    execute(message,args,client, Discord) {
        let urls = ["https://meme-api.herokuapp.com/gimme/mildlyinteresting", "https://meme-api.herokuapp.com/gimme/interestingasfuck", "https://meme-api.herokuapp.com/gimme/damnthatsinteresting"];

        let subreddit = urls[Math.floor(Math.random() * urls.length)];
        return request(subreddit, (err, response, body) => {
            if (err) throw (err);
            var data = JSON.parse(body);

            let inter = new Discord.MessageEmbed()
                .setColor('#E7A700')
                .setTitle(data.title)
                .setImage(data.url);

            message.channel.send({embeds: [inter]}).catch(console.error);
        });
    }
}