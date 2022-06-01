module.exports = {
  name: "ping",
  description: "Ping the bot",
  aliases: 'latency',
  cooddowns: 1,
  category: 'utility',
  execute(message,args, client, Discord) {
    return message.channel.send("Pinging...").then((sent) => {
      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('PING')
      .addFields(
        { name: 'Roundtrip latency: ', value: `${sent.createdTimestamp - message.createdTimestamp}`},
        { name: 'Client ws: ', value: `${client.ws.ping}`}
      )
      .setFooter('Check the bot ping here')
      sent.edit(
        {embeds : [embed]}
      );
    });
  },
};