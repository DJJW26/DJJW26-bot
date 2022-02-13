module.exports = {
    name: 'say',
    description: 'repeats what the user said',
    execute (message){
        const n = message.content.replace('%say ','');
        message.channel.send(n);
    }
}