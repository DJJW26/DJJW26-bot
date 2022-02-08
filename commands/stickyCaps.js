module.exports = {
    name: 'stickyCaps',
    description: 'changes normal sentence to sticky caps',
    aliases: ['sc'],
    async execute(message, args, client, Discord, ProfileData, user, userQuery, master) {
        let sentence = '';

        let chars = {
            chara: 'A',
            charb: 'b',
            charc: 'c',
            chard: 'd',
            chare: 'E',
            charf: 'f',
            charg: 'g',
            charh: 'h',
            chari: 'i',
            charj: 'j',
            chark: 'k',
            charl: 'L',
            charm: 'm',
            charn: 'n',
            charo: 'O',
            charp: 'p',
            charq: 'q',
            charr: 'r',
            chars: 's',
            chart: 't',
            charu: 'U',
            charv: 'v',
            charw: 'w',
            charx: 'x',
            chary: 'y',
            charz: `z`
        }

        for(let e of args.join(' ')) {
            if(/([a-z])/gim.test(e)) sentence += `:regional_indicator_${e.toLowerCase()}:`
            else if(/\s/.test(e)) sentence += ' '
            else if(/([1-9])/.test(e) || ['+', '-', '*', '#', '!', '÷'].includes(e)) sentence += chars[`char${e}`]
            else sentence += e
        }

        message.channel.send(sentence);
    }
}