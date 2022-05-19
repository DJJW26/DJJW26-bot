module.exports = async (Discord, client, message, newContent, oldContent) => {
    if (newContent.author.bot) return
        let snipes = client.snipes.esnipes.get(message.channel.id) || []

        snipes.unshift({
            oldContent: oldContent.content,
            newContent: newContent.content,
            editedIn: newContent.createdAt - oldContent.editedAt,
            member: newContent.member,
            author: newContent.author,
            msg: newContent,
        })

        client.snipes.esnipes.set(oldContent.channel.id, snipes)
}