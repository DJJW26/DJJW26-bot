module.exports = {
    name: 'stealembed',
    description: 'Steal an embed from a message',
    category: 'utility',
    async execute(message, args) {
        if(!args.length) return message.channel.send('Please provide a message id to steal an embed from.');
        if(!args[1]) return message.channel.send('Please provide a channel to steal an embed from.');

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || null;
        if(!channel) return message.channel.send('Please provide a valid channel.');

        const msg = await channel.messages.fetch(args[0]);
        if(!msg) return message.channel.send('Please provide a valid message id.');

        if(!msg.embeds.length) return message.channel.send('This message does not have an embed.');

        const embed = msg.embeds[0];
        if(!embed) return message.channel.send('This message does not have an embed.');

        message.channel.send(`${embed}`);
    }
}