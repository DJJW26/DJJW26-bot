module.exports = {
    name: 'console',
    description: 'logs smth in the console',
    execute(message, master) {
        if (master.includes(message.author.id)) {
            const n = message.content.replace('%console ', '');
            console.log(n);
            message.react('👍');
        }
        else{
            
        }
    }
}