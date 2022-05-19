const { inspect } = require('util');

module.exports = {
    name: 'eval',
    async execute(message,args) {
        if (message.author.id != 869768645067292693) return

        const code = args.join(' ');
        if(!code) return message.reply('Give some code')

        try {
            const result = await eval(code);
            let output = result
            if( typeof result !== 'string' ){
                output = inspect(result)
            }

            message.channel.send(output, {code: 'js'})
        } catch (error) {
            console.error(error)
            message.reply('Error')
        }
    }
}