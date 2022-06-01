const clean = async (text) => {
    if (text && text.constructor.name == "Promise")
        text = await text;
    if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 1 });
    text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
}
const { inspect } = require('util');

module.exports = {
    name: 'eval',
    description: 'Evaluates code',
    category: 'dev',
    async execute(message, args) {
        if (message.author.id != 869768645067292693) return

        try {
            const evaled = eval(args.join(" "));
            const cleaned = await clean(evaled);
            message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${cleaned}\n\`\`\``);
        }
    }
}