module.exports = async (oldMessage, newMessage, Discord, client) => {
    if (newMessage.author.bot) return
        let snipes = client.snipes.esnipes.get(oldMessage.channel.id) || []

        snipes.unshift({
            oldContent: oldMessage.content,
            newContent: newMessage.content,
            editedIn: newMessage.createdAt - oldMessage.editedAt,
            member: newMessage.member,
            author: newMessage.author,
            msg: newMessage,
        })

        client.snipes.esnipes.set(oldMessage.channel.id, snipes)
}