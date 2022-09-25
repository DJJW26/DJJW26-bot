module.exports = {
    name: 'github',
    aliases: 'git',
    description: 'Use to search for a github repository',
    async execute(message, args, client, Discord) {
        let user1 = !args[0] ? "Rufus" : args[0];
        let repo = !args[1] ? "Rufus" : args[1];
        let uri = await fetch(`https://api.github.com/repos/${user1}/${repo}`);

        if (uri.status === 200) {
            let uriJson = await uri.json();
            let embed = new Discord.MessageEmbed()
                .setAuthor(uriJson.owner.login, uriJson.owner.avatar_url)
                .setDescription(`${uriJson.description}\n[Repository Link](${uriJson.html_url})\n`)
                .addField("Repo Name :notepad_spiral:", `${uriJson.name}`, true)
                .addField("Stars :star:", `${uriJson.stargazers_count}`, true)
                .addField("Forks :gear:", `${uriJson.forks}`, true)
                .addField("Language :desktop:", `${uriJson.language}`, true)
                .setImage(uriJson.owner.avatar_url)
                .setColor("#ffff");
            return message.channel.send({embeds: [embed]});
        } else {
            return message.channel.send("Unable to find the mentioned repository. Please make sure you have entered the correct user/repository. `%github [user] [repository]`");
        }
    }
}