module.exports = {
    name: 'say',
    description: 'repeats what the user said',
    cooldowns: 1,
    category: 'fun',
    execute (message){
        const n = message.content.replace('%say ','');
        message.channel.send(n);
    }
}