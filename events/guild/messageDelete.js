module.exports = async (Discord, client, message) => {
    if (message.author.bot) return;
    let snipes = client.snipes.snipes.get(message.channel.id) || []

    snipes.unshift({
        msg: message,
        image: message.attachments.first()?.proxyURL || null,
        time: Date.now(),
    })

    client.snipes.snipes.set(message.channel.id, snipes)
}