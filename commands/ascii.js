const { diffieHellman } = require('crypto');
var figlet = require('figlet');
const { promisify } = require("util");
module.exports = {
    name: "Ascii",
    aliases: [],
    description: "Ascii Art!",
    async execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master) {
        console.log('hm');
        let Content = args.shift.join(" ");
        if (!Content) return message.channel.send(`Please Give Me Text!`);
        if (Content.length > 20) return message.channel.send(`Please Make Shorter! | Limit : 20`);
        let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription("```" + figlet.textSync(Content) + "```")
            .setTimestamp();
        message.channel.send({ embeds: [embed] });
    }
}