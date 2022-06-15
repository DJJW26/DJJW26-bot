const Discord = require('discord.js');
const pms = require('pretty-ms');
const sourcebin = require('sourcebin');

module.exports = {
    name: 'eval',
    description: 'Evaluates code',
    category: 'dev',
    async execute(message, args) {
        if (message.author.id !== "869768645067292693") return;

        if (!args) {
            return message.channel.send({ embeds: [errEmbed('No args provided!')] })
        }

        const input = args.join(' ');

        (async () => {

            try {
                const evaled = await eval(input)

                return message.channel.send({ embeds: [await sucEmbed(evaled, message, input)] });
            } catch (err) {
                return message.channel.send({ embeds: [errEmbed(err.stack)] });
            }
        })();

    },
};

function errEmbed(msg) {
    const embed = new Discord.MessageEmbed()
        .setTitle('Error!')
        .setDescription(`\`\`\`\n${msg}\`\`\``)
        .setColor('RED')

    return embed
}

async function sucEmbed(output, message, input) {
    const type = typeof output
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .addField('Input', `\`\`\`js\n${input}\`\`\``)

    if (type === 'object' || type === 'array') {
        let length;
        if (type === 'array') {
            length = getLength({ output })
        } else {
            length = getLength(output)
        }
        if (length >= 3900) {
            const bin = await sourcebin.create(
                [
                    {
                        content: `${JSON.stringify(output, null, 4)}`,
                        language: 'Javascript',
                    },
                ],
                {
                    title: 'Output',
                    description: 'Output',
                }
            );
            embed.addField('OUTPUT', `\`\`\`js\n${bin.url}\`\`\``)
        } else {
            embed.addField('OUTPUT', `\`\`\`js\n${JSON.stringify(output, null, 2)}\`\`\``)
        }
    } else if (type === 'string' || type === 'number' || type === 'boolean') {
        embed.addField('OUTPUT', `\`\`\`js\n${output}\`\`\``)
    } else if (type === 'null' || type === 'undefined') {
        embed.setColor('RED')
        embed.addField('OUTPUT', `\`\`\`js\n${output}\`\`\``)
    }

    embed.setFooter(`Took: ${Date.now() - message.createdTimestamp}ms`)
    return embed
}

function getLength(obj) {
    let length = 0
    const first = Object.values(obj) || 'e'
    const second = Object.keys(obj) || 'e'

    for (const str of first) {
        if (typeof str !== 'string') {
            length += JSON.stringify(str).length
            continue;
        }
        length += str.length
    }
    for (const str of second) {
        if (typeof str !== 'string') {
            length += JSON.stringify(str).length
            continue;
        }
        length += str.length
    }

    return length
}

