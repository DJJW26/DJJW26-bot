const profileModel = require("../models/profileSchema");

module.exports = {
    name: "search",
    aliases: ['scout'],
    description: "Search for some coin!",
    async execute(message) {

        const locations = [
            "car",
            "bathroom",
            "park",
            "truck",
            "bank",
            "computer"
        ];

        const chosenLocations = locations.sort(() => Math.random() - Math.random()).slice(0, 3);

        const filter = ({ author, content }) => message.author == author && chosenLocations.some((location) => location.toLowerCase() == content.toLowerCase());

        const collector = message.channel.createMessageCollector({filter,  max: 1, time: 10000 });

        const earnings = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;


        collector.on('collect', async (m) => {
            message.channel.send(`You searched the ${m.content} and found ${earnings} coins!`);

            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: earnings,
                    },
                }
            );
        });

        collector.on('end', (collected, reason) => {
            if (reason == "time") {
                message.channel.send('You didn\'t even pick a location, you okay?');
            }
        });


        message.channel.send(`<@${message.author.id}> Which location would you like to search?\n Type the location in this channel\n \`${chosenLocations.join('` `')}\``);
    }
}