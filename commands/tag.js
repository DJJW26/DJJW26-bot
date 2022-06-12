const tagDb = require('../models/tagModel');

module.exports = {
    name: 'tag',
    category: 'utility',
    description: 'Set a tag in the server.',
    async execute(message, args, client, Discord) {
        if (!args.length) { return message.channel.send('Invalid args'); }
        if (args[0] == 'create') {
            if (!args[1]) {
                return message.channel.send('Please specify a tag name.');
            }
            if (!args[2]) {
                return message.channel.send('Please specify a tag value.');
            }
            const tag = args[1];
            const value = args.slice(2).join(' ');
            const guild = message.guild.id;
            await tagDb.findOne({ Guild: message.guild.id }, (err, data) => {
                if (data) {
                    const hasTag = Object.keys(data.Tags).includes(tag);
                    if (hasTag) {
                        return message.channel.send('That tag already exists.');
                    }
                    data.Tags[tag] = value;
                    data.save();
                    return message.channel.send(`Tag ${tag} has been created.`);
                } else {
                    new tagDb({
                        Guild: message.guild.id,
                        Tags: {
                            [tag]: value
                        }
                    }).save();
                }
            })
        } else if (args[0] == 'edit') {
            if (!args[1]) {
                return message.channel.send('Please specify a tag name.');
            }
            if (!args[2]) {
                return message.channel.send('Please specify a tag value.');
            }
            const tag = args[1];
            const value = args.slice(2).join(' ');
            const guild = message.guild.id;
            await tagDb.findOne({ Guild: message.guild.id }, (err, data) => {
                if (data) {
                    const hasTag = Object.keys(data.Tags).includes(tag);
                    if (!hasTag) {
                        return message.channel.send('That tag doesnt exist.');
                    }
                    data.Tags[tag] = value;
                    data.save();
                    return message.channel.send(`Tag ${tag} has been edited.`); n
                } else {
                    message.channel.send('That tag doesnt exist.')
                }
            })
        } else if (args[0] == 'delete') {
            if (!args[1]) {
                return message.channel.send('Please specify a tag name.');
            }
            const tag = args[1];
            const guild = message.guild.id;
            await tagDb.findOne({ Guild: message.guild.id }, (err, data) => {
                if (data) {
                    const hasTag = Object.keys(data.Tags).includes(tag);
                    if (!hasTag) {
                        return message.channel.send('That tag doesnt exists.');
                    }
                    delete data.Tags[tag];
                    data.save();
                    return message.channel.send(`Tag ${tag} has been deleted.`);
                } else {
                    message.channel.send('That tag doesnt exists.');
                }
            })
        } else {
            if (!args[0]) {
                return message.channel.send('Please specify a tag name.');
            }
            const tag = args[0];
            tagDb.findOne({ Guild: message.guild.id }, (err, data) => {
                if (data) {
                    const hasTag = Object.keys(data.Tags).includes(tag);
                    if (!hasTag) {
                        return message.channel.send('That tag does not exist.');
                    }
                    let embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(`${tag}`)
                        .setDescription(`${data.Tags[tag]}`)
                        .setFooter({ text: `Requested by ${message.author.username}` })
                    return message.channel.send({ embeds: [embed] });
                } else {
                    return message.channel.send('That tag does not exist.');
                }
            })
        }
    }
}